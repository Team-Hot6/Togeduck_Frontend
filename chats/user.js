// user 목록을 출력하는 로직
async function send_chat_button() {
    const response = await fetch('http://127.0.0.1:8000/chats/users/', {
            // headers:{
            //     "Authorization":"Bearer "+localStorage.getItem("access")
            // },
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })

    // 
    for (i = 0; i < response.length; i++) {
        var user_list_div = document.getElementById("create_user_list_button")
        const user_id = response[i]['id']
        const user_email = response[i]['email']

        const user_button = document.createElement("Button")
        user_button.className = "user_id" // css 이름
        user_button.setAttribute("onclick", "connect_user_chat_room()")
        user_button.value = user_id
        user_button.innerText = user_email

        user_list_div.appendChild(user_button);
    }
}

// 로그인 하는 로직
async function sign_in() {
    const email = document.getElementById("login_id").value
    const password = document.getElementById("login_password").value
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

    localStorage.setItem("access", response_json.access); //로컬스토리지에 access 토큰 저장
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1]; // access토큰의 두번째 요소인 Payload 정보만 취함
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload); // Payload를 로컬스토리지에 저장
};