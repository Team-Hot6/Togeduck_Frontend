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

    // message 보내기 기능
    // socket_api.js (send_message_each_room_button) ->
    send_chat_message(webSocket, room_id, sender_id, receiver_id) {
        const chatinput = document.getElementById('room_id_input')
        const message = chatinput.value
        // webSocket.onopen = () =>
        webSocket.send(JSON.stringify({
            'room_id': room_id,
            'message': message,
            'sender_id': sender_id,
            'receiver_id': receiver_id
            }))
            chatinput.value = ''
            chatinput.focus()
    }
}

// post로 로그인 유저와 클릭한 유저의 방이 있는지 확인하고 없으면 만들고 room_id return
async function check_is_chat_user_room(receiver_id) {
    const response = await fetch(`${back_end_url}/chats/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("access")
            // "Authorization":"Bearer " + temp_access_token
        },
        method:'POST',
        // body: formData
        body: JSON.stringify({
            "user_id": receiver_id,
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        return data
    })
    // room_id 를 보내줌 ex) 5
    console.log(response, 'room connect')
    return response
}

// socket.js -> login_user_opponent_list() 에서 호출되며
// 로그인된 유저와 채팅중인 상대방 정보 가져옴
async function get_user_opponent_list_api() {
    const response = await fetch (`${back_end_url}/chats/users/?connect=list`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("access")
            // "Authorization":"Bearer " + temp_access_token
        },
        method:'GET',
    }).then(response => {
        return response.json()
    })
    return response
}