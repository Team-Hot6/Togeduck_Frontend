// 베스트 워크샵 목록 출력
async function workshop_popular_get() {
    const response = await fetch(`${back_end_url}/workshops/lank/`, {
        method: 'GET'
    })
    return response
}

// 모든 워크샵 목록 출력 + 페이지네이션
async function workshop_get(page, sort) {
    const response = await fetch(`${back_end_url}/workshops/?page=${page}&sort=${sort}`, {
        method: 'GET'
    })
    return response
}

// 모든 취미 카테고리 목록 출력
async function hobby_get() {
    const response = await fetch(`${back_end_url}/workshops/hobby/`, {
        method: 'GET'
    })
    return response
}

// 모든 지역 카테고리 목록 출력
async function location_get() {
    const response = await fetch(`${back_end_url}/workshops/location/`, {
        method: 'GET'
    })
    return response
}

// 특정 카테고리 선택 시 해당하는 워크샵 목록 출력 + 페이지네이션
async function workshop_pick_get(category_id, page, sort) {
    const response = await fetch(`${back_end_url}/workshops/?category=${category_id}&page=${page}&sort=${sort}`, {
        method: 'GET'
    })
    return response
}

// 워크샵 상세페이지 로딩 시 해당하는 특정 워크샵 데이터 요청
async function workshop_detail_get(workshop_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/`, {
        method: 'GET'
    })
    return response
}

// 해당 워크샵 리뷰 목록 보기
async function workshop_review_get(workshop_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/review/`, {
        method: 'GET'
    })
    return response
}

// 해당 워크샵 리뷰 작성
async function workshop_review_post(workshop_id, review_post) {
    const reviewData = {
        content: review_post
    }
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/review/`, {
        headers: {
            'content-type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify(reviewData)
    })
    if (response.status == 200) {
        return response
    } else {
        alert(response.status)
    }
}

// 워크샵 리뷰 수정
async function workshop_review_put(workshop_id, review_id, content) {
    const reviewData = {

        content: content,
    }
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/review/${review_id}/`, {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "PUT",
        body: JSON.stringify(reviewData),
    });
    return response
}

// 워크샵 리뷰 삭제
async function workshop_review_delete(workshop_id, review_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/review/${review_id}/`, {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: 'DELETE',
    })
    return response
}

// 워크샵 좋아요
async function workshop_like(workshop_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/like/`, {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
    });
    return response
}

// 워크샵 삭제
async function workshop_delete(workshop_id) {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/`, {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: 'DELETE',
    })
    return response
}