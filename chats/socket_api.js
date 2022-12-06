const websocketBaseUrl = "ws://localhost:8000"
let user_to_user_room_socket = undefined
let room_id = undefined
let temp_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMjA5MjQ1LCJpYXQiOjE2NzAxNjcyNDUsImp0aSI6IjA2YTk3MjhhMTUzOTRlZjFhZmExODZjNjZlZmQ3Y2RkIiwidXNlcl9pZCI6MiwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.4hyT-t1F6eJ7HJdDzH_U66OvLKRw1s-p57SGHRDAELA"

window.onload = () => {
    console.log('load test')
}

// let url = `ws://${window.location.host}/ws/socket-server/`

// 유저 id 가져와서 방 만들기 // 로그인 되어있어야 함
async function connect_user_chat_room() {
    const user_id = payload.user_id
    let target_user_id = event.target.value

    console.log(user_id, '번호 유저와 ', target_user_id, '와의 chat_room')

    if (user_to_user_room_socket != undefined) {
        return
    }
    // 해당 유저와 연결된 방이 있는지 socket.js 파일 함수로 연결 -> return : room_id
    room_id = await check_is_chat_user_room(target_user_id)

    // 만들어지거나 원래 있던 방 room_id로 웹소켓 연결
    user_to_user_room_socket = new WebSocket(`${url}${room_id}/`)

    user_to_user_room_socket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        var message_data = JSON.parse(message)['message']
        document.querySelector('#chat-log').value += (message_data + '\n');
    };
}

// 해당 채팅방으로 메세지 전송
function send_message_each_room_button() {
    // socket.js 웹소켓 class 가져옴
    let send_message = new Websocket_func();

    // 다른 채팅방을 만들면 그 채팅방으로 바뀌어야 함
    if (user_to_user_room_socket == undefined) {
        alert('채팅 상대를 선택해 주세요')
    } else {
        send_message.send_chat_message(user_to_user_room_socket, room_id)
    }
};

function sumit_make_room_Enterkey() {
    if (window.event.keyCode == 13) {
        send_message_each_room_button();
    }
}

// 채팅 메세지 로그 불러오기
function get_chat_room_message_log() {
    // 일단 원래 있는 채팅 로그를 클리어 해야함

}