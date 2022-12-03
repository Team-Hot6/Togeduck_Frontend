// test url
let url = 'ws://localhost:8000/ws/socket-server/';

// websocket 생성
let chat_socket = new WebSocket(url)

// 해당 소켓으로 보내진 데이터를 받을때 사용
chat_socket.onmessage = function(e) {
    let data = JSON.parse(e.data)
    console.log('Data:', data)
}

// 해당 소켓으로 데이터를 보낼 때 사용
chat_socket.send(JSON.stringify({
    'message': message,
    'testmessage': 'hyeongseok'
    }))