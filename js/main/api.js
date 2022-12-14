// 로그인 된 사용자 정보 
const token = localStorage.getItem("access");

// 로그인 하는 로직
async function sign_in() {
    const email = document.getElementById("login_id").value
    const password = document.getElementById("login_password").value
    console.log(email)
    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    });

    const response_json = await response.json();

    console.log(response_json);
    console.log('login success')

    localStorage.setItem("access", response_json.access); //로컬스토리지에 access 토큰 저장
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1]; // access토큰의 두번째 요소인 Payload 정보만 취함
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload); // Payload를 로컬스토리지에 저장
    alert('로그인 성공!')
    window.location.reload()
};

//로그아웃
async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert('로그아웃 되었습니다!')
    window.location.reload()
}

// 카테고리 목록 API
async function get_hobby() {
    const response = await fetch(`${back_end_url}/workshops/hobby/`, {
        method: "GET",
    })
    return response
}

// 게시글 전체 목록 API
async function get_articles() {
    const response = await fetch(`${back_end_url}/articles/`, {
        method: "GET",
    })
    return response
}

async function get_lank_articles() {
    const response = await fetch(`${back_end_url}/articles/lank/`, {
        method: "GET",
    })
    return response
}

// 카테고리 선택 시 해당 카테고리 게시글 리스트 API
async function get_select_articles(category_id) {
    const response = await fetch(`${back_end_url}/articles/?category=${category_id}`, {
        method: "GET",
    })
    return response
}

// 게시글 상세 페이지 이동 //
function replace_article_detail(article_id) {
    const url = `article_detail.html?id=${article_id}`;
    location.href = url;
}

// 게시글 상세 페이지의 API 호출하여 특정 게시글 데이터 요청
async function get_article_detail(article_id) {
    const response = await fetch(`${back_end_url}/articles/${article_id}/`, {
        method: "GET",
    })
    return response
}

// 게시글 상세 페이지의 댓글 API
async function get_article_detail_comment(article_id) {
    const response = await fetch(`${back_end_url}/articles/${article_id}/comment/`, {
        method: "GET",
    })
    return response
}

// 게시글 작성 API
async function create_article(title, content, image, category) {
    const data = new FormData()
    data.append("category", category)
    data.append("title", title)
    data.append("content", content)
    data.append("article_image", image)

    const response = await fetch(`${back_end_url}/articles/create/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: data,
    });

    if (response.status == 201){
        alert('작성 완료!!')
        window.location.replace(`community.html`)
    } else if(response.status == 401){
        alert('다시 로그인을 해주세요!')
    } else {
        alert('잘못된 요청입니다!')
    }
}

// 댓글 작성 API
async function create_comment(article_id, comment) {
    const response = await fetch(`${back_end_url}/articles/${article_id}/comment/`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: JSON.stringify({
            "content": comment,
        }),
    });

    if (response.status == 201) {
        alert("댓글 작성 완료!")
        window.location.reload()
    } else if(response.status == 401) {
        alert("댓글 작성은 로그인이 필요한 서비스 입니다!")
        window.location.reload()
    } else {
        alert("잘못된 요청입니다!")
    }
}