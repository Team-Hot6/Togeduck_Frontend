console.log('community.js 연결')
article_list()

async function article_list() {
    const response = await get_articles()
    const data = await response.json()

    for (let i = 0; i < data.length; i++){
        let id = data[i]['id']
        let title = data[i]['title']
        let comment = data[i]['comment_article']
        let user = data[i]['user']
        let date = data[i]['date']
        let time = data[i]['time']
        
        
        const a = document.getElementById('articles')
        const temp_html = `<li>
                            <div class="aaa">
                                <span>${id}</span>
                                <a href="">${title} [${comment}]</a>
                                
                                <span class="test"> ${date} ${time}</span>
                                <span class="test"> ${user}&nbsp</span>
                            </div>
                        </li>`
        const box = document.getElementById('article-box')
        box.insertAdjacentHTML('beforeend', temp_html)
        
        // const article_item = document.createElement('li')
        // const article_div = document.createElement('div')
        // const article_number = document.createElement('span')
        // const article_a = document.createElement('a')
        // const author = document.createElement('span')
        // const datetime = document.createElement('span')

        // article_item.append(article_div)
        // article_div.append(article_number)
        // article_number.append(id)
        // article_div.append(article_a)
        // article_a.append(title, `[${comment}]`)
        // article_div.append(author)
        // author.append(user)
        // article_div.append(datetime)
        // datetime.append(date, time)


        // const test = document.getElementById('article-box')
        // test.setAttribute('class', 'article')
        // test.append(article_div)

        // // article_item.setAttribute('style', 'list-style: none;')
        
        // console.log(article_item)
    }
    console.log(data)
}