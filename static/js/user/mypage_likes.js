const main = document.querySelector("main")
const mypage = document.createElement('div')
mypage.setAttribute('class', 'mypage')
main.appendChild(mypage)



// 로그인 사용자 pk값 가져오기
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)

// 마이페이지 좌측 프로필 사진 부분
const mypageLeftSide = document.createElement('div')
mypageLeftSide.setAttribute('class', 'mypage-leftside')
mypage.appendChild(mypageLeftSide)
myPageProfile_fuc()

async function myPageProfile_fuc() {

    const response = await fetch(`${back_end_url}/users/${payload_parse.user_id}/`, {

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
            profilePartiLike2.setAttribute('onClick', "location.href='./mypage_likes.html'")
            profilePartiLike2.innerText = data['workshop_likes'].length + "개"
            profilePartiLike.appendChild(profilePartiLike2)

        })

}


// 마이페이지 우측 부분
const mypageRightSide = document.createElement('div')
mypageRightSide.setAttribute('class', 'mypage-rightside')
mypage.appendChild(mypageRightSide)
myPageWorkshopLikes_fuc()

async function myPageWorkshopLikes_fuc() {
    const id = localStorage.getItem("payload")
    const id_json = JSON.parse(id)

    const response = await fetch(`${back_end_url}/users/${payload_parse.user_id}/`, {

            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            // '좋아요한 워크샵 모아보기' div 작성
            const toMypageButton = document.createElement('button')
            toMypageButton.setAttribute('class', 'to-mypage')
            toMypageButton.setAttribute('type', 'button')
            toMypageButton.innerText = '마이페이지로'
            toMypageButton.setAttribute('onClick', "location.href='./mypage.html'")
            mypageRightSide.appendChild(toMypageButton)

            const wsLikes = document.createElement('div')
            wsLikes.setAttribute('class', 'mypage-workshop-likes')
            wsLikes.setAttribute('id', 'mypage-workshop-likes')
            mypageRightSide.appendChild(wsLikes)

            const wsLikesTitle = document.createElement('div')
            wsLikesTitle.setAttribute('class', 'mypage-workshop-likes-title')
            wsLikesTitle.setAttribute('id', 'mypage-workshop-likes-title')
            wsLikesTitle.innerText = '좋아요한 워크샵 모아보기'
            wsLikes.appendChild(wsLikesTitle)

            const wsLikesContent = document.createElement('div')
            wsLikesContent.setAttribute('class', 'mypage-workshop-likes-content')
            wsLikesContent.setAttribute('id', 'mypage-workshop-likes-content')
            wsLikes.appendChild(wsLikesContent)

            // 좋아요한 워크샵 카드 불러오기
            for (i = 0; i < data['workshop_likes'].length; i++) {

                const wsLikesCard = document.createElement('div')
                wsLikesCard.setAttribute('class', 'mypage-workshop-likes-card')
                wsLikesCard.setAttribute('id', 'mypage-workshop-likes-card')
                wsLikesContent.appendChild(wsLikesCard)

                const wsLikesCardFrame = document.createElement('div')
                wsLikesCardFrame.setAttribute('class', 'mypage-workshop-likes-card-frame')
                wsLikesCardFrame.setAttribute('id', 'mypage-workshop-likes-card-frame')
                wsLikesCard.appendChild(wsLikesCardFrame)

                const wsLikesCardImg = document.createElement('img')
                wsLikesCardImg.setAttribute('class', 'mypage-workshop-likes-card-img')
                wsLikesCardImg.setAttribute('id', 'mypage-workshop-likes-card-img')
                wsLikesCardImg.setAttribute('src', 'http://127.0.0.1:8000' + data["workshop_likes"][i]['workshop_image'])
                wsLikesCardFrame.appendChild(wsLikesCardImg)

                const wsLikesCardTitle = document.createElement('div')
                wsLikesCardTitle.setAttribute('class', 'mypage-workshop-likes-card-title')
                wsLikesCardTitle.setAttribute('id', 'mypage-workshop-likes-card-title')
                wsLikesCardTitle.innerText = data['workshop_likes'][i]['title']
                wsLikesCard.appendChild(wsLikesCardTitle)

                const wsLikesCardLocation = document.createElement('div')
                wsLikesCardLocation.setAttribute('class', 'mypage-workshop-likes-card-content')
                wsLikesCardLocation.setAttribute('id', 'mypage-workshop-likes-card-content')
                wsLikesCardLocation.innerText = data['workshop_likes'][i]['location']
                wsLikesCard.appendChild(wsLikesCardLocation)
            }
        })
}