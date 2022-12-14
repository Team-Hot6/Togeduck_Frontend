// 카테고리 목록 서버에서 가져옴
window.onload = async function LoadCategory() {
    console.log('teststest')
    const response = await get_hobby()
    const data = await response.json()

    console.log(data)
    
    for (let i = 0; i < data.length; i++) {
        let num = data[i]['id']
        let category = data[i]['category']

        let category_list = document.getElementById('category')
        let hobby = document.createElement('option')
        hobby.setAttribute('value', num)
        hobby.innerText = category

        category_list.appendChild(hobby)
    }
}

// 게시글 작성 버튼
function handleArticleCreate() {
    const category = document.getElementById('category').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const image = document.getElementById('formFile').files[0]
    
    create_article(title, content, image, category)
}