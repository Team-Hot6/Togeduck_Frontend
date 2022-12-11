window.onload = () => {
    workshop_list()
    hobby_list()
}

// 모든 워크샵 목록 출력
async function workshop_list(){
    const response = await workshop_get()

    if(response.status == 200){
        data = await response.json()
        workshop_data = data['results']

        gridbox = document.getElementById("gridbox")
        gridbox.innerHTML = ''

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
    }
}

// 모든 취미 카테고리 목록 출력
async function hobby_list(){
    const response = await hobby_get()
   
    if(response.status == 200){
        data = await response.json()
 
        hobbys = document.getElementById("hobbys")
        hobbys.innerHTML = ''

        for (i = 0; i < data.length; i++) {
       
            const hobby = `<button type="button" class="hobby" onclick="workshop_pick_list(${data[i]['id']}, '${data[i]['category']}')">${data[i]['category']}</button>`;

            hobbys.insertAdjacentHTML("beforeend", hobby);
        }
    }
}

// 특정 카테고리 선택 시 해당하는 워크샵 목록 출력
async function workshop_pick_list(category_id, category_name){
    const response = await workshop_pick_get(category_id)

    if(response.status == 200){
        data = await response.json()
        workshop_data = data['results']

        const sub_info = document.getElementById("sub_info")
        sub_info.innerText = `다양한 ${category_name} 워크샵으로 취미를 함께 즐겨보세요!`

        const gridbox = document.getElementById("gridbox")

        if(workshop_data.length == 0){
            gridbox.innerHTML = `<div>선택하신 카테고리의 워크샵이 없습니다.</div>`
        }
        else{
            gridbox.innerHTML = ''

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
        }
    }
}


// 워크샵 상세 페이지로 이동
async function workshop_detail_move(workshop_id){

    const url = `workshop_detail.html?id=${workshop_id}`
    window.location.href = url
}