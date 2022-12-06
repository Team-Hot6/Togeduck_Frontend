
console.log('로딩됐나')

//회원가입
async function handleSign() {
  console.log('회원가입버튼 눌러짐!?!?!?')
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const nickname = document.getElementById("signUpNickname").value;
  const hobby = document.getElementById("signUpHobby").value;
  console.log(email, password,nickname,hobby);

  const response = await fetch("http://127.0.0.1:8000/users/signup/", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email, 
      nickname: nickname,
      password: password,
      hobby: hobby,

    }),
  });

  console.log('왜 안 돼;ㅅ;ㅅ;ㅅ;ㅅ;ㅅ;ㅅ',response);
  if (response.status == 200) {
    alert("회원가입 성공");
    window.location.href = "http://127.0.0.1:5500/login.html";
  }
}

//로그인
async function handleLogin() {
  console.log("버튼 눌러짐"); //버튼확인
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  console.log(email, password); // 이메일,패스워드 되는지 확인

  const response = await fetch("http://127.0.0.1:8000/users/api/token/", {
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

  console.log(response_json);
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
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    localStorage.setItem("payload", jsonPayload);
    alert("로그인 됐어욤");
    window.location.href = "http://127.0.0.1:5500/main.html";
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
    const response = await fetch('http://127.0.0.1:8000/hobby/', {
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

            console.log(data) // tag 목록 확인
            var tags = document.getElementById("all_tags ");
            for (i = 0; i < data.length; i++) {
                const tag = document.createElement("button"); // 버튼 요소 생성
                tag.setAttribute("class", "mylabel"); // css class 지정
                tag.setAttribute("onclick", "TagsPick(this.innerText)"); // 선택한 버튼 클릭 시 해당 함수 호출
                tag.innerText = data[i]['category']; // 버튼이름 값 지정
                // tags.appendChild(tag) // all_tags 안에 tag 추가
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
        if (alltag.length == 5) {
            alert("6개 이상 tag를 선택할 수 없습니다.")
        } else {
            alltag.push(val);
        }
    }
}

// tag 버튼 값 가져오기
async function TagsPick(val) {
    AllTagsPick(val);
}


// 테그들 목록 백엔드로 POST 전달 <확인버튼>
async function AllTagPost() {
    var str = ""
    for (i = 0; i < alltag.length; i++) {
        if (i == alltag.length - 1) {
            str += alltag[i]
        } else {
            str += alltag[i] + ","
        }
    }

    const music_data = await fetch('http://127.0.0.1:8000/music_search/', {

        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({

            "category": str
        })
    }).then((response) => { return response.json() })

    // local storage 방식으로 데이터 저장 후 다른 페이지로 넘겨줄
    localStorage.setItem('tempdata', JSON.stringify(music_data))
    var temp = JSON.parse(localStorage.getItem('tempdata'));

    // goto_reco_page() 다른 페이지로 이동
    move_page('recommend.html')

}

// 원하는 페이지로 이동하는 함수
function move_page(page) {
    window.location.href = page
}