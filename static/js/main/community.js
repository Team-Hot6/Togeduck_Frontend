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
    article_list.innerHTML = ''

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

    // 게시글 베스트 TOP 10 (백엔드 view 작성 후 대체 예정)
    // sort 함수를 사용하여 dictionary list의 객체를 like 내림차순 정렬
    const response_lank = await get_lank_articles()
    const data_lank = await response_lank.json()

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


// 카테고리 목록
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
    sort_btn.innerHTML = ''
    sort_btn.insertAdjacentHTML('beforeend', temp_html)
    
    const response = await get_select_articles(category_id, sort)
    const response_json = await response.json()
    const data = response_json['results']

    // 선택한 카테고리의 게시글이 없는 경우
    if (data.length == 0) {
        let best_article_box = document.getElementById('best_article_box')
        best_article_box.innerHTML = `<div class="none_box" id="none_box">선택하신 카테고리의 게시글이 없습니다</div>`

        let article_list = document.getElementById('article_list')
        article_list.innerHTML = ``

        let article_box = document.getElementById('article_box')
        article_box.style.display = 'none';
    } else {
        // BEST 10 게시글 지우기
        let best_article_box = document.getElementById('best_article_box')
        console.log("best_article_box",best_article_box)
        best_article_box.innerHTML = ``

        // 카테고리 별 게시글의 table body 비우기
        const article_list = document.getElementById('article_list')
        article_list.innerHTML = ``

        let sss = document.getElementById('article_box')
        sss.style.display = 'block';

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
                // <td align="left"><a onclick="article_detail(${id})" href="">${title} [${comment}]</a></td>

            // 카테고리 별 게시글의 table body에 선택한 카테고리의 게시글만 다시 넣기
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