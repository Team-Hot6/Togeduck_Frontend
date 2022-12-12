window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workshop_id = urlParams.get('id');
    workshop_detail_view(workshop_id)
    workshop_review_view(workshop_id)
    
}

// 워크샵 상세 데이터 불러오기
async function workshop_detail_view(workshop_id){
    //workshop_id = getCookie("workshop_id")

    const response = await workshop_detail_get(workshop_id)
   
    if(response.status == 200){
        data = await response.json()

        console.log('1111111111111111',data)

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
        const address = document.getElementById("address") // 주소

        title.innerText = data.title;
        content.innerText = data.content;
        max_guest.innerText = data.max_guest;
        amount.innerText = data.amount;
        workshop_image.setAttribute("src", `http://127.0.0.1:8000${data.workshop_image}`);
        category.innerText = data.category;
        location.innerText = data.location;
        host.innerText = data.host;
        likes_count.innerText = data.likes_count;
        participant_count.innerText = data.participant_count;
        date.innerText = data.date;
        address.innerText = data.address;
    }
    //window.location.reload()
}

console.log('ㅇㅅㅇ')

// 워크샵 리뷰 보기
async function workshop_review_view(workshop_id){
    //workshop_id = getCookie("workshop_id")

    urlParams = new URLSearchParams(window.location.search);
    workshop_id = urlParams.get('id');

    console.log(workshop_id,'워크샵 아이디...........')
    const response = await workshop_review_get(workshop_id)
   
    if(response.status == 200){
        data = await response.json()

        console.log('리뷰 데이터',data)
        const list = document.getElementById("list")
        //const review_list = document.getElementById("review_list")
        

      for (let i=0; i<data.length; i++){
        
        const review= data[i].content
        const user = data[i].user
        const created_at = data[i].created_at
        const updated_at = data[i].updated_at



        const new_review = `<div id="list" class="comment-list">
                      <div id="review_list" class="comment">
                        <div id="user" class="comment-header">${user}</div>
                        <p id="review" class="comment-body">${review}</p>
                        <span id="created_at">${created_at}</span>
                        <br id="updated_at">${updated_at}</br>
                        <div class="comment-footer">
                          <button onclick="review_delete(${data[i].id})">삭제버튼</button>
                          <button onclick="review_put(${data[i].id})" > 수정버튼</button>
                        </div>
                      </div>
                    </div>`
        
        list.insertAdjacentHTML("beforeend",new_review)

        // const review = document.getElementById("review")
        // const user = document.getElementById("user")
        // const created_at = document.getElementById("created_at")
        // const updated_at = document.getElementById("updated_at")
        // review.innerText = data[i].content
        // user.innerText = data[i].user
        // created_at.innerText = data[i].created_at
        // updated_at.innerText = data[i].updated_at
        
        // review_list.appendChild(review)
        // review_list.appendChild(user)
        // review_list.appendChild(created_at)
        // review_list.appendChild(updated_at)

        // list.append(review_list)



        





          console.log('뭐가 찍히누',review)
          console.log('리뷰리스트',review_list)
          console.log('어떻게 해야 반복문이 나올까',list)


    }
}
//window.location.reload()
}



// 리뷰 작성



async function workshop_review_POST(workshop_id){
    //workshop_id = getCookie("workshop_id")
    console.log('뭐크샵아이디',workshop_id)

    workshop_id = urlParams.get('id')

    const review_post = document.getElementById("review_post").value

    const response = await workshop_review_post(workshop_id, review_post)

    console.log(response,'리스폰스')
    console.log(review_post,'댓글작성 어디다해')
    console.log(review_post.value,'콘텐트 밸류')

    if(response.status == 200){
        alert('댓글 작성 됐습니다')
    
    }
    else{
        alert(response.status,'qtqtqtq') 
    }
    //window.location.reload()
}




//리뷰 수정
async function review_put(id){
    
    //workshop_id = getCookie("workshop_id")
    review_id = id

    console.log('ㅅㅂ',workshop_id)
    console.log('수정 리뷰아이디 나와',review_id)

    const content = document.getElementById("review_post").value
    console.log('수정 톤텐트',content)

    const response = await workshop_review_put(workshop_id,review_id,content)

    if (response.status == 200){
      
      alert("댓글을 수정 했습니다.")
      }
    else{
      alert('왜 안 되는데요?',response.status)
    }
    window.location.reload()
  }




// 리뷰 삭제
async function review_delete(id) {

   // workshop_id = getCookie("workshop_id")

    // const payload = localStorage.getItem("payload");
    // const payload_parse = JSON.parse(payload)
    // review_id = payload_parse.user_id
    //review_id = localStorage.getItem(payload);
    //review_id = getCookie("review_id")
    review_id = id
 
    console.log(workshop_id, '워크샵 삭제')
    console.log(review_id, '리뷰아이디 뭐야')

    const response = await workshop_review_delete(workshop_id,review_id)

    if (response.status == 403){
        alert("댓글 작성자가 아닙니다")
        }
      else{
        alert("댓글을 삭제했습니다")
      }
    window.location.reload()
}




 
// 좋아요 
async function Like_post(workshop_id) {
    //workshop_id = getCookie("workshop_id")
    const response = await workshop_like(workshop_id)
        
    if (response.status == 200) {
        alert('좋아요를 했씁니다');
      
    } else {
      alert(response.status);
    }
    window.location.reload()
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





// 워크샵 작성
async function workshop_post() {

    const content = document.getElementById("review_post").value
    const workshop_image = document.getElementById("file-ip-1").files[0];
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const max_guest = document.getElementById("max_guest").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const address = document.getElementById("address").value;


    const formData = new FormData();

    console.log(title);

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("workshop_image", workshop_image);
    formData.append("max_guest", max_guest);
    formData.append("amount", amount);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("address", address);


    const response = await fetch("http://127.0.0.1:8000/workshops/",{
        headers:{
            'content-type':'application/json',
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'POST',

        body: formData
    })
    window.location.replace(`${frontend_base_url}/image.html`)
}





//워크샵 수정
async function workshop_put(workshop_id){
    
   
    //workshop_id = getCookie("workshop_id")

    const content = document.getElementById("content").value
    const workshop_image = document.getElementById("file-ip-1").files[0];
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const max_guest = document.getElementById("max_guest").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const address = document.getElementById("address").value;


    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("workshop_image", workshop_image);
    formData.append("max_guest", max_guest);
    formData.append("amount", amount);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("address", address);


    const response = await fetch(`${back_end_url}/workshops/${workshop_id}/`, {
      headers:{
      "content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access")
      },

      method: "PUT",
      body: formData
      
    })
    if (response.status == 403){
      alert("워크샵 작성자가 아닙니다")
      }
    else{
      alert(response.status)
    }
    window.location.reload()
  }







// 워크샵 삭제
async function workshop_delete(workshop_id) {
    
    //workshop_id = getCookie("workshop_id")

    const response = await workshop_delete(workshop_id)
    if (response.status == 200){
        alert("워크샵을 삭제 했습니다.")
        }
      else{
        alert(response.status)
      }
      window.location.reload()
}


