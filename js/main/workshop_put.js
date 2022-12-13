window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let workshop_id = urlParams.get('id');
    workshop_info(workshop_id)
    hobby_category_list()
    location_category_list()
}



// 모든 취미 카테고리 목록 출력
async function hobby_category_list(data){
    const response = await hobby_get()
    console.log(22222, data)
   
    if(response.status == 200){
        data = await response.json()
        console.log("취미 data",data)
 
        category_pick_box = document.getElementById("category_id")
        category_pick_box.innerHTML = ''
        console.log("category_pick_box",category_pick_box)

        for (i = 0; i < data.length; i++) {
            const hobby = `<option value="${data[i]['id']}">${data[i]['category']}</option>`;
            category_pick_box.insertAdjacentHTML("beforeend", hobby);
        }
    }
}

// 모든 지역 카테고리 목록 출력
async function location_category_list(data){
    const response = await location_get()
   
    if(response.status == 200){
        data = await response.json()
        console.log("지역 data",data)
 
        location_pick_box = document.getElementById("location_id")
        location_pick_box.innerHTML = ''

        for (i = 0; i < data.length; i++) {
            const location = `<option value="${data[i]['id']}">${data[i]['district']}</option>`;
            location_pick_box.insertAdjacentHTML("beforeend", location);
        }
    }
}





async function workshop_info(workshop_id){
    const response = await workshop_detail_get(workshop_id)
   
    if(response.status == 200){
        data = await response.json()
        console.log("기존 워크샵 data",data)

        const content = document.getElementById("content");
        const workshop_image = document.getElementById("getval");
        const title = document.getElementById("title");
        const date = document.getElementById("date");
        const max_guest = document.getElementById("max_guest");
        const amount = document.getElementById("amount");
        const category = document.getElementById("category_id");
        const location = document.getElementById("location_id");
        const address = document.getElementById("address");




        title.value = data.title;
        content.value = data.content;
        max_guest.value = data.max_guest;
        amount.value = data.amount;
        workshop_image.setAttribute("src", `http://127.0.0.1:8000${data.workshop_image}`);
        category.target.options[4].selected = true;
        location.target.options[3].selected = true;
        date.innerText = data.date;
        address.value = data.address;

        return data
    }
}