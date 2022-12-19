const urlParams = new URLSearchParams(window.location.search);
let workshop_id = urlParams.get('id');

const main = document.querySelector("main")
const wsManage = document.createElement('div')
wsManage.setAttribute('class', 'workshop-manage')
main.appendChild(wsManage)

// 워크샵 관리페이지 좌측 워크샵 사진 부분
const wsManageLeftSide = document.createElement('div')
wsManageLeftSide.setAttribute('class', 'workshop-manage-leftside')
wsManage.appendChild(wsManageLeftSide)

// 왼쪽카드 틀 생성. 데이터 넣기
async function wsManageCard_fuc() {

    const response = await workshop_apply_get(workshop_id)

    if(response.status == 200){
        data = await response.json()

        const wsManagePicture = document.createElement('div')
        wsManagePicture.setAttribute('class', 'workshop-manage-picture')
        wsManageLeftSide.appendChild(wsManagePicture)

        const wsManagePictureImg = document.createElement('img')
        wsManagePictureImg.setAttribute('class', 'workshop-manage-pictureimg')
        wsManagePictureImg.setAttribute('src', back_end_url + data["workshop_image"])
        wsManagePicture.appendChild(wsManagePictureImg)

        const wsManageName = document.createElement('div')
        wsManageName.setAttribute('class', 'workshop-manage-name')
        wsManageName.innerText = data["title"]
        wsManageLeftSide.appendChild(wsManageName)

        const wsManageDate = document.createElement('div')
        wsManageDate.setAttribute('class', 'workshop-manage-date')
        wsManageDate.innerText = data["created_at"].slice(0, 10) + ' ' + data["created_at"].slice(11, 16)
        wsManageLeftSide.appendChild(wsManageDate)

        const wsManageMiddleLine = document.createElement('div')
        wsManageMiddleLine.setAttribute('class', 'workshop-manage-middleline')
        wsManageLeftSide.appendChild(wsManageMiddleLine)

        const wsManageApplyWait = document.createElement('div')
        wsManageApplyWait.setAttribute('class', 'workshop-manage-applywait')
        wsManageLeftSide.appendChild(wsManageApplyWait)

        const wsManageApplyWait1 = document.createElement('div')
        wsManageApplyWait1.setAttribute('class', 'workshop-manage-applywait-1')
        wsManageApplyWait1.innerText = '신청대기'
        wsManageApplyWait.appendChild(wsManageApplyWait1)

        const wsManageApplyWait2 = document.createElement('div')
        wsManageApplyWait2.setAttribute('class', 'workshop-manage-applywait-2')
        sum = 0
        for (i = 0; i < data["workshop_apply"].length; i++) {
            if (data['workshop_apply'][i]['result'] == '대기') {
                sum += 1
            }
        }
        wsManageApplyWait2.innerText = sum + '명'
        wsManageApplyWait.appendChild(wsManageApplyWait2)

        const wsManageApplyRatio = document.createElement('div')
        wsManageApplyRatio.setAttribute('class', 'workshop-manage-applyratio')
        wsManageLeftSide.appendChild(wsManageApplyRatio)

        const wsManageApplyRatio1 = document.createElement('div')
        wsManageApplyRatio1.setAttribute('class', 'workshop-manage-applyratio-1')
        wsManageApplyRatio1.innerText = '모집현황'
        wsManageApplyRatio.appendChild(wsManageApplyRatio1)

        const wsManageApplyRatio2 = document.createElement('div')
        wsManageApplyRatio2.setAttribute('class', 'workshop-manage-applyratio-2')
        sum = 0
        for (i = 0; i < data["workshop_apply"].length; i++) {
            if (data['workshop_apply'][i]['result'] == '승인') {
                sum += 1
            }
        }
        wsManageApplyRatio2.innerText = sum + '/' + data['max_guest']
        wsManageApplyRatio.appendChild(wsManageApplyRatio2)

        const wsManageLocation = document.createElement('div')
        wsManageLocation.setAttribute('class', 'workshop-manage-location')
        wsManageLeftSide.appendChild(wsManageLocation)

        const wsManageLocation1 = document.createElement('div')
        wsManageLocation1.setAttribute('class', 'workshop-manage-location-1')
        wsManageLocation1.innerText = '지역'
        wsManageLocation.appendChild(wsManageLocation1)

        const wsManageLocation2 = document.createElement('div')
        wsManageLocation2.setAttribute('class', 'workshop-manage-location-2')
        wsManageLocation2.innerText = data['location']
        wsManageLocation.appendChild(wsManageLocation2)
    }
}

