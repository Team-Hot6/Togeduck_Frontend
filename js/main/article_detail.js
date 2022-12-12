console.log('article detail JS 로딩 확인')


// 현재 URL의 쿼리스트링 값을 가져옴
const url_str = window.location.search
// url_str의 URLSearchParams 객체를 생성
const urlParams = new URLSearchParams(url_str);
// URLSearchParams 객체에서 id 값 추출
const article_id = urlParams.get("id");
LoadDeatail(article_id)


// 해당 id 값의 게시글 데이터를 전달받아 html 생성
async function LoadDeatail(article_id) {
    const response = await get_article_detail(article_id)
    const data = await response.json()

    const title = document.getElementById('article_title')
    title.innerText = data['title']

    const author = document.getElementById('author_info')
    author.innerText = data['user'] + data['date'] + data['time']
    
    const views = document.getElementById('views')
    views.innerText = '조회수 : ' + data['views']
    
    const likes = document.getElementById('likes')
    likes.innerText = '추천수 : ' + data['like']
    
    const article_image = document.getElementById('article_image')
    article_image.src = `${backend_base_url}`+data['article_image']
    // article_image.setAttribute('src', `${backend_base_url}`+data['article_image'])

    const content = document.getElementById('content')
    content.innerText = data['content']
    console.log(data)
}

LoadDeatail_comment(article_id)
async function LoadDeatail_comment(article_id) {
    const response = await get_article_detail_comment(article_id)
    const data = await response.json()
    
    for (let i = 0; i < data.length; i++) {
        let nickname = data[i]['user']
        let comment = data[i]['content']
        let date = data[i]['created_at'].replace('T', ' ').substr(5,5);
        let time = data[i]['created_at'].replace('T', ' ').substr(11,8);

        const comment_list = document.getElementById('comment_list')
        let temp_html = `<li>
                            <div class="comment-info d-flex">
                                <div class="nickname-box">
                                    <span>${nickname}</span>
                                </div>
                                <div class="comment-box">
                                    <p>${comment}</p>
                                </div>
                                <div class="created_at">
                                    <span>${date}</span>
                                    <span>${time}</span>
                                </div>
                                <div class="delete_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                        </li>`
        comment_list.insertAdjacentHTML('beforeend',temp_html)
    }
}



