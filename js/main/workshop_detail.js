window.onload = () => {
    workshop_detail_view()
}


// 워크샵 상세 데이터 불러오기
async function workshop_detail_view(){
    workshop_id = getCookie("workshop_id")

    const response = await workshop_detail_get(workshop_id)
   
    if(response.status == 200){
        data = await response.json()
        console.log(data)
    }
}