wsManageCard_fuc()

// 마이페이지 우측 부분 (메뉴바)
const wsManageRightSide = document.createElement('div')
wsManageRightSide.setAttribute('class', 'workshop-manage-rightside')
wsManage.appendChild(wsManageRightSide)

const navbar0 = document.createElement('nav')
navbar0.setAttribute('class', 'nav nav-pills flex-column flex-sm-row')
wsManageRightSide.appendChild(navbar0)

const wsApplyWaitNav = document.createElement('a')
wsApplyWaitNav.setAttribute('id', 'nav-apply-wait')
wsApplyWaitNav.setAttribute('class', 'flex-sm-fill text-sm-center nav-link')
wsApplyWaitNav.setAttribute('onclick', 'wsManageApplyWait_fuc()')
wsApplyWaitNav.setAttribute('style', 'cursor: pointer;')
wsApplyWaitNav.innerText = '신청 대기자'
navbar0.appendChild(wsApplyWaitNav)

const wsApplyConfirmedNav = document.createElement('a')
wsApplyConfirmedNav.setAttribute('id', 'nav-apply-confirmed')
wsApplyConfirmedNav.setAttribute('class', 'flex-sm-fill text-sm-center nav-link')
wsApplyConfirmedNav.setAttribute('onclick', 'wsManageConfirmedUser()')
wsApplyConfirmedNav.setAttribute('style', 'cursor: pointer;')
wsApplyConfirmedNav.innerText = '참여 확정자'
navbar0.appendChild(wsApplyConfirmedNav)

