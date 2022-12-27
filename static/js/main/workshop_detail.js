window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workshop_id = urlParams.get('id');
    workshop_detail_view(workshop_id)
    workshop_review_view(workshop_id)
}

const urlParams = new URLSearchParams(window.location.search);
const workshop_id = urlParams.get('id');

// 워크샵 상세 데이터 불러오기
async function workshop_detail_view(workshop_id) {
    const response = await workshop_detail_get(workshop_id)

    if (response.status == 200) {
        data = await response.json()

        const title = document.getElementById("title") // 소개
        const max_guest = document.getElementById("max_guest") // 제한인원
        const amount = document.getElementById("amount") // 참가비
        const content = document.getElementById("content") // 내용
        const workshop_image = document.getElementById("workshop_image") // 이미지
        const category = document.getElementById("category") // 카테고리
        const location = document.getElementById("location") // 지역
        const host = document.getElementById("host") // 호스트
        const likes_count = document.getElementById("likes_count") // 좋아요 수
        const participant_count = document.getElementById("participant_count") // 참가인원
        const date = document.getElementById("date") // 워크샵 날짜
        //const address2 = document.getElementById("address2") // 상세주소2
        //const address1 = document.getElementById("address") // 주소1
        const address = document.getElementById("address") // 주소 = 주소1 + 상세주소2
        const review_workshop_count = document.getElementById("review_workshop_count") // 리뷰 개수

        title.innerText = data.title;
        content.innerText = data.content;
        max_guest.innerText = data.max_guest;
        amount.innerText = data.amount;
        workshop_image.setAttribute("src", `${back_end_url}${data.workshop_image}`);
        category.innerText = data.category;
        location.innerText = data.location;
        host.innerText = data.host;
        likes_count.innerText = data.likes_count;
        participant_count.innerText = data.participant_count;
        review_workshop_count.innerText = data.review_workshop_count

        const today = new Date(data.date)
        var options = { hour: "numeric", minute: "numeric" };
        date.innerText = today.toLocaleDateString() + ' ' + today.toLocaleString("ko-kr", options)

        //address1.innerText = data.address;
        //address2.innerText = data.address2;
        address.innerText = data.address + ' ' + data.address2 // 주소


        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
geocoder.addressSearch(`${data.address}`, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });
        // console.log(result[0]['address_name'],'도로명')
        // console.log(result[0]['address']['address_name'],'주소명')
        // console.log(result[0]['road_address'],'도로명 제이슨')
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${result[0]['address_name']}</div>
            <div style="width:150px;text-align:center;padding:6px 0;">${result[0]['address']['address_name']}</div>`
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
});    






        // 로그인 사용자의 닉네임
        const payload = localStorage.getItem("payload");
        const payload_parse = JSON.parse(payload)

        // 로그인 사용자와 워크샵의 호스트가 동일인물이 아니라면 <문의하기> 버튼을 출력한다
        if (payload_parse.user_id != data.host_id) {
            const chat_button_label = document.getElementById("chat_button_wrap")
            chat_button_label.innerHTML = `<button type="button" class="chat_user_button" id="chat_button" onclick="click_user_chat(${data.host_id})">문의하기</button>`
        }

        const put_delete_box = document.getElementById("put_delete_box")

        if (payload_parse.user_id == data.host_id) {
            put_delete_box.innerHTML = `<button onclick="PUT_Button()">수정</button>
                                        <button type="button" onclick="workshop_DELETE(workshop_id)">삭제</button>`
        } else {
            participant_id_list = data["participant"]
            login_user_id = payload_parse.user_id

            if (participant_id_list.includes(login_user_id) == true) {
                put_delete_box.innerHTML = `<button type="button" onclick="workshop_apply_for(${workshop_id})">워크샵 신청 취소</button>`

            } else {
                put_delete_box.innerHTML = `<button type="button" onclick="workshop_apply_for(${workshop_id})">워크샵 신청</button>`
            }
        }

        const likes = document.getElementById("liked") // 좋아요
        if (data['likes'].includes(payload_parse.user_id)) {
            
              
                $(likes).addClass('btn_unlike');
                $('.ani_heart_m').addClass('hi');
                $('.ani_heart_m').removeClass('bye');
              
            //likes.classList.add('btn_unlike')
        } else {
            $(likes).hasClass('btn_unlike')
                $(likes).removeClass('btn_unlike');
                $('.ani_heart_m').removeClass('hi');
                $('.ani_heart_m').addClass('bye');
              
            //likes.classList.remove('btn_unlike')
        }

    }
}


// 워크샵 신청 접수하기 + 신청 철회
async function workshop_apply_for(workshop_id) {
    const response = await workshop_apply_post(workshop_id)

    if (response.status == 200) {
        data = await response.json()
        window.location.reload()
        alert(data['msg'])
    }
}

// 워크샵 리뷰 보기
async function workshop_review_view(workshop_id) {

    const response = await workshop_review_get(workshop_id)

    if (response.status == 200) {
        data = await response.json()
        const list = document.getElementById("list")

        for (let i = 0; i < data.length; i++) {

            const review = data[i].content
            const user = data[i].user
            
            //const created_at = data[i].created_at 생성일 데이터
            //const created_at = new Date(data[i].created_at).toLocaleString("ko-kr") 생성일 날짜 
            //<p style="font-size:10px" id="created_at">${created_at}</p> 생성일 태그
            const updated_at = new Date(data[i].updated_at).toLocaleString("ko-kr")

            const new_review = `
                      <div id="review_list(${data[i].id})" class="comment">
                        <div id="user"  style="font-size:15px" class="comment-header">${user}</div>
                        
                        
                        <p style="font-size:10px" id="updated_at">${updated_at}</p>
                        <div id="id_${data[i].id}"  style="font-size:15px" class="comment-header">
                        <p id="update_button(${data[i].id})"  style="font-size:15px" class="comment-header">${review}</p>
                        <button  id="update(${data[i].id})" type="button" onclick="updateMode(${data[i].id})" > 수정</button>
                        <button  id="put_btn(${data[i].id})" type="button" onclick="review_put(${data[i].id})" > 수정완료</button>

                        <button id="delete_btn(${data[i].id})" type="button" onclick="review_delete(${data[i].id})">삭제</button>
                        </div>
                      </div>
                    `

            list.insertAdjacentHTML("beforeend", new_review)

            // <input style="color : #046582;" id="update_button(${data[i].id})" class="comment-body" value=" ${review}"> // 인풋박스
            //<button  id="update(${data[i].id})" type="button" onclick="updateMode(${data[i].id})" > 수정하기</button> // 수정화면 버튼
            //<div id="comment-footer${data[i].id}" class="comment-footer" ></div>
            //const update_btn = document.getElementById(`comment-footer${data[i].id}`)
            const put_btn = document.getElementById(`put_btn(${data[i].id})`)
            const update = document.getElementById(`update(${data[i].id})`)
            const delete_btn = document.getElementById(`delete_btn(${data[i].id})`)
            
            const payload = localStorage.getItem("payload");
            
            //put_btn.style.display = "none"
            if (payload == null){
                put_btn.style.display = "none"
                update.style.display = "none"
                delete_btn.style.display = "none" 
            }else{ 
                const payload_parse = JSON.parse(payload)
                user_id = payload_parse.user_id

                if (user_id != data[i].user_id || payload == null) {

                    //update_btn.style.display = "none"
                    put_btn.style.display = "none"
                    update.style.display = "none"
                    delete_btn.style.display = "none"
                }
            }
        }
    }
}


// 리뷰 수정 화면 
function updateMode(id) {

    const update_ = document.getElementById(`update(${id})`); //수정하기 버튼
    update_.style.visibility = "hidden" // 수정 버튼 숨기기

    //const content = document.getElementById(`update_button(${id})`) // 원래 리뷰 내용
    const content = document.getElementById(`update(${id})`).previousElementSibling // 수정하기 버튼의 위에 노드 내용 가져옴 
    content.style.visibility = "hidden"; // 원래 내용 박스 숨기기

    const input_content = document.createElement("textarea"); // 수정할 수 있는 입력창
    input_content.setAttribute("id", `input_content${id}`); // 수정 내용
    //input_content.setAttribute("placeholder", "수정할 내용을 입력해주세요")
    input_content.value = content.innerHTML// 수정전 내용 보여주기 // input->value div-> innerHTML
    input_content.rows = 3;
    
    // const update_button = document.createElement("button") // 수정 완료 버튼 
    // update_button.setAttribute("id", `put${id}`)
    // update_button.setAttribute("type", "button")
    // update_button.setAttribute("onclick", "review_put(id)")
    // update_button.innerText = '수정 완료'

    const update_delete = document.createElement("button") // 수정 취소 버튼 생성
    update_delete.setAttribute("id", `${id}`)
    update_delete.setAttribute("onclick", "update_delete(id)")
    update_delete.innerText = '수정 취소'

    const reviews_list = document.getElementById(`id_${id}`); // 넣을 댓글 리스트-> div id
    reviews_list.insertBefore(input_content, content); // 원래 내용 -> 수정 내용 바꿈
    reviews_list.appendChild(update_delete); // 리스트에 수정취소 버튼 붙여줌 (수정 버튼 누르면 나타나게)
    //reviews_list.appendChild(update_button)
    

    //update_.style.visibility = "visible"
    //update_.setAttribute("onclick", "updateMode(id)");
    
    // 업데이트 버튼을 가져오고 클릭시 review_put(id) 함수 실행
}

// 수정 취소
function update_delete(id){
   
    const inputCommentContent = document.getElementById(`input_content${id}`) // 수정 텍스트
    inputCommentContent.remove() // 수정할 텍스트 박스 제거
    
    const commentContent = document.getElementById(`update_button(${id})`) // 수정 전 텍스트
    commentContent.style.visibility = "visible" // 수정 전 텍스트 보여주기

    const delete_button = document.getElementById(`${id}`) // 수정취소 버튼
    delete_button.remove() // 수정취소버튼 반복 안 되게 삭제

    const update_ = document.getElementById(`update(${id})`); //수정하기 버튼
    update_.style.visibility = "visible" // 수정 버튼 다시 보여주기
}
//리뷰 수정
async function review_put(id) {

    review_id = id
    //const content = document.getElementById(`update_button(${id})`).value // input 박스 
    const content = document.getElementById(`input_content${id}`).value // 수정된 텍스트 박스
    const response = await workshop_review_put(workshop_id, review_id, content)

    // const content_previous = document.getElementById(`update(${id})`).previousElementSibling // 
    // content_previous.style.visibility = "visible" // 원래 내용 보이기

    // const content_update = document.getElementById(`update(${id})`)
    // content_update.setAttribute("onclick", "updateMode(id)")
    //content.remove()

    if (response.status == 200) {

        alert("댓글을 수정 했습니다.")
    } else {
        alert("작성자가 아닙니다")
    }
    window.location.reload()
}

// 리뷰 작성
async function workshop_review_POST(workshop_id) {

    const review_post = document.getElementById("review_post").value

    const response = await workshop_review_post(workshop_id, review_post)

    if (response.status == 200) {
        alert('댓글이 작성되었습니다.')
    } else if (response.status == 401) {
        alert('로그인 후 이용해 주세욤')
    }
    location.reload()
}

// 리뷰 삭제
async function review_delete(id) {
    review_id = id
    const response = await workshop_review_delete(workshop_id, review_id)

    if (response.status == 403) {
        alert("댓글 작성자가 아닙니다")
    } else {
        alert("댓글을 삭제했습니다")
    }
    window.location.reload()
}

// 좋아요 
async function Like_post(workshop_id) {

    workshop_id = location.href.split("?")[1].split("=")[1]
    const response = await workshop_like(workshop_id)

    if (response.status == 200) {

        data = await response.json()
  
        alert(`${data['msg']}`)

    } else if (response.status == 401) {
        alert('로그인을 해주세요');
    } else {
        alert(response.status);
    }
    location.reload()
}

// 썸네일 프리뷰
var number = 1;
do {
    function showPreview(event, number) {
        if (event.target.files.length > 0) {
            let src = URL.createObjectURL(event.target.files[0]);
            let preview = document.getElementById("file-ip-" + number + "-preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }

    function myImgRemove(number) {
        document.getElementById("file-ip-" + number + "-preview").src =
            "https://i.ibb.co/ZVFsg37/default.png";
        document.getElementById("file-ip-" + number).value = null;
    }
    number++;
} while (number < 5);


// 워크샵 생성, 수정 시 입력값 실시간 검증
async function info_check(obj) {

    if (obj.id == "address"){
        const address_check = document.getElementById("address_check")
        if (obj.value.length > 20){
            address_check.style.display = "block";
            address_check.innerText = "20자이내로 작성해주세요"   
        }else{
            address_check.style.display = "none";
        }
    }

    if (obj.id == "title"){
        const title_check = document.getElementById("title_check")
        if (obj.value.length > 20){
            title_check.style.display = "block";
            title_check.innerText = "20자이내로 작성해주세요"        
        }else{
            title_check.style.display = "none";
        }
    }

    if (obj.id == "amount"){
        const amount_check = document.getElementById("amount_check")
        if (obj.value > 1000000){
            amount_check.style.display = "block";
            amount_check.innerText = "100만원 이내로 작성해주세요"        
        }else if(obj.value < 0){
            amount_check.style.display = "block";
            amount_check.innerText = "음수가 아닌 정수로 입력해주세요" 
        }else{
            amount_check.style.display = "none";
        }
    }

    if (obj.id == "max_guest"){
        const max_guest_check = document.getElementById("max_guest_check")
        if (obj.value > 100 || obj.value == 0){
            max_guest_check.style.display = "block";
            max_guest_check.innerText = "1명 이상 100명 미만으로 작성해주세요"        
        }else if(obj.value < 0){
            max_guest_check.style.display = "block";
            max_guest_check.innerText = "음수가 아닌 정수로 입력해주세요" 
        }else{
            max_guest_check.style.display = "none";
        }
    }

    if (obj.id == "content"){
        const content_check = document.getElementById("content_check")
        if (obj.value.length > 500 ){
            content_check.style.display = "block";
            content_check.innerText = "500자 이내로 내용을 작성해주세요"        
        }
    }
}


// 워크샵 작성
async function workshop_post() {

    const content = document.getElementById("content").value
    const workshop_image = document.getElementById("imag").files[0];
    const title = document.getElementById("title").value;
    const max_guest = document.getElementById("max_guest").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category_id").value;
    const location = document.getElementById("location_id").value;
    const address1 = document.getElementById("member_addr").value; // 주소 id 변경 address -> member_addr
    const address2 = document.getElementById("address").value; //상세주소
    const date = document.getElementById("date").value;

    if (workshop_image == undefined) {
        return alert("이미지를 업로드해주세요")
    }
    else{
        blank_check = [content, workshop_image, title, max_guest, category, location, address1, address2, date]
        no_write = [undefined, 0, ""]

        for (i = 0; i < no_write.length; i++) {
            result = blank_check.includes(no_write[i])
            if(result == true){
                return alert("빈 항목을 작성해주세요")
            }
        }
    }
    if (max_guest<1 || max_guest>100){
        return alert("모집인원은 1명 이상 100명 이하로 작성해주세요")
    } 
    if(amount<0 || amount>1000000) {
        return alert("참가비는 0원~100만원 이내로 작성 가능합니다")
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("workshop_image", workshop_image);
    formData.append("max_guest", max_guest);
    formData.append("amount", amount);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("address", address1);
    formData.append("address2", address2);

    const response = await fetch(`${back_end_url}/workshops/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: formData
    })

    if (response.status == 200) {
        alert("새로운 워크샵이 생성되었습니다.");
        window.location.replace(`${front_end_url}/workshop.html`)
    } else if (response.status == 401) {
        alert('재로그인이 필요합니다');
    } else if (response.status == 400) {
        alert('작성내용을 다시 확인해주세요');
    }
}

