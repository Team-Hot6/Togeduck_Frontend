const mypage = document.createElement('div')
mypage.setAttribute('class', 'mypage')
document.body.prepend(mypage)

// 로그인 사용자 pk값 가져오기
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)

// 마이페이지 좌측 프로필 사진 부분
const mypageLeftSide = document.createElement('div')
mypageLeftSide.setAttribute('class', 'mypage-leftside')
mypage.appendChild(mypageLeftSide)
myPageProfile_fuc()

async function myPageProfile_fuc() {

    const response = await fetch('http://127.0.0.1:8000/users/' + payload_parse.user_id + '/', {

            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            const profilePicture = document.createElement('div')
            profilePicture.setAttribute('class', 'mypage-profilepicture')
            mypageLeftSide.appendChild(profilePicture)

            const profilePictureImg = document.createElement('img')
            profilePictureImg.setAttribute('class', 'mypage-profilepictureimg')
            profilePictureImg.setAttribute('src', 'http://127.0.0.1:8000' + data["profile_image"])
            profilePicture.appendChild(profilePictureImg)

            const profileName = document.createElement('div')
            profileName.setAttribute('class', 'mypage-profilename')
            profileName.innerText = data["nickname"]
            mypageLeftSide.appendChild(profileName)

            const profileEmail = document.createElement('div')
            profileEmail.setAttribute('class', 'mypage-profileemail')
            profileEmail.innerText = data["email"]
            mypageLeftSide.appendChild(profileEmail)

            const profileLine = document.createElement('div')
            profileLine.setAttribute('class', 'mypage-profileline')
            mypageLeftSide.appendChild(profileLine)

            const profileApply = document.createElement('div')
            profileApply.setAttribute('class', 'mypage-profileapply')
            mypageLeftSide.appendChild(profileApply)

            const profileApply1 = document.createElement('div')
            profileApply1.setAttribute('class', 'mypage-profileapply-1')
            profileApply1.innerText = '신청'
            profileApply.appendChild(profileApply1)

            const profileApply2 = document.createElement('div')
            profileApply2.setAttribute('class', 'mypage-profileapply-2')
            profileApply2.innerText = data['workshop_apply_guest'].length + '개'
            profileApply.appendChild(profileApply2)


            const profilePartiFix = document.createElement('div')
            profilePartiFix.setAttribute('class', 'mypage-profileparticipatefix')
            mypageLeftSide.appendChild(profilePartiFix)

            const profilePartiFix1 = document.createElement('div')
            profilePartiFix1.setAttribute('class', 'mypage-profileparticipatefix-1')
            profilePartiFix1.innerText = '참여확정'
            profilePartiFix.appendChild(profilePartiFix1)

            const profilePartiFix2 = document.createElement('div')
            profilePartiFix2.setAttribute('class', 'mypage-profileparticipatefix-2')
            sum = 0
            for (i = 0; i < data["workshop_apply_guest"].length; i++) {
                if (data['workshop_apply_guest'][i]['result'] == '승인') {
                    sum += 1
                }
            }
            profilePartiFix2.innerText = sum + '개'
            profilePartiFix.appendChild(profilePartiFix2)

            const profilePartiLike = document.createElement('div')
            profilePartiLike.setAttribute('class', 'mypage-profileparticipatelike')
            mypageLeftSide.appendChild(profilePartiLike)

            const profilePartiLike1 = document.createElement('div')
            profilePartiLike1.setAttribute('class', 'mypage-profileparticipatelike-1')
            profilePartiLike1.innerText = '좋아요'
            profilePartiLike.appendChild(profilePartiLike1)

            const profilePartiLike2 = document.createElement('div')
            profilePartiLike2.setAttribute('class', 'mypage-profileparticipatelike-2')
            profilePartiLike2.setAttribute('style', 'cursor: pointer;')
            profilePartiLike2.setAttribute('onClick', "location.href='mypage_likes.html'")
            profilePartiLike2.innerText = data['workshop_likes'].length + "개"
            profilePartiLike.appendChild(profilePartiLike2)

        })

}


