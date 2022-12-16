// 유저 id 가져와서 방 만들기 // 로그인 되어있어야 함
async function connect_user_chat_room(receiver_id) {
    let current_user_id = JSON.parse(localStorage.getItem('payload'))['user_id'];

    if (current_user_id == receiver_id) {
        return alert('본인입니다.')
    }
    if (user_to_user_room_socket != undefined) {
        user_to_user_room_socket.close();
        // document.querySelector('#chatbox__content').innerHTML='';
    } else {
        // document.querySelector('#chatbox__content').innerHTML='';
    }
    const room_id_user_email_json = await check_is_chat_user_room(receiver_id)
    room_id = room_id_user_email_json['room_id']
    opp_email = room_id_user_email_json['opp_email']
    opp_profile_image = room_id_user_email_json['opp_profile_image']

    const head__title = document.getElementById("head__title")
    head__title.innerText = opp_email

    // 프로필 이미지 넣어주기
    const avatar__wrap__profile = document.getElementById("avatar__wrap__profile")
    avatar__wrap__profile.innerHTML = `
    <img class="avatar__img__profile" src="${back_end_url}/media/${opp_profile_image}" alt="">
    `
    // 만들어지거나 원래 있던 방 room_id로 웹소켓 연결
    user_to_user_room_socket = new WebSocket(`${websocketBaseUrl}/${room_id}/`)

    // socket_api.js 의 채팅 로그 가져오기
    const total_chat_log = await get_chat_room_log(room_id)

    var create_chat_log = document.getElementById("chatbox__content")
    create_chat_log.innerHTML = ''

    const chat_log = total_chat_log['room_message']

    for (i = 0; i < chat_log.length; i++) {
        const each_chat_log = `
        <div class="message">
            <div class="message__head">
                <span class="message__note">${chat_log[i]['user']}</span>
                <span class="message__note">${chat_log[i]['date']} ${chat_log[i]['cur_time']}</span>
            </div>
            <div class="message__base">
                <div class="message__avatar avatar">
                    <a href="#" class="avatar__wrap">
                        <img class="avatar__img" src=${back_end_url}/media/${chat_log[i]['user_profile']} width="35" height="35" alt="">
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
    document.getElementById("chatbox__scroll").scrollTop = document.getElementById("chatbox__scroll").scrollHeight;

    user_to_user_room_socket.onmessage = function(e) {
        var data = JSON.parse(e.data);

        const each_chat_log = `
        <div class="message">
            <div class="message__head">
                <span class="message__note">${data['user']}</span>
                <span class="message__note">${data['date']} ${data['cur_time']}</span>
            </div>
            <div class="message__base">
                <div class="message__avatar avatar">
                    <a href="#" class="avatar__wrap">
                        <img class="avatar__img" src=${back_end_url}/media/${data['profile_image']} width="35" height="35" alt="">
                    </a>
                </div>
                <div class="message__textbox">
                    <span class="message__text">${data['message']}</span>
                </div>
            </div>
        </div>
        `
        create_chat_log.insertAdjacentHTML("beforeend", each_chat_log);
        document.getElementById("chatbox__scroll").scrollTop = document.getElementById("chatbox__scroll").scrollHeight;
        // document.querySelector('#chat-log').value += (message + '\n');
    };
}

// 해당 채팅방으로 메세지 전송
function send_message_each_room_button() {
    // socket.js 웹소켓 class 가져옴
    let send_message = new Websocket_func();

    const sender_id = JSON.parse(localStorage.getItem('payload'))['user_id'];
    const chatinput = document.getElementById('enterMessage')

    // 다른 채팅방을 만들면 그 채팅방으로 바뀌어야 함
    if (user_to_user_room_socket == undefined) {
        alert('채팅 상대를 선택해 주세요')
        chatinput.value = ''
        chatinput.focus()
    } else {
        if (chatinput.value === '\n') {
            chatinput.value = ''
            chatinput.focus()
            return
        }
        send_message.send_chat_message(user_to_user_room_socket, room_id, sender_id)
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
    create_opponent_user_list.innerHTML = ''

    for (i = 0; i < user_opp_list.length; i++) {
        const user_item_li = `
        <li class="users__item" onclick="connect_user_chat_room(${user_opp_list[i]['id']})">
            <div class="users__avatar avatar avatar_online_">
                <a href="#" class="avatar__wrap">
                    <img class="avatar__img" src=${back_end_url}${user_opp_list[i]['profile_image']} width="35" height="35" alt="">
                </a>
            </div>
            <span class="users__note">${user_opp_list[i]['email']}</span>
            <div class="users__counter_">
                <span class="counter"></span>
            </div>
        </li>
        `
        create_opponent_user_list.insertAdjacentHTML("beforeend", user_item_li);
    }
}

function sumit_send_message_Enterkey() {
    if (window.event.keyCode == 13) {
        send_message_each_room_button();
        // document.getElementById("enterMessage").value() = '';
    }
}

// 모달 띄우기
function modal_view() {
    const modal_id = document.getElementById('modal');
    modal_id.style.display = 'block';
    modal_id.style.position = 'fixed';
    modal_id.style.top = '50%';
    modal_id.style.left = '50%';
    modal_id.style.transform = "translate(-50%, -25%)";

    login_user_opponent_list()

};

// 모달 닫기
function close_modal() {
    const modal_id = document.getElementById('modal');
    modal_id.style.display = 'none';

    const pop_button = document.getElementById('popup_open_btn')
    pop_button.style.display = "block";
}

async function click_user_chat(receiver_id) {
    await connect_user_chat_room(receiver_id)
    modal_view();
    const chatinput = document.getElementById('enterMessage')
    chatinput.focus()
    document.getElementById("chatbox__scroll").scrollTop = document.getElementById("chatbox__scroll").scrollHeight;
}