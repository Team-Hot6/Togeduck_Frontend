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