// 특정 워크샵 관리(승인/거절) 페이지 출력
async function workshop_apply_get(workshop_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/apply/`, {
        method: 'GET'
    })
    return response
}