console.log('로딩됐나')



//로그인
async function handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const response = await fetch(`${back_end_url}/users/api/token/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    // aeccess, refresh
    const response_json = await response.json();

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
        alert("로그인 됐어욤");
        window.location.href = `${front_end_url}/templates/main/workshop.html`
    } else {
        //로그인 실패시
        alert("로그인 다시 확인해주세염");
    }
}

//로그아웃
async function handleIogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
}


//취미
window.onload = () => {
    show_tag_fuc() // backend에서 tag 가져오기
    alltag = new Array(); // 전체 테그 담을 리스트 선언
}


// tag 불러오는 함수
async function show_tag_fuc() {
    const response = await fetch(`${back_end_url}/workshops/hobby/`, {
            headers: {
                'content-type': 'application/json',
            },
            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        // Promise 안에 담긴 데이터 꺼내오기
        .then(data => {
            var tags = document.getElementById("all_tags ");
            for (i = 0; i < data.length; i++) {
                const pk = data[i]['id']
                const tag = document.createElement("button"); // 버튼 요소 생성
                tag.setAttribute("class", "mylabel"); // css class 지정
                tag.id = pk
                tag.setAttribute("onclick", "TagsPick(this.id)"); // 선택한 버튼 클릭 시 해당 함수 호출
                tag.innerText = data[i]['category']; // 버튼이름 값 지정
                tags.appendChild(tag)
            }
        });
}


// tag 값 목록으로 묶어주기
async function AllTagsPick(val) {
    if (alltag.includes(val)) {
        for (i = 0; i < alltag.length; i++) {
            if (alltag[i] == val) {
                alltag.splice(i, i);
                i--; // 해당 인덱스도 삭제
            }
        }
    } else {
        if (alltag.length == 3) {
            alert("4개 이상 tag를 선택할 수 없습니다.")
        } else {
            alltag.push(val);
        }
    }
}

// tag 버튼 값 가져오기
async function TagsPick(val) {
    AllTagsPick(val);
}



//회원가입
async function handleSign() {
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const nickname = document.getElementById("signUpNickname").value;



    if (email == "") {
        alert("이메일을 입력하세요.");
        email.focus();

        return false;
    }

    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 정규식

    if (!emailRule.test(email)) {
        alert("이메일 형식을 똑바로 입력하세요 ");
        email.focus();
        return false;
    }


    if (nickname == "") {
        alert("닉네임을 입력하세요.");
        nickname.focus();
        return false;
    }


    if (password == "") {
        alert("비밀번호를 입력하세요.");
        password.focus();
        return false;
    }


    var pwdCheck = /^(?=.*[!@#$%^*+=-])(?=.*[0-9]).{2,25}$/;

    if (!pwdCheck.test(password)) {
        alert("비밀번호는  숫자, 특수문자를 사용하여 2자리 이상으로 입력해줘요");
        password.focus();
        return false;
    }

    if (alltag == "") {
        alert("태그를 선택하세요.");
        return false;
    }


    const response = await fetch(`${back_end_url}/users/signup/`, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            email: email,
            nickname: nickname,
            password: password,
            hobby: alltag,
        }),
    })
    response_json = await response.json()

    if (response.status == 400) {

        if (response_json['email'] != null) {
            alert(`${response_json['email']}`)
        } else {
            alert(`${response_json['nickname']}`)
        }
    } else {
        alert("회원가입 성공 로그인 해주세요")
        window.location.reload()
    }
}


const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('id');


// 비밀번호 변경
async function change_Password(user_id) {

    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const old_password = document.getElementById("old_password").value;


    if (old_password == "") {
        alert("기존 비밀번호를 입력해주세요");
        password.focus();
        return false;
    }


    if (password == "") {
        alert("새로운 비밀번호를 입력하세요.");
        password.focus();
        return false;
    }

    if (password == old_password) {
        alert("현재 사용중인 비밀번호와 동일한 비밀번호를 사용할 수 없습니다");
        password.focus();
        return false;
    }


    var pwdCheck = /^(?=.*[!@#$%^*+=-])(?=.*[0-9]).{2,25}$/;

    if (!pwdCheck.test(password)) {
        alert("비밀번호는  숫자, 특수문자를 사용하여 2자리 이상으로 입력해줘요");
        password.focus();
        return false;
    }


    if (password2 == "") {
        alert(" 새로운 비밀번호를 확인해주세요.");
        password.focus();
        return false;
    }

    if (password2 != password) {
        alert(" 새로운 비밀번호와 동일하지 않습니다");
        password.focus();
        return false;
    }


    const response = await fetch(`${back_end_url}/users/change_password/${user_id}/`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
            'content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            password: password,
            password2: password2,
            old_password: old_password
        })
    })

    response_json = await response.json()

    if (response.status == 200) {
        alert('비밀번호를 변경했습니다')
        window.location.replace(`/templates/user/mypage.html?id=${user_id}`)


    } else if (response.status == 400) {

        alert(`${response_json['old_password']['old_password']}`)

    }
}