let temp_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMjA5MjQ1LCJpYXQiOjE2NzAxNjcyNDUsImp0aSI6IjA2YTk3MjhhMTUzOTRlZjFhZmExODZjNjZlZmQ3Y2RkIiwidXNlcl9pZCI6MiwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSJ9.4hyT-t1F6eJ7HJdDzH_U66OvLKRw1s-p57SGHRDAELA"

window.onload = () => {
    console.log('load test')
}

// let url = `ws://${window.location.host}/ws/socket-server/`

// 유저 id 가져와서 방 만들기 // 로그인 되어있어야 함
async function connect_user_chat_room() {
    receiver_id = event.target.value
    let current_user_id = JSON.parse(localStorage.getItem('payload'))['user_id'];

    console.log(current_user_id, '번호 유저와', receiver_id, '와의 chat_room')

    if (user_to_user_room_socket != undefined) {
        return
    } 
    // else if (user_to_user_room_socket) {
    //     // user_to_user_room_socket 이 이미 존재, 즉
    //     // 다른 유저와 이미 연결되어 있는게 있다면
    //     // 채팅 로그를 지운 후 추가가 다른 곳에 되어야 함
    // }
    // 해당 유저와 연결된 방이 있는지 socket.js 파일 함수로 연결 -> return : room_id
    room_id = await check_is_chat_user_room(receiver_id)

    // 만들어지거나 원래 있던 방 room_id로 웹소켓 연결
    user_to_user_room_socket = new WebSocket(`${websocketBaseUrl}/${room_id}/`)

    user_to_user_room_socket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        var sender = data['sender']
        var cur_time = data['cur_time']
        var date = data['date']
        var room_id = data['room_id']
        document.querySelector('#chat-log').value += (message + '\n');
    };
}

async function send_test_button() {
    test_room_socket = new WebSocket(`${websocketBaseUrl}/100/`)

    let class_send_message = new Websocket_func();

    class_send_message.onopen = () =>
    class_send_message.send_chat_message(test_room_socket, 100, 2, 1)

    test_room_socket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        console.log(data)
        var message = data['message'];
        console.log(message)
        var message_data = JSON.parse(message)['message']
        // var sender = JSON.parse(message)['sender']
        // var cur_time = JSON.parse(message)['cur_time']
        // var date = JSON.parse(message)['date']
        document.querySelector('#chat-log').value += (message_data + '\n');
}}

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