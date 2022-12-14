// test url
let url = 'ws://localhost:8000/ws/socket-server/';

// websocket 생성
let chat_socket = new WebSocket(url)

// 해당 소켓으로 보내진 데이터를 받을때 사용
chat_socket.onmessage = function(e) {
    let data = JSON.parse(e.data)
    console.log('Data:', data)
}

// html 까지 포함한 전송 테스트 버튼
// 전송 테스트 버튼
function send_chat_button() {
    const chatinput = document.getElementById('chat_input')
    const message = chatinput.value

    chat_socket.send(JSON.stringify({
        'message': message,
        'testmessage': 'hyeongseok'
        }))
        console.log('end')
        chatinput.value = ''
        chatinput.focus()
}

// 해당 소켓으로 데이터를 보낼 때 사용
chat_socket.send(JSON.stringify({
    'message': message,
    'testmessage': 'hyeongseok'
    }))

// 해당 소켓으로 
each_room_socket.onmessage = function(e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var message_data = JSON.parse(message)['message']
    document.querySelector('#chat-log').value += (message_data + '\n');
};

// 해당 채팅방으로 메세지 전송
function send_message_each_room_button() {
    // socket 연결
    let send_message = new Websocket_func();

    // 연결된 방 소켓 확인
    // if (each_room_socket == undefined) {
    //     alert('방 번호를 선택해 주세요')
    // } else {
    //     send_message.send_chat_message(each_room_socket, room_id)
    // }

    if (user_to_user_room_socket == undefined) {
        alert('채팅 상대를 선택해 주세요')
    } else {
        send_message.send_chat_message(user_to_user_room_socket, room_id)
    }
};

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