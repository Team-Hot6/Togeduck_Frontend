// 현재 URL의 쿼리스트링 값을 가져옴
const url_str = window.location.search
// url_str의 URLSearchParams 객체를 생성
const urlParams = new URLSearchParams(url_str);
// URLSearchParams 객체에서 id 값 추출
const article_id = urlParams.get("id");

LoadCurrentArticle(article_id)
// 현재 작성되어 있는 게시글 정보를 가져와서 보여줌
async function LoadCurrentArticle(article_id) {
    const response = await get_article_detail(article_id)
    const data = await response.json()

    const selected_category = document.getElementById('selected_category')
    selected_category.innerText = data['category']

    const title = document.getElementById('title')
    title.setAttribute('placeholder',data['title'])

    const content = document.getElementById('content')
    content.setAttribute('placeholder', data['content'])

    const article_image = document.getElementById('formFile')
    article_image.setAttribute('placeholder', data['article_image'])
}

// 게시글 수정
async function handleArticleUpdate(article_id) {
    const category = document.getElementById('category').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const image = document.getElementById('formFile').files[0]

    update_article(article_id, title, content, image, category)
}