function PUT_Button() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    window.location.href = `${front_end_url}/workshop_put.html?id=${id}`
}

//워크샵 수정
async function workshop_put(workshop_id) {

    const content = document.getElementById("content").value
    const workshop_image = document.getElementById("getval").files[0];
    const title = document.getElementById("title").value;
    const max_guest = document.getElementById("max_guest").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category_id").value;
    const location = document.getElementById("location_id").value;
    const address1 = document.getElementById("member_addr").value; // 주소
    const address2 = document.getElementById("address").value; // 상세주소
    const date = document.getElementById("date").value;

    if (max_guest<1 || max_guest>100){
        return alert("모집인원은 1명 이상 100명 이하로 작성해주세요")
    } 
    if(amount<0 || amount>1000000) {
        return alert("참가비는 0원~100만원 이내로 작성 가능합니다")
    }

    const formData = new FormData();

    if (workshop_image) {
        formData.append("workshop_image", workshop_image);
    }

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("max_guest", max_guest);
    formData.append("amount", amount);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("address", address1);
    formData.append("address2", address2);

    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access")
        },
        method: "PUT",
        body: formData
    })
    if (response.status == 200) {
        alert("워크샵 수정 완료")
        window.location.replace(`${front_end_url}/workshop_detail.html?id=${workshop_id}`)
    } else if (response.status == 401) {
        alert('재로그인이 필요합니다');
    } else if (response.status == 400) {
        alert('작성내용을 다시 확인해주세요');
    }
}

// 워크샵 삭제
async function workshop_DELETE(workshop_id) {
    const response = await workshop_delete(workshop_id)
    if (response.status == 204) {
        alert("워크샵을 삭제 했습니다.")
    } else {
        alert("워크샵 작성자가 아닙니다")
    }
    window.location.replace(`${front_end_url}/workshop.html`)
}

// 리뷰 보이기 / 숨기기
//document.getElementById("list").style.visibility = "hidden";
function showComments() {
    $("#hide").show();
    $("#show").hide();
    $("#list").fadeIn(1000);
    document.getElementById("list").style.display = "";
    const list = document.getElementById("list");
    list.style.visibility = "visible";
}

function hideComments() {
    $("#list").fadeOut(1000, function() {
        $("#hide").hide();
        $("#show").show();
        document.getElementById("list").style.display = "none";
    });
}
$(function() {
    $("#show").bind("click", showComments);
    $("#hide").bind("click", hideComments);
});
