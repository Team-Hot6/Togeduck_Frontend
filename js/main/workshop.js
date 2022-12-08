console.log("workshop.js 연결완료");
workshop_list()
hobby_list()

// 모든 워크샵 목록 출력
async function workshop_list(){
    const response = await workshop_get()

    if(response.status == 200){
        data = await response.json()

        gridbox = document.getElementById("gridbox")
        gridbox.innerHTML = ''

        for (i = 0; i < data.length; i++) {
         
            const workshop = `<div class="workshop" style="background-color: #ffffff;">
                                <div class="workshop_img_frame">
                                    <img class="workshop_img" src="${back_end_url}${data[i]['workshop_image']}">
                                </div>
                                <span class="date">${data[i]['date']} | ${data[i]['cur_time']}</span>
                                <div class="title">${data[i]['title']}</div>
                                <span class="hobby_category">${data[i]['category']}</span>
                                <span class="location">${data[i]['location']}</span>
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
       
            const hobby = `<button type="button" class="hobby" onclick="workshop_pick_list(${data[i]['id']})">${data[i]['category']}</button>`;

            hobbys.insertAdjacentHTML("beforeend", hobby);
        }
    }
}

// 특정 카테고리 선택 시 해당하는 워크샵 목록 출력
async function workshop_pick_list(category_id){
    
    const response = await workshop_pick_get(category_id)
    console.log(response)

    if(response.status == 200){
        data = await response.json()

        gridbox = document.getElementById("gridbox")

        if(data.length == 0){
            gridbox.innerHTML = `<div>선택하신 카테고리의 워크샵이 없습니다.</div>`
           
        }
        else{
            gridbox.innerHTML = ''

            for (i = 0; i < data.length; i++) {
            
                const workshop = `<div class="workshop" style="background-color: #ffffff;">
                                    <div class="workshop_img_frame">
                                        <img class="workshop_img" src="${back_end_url}${data[i]['workshop_image']}">
                                    </div>
                                    <span class="date">${data[i]['date']} | ${data[i]['cur_time']}</span>
                                    <div class="title">${data[i]['title']}</div>
                                    <span class="hobby_category">${data[i]['category']}</span>
                                    <span class="location">${data[i]['location']}</span>
                                </div>`;
                
                gridbox.insertAdjacentHTML("beforeend", workshop);
            }
        }
    }
}