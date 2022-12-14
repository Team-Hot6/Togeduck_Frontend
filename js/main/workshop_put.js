window.onload = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    let workshop_id = urlParams.get('id');
    const current_data = await workshop_info(workshop_id)

    hobby_category_list(current_data)
    location_category_list(current_data)
}

// 모든 취미 카테고리 목록 출력
async function hobby_category_list(current_data){
    const response = await hobby_get()
   
    if(response.status == 200){
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
async function location_category_list(current_data){
    const response = await location_get()
   
    if(response.status == 200){
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

async function workshop_info(workshop_id){
    const response = await workshop_detail_get(workshop_id)
    data = await response.json()

    if(response.status == 200){
        const content = document.getElementById("content");
        const workshop_image = document.getElementById("getval");
        const workshop_image_frame = document.getElementById("hvr-profile-img");
        const title = document.getElementById("title");
        const date = document.getElementById("date");
        const max_guest = document.getElementById("max_guest");
        const amount = document.getElementById("amount");
        const address = document.getElementById("address");

        title.value = data.title;
        content.value = data.content;
        max_guest.value = data.max_guest;
        amount.value = data.amount;
        workshop_image.setAttribute("src", `http://127.0.0.1:8000${data.workshop_image}`); 
        date.value = data.date;
        address.value = data.address;
        console.log(workshop_image)

        console.log(workshop_image.files)


        workshop_image_frame.style.opacity = 100;
        workshop_image_frame.innerHTML = `<input type="file" name="logo" id='getval' class="upload" accept="image/*" id="imag">
                                            <img class="workshop_img" id="temp_img" src=http://127.0.0.1:8000${data.workshop_image}>`

        workshop_image.style.zIndex =10;


        aaa = `<div class="hvr-profile-img" id="hvr-profile-img">
                    <input type="file" name="logo" id='getval' class="upload" accept="image/*" id="imag">
                    <div class="icon">
                        <div class="camera4"><span></span></div>
                    </div>
                </div>`

      
          // 업로드한 이미지 미리보기
        document.getElementById('getval').addEventListener('change', readURL, true);
        function readURL(){
            var file = document.getElementById("getval").files[0];
            var reader = new FileReader();
            reader.onloadend = function(){
                document.getElementById('temp_img').src = reader.result;        
            }
            if(file){
                reader.readAsDataURL(file);
            }else{
            }
        }
        }
    return data
}