// 카테고리 목록 서버에서 가져옴
window.onload = async function LoadCategory() {
    const response = await get_hobby()
    const data = await response.json()
    
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
async function handleArticleCreate() {
    const category = document.getElementById('category').value
    const title = document.getElementById('title').value
    const content = editor.getHTML();

    if (category == '카테고리를 선택해주세요!'){
        alert('카테고리를 선택해주세요!')
        document.getElementById('category').focus();
    } 
    else if (title == ''){
        alert('글 제목을 입력해주세요!')
        document.getElementById('title').focus();
    } 
    else if (content == '<p><br></p>'){
        alert('글 내용을 입력해주세요!')
        editor.focus();
    } else {
        create_article(title, content, category)
    }
}

const {Editor} = toastui;
const {colorSyntax} = Editor.plugin;

const editor = new toastui.Editor({
    el: document.querySelector("#editor"),
    height: '500px',
    placeholder: '게시글의 내용을 입력해주세요.',
    initialValue: '',
    initialEditType: 'wysiwyg',
    plugins: [colorSyntax]
});