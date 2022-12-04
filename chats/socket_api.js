const websocketBaseUrl = "ws://localhost:8000"
let each_room_socket = undefined
let user_to_user_room_socket = undefined
let room_id = undefined
let temp_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMjA5MjQ1LCJpYXQiOjE2NzAxNjcyNDUsImp0aSI6IjA2YTk3MjhhMTUzOTRlZjFhZmExODZjNjZlZmQ3Y2RkIiwidXNlcl9pZCI6MiwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.4hyT-t1F6eJ7HJdDzH_U66OvLKRw1s-p57SGHRDAELA"

window.onload = () => {
    console.log('load test')
}

// let url = `ws://${window.location.host}/ws/socket-server/`
let url = 'ws://localhost:8000/ws/socket-server/';

let chat_socket = new WebSocket(url)

// 유저 id 가져와서 방 만들기 // 로그인 되어있어야 함
async function connect_user_chat_room() {
    user_id = event.target.value

    if (user_to_user_room_socket != undefined) {
        return
    }
    // 해당 유저와 연결된 방이 있는지 socket.js 파일 함수로 연결 -> return : room_id
    room_id = await check_is_chat_user_room(user_id)

    // 만들어지거나 원래 있던 방 room_id로 웹소켓 연결
    user_to_user_room_socket = new WebSocket(`${url}${room_id}/`)

    user_to_user_room_socket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        var message_data = JSON.parse(message)['message']
        document.querySelector('#chat-log').value += (message_data + '\n');
    };
}

// 채팅방 id 별로 소켓 연결
function connect_room_id() {
    room_id = event.target.value

    // 연결이 되어있으면 무시
    if (each_room_socket != undefined) {
        return
    }

    each_room_socket = new WebSocket(`${url}${room_id}/`)

    each_room_socket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        var message_data = JSON.parse(message)['message']
        document.querySelector('#chat-log').value += (message_data + '\n');
    };
}

// 해당 채팅방으로 메세지 전송
function send_message_each_room_button() {
    // socket 연결
    let send_message = new Websocket_func();

    if (each_room_socket == undefined) {
        alert('방 번호를 선택해 주세요')
    } else {
        send_message.makeroom(each_room_socket, room_id)
    }
};
