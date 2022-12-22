function firstRnder() {
    const sayHiElement = document.querySelector('.sayHi')
    const storageMemory = localStorage.getItem('MemoryAccount')
    let status = localStorage.getItem('status');
    !status && localStorage.setItem('status', 'login')
    if (storageMemory) {
        sayHiElement.textContent = storageMemory
    }
    changePage()
}

function changePage(e) {
    const yellowBox = document.querySelector('.yellowbox')
    const lightblueBox = document.querySelector('.lightbluebox')
    const helloContent = document.querySelector('.hello')
    const wlecome = document.querySelector('.welcome')
    const loginBox = document.querySelector('.login-box')
    const singUpBox = document.querySelector('.signup-box')
    let status = localStorage.getItem('status')

    function addClass() {
        lightblueBox.classList.add('right')
        yellowBox.classList.add('left')
        helloContent.classList.add('InBoxRight')
        wlecome.classList.add('InBoxRight')
        loginBox.classList.add('InBoxRight')
        singUpBox.classList.add('InBoxRight')
    }

    function removeClass() {
        lightblueBox.classList.remove('right')
        yellowBox.classList.remove('left')
        helloContent.classList.remove('InBoxRight')
        wlecome.classList.remove('InBoxRight')
        loginBox.classList.remove('InBoxRight')
        singUpBox.classList.remove('InBoxRight')
    }

    if (!e && status === 'signup') {
        addClass()
    } else if (e && status === 'signup') {
        removeClass()
        localStorage.setItem('status', 'login')
    } else if (e) {
        addClass()
        localStorage.setItem('status', 'signup')
    }
}

window.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.signup-btn')
    const signUpBtn = document.querySelector('#signUpBtn')
    const loginBtn = document.querySelector('#loginBtn')
    const logOutLink = document.querySelector('#logout')

    firstRnder()

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            changePage(e)
        })
    })
})

window.Kakao.init("f04d6d9992136b1c2b45358537926d29");

function kakao_login() {
    window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email, profile_image',
        success: function (authObj) {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res => {
                    kakaoAccount = res.kakao_account;
                    kakaoUserData = {
                        'email': kakaoAccount['email'],
                        'nickname': kakaoAccount['profile']['nickname'],
                        'profile_image': kakaoAccount['profile']['image']
                    }
                    console.log(authObj)
                    kakaoLoginApi(kakaoUserData)
                },
                fail: res => {
                    console.log('카카오 로그인 실패')
                }
            });
        }
    });
}

// 소셜 유저 회원가입위해 카카오 유저 정보(이메일, 닉네임) 백엔드로 보내주기
async function kakaoLoginApi(kakaoUserData) {

    const response = await fetch(`${back_end_url}/users/kakao/callback/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(kakaoUserData),
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        // PAYLOAD
        const accessToken = response_json.access;
        const base64Url = accessToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split("")
            .map(function(c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        localStorage.setItem("payload", jsonPayload);
        alert("로그인 완료");
        window.location.href = `${front_end_url}/workshop.html`
    
    } else {
        //로그인 실패시
        alert("회원 정보를 다시 확인해주세요");
    }
}