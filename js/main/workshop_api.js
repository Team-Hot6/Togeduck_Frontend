console.log("workshop_api.js 연결완료");


// 모든 워크샵 목록 출력
async function workshop_get() {
    const response = await fetch(`${back_end_url}/workshops/`, {
        method:'GET'
    })
    return response
}

// 모든 취미 카테고리 목록 출력
async function hobby_get() {
    const response = await fetch(`${back_end_url}/hobby/`, {
        method:'GET'
    })
    return response
}