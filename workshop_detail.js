console.log('상세페이지 로딩')

const backend_base_url = "http://127.0.0.1:8000";


// const workshop_id = localStorage.getItem("workshop_id")
// const review_id = localStorage.getItem("review_id")

console.log('워크샵아이디',workshop_id)

// 워크샵 상세페이지
async function workshop_get(workshop_id) {
    
    const title = document.getElementById("title") // 소개
    const max_client = document.getElementById("max_client") // 제한인원
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

    
    
    const response = await fetch(`http://127.0.0.1:8000/workshops/${workshop_id}/`,{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })

    response_json = await response.json()
    console.log('제이슨 리스폰스',response_json)

    title.innerText = response_json.title;
    content.innerText = response_json.content;
    max_client.innerText = response_json.content;
    amount.innerText = response_json.content;
    workshop_image.setAttribute("src", `http://127.0.0.1:8000/${response_json.image}`);
    category.innerText = response_json.content;
    location.innerText = response_json.content;
    host.innerText = response_json.content;
    likes_count.innerText = response_json.content;
    participant_count.innerText = response_json.content;
    date.innerText = response_json.content;
    address.innerText = response_json.content;

   console.log('내가 할 수 있는 건 콘솔로그뿐...')


   
}

// 리뷰 보기
async function review_get(workshop_id) {

    const response = await fetch(`http://127.0.0.1:8000/workshops/${workshop_id}/review/`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access"), // 없어도 되지않나
      },
    });
  
    response_json = await response.json();
      
    console.log('리뷰 데이터',response_json)  

    const review_list = document.getElementById("review_list")

      for (let i=0; i<response_json.length; i++){
          const review = document.getElementById("review")
          review.innerText = response_json[i].content
          review.innerText = response_json[i].user
          review.innerText = response_json[i].created_at
          review.innerText = response_json[i].updated_at
          review_list.appendChild(review)
      }
      

        } 





// 리뷰 작성

async function review_post(workshop_id) {
    const content = document.getElementById("review_post").value

    const response = await fetch(`http://127.0.0.1:8000/workshops/${workshop_id}/review/`,{
        headers:{
            'content-type':'application/json',
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'POST',

        body: JSON.stringify({
            content: content
        })
    })
    window.location.reload()
}



//리뷰 수정
async function review_put(workshop_id,review_id){
    console.log(workshop_id)
    console.log(review_id)

    const content = document.getElementById("review_post").value

    const response = await fetch(`${backend_base_url}/workshops/${workshop_id}/review/${review_id}/`, {
      headers:{
      "content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access")
      },
      method: "PUT",

      body: JSON.stringify({
        content: content
    })
      
    })
    if (response.status == 200){
      alert("댓글을 수정 했습니다.")
      }
    else{
      alert(response.status)
    }
    window.location.reload()
  }




