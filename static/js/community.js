console.log('community.js 연결')

// 
window.onload = async function article_list() {
    const response = await get_articles()
    const data = await response.json()

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

    // sort 함수를 사용하여 dictionary list의 객체를 like 내림차순 정렬
    data.sort(function(a, b) {
        return b.like - a.like; 
    });
    
    for (let i = 0; i < 10; i++){
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