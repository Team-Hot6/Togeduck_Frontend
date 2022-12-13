console.log('article detail JS 로딩 확인')


// 현재 URL의 쿼리스트링 값을 가져옴
const url_str = window.location.search
// url_str의 URLSearchParams 객체를 생성
const urlParams = new URLSearchParams(url_str);
// URLSearchParams 객체에서 id 값 추출
const article_id = urlParams.get("id");

LoadDeatail(article_id)
LoadDeatail_comment(article_id)

// 해당 id 값의 게시글 데이터를 전달받아 html 생성
async function LoadDeatail(article_id) {
    const response = await get_article_detail(article_id)
    const data = await response.json()

    const title = document.getElementById('article_title')
    title.innerText = data['title']

    const author = document.getElementById('author')
    author.innerText = data['user']
    
    const datetime = document.getElementById('datetime')
    datetime.innerText = '- ' + data['date'] + ' '+data['time']

    const views = document.getElementById('views')
    views.innerText = '조회수  ' + data['views']
    
    const likes = document.getElementById('likes')
    likes.innerText = '추천수  ' + data['like']
    
    const article_image = document.getElementById('article_image')
    article_image.src = `${back_end_url}`+data['article_image']
    // article_image.setAttribute('src', `${back_end_url}`+data['article_image'])

    const content = document.getElementById('content')
    content.innerText = data['content']

    // 글 작성자만 수정, 삭제 버튼이 보이도록 설정
    const user_id = localStorage.getItem('payload')
    nickname = JSON.parse(user_id)

    if (data['user'] == nickname['nickname']){
        const article_btn = document.getElementById('article_btn')
        temp_html = `<button type="button" class="btn btn-warning fw-bold" onclick="LoadArticleUpdate(article_id)">글 수정</button>
                    <button type="button" class="btn btn-warning fw-bold" onclick="">글 삭제</button>
                    `
        article_btn.innerHTML = temp_html
    }
}

// 해당 id 값을 가진 게시글의 댓글 리스트 출력
async function LoadDeatail_comment(article_id) {
    const response = await get_article_detail_comment(article_id)
    const data = await response.json()
    
    for (let i = 0; i < data.length; i++) {
        let nickname = data[i]['user']
        let comment = data[i]['content']
        let date = data[i]['created_at'].replace('T', ' ').substr(5,5);
        let time = data[i]['created_at'].replace('T', ' ').substr(11,8);

        const comment_list = document.getElementById('comment_list')
        let temp_html = `<li class='list-group-item'>
                            <div class="comment-info d-flex">
                                <div class="nickname-box d-flex align-items-center">
                                    <span class="fw-bold">${nickname}</span>
                                </div>
                                <div class="comment-box w-50 ps-3 pt-3">
                                    <p>${comment}</p>
                                </div>
                                <div class="created_at w-25 d-flex align-items-center">
                                    <span>${date}&nbsp</span>
                                    <span>&nbsp${time}</span>
                                </div>
                                <div class="delete_btn d-flex align-items-center">
                                    <button type="button" class="btn btn-warning fw-bold">삭제</button>
                                </div>
                            </div>
                        </li>`
        comment_list.insertAdjacentHTML('beforeend',temp_html)
    }
}

// 댓글 작성
async function handleCommentCreate() {
    const comment = document.getElementById('comment').value
    create_comment(article_id, comment)
}

// 게시글 수정 버튼
async function LoadArticleUpdate(article_id) {
    // 게시글 작성자가 맞는지 확인
    const author = document.getElementById('author').innerText
    const user_id = localStorage.getItem('payload')
    const nickname = JSON.parse(user_id)['nickname']
    if (author == nickname){
        replace_article_update(article_id)
    }else {
        alert('게시글을 수정할 권한이 없습니다!')
        window.location.reload();
    }
}