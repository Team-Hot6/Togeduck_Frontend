console.log('api.js 연결')

// 전역 변수 - global.js로 이동할 예정
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5000"

// 로그인 된 사용자 정보 
const token = localStorage.getItem("access");

// 카테고리 목록 API
async function get_hobby() {
    const response = await fetch(`${backend_base_url}/workshops/hobby/`, {
        method: "GET",
    })
    return response
}

// 게시글 전체 목록 API
async function get_articles() {
    const response = await fetch(`${backend_base_url}/articles/`, {
        method: "GET",
    })
    return response
}

// 게시글 작성하기 버튼 API
function handleArticleCreate(){
    console.log('게시글 작성 버튼')
    if (token){
        // 게시글 작성 페이지로 이동
        // window.location.replace(`${frontend_base_url}/templates/community.html/`)
    } else {
        alert('게시글 작성은 로그인 된 사용자만 가능합니다!')
    }
}

// 카테고리 선택 시 해당 카테고리 게시글 리스트 API
async function get_select_articles(category_id) {
    const response = await fetch(`${backend_base_url}/articles/?category=${category_id}`, {
        method: "GET",
    })
    return response
}