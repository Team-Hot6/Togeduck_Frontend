// 특정 워크샵 관리(승인/거절) 페이지 출력
async function workshop_apply_get(workshop_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/apply/`, {
        headers: {
            "Authorization":"Bearer "+localStorage.getItem("access")
        },
        method: 'GET'
    })
    return response
}


// 특정 워크샵 신청에 대해 (승인/거절)하기
async function apply_result_put(workshop_id, guest_id, result) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/apply/`, {
        headers: {
            "Authorization":"Bearer "+localStorage.getItem("access"),
            "content-type":"application/json",
        },
        method: 'PUT',
        body: JSON.stringify({
            "result":result,
            "guest":guest_id
        })
    })
    return response
}