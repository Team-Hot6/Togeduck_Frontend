// 로그인 사용자 pk값 가져오기
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)

let token = localStorage.getItem("access")


// 개인정보 수정 - 마이페이지 부분 수정
async function change_mypage_profile(user_id) {
    const nickname = document.getElementById("profile_nickname_put").value;
    const email = document.getElementById("profile_email_put").value;
    const profile_image = document.getElementById("profile_image_put").files[0];

    const formData = new FormData();

    formData.append('nickname', nickname)
    formData.append('email', email)
    formData.append('profile_image', profile_image)

    const response = await fetch(`${back_end_url}/users/${payload_parse.user_id}/put/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        body: formData
    })
    if (response.status == 200) {
        alert("프로필 정보가 수정되었습니다.");
        window.location.replace(`${front_end_url}/templates/user/mypage.html?id=${user_id}`)
    } else {
        alert('프로필 정보를 다시 입력해주세요', response.status);
    }

}