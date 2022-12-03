// 웹 소켓 관련 기능
class Websocket_func {
    // 메세지 전송
    sendchat(webSocket) {
        const chatinput = document.getElementById('chat_input')
        const message = chatinput.value
        webSocket.send(JSON.stringify({
            'message': message,
            'testmessage': 'hyeongseok'
            }))
            chatinput.value = ''
            chatinput.focus()
        }

    // room 1 을 사용한 메세지
    makeroom(webSocket, room_id) {
        const chatinput = document.getElementById('room_id_input')
        const message = chatinput.value
        
        // webSocket.onopen = () =>
        webSocket.send(JSON.stringify({
            'room_id': room_id,
            'message': message,
            }))
            chatinput.value = ''
            chatinput.focus()
    }
}

function sumit_message_Enterkey() {
    if (window.event.keyCode == 13) {
        send_chat_button();
    }
}

function sumit_make_room_Enterkey() {
    if (window.event.keyCode == 13) {
        send_message_each_room_button();
    }
}