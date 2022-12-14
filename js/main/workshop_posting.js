window.onload = () => {
    hobby_category_list()
    location_category_list()
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



////////////////////////////////////////////////////////////



// 업로드한 이미지 미리보기
document.getElementById('getval').addEventListener('change', readURL, true);

function readURL() {
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById('profile-upload').style.backgroundImage = "url(" + reader.result + ")";
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {}
}