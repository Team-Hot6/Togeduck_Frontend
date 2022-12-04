// user 목록을 출력하는 로직
async function send_chat_button() {
    const response = await fetch('http://127.0.0.1:8000/chats/users/', {
        // headers:{
        //     "Authorization":"Bearer "+localStorage.getItem("access")
        // },
        method:'GET'
    })
    .then(response => {
        return response.json();
    })

    // 
    for (i = 0; i < response.length; i++) {
        var user_list_div = document.getElementById("create_user_list_button")
        const user_id = response[i]['id']
        const user_email = response[i]['email']

        const user_button = document.createElement("Button")
        user_button.className = "user_id" // css 이름
        user_button.setAttribute("onclick", "connect_user_chat_room()")
        user_button.value = user_id
        user_button.innerText = user_email

        user_list_div.appendChild(user_button);
}}