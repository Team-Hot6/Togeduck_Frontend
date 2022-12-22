window.onload = () => {
    hobby_category_list()
    location_category_list()
}

// 워크샵 진행일시 선택 : 현 시점으로부터 과거 날짜 선택 붙가하도록 
var now_utc = Date.now() // 지금 날짜를 밀리초로
var timeOff = new Date().getTimezoneOffset()*60000; // getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환 -> 분단위를 밀리초로 변환
var today = new Date(now_utc-timeOff).toISOString().substring(0, 16); // new Date(today-timeOff).toISOString()은 '2022-05-11T18:09:38.134Z'를 반환
document.getElementById("date").setAttribute("min", today);

async function time_check() {
    let date_box = document.getElementById('date');
    let date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -5);
    if(date_box.value < date) {
        alert('시간을 다시 확인해주세요.');
        date_box.value = date;
    }
}

// 모든 취미 카테고리 목록 출력
async function hobby_category_list() {
    const response = await hobby_get()

    if (response.status == 200) {
        data = await response.json()

        category_pick_box = document.getElementById("category_id")
        category_pick_box.innerHTML = ''

        const temp = `<option value="0">취미 카테고리를 선택해주세요</option>`;
        category_pick_box.insertAdjacentHTML("beforeend", temp);

        for (i = 0; i < data.length; i++) {
            const hobby = `<option value="${data[i]['id']}">${data[i]['category']}</option>`;
            category_pick_box.insertAdjacentHTML("beforeend", hobby);
        }
    }
}

// 모든 지역 카테고리 목록 출력
async function location_category_list() {
    const response = await location_get()

    if (response.status == 200) {
        data = await response.json()

        location_pick_box = document.getElementById("location_id")
        location_pick_box.innerHTML = ''

        const temp = `<option value="0">지역을 선택해주세요</option>`;
        location_pick_box.insertAdjacentHTML("beforeend", temp);

        for (i = 0; i < data.length; i++) {
            const location = `<option value="${data[i]['id']}">${data[i]['district']}</option>`;
            location_pick_box.insertAdjacentHTML("beforeend", location);
        }
    }
}

// 업로드한 이미지 미리보기
function readURL() {
    var file = document.getElementById("imag").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById('profile-upload').style.backgroundImage = "url(" + reader.result + ")";
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {}
}

document.getElementById('imag').addEventListener('change', readURL, true);