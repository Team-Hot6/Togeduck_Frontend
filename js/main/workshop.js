console.log("workshop.js 연결완료");
workshop_list()

// 모든 워크샵 목록 출력
async function workshop_list(){
    const response = await workshop_get()

    if(response.status == 200){
        data = await response.json()

        for (i = 0; i < data.length; i++) {
            console.log(`${[i]}번 워크샵 pk : ${data[i]['pk']}`) 
            console.log(`${[i]}번 워크샵 취미카테고리 : ${data[i]['category']}`) 
            console.log(`${[i]}번 워크샵 지역 : ${data[i]['location']}`) 
            console.log(`${[i]}번 워크샵 제목 : ${data[i]['title']}`)
            console.log(`${[i]}번 워크샵 소개글 : ${data[i]['content']}`) 
            console.log(`${[i]}번 워크샵 이미지 : ${data[i]['workshop_image']}`)
            console.log("-------------")
        }
    }
}

// 모든 취미 카테고리 목록 출력
async function hobby_list(){
    const response = await hobby_get()

    if(response.status == 200){
        data = await response.json()
    }
}