// 신청 대기자 목록 불러오기
async function wsManageApplyWait_fuc() {
    
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/apply/`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("access")
            },
            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            const tempWSApplyWait = document.getElementById('workshop-manage-applywaituser')
            if (tempWSApplyWait) {
                tempWSApplyWait.remove()
            }
            const tempWSConfUser = document.getElementById('workshop-manage-conf-user')
            if (tempWSConfUser) {
                tempWSConfUser.remove()
            }

            // 네비게이션바에서 '신청 대기자' 버튼 클릭 시 색상 변경

            wsApplyWaitNav.className = 'flex-sm-fill text-sm-center nav-link active'
            wsApplyConfirmedNav.className = 'flex-sm-fill text-sm-center nav-link'

            // '신청 대기자' div 작성
            const wsApplyWaitUser = document.createElement('div')
            wsApplyWaitUser.setAttribute('class', 'workshop-manage-applywaituser')
            wsApplyWaitUser.setAttribute('id', 'workshop-manage-applywaituser')
            wsManageRightSide.appendChild(wsApplyWaitUser)

            const wsApplyWaitUserTitle = document.createElement('div')
            wsApplyWaitUserTitle.setAttribute('class', 'workshop-manage-applywaituser-title')
            wsApplyWaitUserTitle.setAttribute('id', 'workshop-manage-applywaituser-title')
            wsApplyWaitUserTitle.innerText = '신청 대기자'
            wsApplyWaitUser.appendChild(wsApplyWaitUserTitle)

            const wsApplyWaitUserContent = document.createElement('div')
            wsApplyWaitUserContent.setAttribute('class', 'workshop-manage-applywaituser-content')
            wsApplyWaitUserContent.setAttribute('id', 'workshop-manage-applywaituser-content')
            wsApplyWaitUser.appendChild(wsApplyWaitUserContent)

            const wsAWUTable = document.createElement('table')
            wsAWUTable.setAttribute('class', 'workshop-manage-applywaituser-table table table-hover')
            wsAWUTable.setAttribute('id', 'workshop-manage-applywaituser-table')
            wsApplyWaitUserContent.appendChild(wsAWUTable)

            const wsAWUTableThead = document.createElement('thead')
            wsAWUTableThead.setAttribute('class', 'workshop-manage-applywaituser-table-thead-sort')
            wsAWUTableThead.setAttribute('id', 'workshop-manage-applywaituser-table-thead-sort')
            wsAWUTable.appendChild(wsAWUTableThead)

            const wsAWUTableTr = document.createElement('tr')
            wsAWUTableTr.setAttribute('class', 'workshop-manage-applywaituser-table-tr-sort')
            wsAWUTableTr.setAttribute('id', 'workshop-manage-applywaituser-table-tr-sort')
            wsAWUTableThead.appendChild(wsAWUTableTr)

            const wsAWUTableThUsername = document.createElement('th')
            wsAWUTableThUsername.setAttribute('class', 'workshop-manage-applywaituser-table-th-name-sort')
            wsAWUTableThUsername.setAttribute('id', 'workshop-manage-applywaituser-table-th-name-sort')
            wsAWUTableThUsername.innerText = '사용자명'
            wsAWUTableTr.appendChild(wsAWUTableThUsername)

            const wsAWUTableThChat = document.createElement('th')
            wsAWUTableThChat.setAttribute('class', 'workshop-manage-applywaituser-table-th-chat-sort')
            wsAWUTableThChat.setAttribute('id', 'workshop-manage-applywaituser-table-th-chat-sort')
            wsAWUTableThChat.innerText = '채팅'
            wsAWUTableTr.appendChild(wsAWUTableThChat)

            const wsAWUTableApprove = document.createElement('th')
            wsAWUTableApprove.setAttribute('class', 'workshop-manage-applywaituser-table-th-ar-sort')
            wsAWUTableApprove.setAttribute('id', 'workshop-manage-applywaituser-table-th-ar-sort')
            wsAWUTableApprove.innerText = '승인'
            wsAWUTableTr.appendChild(wsAWUTableApprove)

            const wsAWUTableReject = document.createElement('th')
            wsAWUTableReject.setAttribute('class', 'workshop-manage-applywaituser-table-th-ar-sort')
            wsAWUTableReject.setAttribute('id', 'workshop-manage-applywaituser-table-th-ar-sort')
            wsAWUTableReject.innerText = '거절'
            wsAWUTableTr.appendChild(wsAWUTableReject)

            // '신청 대기자' 항목 리스트 작성
            for (i = 0; i < data['workshop_apply'].length; i++) {
                if (data['workshop_apply'][i]['result'] == '대기') {
                    const wsAWUTableTheadNum = document.createElement('thead')
                    wsAWUTableTheadNum.setAttribute('class', 'workshop-manage-applywaituser-table-thead')
                    wsAWUTableTheadNum.setAttribute('id', 'workshop-manage-applywaituser-table-thead-' + (i + 1))
                    wsAWUTable.appendChild(wsAWUTableTheadNum)

                    const wsAWUTableTrNum = document.createElement('tr')
                    wsAWUTableTrNum.setAttribute('class', 'workshop-manage-applywaituser-table-tr')
                    wsAWUTableTrNum.setAttribute('id', 'workshop-manage-applywaituser-table-tr-' + (i + 1))
                    wsAWUTableThead.appendChild(wsAWUTableTrNum)

                    const wsAWUTableThUsernameNum = document.createElement('th')
                    wsAWUTableThUsernameNum.setAttribute('class', 'workshop-manage-applywaituser-table-th-name')
                    wsAWUTableThUsernameNum.setAttribute('id', 'workshop-manage-applywaituser-table-th-name' + (i + 1))
                    wsAWUTableThUsernameNum.innerText = data['workshop_apply'][i]['guest_nickname']
                    wsAWUTableTrNum.appendChild(wsAWUTableThUsernameNum)

                    const wsAWUTableThChatNum = document.createElement('th')
                    wsAWUTableThChatNum.setAttribute('class', 'workshop-manage-applywaituser-table-th-chat')
                    wsAWUTableThChatNum.setAttribute('id', 'workshop-manage-applywaituser-table-th-chat' + (i + 1))
                    wsAWUTableThChatNum.innerText = '대화하기'
                    wsAWUTableThChatNum.setAttribute('onclick', '')
                    wsAWUTableTrNum.appendChild(wsAWUTableThChatNum)

                    const wsAWUTableApproveNum = document.createElement('th')
                    wsAWUTableApproveNum.setAttribute('class', 'workshop-manage-applywaituser-table-th-ar')
                    wsAWUTableApproveNum.setAttribute('id', 'workshop-manage-applywaituser-table-th-ar' + (i + 1))
                    wsAWUTableTrNum.appendChild(wsAWUTableApproveNum)

                    const wsAWUTableRejectNum = document.createElement('th')
                    wsAWUTableRejectNum.setAttribute('class', 'workshop-manage-applywaituser-table-th-ar')
                    wsAWUTableRejectNum.setAttribute('id', 'workshop-manage-applywaituser-table-th-ar' + (i + 1))
                    wsAWUTableTrNum.appendChild(wsAWUTableRejectNum)

                    const wsAWUTableApproveBtn = document.createElement('button')
                    wsAWUTableApproveBtn.setAttribute('type', 'button')
                    wsAWUTableApproveBtn.setAttribute('id', 'workshop-manage-applywaituser-approve-button')
                    wsAWUTableApproveBtn.setAttribute('onclick', "workshop_apply_result("+data['workshop_apply'][i]['guest']+", '승인')")
                    wsAWUTableApproveBtn.innerText = '승인'
                    wsAWUTableApproveNum.appendChild(wsAWUTableApproveBtn)

                    const wsAWUTableRejectBtn = document.createElement('button')
                    wsAWUTableRejectBtn.setAttribute('type', 'button')
                    wsAWUTableApproveBtn.setAttribute('id', 'workshop-manage-applywaituser-reject-button')
                    wsAWUTableRejectBtn.setAttribute('onclick', "workshop_apply_result("+data['workshop_apply'][i]['guest']+", '거절')")
                    wsAWUTableRejectBtn.innerText = '거절'
                    wsAWUTableRejectNum.appendChild(wsAWUTableRejectBtn)
                }
            }
        })
}
wsManageApplyWait_fuc()

// 승인. 거절 처리
async function workshop_apply_result(guest_id, result) {
    const response = await apply_result_put(workshop_id, guest_id, result)

    if(response.status == 200){
        data = await response.json()
        window.location.reload()
        alert(`${result}이 완료되었습니다.`)
    }
}

// 참여확정자의 목록 데이터 불러오기
async function wsManageConfirmedUser() {
    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/apply/`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("access")
            },
            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            // 네비게이션바에서 '참여 확정자' 버튼 클릭 시 색상 변경
            wsApplyWaitNav.className = 'flex-sm-fill text-sm-center nav-link'
            wsApplyConfirmedNav.className = 'flex-sm-fill text-sm-center nav-link active'

            const tempWSApplyWait = document.getElementById('workshop-manage-applywaituser')
            if (tempWSApplyWait) {
                tempWSApplyWait.remove()
            }
            const tempWSConfUser = document.getElementById('workshop-manage-conf-user')
            if (tempWSConfUser) {
                tempWSConfUser.remove()
            }

            // '참여 확정자' div 작성
            const wsConfUser = document.createElement('div')
            wsConfUser.setAttribute('class', 'workshop-manage-conf-user')
            wsConfUser.setAttribute('id', 'workshop-manage-conf-user')
            wsManageRightSide.appendChild(wsConfUser)

            const wsConfUserTitle = document.createElement('div')
            wsConfUserTitle.setAttribute('class', 'workshop-manage-conf-user-title')
            wsConfUserTitle.setAttribute('id', 'workshop-manage-conf-user-title')
            wsConfUserTitle.innerText = '참여 확정자'
            wsConfUser.appendChild(wsConfUserTitle)

            const wsConfUserContent = document.createElement('div')
            wsConfUserContent.setAttribute('class', 'workshop-manage-conf-user-content')
            wsConfUserContent.setAttribute('id', 'workshop-manage-conf-user-content')
            wsConfUser.appendChild(wsConfUserContent)

            const wsConfUserTable = document.createElement('table')
            wsConfUserTable.setAttribute('class', 'workshop-manage-conf-user-table table table-hover')
            wsConfUserTable.setAttribute('id', 'workshop-manage-conf-user-table')
            wsConfUserContent.appendChild(wsConfUserTable)

            const wsConfUserTableThead = document.createElement('thead')
            wsConfUserTableThead.setAttribute('class', 'workshop-manage-conf-user-table-thead-sort')
            wsConfUserTableThead.setAttribute('id', 'workshop-manage-conf-user-table-thead-sort')
            wsConfUserTable.appendChild(wsConfUserTableThead)

            const wsConfUserTableTr = document.createElement('tr')
            wsConfUserTableTr.setAttribute('class', 'workshop-manage-conf-user-table-tr-sort')
            wsConfUserTableTr.setAttribute('id', 'workshop-manage-conf-user-table-tr-sort')
            wsConfUserTableThead.appendChild(wsConfUserTableTr)

            const wsConfUserTableThName = document.createElement('th')
            wsConfUserTableThName.setAttribute('class', 'workshop-manage-conf-user-table-th-name-sort')
            wsConfUserTableThName.setAttribute('id', 'workshop-manage-applywaituser-table-th-name-sort')
            wsConfUserTableThName.innerText = '사용자명'
            wsConfUserTableTr.appendChild(wsConfUserTableThName)

            const wsConfUserTableChat = document.createElement('th')
            wsConfUserTableChat.setAttribute('class', 'workshop-manage-conf-user-table-th-chat-sort')
            wsConfUserTableChat.setAttribute('id', 'workshop-manage-conf-user-table-th-chat-sort')
            wsConfUserTableChat.innerText = '채팅'
            wsConfUserTableTr.appendChild(wsConfUserTableChat)

            // '참여 확정자' 항목 리스트 작성
            for (i = 0; i < data['workshop_apply'].length; i++) {
                if (data['workshop_apply'][i]['result'] == '승인') {

                    const wsConfUserTableTheadNum = document.createElement('thead')
                    wsConfUserTableTheadNum.setAttribute('class', 'workshop-manage-conf-user-table-thead')
                    wsConfUserTableTheadNum.setAttribute('id', 'workshop-manage-conf-user-table-thead-' + (i + 1))
                    wsConfUserTable.appendChild(wsConfUserTableTheadNum)

                    const wsConfUserTableTrNum = document.createElement('tr')
                    wsConfUserTableTrNum.setAttribute('class', 'workshop-manage-conf-user-table-tr')
                    wsConfUserTableTrNum.setAttribute('id', 'workshop-manage-conf-user-table-tr-' + (i + 1))
                    wsConfUserTableThead.appendChild(wsConfUserTableTrNum)

                    const wsConfUserTableThNameNum = document.createElement('th')
                    wsConfUserTableThNameNum.setAttribute('class', 'workshop-manage-conf-user-table-th-name')
                    wsConfUserTableThNameNum.setAttribute('id', 'workshop-manage-conf-user-table-th-name' + (i + 1))
                    wsConfUserTableThNameNum.innerText = data['workshop_apply'][i]['guest_nickname']
                    wsConfUserTableTrNum.appendChild(wsConfUserTableThNameNum)

                    const wsConfUserTableChatNum = document.createElement('th')
                    wsConfUserTableChatNum.setAttribute('class', 'workshop-manage-conf-user-table-th-chat')
                    wsConfUserTableChatNum.setAttribute('id', 'workshop-manage-conf-user-table-th-chat' + (i + 1))
                    wsConfUserTableChatNum.innerText = '대화하기'
                    wsConfUserTableChatNum.setAttribute('onclick', 'wsManageConfirmedApprove()')
                    wsConfUserTableTrNum.appendChild(wsConfUserTableChatNum)
                }
            }
        })
}
