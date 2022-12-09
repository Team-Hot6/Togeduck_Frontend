console.log('community.js 연결')

article_list()
hobby_list()

// 전체 카테고리의 게시글 목록
async function article_list() {
    const response = await get_articles()
    const data = await response.json()

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
                            <td align="left"><a href="">${title} [${comment}]</a></td>
                            <td>${user}</td>
                            <td>${date}</td>
                            <td>${time}</td>
                            <td>${like}</td>
                            <td>${views}</td>
                        </tr>`
        const article_list = document.getElementById('article_list')
        article_list.insertAdjacentHTML('beforeend', article)
    }

    // 게시글 베스트 TOP 10 (백엔드 view 작성 후 대체 예정)
    // sort 함수를 사용하여 dictionary list의 객체를 like 내림차순 정렬
    data.sort(function (a, b) {
        return b.like - a.like;
    });

    for (let i = 0; i < 10; i++) {
        let id = data[i]['id']
        let title = data[i]['title']
        let comment = data[i]['comment_article']
        let category = data[i]['category']
        let user = data[i]['user']
        let date = data[i]['date']
        let time = data[i]['time']
        let like = data[i]['like']
        let views = data[i]['views']

        const best_article = `<tr>
                            <td>${id}</td>
                            <td>${category}</td>
                            <td align="left"><a href="">${title} [${comment}]</a></td>
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
        const hobby = `<button type="button" class="hobby" onclick="select_article_list(${data[i]['id']})">${data[i]['category']}</button>`;
        
        hobbys = document.getElementById("hobbys")
        hobbys.insertAdjacentHTML("beforeend", hobby);
    }
}

// 선택한 카테고리의 게시글 목록
async function select_article_list(category_id) {
    const response = await get_select_articles(category_id)
    const data = await response.json()

    // 선택한 카테고리의 게시글이 없는 경우
    if (data.length == 0){
        let best_article_box = document.getElementById('best_article_box')
        best_article_box.innerHTML = `<span class="fs-3 fw-bold" id="testspan">해당 카테고리의 게시글이 없습니다!</span>`

        let article_list = document.getElementById('article_list')
        article_list.innerHTML = ``
        
        let article_box = document.getElementById('article_box')
        article_box.style.display = 'none';
    } else {
        // BEST 10 게시글 지우기
        let best_article_box = document.getElementById('best_article_box')
        best_article_box.innerHTML = ``

        // 카테고리 별 게시글의 table body 비우기
        const article_list = document.getElementById('article_list')
        article_list.innerHTML = ``

        let sss = document.getElementById('article_box')
        sss.style.display = 'block';
        
        for (let i = 0; i < data.length; i++){
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
                                    <td align="left"><a href="">${title} [${comment}]</a></td>
                                    <td>${user}</td>
                                    <td>${date}</td>
                                    <td>${time}</td>
                                    <td>${like}</td>
                                    <td>${views}</td>
                                </tr>`
            // 카테고리 별 게시글의 table body에 선택한 카테고리의 게시글만 다시 넣기
            article_list.insertAdjacentHTML('beforeend', select_articles)
        }
    }
}