// 마이페이지 우측 부분
const mypageRightSide = document.createElement('div')
mypageRightSide.setAttribute('class', 'mypage-rightside')
mypage.appendChild(mypageRightSide)

const navbar = document.createElement('nav')
navbar.setAttribute('class', 'nav nav-pills flex-column flex-sm-row')
mypageRightSide.appendChild(navbar)

const shNav = document.createElement('a')
shNav.setAttribute('id', 'nav-selectedhobby')
shNav.setAttribute('class', 'flex-sm-fill text-sm-center nav-link')
shNav.setAttribute('onclick', 'myPageSelectedHobby_fuc()')
shNav.setAttribute('style', 'cursor: pointer;')
shNav.innerText = '내가 선택한 취미'
navbar.appendChild(shNav)
myPageSelectedHobby_fuc()

const awNav = document.createElement('a')
awNav.setAttribute('id', 'nav-appliedworkshop')
awNav.setAttribute('class', 'flex-sm-fill text-sm-center nav-link')
awNav.setAttribute('onclick', 'myPageAppliedWorkshop_fuc()')
awNav.setAttribute('style', 'cursor: pointer;')
awNav.innerText = '신청 워크샵'
navbar.appendChild(awNav)

const cwNav = document.createElement('a')
cwNav.setAttribute('id', 'nav-createdworkshop')
cwNav.setAttribute('class', 'flex-sm-fill text-sm-center nav-link')
cwNav.setAttribute('onclick', 'myPageCreatedWorkshop_fuc()')
cwNav.setAttribute('style', 'cursor: pointer;')
cwNav.innerText = '생성 워크샵'
navbar.appendChild(cwNav)


async function myPageSelectedHobby_fuc() {
    const id = localStorage.getItem("payload")
    const id_json = JSON.parse(id)

    const response = await fetch('http://127.0.0.1:8000/users/' + payload_parse.user_id + '/', {

            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            const tempSh = document.getElementById('mypage-selectedhobby')
            if (tempSh) {
                tempSh.remove()
            }
            const tempAw = document.getElementById('mypage-appliedworkshop')
            if (tempAw) {
                tempAw.remove()
            }
            const tempCw = document.getElementById('mypage-createdworkshop')
            if (tempCw) {
                tempCw.remove()
            }



            // 네비게이션바에서 '내가 선택한 취미' 버튼 클릭 시 색상 변경

            shNav.className = 'flex-sm-fill text-sm-center nav-link active'
            awNav.className = 'flex-sm-fill text-sm-center nav-link'
            cwNav.className = 'flex-sm-fill text-sm-center nav-link'

            // '내가 선택한 취미' div 작성
            const sh = document.createElement('div')
            sh.setAttribute('class', 'mypage-selectedhobby')
            sh.setAttribute('id', 'mypage-selectedhobby')
            mypageRightSide.appendChild(sh)

            const shTitle = document.createElement('div')
            shTitle.setAttribute('class', 'mypage-selectedhobby-title')
            shTitle.setAttribute('id', 'mypage-selectedhobby-title')
            shTitle.innerText = '내가 선택한 취미'
            sh.appendChild(shTitle)

            const shContent = document.createElement('div')
            shContent.setAttribute('class', 'mypage-appliedworkshop-content')
            shContent.setAttribute('id', 'mypage-appliedworkshop-content')
            sh.appendChild(shContent)

            // 선택한 취미 카테고리 불러오기
            for (i = 0; i < data["hobby"].length; i++) {
                const shCategory = document.createElement('button')
                shCategory.setAttribute('type', 'button')
                shCategory.setAttribute('class', 'btn-selectedhobby-' + data["hobby"][i]['id'])
                shCategory.innerText = data["hobby"][i]["category"]
                shContent.appendChild(shCategory)
            }
            console.log(data)
        })
}


