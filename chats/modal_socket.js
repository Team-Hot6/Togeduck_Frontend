window.onload = () => {
    console.log('load test')
    // 자신이랑 채팅중인 상대 리스트 목록을 가져오는 함수
    login_user_opponent_list()
}

// let url = `ws://${window.location.host}/ws/socket-server/`

// 유저 id 가져와서 방 만들기 // 로그인 되어있어야 함
async function connect_user_chat_room(receiver_id) {
    let current_user_id = JSON.parse(localStorage.getItem('payload'))['user_id'];

    if (current_user_id == receiver_id) {
        return alert('본인입니다.')
    }

    console.log(current_user_id, '번호 유저와', receiver_id, '와의 chat_room')

    if (user_to_user_room_socket != undefined) {
        user_to_user_room_socket.close();
        // document.querySelector('#chatbox__content').innerHTML='';
    } else {
        // document.querySelector('#chatbox__content').innerHTML='';
    }
    room_id = await check_is_chat_user_room(receiver_id)

    // 만들어지거나 원래 있던 방 room_id로 웹소켓 연결
    user_to_user_room_socket = new WebSocket(`${websocketBaseUrl}/${room_id}/`)

    // socket_api.js 의 채팅 로그 가져오기
    const total_chat_log = await get_chat_room_log(room_id)

    var create_chat_log = document.getElementById("chatbox__content")
    create_chat_log.innerHTML=''
    
    const chat_log = total_chat_log['room_message']
    console.log(chat_log)
    for (i=0; i < chat_log.length; i++) {

        const each_chat_log = `
        <div class="message" id="${chat_log[i]['id']}">
            <div class="message__head">
                <span class="message__note">${chat_log[i]['user']}</span>
                <span class="message__note">${chat_log[i]['date']} ${chat_log[i]['cur_time']}</span>
            </div>
            <div class="message__base">
                <div class="message__avatar avatar">
                    <a href="#" class="avatar__wrap">
                        <img class="avatar__img" src="" width="35" height="35" alt="">
                    </a>
                </div>
                <div class="message__textbox">
                    <span class="message__text">${chat_log[i]['content']}</span>
                </div>
            </div>
        </div>
        `
        create_chat_log.insertAdjacentHTML("beforeend", each_chat_log);
    }
    // 아래 스크롤을 쳐다보기
    document.getElementById("chatbox__scroll").scrollTop = document.getElementById("chatbox__scroll").scrollHeight;

    user_to_user_room_socket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        var sender = data['sender']
        var cur_time = data['cur_time']
        var date = data['date']
        var room_id = data['room_id']
        // document.querySelector('#chat-log').value += (message + '\n');
    };
}

// 해당 채팅방으로 메세지 전송
function send_message_each_room_button() {
    // socket.js 웹소켓 class 가져옴
    let send_message = new Websocket_func();

    const sender_id = JSON.parse(localStorage.getItem('payload'))['user_id'];

    // 다른 채팅방을 만들면 그 채팅방으로 바뀌어야 함
    if (user_to_user_room_socket == undefined) {
        alert('채팅 상대를 선택해 주세요')
    } else {
        send_message.send_chat_message(user_to_user_room_socket, room_id, sender_id, receiver_id)
        login_user_opponent_list()
    }
};

// 현재 로그인된 유저와 채팅중인 유저 목록 가져오기
// 새로고침 될때마다, 또 메세지 전송 보낼때마다.
async function login_user_opponent_list() {
    const current_user_id = JSON.parse(localStorage.getItem('payload'))['user_id'];

    if (!current_user_id) {
        return
    }
    user_opp_list = await get_user_opponent_list_api()
    var create_opponent_user_list = document.getElementById("create_opponent_user_list")
    create_opponent_user_list.innerHTML=''
    
    for (i=0; i < user_opp_list.length; i++) {

        const user_item_li = `
        <li class="users__item" onclick="connect_user_chat_room(${user_opp_list[i]['id']})">
            <div class="users__avatar avatar avatar_online">
                <a href="#" class="avatar__wrap">
                    <img class="avatar__img" src="" width="35" height="35" alt="">
                </a>
            </div>
            <span class="users__note">${user_opp_list[i]['email']}</span>
            <div class="users__counter">
                <span class="counter"></span>
            </div>
        </li>
        `
        create_opponent_user_list.insertAdjacentHTML("beforeend", user_item_li);
    }
}

function sumit_make_room_Enterkey() {
    if (window.event.keyCode == 13) {
        send_message_each_room_button();
    }
}