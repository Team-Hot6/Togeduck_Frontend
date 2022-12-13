
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workshop_id = urlParams.get('id');
    workshop_detail_view(workshop_id)
    workshop_review_view(workshop_id)
    console.log(window.location.search,'++++++++++')
    console.log(workshop_id,'5555555555')
    
}
console.log(window.location.search,'7777777777')

const urlParams = new URLSearchParams(window.location.search);
const workshop_id = urlParams.get('id');

console.log(urlParams,"_______________")
console.log(workshop_id,'==========')


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
                        <div id="user"  style="font-size:15px" class="comment-header">${user}</div>
                        <input style="color : #046582;" type=text value="${review}" id="review" class="comment-body">
                        <p style="font-size:11px" id="created_at">${created_at}</p>
                        <p style="font-size:11px" id="updated_at">${updated_at}</p>
                        <div class="comment-footer">
                          <button type="button" onclick="review_delete(${data[i].id})">삭제버튼</button>
                          <button  onclick="review_put(${data[i].id})" > 수정버튼</button>
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
   
    console.log('뭐크샵아이디',workshop_id)

  
    //workshop_id = location.href.split("?")[1].split("=")[1]

    console.log(workshop_id,'뭐누')

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
    location.reload()
    //workshop_detail_view(workshop_id)
}




//리뷰 수정
async function review_put(id){
    
    
    review_id = id

    console.log('ㅅㅂ',workshop_id)
    console.log('수정 리뷰아이디 나와',review_id)

    const content = document.getElementById("review").value
    console.log('수정 톤텐트',content)

    const response = await workshop_review_put(workshop_id,review_id,content)

    if (response.status == 200){
      
      alert("댓글을 수정 했습니다.")
      }
    else{
      alert(response.status,'수정이 왜 안 되느냐')
    }
    window.location.reload()
  }




// 리뷰 삭제
async function review_delete(id) {

   

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



// function like(){
//   console.log("찍히긴 하니")

//   if($(this).hasClass('btn_unlike')){
//     $(this).removeClass('btn_unlike');
//     $('.ani_heart_m').removeClass('hi');
//     $('.ani_heart_m').addClass('bye');
//   }
//   else{
//     $(this).addClass('btn_unlike');
//     $('.ani_heart_m').addClass('hi');
//     $('.ani_heart_m').removeClass('bye');
//   }

// const update_button = document.getElementById("liked");
// update_button.setAttribute("onclick", "Like_post(workshop_id)");

// }




// 좋아요 
async function Like_post(workshop_id) {
    
    workshop_id = location.href.split("?")[1].split("=")[1]
    console.log(workshop_id,'잉게 맞ㄴ다고요')
    const response = await workshop_like(workshop_id)
        
    console.log('좋아요 리스폰스',response)

    if (response.status == 200) {
    
    data = await response.json()
    console.log(data['msg'],"-ㅅ-")
   
    alert(`${data['msg']}`)
    
    //console.log(review_id,'좋아요 아이디 보기')
    // $('button').click(function(){
    //   if($(this).hasClass('btn_unlike')){
    //     $(this).removeClass('btn_unlike');
    //     $('.ani_heart_m').removeClass('hi');
    //     $('.ani_heart_m').addClass('bye');
    //   }
    //   else{
    //     $(this).addClass('btn_unlike');
    //     $('.ani_heart_m').addClass('hi');
    //     $('.ani_heart_m').removeClass('bye');
    //   }
    // });

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





// 워크샵 작성
async function workshop_post() {

    console.log('워크샵 작성하고싶어요 ㅇㅅㅇ')

    const content = document.getElementById("content").value
    //const workshop_image = document.getElementById("img").files[0];
    const workshop_image = document.getElementById("getval").files[0];
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const max_guest = document.getElementById("max_guest").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value;
    const address = document.getElementById("address").value;


    const formData = new FormData();

    console.log(title);
    console.log(content);
    console.log(workshop_image);
    console.log(parseInt(max_guest));
    console.log(parseInt(amount));
    console.log(parseInt(category));
    console.log(parseInt(location));
    console.log(address);
    console.log(date);
    


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
            //'content-type':'application/json',
            Authorization : "Bearer " + localStorage.getItem("access")
        },
        
        method:'POST',

        body: formData
    })

    console.log(response,'리스폰승ㅅㅇ??')

    if (response.status == 200) {
      alert("★업로드 완료★");
      window.location.replace("http://127.0.0.1:5501/templates/main/workshop.html")
      //window.location.replace(`${frontend_base_url}/image.html`);
      //window.location.href = "http://127.0.0.1:5500/main.html";
  
      
    }
    else{
      alert(response.status);
    }
    //return response.json();
    
    //window.location.replace(`${frontend_base_url}/image.html`)
}