async function myPageAppliedWorkshop_fuc() {

    console.log("현재 버튼을 클릭한 상태입니다."); // 버튼이 눌러지고 있는지 확인 필수
    const id = localStorage.getItem("payload")
    const id_json = JSON.parse(id)

    console.log("실행중~~~")

    const response = await fetch('http://127.0.0.1:8000/users/' + payload_parse.user_id + '/', {

            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            // 네비게이션바에서 '신청 워크샵' 버튼 클릭 시 색상 변경
            shNav.className = 'flex-sm-fill text-sm-center nav-link'
            awNav.className = 'flex-sm-fill text-sm-center nav-link active'
            cwNav.className = 'flex-sm-fill text-sm-center nav-link'

            const tempSh = document.getElementById('mypage-selectedhobby')
            if (tempSh) {
                tempSh.remove()
            }
            const tempAw = document.getElementById('mypage-appliedworkshop')
            if (tempAw) {
                tempAw.remove()
            }
            const tempCw = document.getElementById('mypage-createdworkshop')
            if (tempCw) {
                tempCw.remove()
            }


            // '신청 워크샵' div 작성
            const aw = document.createElement('div')
            aw.setAttribute('class', 'mypage-appliedworkshop')
            aw.setAttribute('id', 'mypage-appliedworkshop')
            mypageRightSide.appendChild(aw)

            const awTitle = document.createElement('div')
            awTitle.setAttribute('class', 'mypage-appliedworkshop-title')
            awTitle.setAttribute('id', 'mypage-appliedworkshop-title')
            awTitle.innerText = '신청 워크샵'
            aw.appendChild(awTitle)

            const awContent = document.createElement('div')
            awContent.setAttribute('class', 'mypage-appliedworkshop-content')
            awContent.setAttribute('id', 'mypage-appliedworkshop-content')
            aw.appendChild(awContent)

            // 신청 워크샵 표 제목
            const awTable = document.createElement('table')
            awTable.setAttribute('class', 'mypage-appliedworkshop-table table table-hover')
            awTable.setAttribute('id', 'mypage-appliedworkshop-table')
            awContent.appendChild(awTable)

            const awTableThead = document.createElement('thead')
            awTableThead.setAttribute('class', 'mypage-appliedworkshop-table-thead-sort')
            awTableThead.setAttribute('id', 'mypage-appliedworkshop-table-thead-sort')
            awTable.appendChild(awTableThead)

            const awTableTr = document.createElement('tr')
            awTableTr.setAttribute('class', 'mypage-appliedworkshop-table-tr-sort')
            awTableTr.setAttribute('id', 'mypage-appliedworkshop-table-tr-sort')
            awTableThead.appendChild(awTableTr)

            const awTableThName = document.createElement('th')
            awTableThName.setAttribute('class', 'mypage-appliedworkshop-table-th-name-sort')
            awTableThName.setAttribute('id', 'mypage-appliedworkshop-table-th-name-sort')
            awTableThName.innerText = '워크샵명'
            awTableTr.appendChild(awTableThName)

            const awTableThWait = document.createElement('th')
            awTableThWait.setAttribute('class', 'mypage-appliedworkshop-table-th-date-sort')
            awTableThWait.setAttribute('id', 'mypage-appliedworkshop-table-th-date-sort')
            awTableThWait.innerText = '신청일'
            awTableTr.appendChild(awTableThWait)

            const awThStatus = document.createElement('th')
            awThStatus.setAttribute('class', 'mypage-appliedworkshop-table-th-status-sort')
            awThStatus.setAttribute('id', 'mypage-appliedworkshop-table-th-status-sort')
            awThStatus.innerText = '신청현황'
            awTableTr.appendChild(awThStatus)

            // 신청 워크샵 표 항목 리스트
            for (i = 0; i < data["workshop_apply_guest"].length; i++) {

                const awTableTheadNum = document.createElement('thead')
                awTableTheadNum.setAttribute('class', 'mypage-appliedworkshop-table-thead')
                awTableTheadNum.setAttribute('id', 'mypage-appliedworkshop-table-thead-' + (i + 1))
                awTable.appendChild(awTableTheadNum)

                const awTableTrNum = document.createElement('tr')
                awTableTrNum.setAttribute('class', 'mypage-appliedworkshop-table-tr')
                awTableTrNum.setAttribute('id', 'mypage-appliedworkshop-table-tr-' + (i + 1))
                awTableThead.appendChild(awTableTrNum)

                const awTableThNameNum = document.createElement('th')
                awTableThNameNum.setAttribute('class', 'mypage-appliedworkshop-table-th-name')
                awTableThNameNum.setAttribute('id', 'mypage-appliedworkshop-table-th-name' + (i + 1))
                awTableThNameNum.innerText = data["workshop_apply_guest"][i]['workshop']
                awTableTrNum.appendChild(awTableThNameNum)

                const awTableThWaitNum = document.createElement('th')
                awTableThWaitNum.setAttribute('class', 'mypage-appliedworkshop-table-th-date')
                awTableThWaitNum.setAttribute('id', 'mypage-appliedworkshop-table-th-date' + (i + 1))
                awTableThWaitNum.innerText = data["workshop_apply_guest"][i]['created_at'].slice(0, 10)
                awTableTrNum.appendChild(awTableThWaitNum)

                const awTableThStatusNum = document.createElement('th')
                awTableThStatusNum.setAttribute('class', 'mypage-appliedworkshop-table-th-status')
                awTableThStatusNum.setAttribute('id', 'mypage-appliedworkshop-table-th-status' + (i + 1))
                awTableThStatusNum.innerText = data["workshop_apply_guest"][i]['result']
                awTableTrNum.appendChild(awTableThStatusNum)
            }
        })
}


