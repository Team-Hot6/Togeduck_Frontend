const mypageRightSide = document.createElement('div')
mypageRightSide.setAttribute('class', 'mypage-rightside')
document.body.prepend(mypageRightSide)

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
    console.log("현재 버튼을 클릭한 상태입니다."); // 버튼이 눌러지고 있는 지 확인 필수
    const id = localStorage.getItem("payload")
    const id_json = JSON.parse(id)

    const response = await fetch('http://127.0.0.1:8000/users/' + 2 + '/hobby/', {

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

    const response = await fetch('http://127.0.0.1:8000/users/' + 2 + '/apply/', {

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

            const awTable = document.createElement('table')
            awTable.setAttribute('class', 'mypage-appliedworkshop-table table table-hover')
            awContent.appendChild(awTable)

            const awTableThead = document.createElement('thead')
            awTableThead.setAttribute('id', 'mypage-appliedworkshop-table-thead-sort')
            awTable.appendChild(awTableThead)

            const awTableTr = document.createElement('tr')
            awTableTr.setAttribute('id', 'mypage-appliedworkshop-table-tr-sort')
            awTableThead.appendChild(awTableTr)

            const awTableThName = document.createElement('th')
            awTableThName.setAttribute('id', 'mypage-appliedworkshop-table-th-name-sort')
            awTableThName.innerText = '워크샵명'
            awTableTr.appendChild(awTableThName)

            const awTableThWait = document.createElement('th')
            awTableThWait.setAttribute('id', 'mypage-appliedworkshop-table-th-wait-sort')
            awTableThWait.innerText = '신청일'
            awTableTr.appendChild(awTableThWait)

            const awThStatus = document.createElement('th')
            awThStatus.setAttribute('id', 'mypage-appliedworkshop-table-th-stats-sort')
            awThStatus.innerText = '신청현황'
            awTableTr.appendChild(awThStatus)


            for (i = 0; i < data["workshop_host"].length; i++) {

                console.log(data)

                const awTableTheadNum = document.createElement('thead')
                awTableTheadNum.setAttribute('id', 'mypage-appliedworkshop-table-thead-' + (i + 1))
                awTable.appendChild(awTableTheadNum)

                const awTableTrNum = document.createElement('tr')
                awTableTrNum.setAttribute('id', 'mypage-appliedworkshop-table-tr-' + (i + 1))
                awTableThead.appendChild(awTableTrNum)

                const awTableThNameNum = document.createElement('th')
                awTableThNameNum.setAttribute('id', 'mypage-appliedworkshop-table-th-name' + (i + 1))
                awTableThNameNum.innerText = data["workshop_host"][i]["title"]
                awTableTrNum.appendChild(awTableThNameNum)

                const awTableThWaitNum = document.createElement('th')
                awTableThWaitNum.setAttribute('id', 'mypage-appliedworkshop-table-th-wait' + (i + 1))
                awTableThWaitNum.innerText = data["workshop_host"][i]["date"]
                awTableTrNum.appendChild(awTableThWaitNum)

                const awTableThStatusNum = document.createElement('th')
                awTableThStatusNum.setAttribute('id', 'mypage-appliedworkshop-table-th-status' + (i + 1))
                awTableThStatusNum.innerText = data["workshop_host"][i]["content"]
                awTableTrNum.appendChild(awTableThStatusNum)
            }
        })
}


async function myPageCreatedWorkshop_fuc() {
    console.log("현재 버튼을 클릭한 상태입니다."); // 버튼이 눌러지고 있는지 확인 필수
    const id = localStorage.getItem("payload")
    const id_json = JSON.parse(id)

    console.log("실행중~~~")

    const response = await fetch('http://127.0.0.1:8000/users/' + 2 + '/apply/', {

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


            // '신청 워크샵' div 작성
            const cw = document.createElement('div')
            cw.setAttribute('class', 'mypage-appliedworkshop')
            cw.setAttribute('id', 'mypage-appliedworkshop')
            mypageRightSide.appendChild(cw)

            const cwTitle = document.createElement('div')
            cwTitle.setAttribute('class', 'mypage-appliedworkshop-title')
            cwTitle.setAttribute('id', 'mypage-appliedworkshop-title')
            cwTitle.innerText = '생성 워크샵'
            cw.appendChild(cwTitle)

            const cwContent = document.createElement('div')
            cwContent.setAttribute('class', 'mypage-appliedworkshop-content')
            cwContent.setAttribute('id', 'mypage-appliedworkshop-content')
            cw.appendChild(cwContent)

            const cwTable = document.createElement('table')
            cwTable.setAttribute('class', 'mypage-appliedworkshop-table table table-hover')
            cwContent.appendChild(cwTable)

            const cwTableThead = document.createElement('thead')
            cwTableThead.setAttribute('id', 'mypage-appliedworkshop-table-thead-sort')
            cwTable.appendChild(cwTableThead)

            const cwTableTr = document.createElement('tr')
            cwTableTr.setAttribute('id', 'mypage-appliedworkshop-table-tr-sort')
            cwTableThead.appendChild(cwTableTr)

            const cwTableThName = document.createElement('th')
            cwTableThName.setAttribute('id', 'mypage-appliedworkshop-table-th-name-sort')
            cwTableThName.innerText = '워크샵명'
            cwTableTr.appendChild(cwTableThName)

            const cwTableThWait = document.createElement('th')
            cwTableThWait.setAttribute('id', 'mypage-appliedworkshop-table-th-wait-sort')
            cwTableThWait.innerText = '신청대기'
            cwTableTr.appendChild(cwTableThWait)

            const cwThStatus = document.createElement('th')
            cwThStatus.setAttribute('id', 'mypage-appliedworkshop-table-th-stats-sort')
            cwThStatus.innerText = '모집현황'
            cwTableTr.appendChild(cwThStatus)


            for (i = 0; i < data["member"].length; i++) {

                console.log(data)

                const cwTableTheadNum = document.createElement('thead')
                cwTableTheadNum.setAttribute('id', 'mypage-appliedworkshop-table-thead-' + (i + 1))
                cwTable.appendChild(cwTableTheadNum)

                const cwTableTrNum = document.createElement('tr')
                cwTableTrNum.setAttribute('id', 'mypage-appliedworkshop-table-tr-' + (i + 1))
                cwTableThead.appendChild(cwTableTrNum)

                const cwTableThNameNum = document.createElement('th')
                cwTableThNameNum.setAttribute('id', 'mypage-appliedworkshop-table-th-name' + (i + 1))
                cwTableThNameNum.innerText = data["member"][i]["title"]
                cwTableTrNum.appendChild(cwTableThNameNum)

                const cwTableThWaitNum = document.createElement('th')
                cwTableThWaitNum.setAttribute('id', 'mypage-appliedworkshop-table-th-wait' + (i + 1))
                cwTableThWaitNum.innerText = data["member"][i]["date"]
                cwTableTrNum.appendChild(cwTableThWaitNum)

                const cwTableThStatusNum = document.createElement('th')
                cwTableThStatusNum.setAttribute('id', 'mypage-appliedworkshop-table-th-status' + (i + 1))
                cwTableThStatusNum.innerText = data["member"][i]["content"]
                cwTableTrNum.appendChild(cwTableThStatusNum)
            }
        })
}