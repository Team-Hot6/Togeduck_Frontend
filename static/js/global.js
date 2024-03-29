// 전역 변수 및 url을 가져오는 js 파일
// 전역변수는 어디서 사용하는지 적어주기


// const front_end_url ="http://127.0.0.1:5500"
//const back_end_url ="http://127.0.0.1:8000"
// const websocketBaseUrl = "ws://127.0.0.1:8000/ws/socket-server"


const front_end_url = "https://bluecomma.shop"
const back_end_url = "https://www.carrotww.shop"
const websocketBaseUrl = "wss://www.carrotww.shop/ws/socket-server"

// 전역 변수 부분
// chat 부분에서 소켓과 room_id 특정하기 위해 사용
let user_to_user_room_socket = undefined
let room_id = undefined
let receiver_id = undefined


function setCookie(key, value, miuntes) {
    let expire = new Date(); // 현재 시간
    expire.setMinutes(expire.getMinutes() + miuntes); // 현재 시간에 miuntes을 더해 만료시각을 지정

    let cookie_key = encodeURIComponent(key)
    let cookie_value = encodeURIComponent(value)
    let cookie_expire = expire.toUTCString()

    document.cookie = `${cookie_key}=${cookie_value}; expires=${cookie_expire}; path=/;`
}


function getCookie(key) {
    let cookie_key = key + "=";
    let all_cookies = decodeURIComponent(document.cookie).split('; ');
    let result;

    for (let i = 0; i < all_cookies.length; i++) {
        if (all_cookies[i].match(cookie_key)) {
            result = all_cookies[i];
            break
        }
    }
    result = result.slice(cookie_key.length, result.length);
    return result
};

// 네비바 로그아웃
async function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");

    kakao = localStorage.getItem("kakao");

    if (kakao == "True"){
        alert("소셜로그인 사용자")
    }

    window.location.href = `${front_end_url}/login_signup.html`
}

// 로그인 후 네비바 변경
async function navbar() {
    if (localStorage.getItem("payload")) {
        const payload = localStorage.getItem("payload");
        const payload_parse = JSON.parse(payload)
        const nickname = document.getElementById("nickname")
        nickname.innerText = `${payload_parse.nickname}님`

        const signup = document.getElementById("signup")
        signup.style.display = 'none';

        const login = document.getElementById("login")
        login.style.display = 'none';

        const nav_menu = document.getElementById("nav_menu")

        const mypage = `<li id="mypage" onclick="window.location.href='./mypage.html?id=${payload_parse.user_id}'">마이페이지</li>`
        nav_menu.insertAdjacentHTML("beforeend", mypage);

        const logout = `<li id="logout" onclick="logout()">로그아웃</li>`
        nav_menu.insertAdjacentHTML("beforeend", logout);
    };
};


// 네비바 공통적용
fetch("../../../navbar.html").then(response => {
    return response.text()
}).then(data => {
    document.querySelector("header").innerHTML = data
    navbar()
})


// 채팅창 공통적용
fetch("../../../chat.html").then(response => {
    return response.text()
}).then(data => {
    document.querySelector("chat").innerHTML = data
})


// access 토큰 유효기간 검증, 만료되었다면 연관 정보 삭제
async function access_check() {
    const payload = localStorage.getItem("payload");
    // payload가 없다면 함수 실행 중지
    if(!payload) {
        return
    }
    
    // payload가 없다면 현재 시각과 만료일 비교
    const payload_parse = JSON.parse(payload);
    let now = Date.now()/ 1000 | 0; // access 토큰 만료양식에 따라 단위 변환

    if(now > payload_parse.exp){
        localStorage.removeItem("payload");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }
};

access_check()