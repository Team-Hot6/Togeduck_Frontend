window.onload = async() => {
    article_list()
    hobby_list()
}

// 전체 카테고리의 게시글 목록
async function article_list(sort, category_id) {
    const response = await get_articles(sort, category_id)
    const response_json = await response.json()
    const data = response_json['results']
    
    const article_list = document.getElementById('article_list')
    article_list.innerHTML = ``

    for (let i = 0; i < data.length; i++) {
        let id = data[i]['id']
        let title = data[i]['title']
        let comment = data[i]['comment_article']
        let category = data[i]['category']
        let user = data[i]['user']
        let date = data[i]['date']
        let time = data[i]['time']
        let like = data[i]['like']
        let views = data[i]['views']

        const article = `<tr>
                            <td>${id}</td>
                            <td>${category}</td>
                            <td align="left" id="article_id" onclick="replace_article_detail(${id})">${title} [${comment}]</td>
                            <td>${user}</td>
                            <td>${date}</td>
                            <td>${time}</td>
                            <td>${like}</td>
                            <td>${views}</td>
                        </tr>`
                        
        article_list.insertAdjacentHTML('beforeend', article)
    }

    // 게시글 베스트 TOP 10
    const response_lank = await get_lank_articles()
    const data_lank = await response_lank.json()

    best_article_list.innerHTML = ``

    for (let i = 0; i < 10; i++) {
        let id = data_lank[i]['id']
        let title = data_lank[i]['title']
        let comment = data_lank[i]['comment_article']
        let category = data_lank[i]['category']
        let user = data_lank[i]['user']
        let date = data_lank[i]['date']
        let time = data_lank[i]['time']
        let like = data_lank[i]['like']
        let views = data_lank[i]['views']

        const best_article = `<tr>
                            <td>${id}</td>
                            <td>${category}</td>
                            <td align="left" id="article_id" onclick="replace_article_detail(${id})">${title} [${comment}]</td>
                            <td>${user}</td>
                            <td>${date}</td>
                            <td>${time}</td>
                            <td>${like}</td>
                            <td>${views}</td>
                        </tr>`

        const best_article_list = document.getElementById('best_article_list')
        best_article_list.insertAdjacentHTML('beforeend', best_article)
    }
}


// 취미 카테고리 목록
async function hobby_list() {
    const response = await get_hobby()
    const data = await response.json()

    for (let i = 0; i < data.length; i++) {
        const hobby = `<button type="button" class="hobby" onclick="select_article_list(${data[i]['id']}, '')">${data[i]['category']}</button>`;

        hobbys = document.getElementById("hobbys")
        hobbys.insertAdjacentHTML("beforeend", hobby);
    }
}

// 선택한 카테고리의 게시글 목록
async function select_article_list(category_id, sort) {
    const sort_btn = document.getElementById('sort_btn')
    temp_html = `<span class="sort" id="latest" onclick="select_article_list(${category_id}, 'latest')">최신순</span>
                <span class="sort" id="like" onclick="select_article_list(${category_id}, 'like')">인기순</span>`
    sort_btn.innerHTML = ``
    sort_btn.insertAdjacentHTML('beforeend', temp_html)
    
    const response = await get_select_articles(category_id, sort)
    const response_json = await response.json()
    const data = response_json['results']

    // 선택한 카테고리의 게시글이 없는 경우
    if (data.length == 0) {
        let article_box = document.getElementById('article_box')
        article_box.style.display = 'none';
        
        let notice = document.getElementById('notice')
        let temp = `<h1>해당 카테고리의 게시글이 없습니다!</h1>` 
        notice.innerHTML = temp 
    } else {
        const article_list = document.getElementById('article_list')
        article_list.innerHTML = ``

        let article_box = document.getElementById('article_box')
        article_box.style.display = 'block';

        let notice = document.getElementById('notice')
        notice.innerHTML = ``

        for (let i = 0; i < data.length; i++) {
            let id = data[i]['id']
            let title = data[i]['title']
            let comment = data[i]['comment_article']
            let category = data[i]['category']
            let user = data[i]['user']
            let date = data[i]['date']
            let time = data[i]['time']
            let like = data[i]['like']
            let views = data[i]['views']

            select_articles = `<tr>
                                    <td>${id}</td>
                                    <td>${category}</td>
                                    <td align="left" id="article_id" onclick="replace_article_detail(${id})">${title} [${comment}]</td>
                                    <td>${user}</td>
                                    <td>${date}</td>
                                    <td>${time}</td>
                                    <td>${like}</td>
                                    <td>${views}</td>
                                </tr>`

            article_list.insertAdjacentHTML('beforeend', select_articles)
        }
    }
}

// 게시글 작성하기 페이지로 이동(LocalStorage에 access토큰이 유효한 경우)
function ArticleCreatePage() {
    if (token) {
        window.location.replace(`article_create.html`)
    } else {
        alert('게시글 작성은 로그인 된 사용자만 가능합니다!')
    }
}