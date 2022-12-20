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
    datetime.innerText = '- ' + data['date'] + ' ' + data['time']

    const views = document.getElementById('views')
    views.innerText = '👁 ' + data['views']

    const likes = document.getElementById('likes')
    likes.innerText = '👍 ' + data['like']

    const article_image = document.getElementById('article_image')
    article_image.src = `${back_end_url}` + data['article_image']
    // article_image.setAttribute('src', `${back_end_url}`+data['article_image'])

    const content = document.getElementById('content')
    content.innerText = data['content']

    // 글 작성자만 수정, 삭제 버튼이 보이도록 설정
    const user_id = localStorage.getItem('payload')
    nickname = JSON.parse(user_id)

    if (data['user'] == nickname['nickname']) {
        const article_btn = document.getElementById('article_btn')
        temp_html = `<button type="button" class="btn btn-warning fw-bold" onclick="LoadArticleUpdate(article_id)">글 수정</button>
                    <button type="button" class="btn btn-warning fw-bold" onclick="delete_article(article_id)">글 삭제</button>
                    `
        article_btn.innerHTML = temp_html
    }
}

// 해당 id 값을 가진 게시글의 댓글 리스트 출력
async function LoadDeatail_comment(article_id) {
    const response = await get_article_detail_comment(article_id)
    const data = await response.json()

    const login_user = localStorage.getItem('payload')
    const login_user_nickname = JSON.parse(login_user)['nickname']

    for (let i = 0; i < data.length; i++) {
        let comment_id = data[i]['id']
        let nickname = data[i]['user']
        let comment = data[i]['content']
        let date = data[i]['created_at'].replace('T', ' ').substr(5, 5);
        let time = data[i]['created_at'].replace('T', ' ').substr(11, 8);
        let reply = data[i]['reply_comment']
        
        let temp_html = `<li class='list-group-item' id="${comment_id}">
                                <div class="comment-info d-flex">
                                    <div class="nickname-box d-flex align-items-center">
                                        <span class="fw-bold" id="commenter">${nickname}</span>
                                    </div>
                                    <div class="d-flex comment-box w-50 ps-3 pt-3">
                                        <p>${comment} <span onclick="reply_create(${comment_id})">- 답글 달기</span></p>
                                    </div>
                                    <div class="created_at w-25 d-flex align-items-center">
                                        <span>${date}&nbsp</span>
                                        <span>&nbsp${time}</span>
                                    </div>
                                    <div class="delete_btn d-flex align-items-center" id='delete_btn${comment_id}'>
                                        
                                    </div>
                                </div>
                                <div id="reply_create_box${comment_id}" style="display: none;">
                                    <input type="text" id="reply${comment_id}">
                                    <button tyoe="button" onclick="handleReplyCreate(${article_id}, ${comment_id})">작성하기</button>
                                </div>
                                <div id="all_reply_btn${comment_id}" style="display: none; padding-left: 20px; margin-bottom: 10px;">
                                    <span onclick="all_reply(${comment_id})">답글 더보기</span>
                                </div>
                                <div class="reply-box" id="reply_box${comment_id}" style="padding-left: 20px;">
                                    
                                </div>
                            </li>`
        let comment_list = document.getElementById('comment_list')
        comment_list.insertAdjacentHTML('beforeend', temp_html)

        // 댓글 작성자가 로그인한 유저와 같은 경우 (댓글 삭제 버튼)
        if (login_user_nickname == nickname) {
            let delete_btn = document.getElementById(`delete_btn${comment_id}`)
            delete_btn.innerHTML = `<button type="button" class="btn btn-warning fw-bold" onclick="delete_comment(article_id, ${comment_id})">삭제</button>`
        }
        
        // 대댓글이 있는 경우(댓글 더보기 버튼)
        if (reply.length > 0) {
            let reply_more = document.getElementById(`all_reply_btn${comment_id}`)
            reply_more.style.display = 'block';
            let reply_box = document.getElementById(`reply_box${comment_id}`)
            reply_box.innerHTML = ``
            
            for (let i = 0; i < reply.length; i++){
                let reply_id = reply[i]['id']
                let reply_user = reply[i]['user']
                let content = reply[i]['content']
                let date = reply[i]['date']
                let time = reply[i]['time']
                
                let reply_html = `<div style="display:flex;">
                                    <div>
                                        <span>${reply_user}</span>
                                        <span>└ ${content}</span>
                                        <span>${date}</span>
                                        <span>${time}</span>
                                    </div>
                                    <div id="reply_delete_btn${reply_id}">
                                        
                                    </div>
                                </div>` 
                reply_box.insertAdjacentHTML('beforeend', reply_html)

                if (login_user_nickname == reply_user) {
                    let reply_delete_btn = document.getElementById(`reply_delete_btn${reply_id}`)
                    reply_delete_btn.innerHTML = `<button type="button" class="btn btn-warning fw-bold" onclick="delete_reply(${article_id}, ${comment_id}, ${reply_id})">삭제</button>`
                }
            }
        }
    }
}

// 대댓글 더보기
async function all_reply(comment_id) {
    let reply_box = document.getElementById(`reply_box${comment_id}`)
    if (reply_box.style.display == 'none') {
        reply_box.style.display = 'block';
    } else {
        reply_box.style.display = 'none';
    }
}

// 대댓글 작성 입력창 보기/숨기기
async function reply_create(comment_id) {
    let reply_create_box = document.getElementById(`reply_create_box${comment_id}`)
    if (reply_create_box.style.display == 'none') {
        reply_create_box.style.display = 'block';
    } else {
        reply_create_box.style.display = 'none';
    }
}

// 대댓글 작성
async function handleReplyCreate(article_id, comment_id) {
    let reply = document.getElementById(`reply${comment_id}`).value
    if (reply == ''){
        alert('답글을 입력 후 작성 버튼을 눌러주세요!')
        document.getElementById(`reply${comment_id}`).focus();
    } else {
        create_reply(article_id, comment_id, reply)
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
    if (author == nickname) {
        replace_article_update(article_id)
    } else {
        alert('게시글을 수정할 권한이 없습니다!')
        window.location.reload();
    }
}