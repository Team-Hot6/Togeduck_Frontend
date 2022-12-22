// 현재 URL의 쿼리스트링 값을 가져옴
const url_str = window.location.search
// url_str의 URLSearchParams 객체를 생성
const urlParams = new URLSearchParams(url_str);
// URLSearchParams 객체에서 id 값 추출
const article_id = urlParams.get("id");

LoadCurrentArticle(article_id)
// 현재 작성되어 있는 게시글 정보를 서버에서 가져와서 placeholder에 삽입
async function LoadCurrentArticle(article_id) {
    const response = await get_article_detail(article_id)
    const data = await response.json()

    const title = document.getElementById('title')
    title.value = data['title']

    const content = document.getElementById('content')
    content.value = data['content']

    const article_image = document.getElementById('formFile')
    article_image.setAttribute('placeholder', data['article_image'])
}

// 카테고리 목록 서버에서 가져옴
window.onload = async function LoadCategory() {
    var response = await get_article_detail(article_id)
    const current_data = await response.json()
    
    let selected_category = current_data['category']
    let selected_category_id = current_data['category_id']

    var response = await get_hobby()
    const data = await response.json()
    
    for (let i = 0; i < data.length; i++) {
        let num = data[i]['id']
        let category = data[i]['category']

        if (selected_category == category){
            let category_list = document.getElementById('category')
            var hobby = document.createElement('option')
            hobby.setAttribute('value', selected_category_id)
            hobby.setAttribute('selected', 'selected')
            hobby.innerText = selected_category
            category_list.appendChild(hobby)
            continue;
        }
        let category_list = document.getElementById('category')
        var hobby = document.createElement('option')
        hobby.setAttribute('value', num)
        hobby.innerText = category
        category_list.appendChild(hobby)
    }
}

// 게시글 수정
function handleArticleUpdate(article_id) {
    const category = document.getElementById('category').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const image = document.getElementById('formFile').files[0]

    update_article(article_id, title, content, image, category)
}

// 게시글 수정 페이지 취소 버튼
function handleCancel() {
    window.location.replace(`article_detail.html?id=${article_id}`)
}