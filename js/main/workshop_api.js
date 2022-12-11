// 모든 워크샵 목록 출력
async function workshop_get() {
    const response = await fetch(`${back_end_url}/workshops/`, {
        method:'GET'
    })
    return response
}

// 모든 취미 카테고리 목록 출력
async function hobby_get() {
    const response = await fetch(`${back_end_url}/workshops/hobby/`, {
        method:'GET'
    })
    return response
}

// 특정 카테고리 선택 시 해당하는 워크샵 목록 출력
async function workshop_pick_get(category_id) {
    const response = await fetch(`${back_end_url}/workshops/?category=${category_id}`, {
        method:'GET'
    })
    return response
}

// 워크샵 상세페이지 로딩 시 해당하는 특정 워크샵 데이터 요청
async function workshop_detail_get(workshop_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/`, {
        method:'GET'
    })
    return response
}