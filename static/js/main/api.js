// 로그인 된 사용자 정보 
const token = localStorage.getItem("access");

var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    document.cookie = `${name}=bar; SameSite=None; Secure`;
};

var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

var deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

// 로그인 하는 로직
async function sign_in() {
    const email = document.getElementById("login_id").value
    const password = document.getElementById("login_password").value
    
    const response = await fetch(`${back_end_url}/users/api/token/`, {
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
async function get_articles(page, sort) {
    const response = await fetch(`${back_end_url}/articles/?page=${page}&sort=${sort}`, {
        method: "GET",
    })
    return response
}

// 인기 게시글 10 목록
async function get_lank_articles() {
    const response = await fetch(`${back_end_url}/articles/lank/`, {
        method: "GET",
    })
    return response
}

// 카테고리 선택 시 해당 카테고리 게시글 리스트 API
async function get_select_articles(category_id, page, sort) {
    const response = await fetch(`${back_end_url}/articles/?category=${category_id}&page=${page}&sort=${sort}`, {
        method: "GET",
    })

    return response
}

// 게시글 상세 페이지 이동 //
function replace_article_detail(article_id) {
    const url = `article_detail.html?id=${article_id}`;
    location.href = url;
}

// https://stackoverflow.com/questions/71288955/drf-set-cookie-does-not-work-when-frontend-is-on-localhost-and-backend-is-on-a-r
// #################################################################쿠키쿠키쿠키쿠키쿠키쿠키
// 게시글 상세 페이지의 API 호출하여 특정 게시글 데이터 요청
async function get_article_detail(article_id) {
    let article_view_str = getCookie('article_views')
    if (article_view_str) {
        let article_view_array = article_view_str.split(',')
        if (article_view_array.includes(article_id)) {
            console.log('있음')
        }
        else {
            console.log('없음')
            article_view_str += `,${article_id}`
            setCookie('article_views', article_view_str, 1)
        }
    }
    else {
        article_view_str = article_id
        setCookie('article_views', article_view_str, 1)
    }

    // deleteCookie('article_views')
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
async function create_article(title, content, category) {
    const data = new FormData()
    data.append("category", category)
    data.append("title", title)
    data.append("content", content)

    const response = await fetch(`${back_end_url}/articles/create/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: data,
    });

    if (response.status == 201) {
        window.location.href = 'community.html'
        alert('작성 완료!!')
    } else if (response.status == 401) {
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
    } else if (response.status == 401) {
        alert("댓글 작성은 로그인이 필요한 서비스 입니다!")
        window.location.reload()
    } else {
        alert("잘못된 요청입니다!")
    }
}

// 대댓글 작성 API
async function create_reply(article_id, comment_id, reply){
    const response = await fetch(`${back_end_url}/articles/${article_id}/comment/${comment_id}/reply/`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem('access'),
        },
        method: "POST",
        body: JSON.stringify({
            "content": reply,
        }),
    });
    
    if (response.status == 201){
        alert('답글 작성 완료!')
        window.location.reload();
    } else if(response.status == 401){
        alert('답글 작성은 로그인이 필요한 서비스 입니다!')
        window.location.reload();
    } else {
        alert('잘못된 요청입니다!')
        window.location.reload();
    }
}

// 게시글 수정 페이지로 이동
async function replace_article_update(article_id) {
    const url = `article_update.html?id=${article_id}`;
    location.href = url;
}

// 게시글 수정 API
async function update_article(article_id, title, content, category) {
    const data = new FormData()
    data.append("category", category)
    data.append("title", title)
    data.append("content", content)

    const response = await fetch(`${back_end_url}/articles/${article_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "PUT",
        body: data,
    });

    if (response.status == 201){
        alert('수정 완료!!')
        window.location.replace(`article_detail.html?id=${article_id}`);
    } else if(response.status == 403){
        alert('게시글을 수정할 권한이 없습니다!')
        window.location.replace(`article_detail.html?id=${article_id}`);
    } else {
        alert('잘못된 요청입니다!')
        window.location.reload();
    }
}

// 게시글 삭제 API
async function delete_article(article_id) {
    const response = await fetch(`${back_end_url}/articles/${article_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });
    if (response.status == 200){
        alert('삭제 완료!')
        window.location.replace(`community.html`);
    } else if (response.status == 403){
        alert('게시글을 삭제할 권한이 없습니다!')
        window.location.reload();
    } else{
        alert('잘못된 요청입니다!')
        window.location.reload();
    }
}

// 댓글 삭제 API
async function delete_comment(article_id, comment_id) {
    const response = await fetch(`${back_end_url}/articles/${article_id}/comment/${comment_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if (response.status == 200){
        alert('삭제 완료!')
        window.location.reload()
    }else if(response.status == 403){
        alert('댓글을 삭제할 권한이 없습니다!')
        window.location.reload()
    }else {
        alert('잘못된 요청입니다!')
        window.location.reload()
    }
}

// 대댓글 삭제 API
async function delete_reply(article_id, comment_id, reply_id) {
    const response = await fetch(`${back_end_url}/articles/${article_id}/comment/${comment_id}/reply/${reply_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if (response.status == 200){
        alert('삭제 완료!')
        window.location.reload()
    }else if(response.status == 403){
        alert('댓글을 삭제할 권한이 없습니다!')
        window.location.reload()
    }else {
        alert('잘못된 요청입니다!')
        window.location.reload()
    }
}

// 게시글 추천하기 API
async function like_article(article_id) {
    const response = await fetch(`${back_end_url}/articles/${article_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
    })
    const response_json = await response.json()
    if (response.status == 401){
        alert('로그인이 필요합니다!')
        window.location.reload();
    } else if (response_json["msg"] == "추천"){
        alert('게시글 추천 완료')
        window.location.reload();
    } else if(response_json["msg"] == "취소"){
        alert('게시글 추천 취소')
        window.location.reload();
    }
}