function PUT_Button() {
  console.log('수정페이지로 이동하라고이ㅏㄹㄴ아ㅣ로니')
  let edit_link = window.location.search.split('?')[1]
  window.location.replace(`http://127.0.0.1:5501/templates/main/workshop_put.html?${edit_link}`);
}

//워크샵 수정
async function workshop_put(workshop_id){
    console.log('버튼이 눌리낭ㄹㅇㄴㄹㄴㅇㄴ')
   
    //workshop_id = getCookie("workshop_id")
    //workshop_id = location.href.split("?")[1].split("=")[1]
    console.log(workshop_id,'워크샵 수정 아디이')

    const content = document.getElementById("content").value
    const workshop_image = document.getElementById("img").files[0];
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const max_guest = document.getElementById("max_guest").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category_id").value;
    const location = document.getElementById("location_id").value;
    const address = document.getElementById("address").value;


    const formData = new FormData();

    console.log(title);
    console.log(title);
    console.log(workshop_image);
    console.log(parseInt(max_guest));
    console.log(parseInt(amount));
    console.log(parseInt(category));
    console.log(parseInt(location));
    console.log(address);
    console.log(date);


    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("workshop_image", workshop_image);
    formData.append("max_guest", max_guest);
    formData.append("amount", amount);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("address", address);


    const response = await fetch(`http://127.0.0.1:8000/workshops/${workshop_id}/`, {
      headers:{
      
      Authorization: "Bearer " + localStorage.getItem("access")
      },

      method: "PUT",
      body: formData
      
    })
    if (response.status == 200){
      alert("워크샵 수정 됐습니다")
      window.location.replace("http://127.0.0.1:5501/templates/main/workshop.html")
      }
    else{
      alert(response.status)
    }
    
  }

 




// 워크샵 삭제
async function workshop_DELETE(workshop_id) {
    
    

    const response = await workshop_delete(workshop_id)
    if (response.status == 204){
        alert("워크샵을 삭제 했습니다.")
        }
      else{
        alert("워크샵 작성자가 아닙니다")
      }
      window.location.replace("http://127.0.0.1:5501/templates/main/workshop.html")
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



//workshop_detail_view(workshop_id)



 //리뷰 보이기 숨기기 
// document.getElementById("list").style.visibility = "hidden"; 

// function getShow(){
// 	alert("display : 공백");
// 	document.getElementById("list").style.display = "";
//     const list = document.getElementById("list");
//     list.style.visibility = "visible";
	
// }

// function getHide(){
// 	alert("display : none");
// 	document.getElementById("list").style.display = "none";
	
// }



// 포스팅
// $("document").ready(function () {

//   var textmax=500;
 
//   $("#count").text(textmax + ' character left');
  
//   $("#bio").keyup(function(){
      
//       var userlenght= $("#bio").val().length;
      
//       var remain= textmax - userlenght ;

//       $("#count").text(remain + ' characters left');
      
//   });
  
// });

// document.getElementById('getval').addEventListener('change', readURL, true);
// function readURL(){
//   var file = document.getElementById("getval").files[0];
//   var reader = new FileReader();
//   reader.onloadend = function(){
//       document.getElementById('profile-upload').style.backgroundImage = "url(" + reader.result + ")";        
//   }
//   if(file){
//       reader.readAsDataURL(file);
//   }else{
//   }
// }

// $(function () {
// var $text = $('#texte');
// var $input = $('.texte');
// $input.on('keydown', function () {
//   setTimeout(function () {
//     $text.html($input.val());
//   }, 0);
// });
// })