async function myPageAppliedWorkshop_cancel_fuc() {
    const response = fetch('http://127.0.0.1:8000/workshops/' + payload_parse.user_id + '/apply/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => data);
}


async function myPageCreatedWorkshop_fuc() {
    console.log("현재 버튼을 클릭한 상태입니다."); // 버튼이 눌러지고 있는지 확인 필수
    const id = localStorage.getItem("payload")
    const id_json = JSON.parse(id)

    const response = await fetch('http://127.0.0.1:8000/users/' + payload_parse.user_id + '/', {

            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            // 네비게이션바에서 '신청 워크샵' 버튼 클릭 시 색상 변경
            shNav.className = 'flex-sm-fill text-sm-center nav-link'
            awNav.className = 'flex-sm-fill text-sm-center nav-link'
            cwNav.className = 'flex-sm-fill text-sm-center nav-link active'


            const tempSh = document.getElementById('mypage-selectedhobby')
            if (tempSh) {
                tempSh.remove()
            }
            const tempAw = document.getElementById('mypage-appliedworkshop')
            if (tempAw) {
                tempAw.remove()
            }
            const tempCw = document.getElementById('mypage-createdworkshop')
            if (tempCw) {
                tempCw.remove()
            }


            // '생성 워크샵' div 작성
            const cw = document.createElement('div')
            cw.setAttribute('class', 'mypage-createdworkshop')
            cw.setAttribute('id', 'mypage-createdworkshop')
            mypageRightSide.appendChild(cw)

            const cwTitle = document.createElement('div')
            cwTitle.setAttribute('class', 'mypage-createdworkshop-title')
            cwTitle.setAttribute('id', 'mypage-createdworkshop-title')
            cwTitle.innerText = '생성 워크샵'
            cw.appendChild(cwTitle)

            const cwContent = document.createElement('div')
            cwContent.setAttribute('class', 'mypage-createdworkshop-content')
            cwContent.setAttribute('id', 'mypage-createdworkshop-content')
            cw.appendChild(cwContent)

            const cwTable = document.createElement('table')
            cwTable.setAttribute('class', 'mypage-createdworkshop-table table table-hover')
            cwTable.setAttribute('id', 'mypage-createdworkshop-table table table-hover')
            cwContent.appendChild(cwTable)

            const cwTableThead = document.createElement('thead')
            cwTableThead.setAttribute('class', 'mypage-createdworkshop-table-thead-sort')
            cwTableThead.setAttribute('id', 'mypage-createdworkshop-table-thead-sort')
            cwTable.appendChild(cwTableThead)

            const cwTableTr = document.createElement('tr')
            cwTableTr.setAttribute('class', 'mypage-createdworkshop-table-tr-sort')
            cwTableTr.setAttribute('id', 'mypage-createdworkshop-table-tr-sort')
            cwTableThead.appendChild(cwTableTr)

            const cwTableThName = document.createElement('th')
            cwTableThName.setAttribute('class', 'mypage-createdworkshop-table-th-name-sort')
            cwTableThName.setAttribute('id', 'mypage-createdworkshop-table-th-name-sort')
            cwTableThName.innerText = '워크샵명'
            cwTableTr.appendChild(cwTableThName)

            const cwTableThWait = document.createElement('th')
            cwTableThWait.setAttribute('class', 'mypage-createdworkshop-table-th-wait-sort')
            cwTableThWait.setAttribute('id', 'mypage-createdworkshop-table-th-wait-sort')
            cwTableThWait.innerText = '신청대기'
            cwTableTr.appendChild(cwTableThWait)

            const cwThStatus = document.createElement('th')
            cwThStatus.setAttribute('class', 'mypage-createdworkshop-table-th-status-sort')
            cwThStatus.setAttribute('id', 'mypage-createdworkshop-table-th-status-sort')
            cwThStatus.innerText = '모집현황'
            cwTableTr.appendChild(cwThStatus)


            for (i = 0; i < data["workshop_host"].length; i++) {

                console.log(data)

                const cwTableTheadNum = document.createElement('thead')
                cwTableTheadNum.setAttribute('class', 'mypage-createdworkshop-table-thead')
                cwTableTheadNum.setAttribute('id', 'mypage-createdworkshop-table-thead-' + (i + 1))
                cwTable.appendChild(cwTableTheadNum)

                const cwTableTrNum = document.createElement('tr')
                cwTableTrNum.setAttribute('class', 'mypage-createdworkshop-table-tr')
                cwTableTrNum.setAttribute('id', 'mypage-createdworkshop-table-tr-' + (i + 1))
                cwTableThead.appendChild(cwTableTrNum)

                const cwTableThNameNum = document.createElement('th')
                cwTableThNameNum.setAttribute('class', 'mypage-createdworkshop-table-th-name')
                cwTableThNameNum.setAttribute('id', 'mypage-createdworkshop-table-th-name-' + (i + 1))
                cwTableThNameNum.innerText = data['workshop_host'][i]['title']
                cwTableTrNum.appendChild(cwTableThNameNum)

                const cwTableThWaitNum = document.createElement('th')
                cwTableThWaitNum.setAttribute('class', 'mypage-createdworkshop-table-th-wait')
                cwTableThWaitNum.setAttribute('id', 'mypage-createdworkshop-table-th-wait-' + (i + 1))
                sum_wait = 0
                for (j = 0; j < data["workshop_host"][i]['workshop_apply'].length; j++) {
                    if (data["workshop_host"][i]["workshop_apply"][j]['result'] == '대기') {
                        sum_wait += 1
                    }
                }
                cwTableThWaitNum.innerText = sum
                cwTableTrNum.appendChild(cwTableThWaitNum)

                const cwTableThStatusNum = document.createElement('th')
                cwTableThStatusNum.setAttribute('class', 'mypage-createdworkshop-table-th-status')
                cwTableThStatusNum.setAttribute('id', 'mypage-createdworkshop-table-th-status-' + (i + 1))
                sum_appove = 0
                for (j = 0; j < data["workshop_host"][i]['workshop_apply'].length; j++) {
                    if (data["workshop_host"][i]["workshop_apply"][j]['result'] == '승인') {
                        sum_appove += 1
                    }
                }
                cwTableThStatusNum.innerText = sum_appove + '/' + data['workshop_host'][i]['max_guest']
                cwTableTrNum.appendChild(cwTableThStatusNum)
            }
        })
}