// 리뷰 삭제
async function review_delete(workshop_id,review_id) {

 
    const response = await fetch(`http://127.0.0.1:8000/workshops/${workshop_id}/review/${review_id}/`,{
        headers:{
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'DELETE',
    })

    if (response.status == 200){
        alert("댓글을 삭제 했습니다.")
        }
      else{
        alert(response.status)
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
    const date = document.getElementById("picture").value;
    const max_client = document.getElementById("image_style").value;
    const amount = document.getElementById("image_style").value;
    const category = document.getElementById("image_style").value;
    const location = document.getElementById("image_style").value;
    const address = document.getElementById("image_style").value;


    const formData = new FormData();

    console.log(title);

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("workshop_image", workshop_image);
    formData.append("max_client", max_client);
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
    console.log(workshop_id)
   

    const content = document.getElementById("review_post").value
    const workshop_image = document.getElementById("file-ip-1").files[0];
    const title = document.getElementById("title").value;
    const date = document.getElementById("picture").value;
    const max_client = document.getElementById("image_style").value;
    const amount = document.getElementById("image_style").value;
    const category = document.getElementById("image_style").value;
    const location = document.getElementById("image_style").value;
    const address = document.getElementById("image_style").value;


    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("workshop_image", workshop_image);
    formData.append("max_client", max_client);
    formData.append("amount", amount);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("address", address);


    const response = await fetch(`${backend_base_url}/workshops/${workshop_id}/`, {
      headers:{
      "content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access")
      },

      method: "PUT",
      body: formData
      
    })
    if (response.status == 200){
      alert("워크샵 수정 했습니다")
      }
    else{
      alert(response.status)
    }
    window.location.reload()
  }







// 워크샵 삭제
async function workshop_delete(workshop_id) {
    //workshop_id = workshop_id

    const response = await fetch(`http://127.0.0.1:8000/workshops/${workshop_id}/`,{
        headers:{
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'DELETE',
    })
    if (response.status == 200){
        alert("워크샵을 삭제 했습니다.")
        }
      else{
        alert(response.status)
      }
      window.location.reload()
}



    
// 좋아요 
async function Like_post(workshop_id) {
    const response = await fetch(`${backend_base_url}/${workshop_id}/like/`,{
        headers: {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method: "POST",
      });
  
    if (response.status == 200) {
      response_json = await response.json();
      return response_json;
    } else {
      alert(response.status);
    }
  }
  
//   // 좋아요 취소
//   async function deleteLike(article_id) {
//     const response = await fetch(
//       `${backend_base_url}/articles/${article_id}/like/`,
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//         method: "DELETE",
//       }
//     );
  
//     if (response.status == 200) {
//       response_json = await response.json();
//       return response_json;
//     } else {
//       alert(response.status);
//     }
//   }


$(document).ready(function(){

    /*---------------For onscroll effect---------------*/
    
    // setTimeout(function(){
    //       $(".animate-header").addClass("is-visible");
    //   }, 800);
    //   setTimeout(function(){
    //       $(".animate-parent").addClass("is-visible");
    //   }, 1400);
      
    //   $(window).on("scroll", function(){
          
    //       var winTop = $(this).scrollTop();
          
    //       if(winTop>=80){
    //           $(".animate-header").addClass("is-animate");
    //       }else{
    //           $(".animate-header").removeClass("is-animate");
    //       }
          
    //   });
    
    // /*---------------END: For onscroll effect---------------*/
    
    //   var comment_count = $(".comments").length,
    //       docHt = $(this).height(),
    //       input_val;
      
    //   $(".display-count").text(comment_count);
    //   docHt = docHt - parseInt($(".animate-parent").css("marginTop"));
      
    //   /*----------------For input field----------------*/
  
    //   $(".input-element-wrapper .field-label").on("click", function(){
    //       $(this).parent(".input-element-wrapper").addClass("float-up");
    //       $(this).siblings(".input-wrapper").focus();
    //   });
  
    //   $(".input-element-wrapper .input-wrapper").on("focusout", function(){
    //       input_val = $(this).val();
  
    //       if(input_val == ""){
    //           $(".input-element-wrapper").removeClass("float-up")
    //       }
    //   });
      
    //   $(".input-element-wrapper .input-wrapper").keyup(function(e) {
    //       input_val = $(this).val();
  
    //       if(input_val == ""){
    //           $(this).parents(".input-element-wrapper").removeClass("float-up");
    //           $(this).blur();
    //       }
    //   });
  
    //   /*----------------END: For input field----------------*/
  
      /*----------------For clicked element----------------*/
  
      $(document).on("click", function(e){
          var tar_ele = $(e.target),
              field_val,
              comment_val = $(".comment-field").val();
  
          if(tar_ele.parents().hasClass("comment-box-wrapper")){		//Clicked inside form area
  
              if(tar_ele.hasClass("submit-comment")){					//Add comment
                  field_val = $(".comment-field").val();
                  field_val = $.trim(field_val);
                  $(".comment-box, .open-comment-box").removeClass("active");
                  if(field_val){
                      $(".comment-list").append("<li class='comment-wrapper comments'><p class='comment-wrapper__comment'>"+comment_val+"<div class='comment-actions'><a class='fa fa-times comment-actions__delete delete-comment' href='#'></a></div></p></li>").hide().slideDown();
                      comment_count++;
                      
                      setTimeout(function(){
                          $(".animate-parent").height(docHt);
                      }, 500);
                      
                  }
                      $(".comment-field").val("");
                      $(".display-count").text(comment_count);
  
  
              }else if(tar_ele.hasClass("open-comment-box")){			//Open comment box
                  e.preventDefault();
                  $(".comment-box, .open-comment-box").addClass("active");
                  tar_ele.parents(".comment-box-wrapper").find(".comment-field").focus();
              }
          }else{														//Close comment box; clicked outside form area
              field_val = $(".comment-field").val();
              if(field_val == "")
                  $(".comment-box, .open-comment-box").removeClass("active");
  
              if(tar_ele.hasClass("show-comments")){				//Show comments
                  e.preventDefault();
                  $(".view-more-comments").slideToggle();
                  
                  if(comment_count > 0){
                      $(".animate-parent").height(docHt);
                  }
                  
              }else if(tar_ele.hasClass("delete-comment")){		//Delete comments
                  e.preventDefault();
                  $(".animate-parent").height(docHt);
                  tar_ele.parents(".comments").addClass("delete").fadeOut();
                  setTimeout(function(){
                      comment_count--;
                      $(".display-count").text(comment_count);
                      $(".delete").remove();
                      
                      if(comment_count == 0){
                          $(".view-more-comments").slideToggle();
                      }
                      
                  }, 500);
              }
          }
  
      });
  
      /*----------------END: For clicked element----------------*/
  
      /*---------For not submitting form---------*/
  
      $(".comment-form").submit(function(){
          return false;
      });
  
      /*---------END: For not submitting form---------*/
  
      /*-------------Text area animation-------------*/
  
      $(".field-label").on("click", function(){
          $(this).parents(".another-wrapper").addClass("float-up");
          $(this).parents(".animate-textarea").find(".textarea-wrapper").focus().css("height", "30px");
      });
  
      $(".textarea-wrapper").keyup(function(e) {
          var text_area_ht, text_area_val = $(".text-field-wrapper textarea").val();
  
          while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
              $(this).height($(this).height()+13);
              text_area_ht = $(".text-area-wrapper textarea").height();
              $(".text-field-wrapper").height(text_area_ht);
              $(".text-area-wrapper").css("height", "auto");
          }
  
          if(text_area_val == ""){
              $(".another-wrapper").removeClass("float-up");
              $(".animate-textarea textarea").blur();
              $(".text-field-wrapper").css("height", "auto");
              $(".text-area-wrapper").css("height", "40px");
              $("textarea.textarea-wrapper").css("height", "0px");
          }else{
              $(".animate-textarea").addClass("float-up");
          }
      });
  
      $(".animate-textarea").on("focusout", function(){
          input_val = $(this).find("textarea").val();
  
          if(input_val == ""){
              $(".another-wrapper").removeClass("float-up");
              $(".text-field-wrapper").css("height", "auto");
              $(".text-area-wrapper").css("height", "40px");
              $("textarea.textarea-wrapper").css("height", "0px");
          }
  
      });
  
      /*-------------END: Text area animation-------------*/
  
  });