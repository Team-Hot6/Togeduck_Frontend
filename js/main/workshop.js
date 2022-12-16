window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get('page');
    if (page == null) {
        page = 1
    }
    workshop_list(page)
    hobby_list()
    workshop_popular_list()
}


// 베스트 워크샵 목록 출력
async function workshop_popular_list() {
    const response = await workshop_popular_get()

    if (response.status == 200) {
        data = await response.json()

        popular_workshops_wrap = document.getElementById("popular_workshops_wrap")

        for (i = 0; i < data.length; i++) {

            const popular_workshop = `<div class="popular_workshop" id="popular_workshop" onclick="workshop_detail_move(${data[i]['id']})">
                                            <div class="popular_workshop_img_frame">
                                                <img class="popular_workshop_img" src="${back_end_url}${data[i]['workshop_image']}">
                                            </div>
                                            <div class="popular_workshop_hobby">${data[i]['category']}</div>
                                            <div class="popular_workshop_title">${data[i]['title']}</div>
                                        </div>`;

            popular_workshops_wrap.insertAdjacentHTML("beforeend", popular_workshop);
        }
    }
}

// 모든 워크샵 목록 출력
async function workshop_list(page) {
    const response = await workshop_get(page)

    if (response.status == 200) {
        data = await response.json()
        console.log(data)
        workshop_data = data['results']

        const gridbox = document.getElementById("gridbox")
        gridbox.innerHTML = ''
        const none_box_wrap = document.getElementById("none_box_wrap")
        none_box_wrap.innerHTML = ''

        for (i = 0; i < workshop_data.length; i++) {

            const workshop = `<div class="workshop" onclick="workshop_detail_move(${workshop_data[i]['id']})">
                                <div class="workshop_img_frame">
                                    <img class="workshop_img" src="${workshop_data[i]['workshop_image']}">
                                </div>
                                <span class="date">${workshop_data[i]['date']} | ${workshop_data[i]['cur_time']}</span>
                                <div class="title">${workshop_data[i]['title']}</div>
                                <span class="hobby_category">${workshop_data[i]['category']}</span>
                                <span class="location">${workshop_data[i]['location']}</span>
                            </div>`;

            gridbox.insertAdjacentHTML("beforeend", workshop);
        }

        page_range = Math.ceil(data['count'] / 12)

        const page_numbers = document.getElementById("page_numbers")
        page_numbers.innerHTML = ''

        for (i = 0; i < page_range; i++) {
            const page_number = `<button type="button" class="page_number" onclick="workshop_page_move(${i+1})">${i+1}</button>`
            page_numbers.insertAdjacentHTML("beforeend", page_number);
        }
    }
}

// 모든 취미 카테고리 목록 출력
async function hobby_list() {
    const response = await hobby_get()

    if (response.status == 200) {
        data = await response.json()

        hobbys = document.getElementById("hobbys")
        hobbys.innerHTML = ''

        for (i = 0; i < data.length; i++) {

            const hobby = `<button type="button" class="hobby" onclick="workshop_pick_list(${data[i]['id']}, '${data[i]['category']}', 1)">${data[i]['category']}</button>`;

            hobbys.insertAdjacentHTML("beforeend", hobby);
        }
    }
}

// 특정 카테고리 선택 시 해당하는 워크샵 목록 출력
async function workshop_pick_list(category_id, category_name, page) {

    const response = await workshop_pick_get(category_id, page)

    if (response.status == 200) {
        data = await response.json()
        workshop_data = data['results']

        const sub_info = document.getElementById("sub_info")

        sub_info.innerHTML = `<span class="info_title">다양한 ${category_name} 워크샵으로 취미를 함께 즐겨보세요!</span>`

        const gridbox = document.getElementById("gridbox")
        gridbox.innerHTML = ''
        const page_numbers = document.getElementById("page_numbers")
        page_numbers.innerHTML = ''
        const none_box_wrap = document.getElementById("none_box_wrap")
        none_box_wrap.innerHTML = ''

        if (workshop_data.length == 0) {
            const none_box = `<div class="none_box" id="none_box">선택하신 카테고리의 워크샵이 없습니다</div>`;
            none_box_wrap.insertAdjacentHTML("beforeend", none_box);

        } else {
            for (i = 0; i < workshop_data.length; i++) {

                const workshop = `<div class="workshop" onclick="workshop_detail_move(${workshop_data[i]['id']})">
                                    <div class="workshop_img_frame">
                                        <img class="workshop_img" src="${workshop_data[i]['workshop_image']}">
                                    </div>
                                    <span class="date">${workshop_data[i]['date']} | ${workshop_data[i]['cur_time']}</span>
                                    <div class="title">${workshop_data[i]['title']}</div>
                                    <span class="hobby_category">${workshop_data[i]['category']}</span>
                                    <span class="location">${workshop_data[i]['location']}</span>
                                </div>`;

                gridbox.insertAdjacentHTML("beforeend", workshop);
            }

            page_range = Math.ceil(data['count'] / 12)

            for (i = 0; i < page_range; i++) {
                const page_number = `<button type="button" class="page_number" onclick="workshop_pick_list(${category_id}, '${category_name}', ${i+1})">${i+1}</button>`
                page_numbers.insertAdjacentHTML("beforeend", page_number);
            }
        }
    }
}

// 워크샵 상세 페이지로 이동
async function workshop_detail_move(workshop_id) {
    const url = `${front_end_url}/templates/main/workshop_detail.html?id=${workshop_id}`
    window.location.href = url
}

// 워크샵 목록 중 특정 페이지로 이동
async function workshop_page_move(page_nunber) {
    console.log(window.location)
    const url = `${front_end_url}/templates/main/workshop.html?page=${page_nunber}`
    window.location.href = url
}

// 메인 페이지로 이동
async function main_page_move() {
    const url = `${front_end_url}/templates/main/workshop.html`
    window.location.href = url
}