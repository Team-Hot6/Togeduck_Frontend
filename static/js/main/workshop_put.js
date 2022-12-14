window.onload = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    let workshop_id = urlParams.get('id');
    const current_data = await workshop_info(workshop_id)

    hobby_category_list(current_data)
    location_category_list(current_data)
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
async function hobby_category_list(current_data) {
    const response = await hobby_get()

    if (response.status == 200) {
        data = await response.json()

        category_pick_box = document.getElementById("category_id")
        category_pick_box.innerHTML = ''

        for (i = 0; i < data.length; i++) {
            if (current_data.category == data[i]['category']) {
                const hobby = `<option value="${data[i]['id']}" selected>${data[i]['category']}</option>`;
                category_pick_box.insertAdjacentHTML("beforeend", hobby);
                continue;
            }
            const hobby = `<option value="${data[i]['id']}">${data[i]['category']}</option>`;
            category_pick_box.insertAdjacentHTML("beforeend", hobby);
        }
    }
}

// 모든 지역 카테고리 목록 출력
async function location_category_list(current_data) {
    const response = await location_get()

    if (response.status == 200) {
        data = await response.json()

        location_pick_box = document.getElementById("location_id")
        location_pick_box.innerHTML = ''

        for (i = 0; i < data.length; i++) {
            if (current_data.location == data[i]['district']) {
                const location = `<option value="${data[i]['id']}" selected>${data[i]['district']}</option>`;
                location_pick_box.insertAdjacentHTML("beforeend", location);
                continue;
            }
            const location = `<option value="${data[i]['id']}">${data[i]['district']}</option>`;
            location_pick_box.insertAdjacentHTML("beforeend", location);
        }
    }
}

async function workshop_info(workshop_id) {
    const response = await workshop_detail_get(workshop_id)
    data = await response.json()

    if (response.status == 200) {
        const content = document.getElementById("content");
        const workshop_image = document.getElementById("getval");
        const workshop_image_frame = document.getElementById("hvr-profile-img");
        const title = document.getElementById("title");
        const max_guest = document.getElementById("max_guest");
        const amount = document.getElementById("amount");
        const address = document.getElementById("member_addr"); //주소
        const address2 = document.getElementById("address"); // 상세주소
        const date = document.getElementById("date");

        title.value = data.title;
        content.value = data.content;
        max_guest.value = data.max_guest;
        amount.value = data.amount;
        workshop_image.setAttribute("src", `${back_end_url}${data.workshop_image}`);
        address2.value = data.address2;
        address.value = data.address;
        date.value = data.date;
    


        workshop_image_frame.style.opacity = 100;
        workshop_image_frame.innerHTML = `<input type="file" name="logo" id='getval' class="upload" accept="image/*" id="imag">
                                            <img class="workshop_img" id="temp_img" src=${back_end_url}${data.workshop_image}>`

        workshop_image.style.zIndex = 10;


        aaa = `<div class="hvr-profile-img" id="hvr-profile-img">
                    <input type="file" name="logo" id='getval' class="upload" accept="image/*" id="imag">
                    <div class="icon">
                        <div class="camera4"><span></span></div>
                    </div>
                </div>`


        // 업로드한 이미지 미리보기
        document.getElementById('getval').addEventListener('change', readURL, true);

        function readURL() {
            var file = document.getElementById("getval").files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                document.getElementById('temp_img').src = reader.result;
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {}
        }
    }
    return data
}