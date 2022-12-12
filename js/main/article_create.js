function handleArticleCreate() {
    const category = document.getElementById('category').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const image = document.getElementById('formFile').files[0]
    
    create_article(title, content, image, category)
}