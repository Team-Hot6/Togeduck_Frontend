console.log('article detail JS 로딩 확인')


// 현재 URL의 쿼리스트링 값을 가져옴
const url_str = window.location.search
// url_str의 URLSearchParams 객체를 생성
const urlParams = new URLSearchParams(url_str);
// URLSearchParams 객체에서 id 값 추출
const article_id = urlParams.get("id");

// 해당 id 값의 게시글 데이터를 전달받아 html 생성
async function LoadDeatail(article_id) {
    const response = await get_article_detail(article_id)
    const data = await response.json()

    const title = document.getElementById('article_title')
    title.innerText = data['title']

    const author = document.getElementById('author_info')
    author.innerText = data['user'] + data['date'] + data['time']
    
    const views = document.getElementById('views')
    views.innerText = '조회수 : ' + data['views']
    
    // like를 innerText 적용 시 에러 발생 str, number 문제는 아님!!
    const likes = document.getElementById('likes')
    likes.innerText = '추천수 : ' + data['like']
    
    const article_image = document.getElementById('article_image')
    article_image.innerText = `${backend_base_url}data['article_image']`

    console.log(data)
}

LoadDeatail(article_id)