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






// 웹소켓 관련 기능
class Websocket {

    // 알림 웹소켓 연결 및 온메시지
    alertWebsocket(userId) {
        chatAlertSocket = new WebSocket(`${websocketBaseUrl}/ws/socket-server/${userId}`)
        // 알림 수신
        chatAlertSocket.onmessage = function (e) {
            // 알림 데이터
            let data = JSON.parse(e.data)
            if (chatSocket.url != `${webSocketBaseUrl}/chats/${data.room_id}`) {
                // 알림 메시지 및 효과생성
                new CreateElement().alertMessage(data)
                new Alert().alertNotReadMessage(data)
                new Alert().navAlertEffect()
                new Alert().chatModalAlertEffect(data)
                // 처음 온 채팅이면 채팅방을 새로 만듬
                const selectedChatRoom = document.querySelector(`#chat-room-${data.room_id}`)
                if (selectedChatRoom == null) {
                    const chatRoom = document.createElement('div')
                    chatRoom.setAttribute("class", "chat-room")
                    chatRoom.setAttribute("id", `chat-room-${data.room_id}`)
                    chatRoom.setAttribute("onclick", `openChatRoom(${data.room_id})`)

                    const chatRoomsContainer = document.getElementsByClassName('chat-rooms-container')[0]
                    chatRoomsContainer.append(chatRoom)

                    const spanNickname = document.createElement('span')
                    spanNickname.setAttribute("class", "nickname")

                    const chatRoomAlertEffect = document.createElement('section')
                    chatRoomAlertEffect.setAttribute('class', 'chat-room-alert-effect')
                    chatRoom.append(chatRoomAlertEffect)

                    spanNickname.innerText = data.sender
                    chatRoom.style.backgroundColor = "rgb(255, 239, 194)"
                    chatRoom.setAttribute("class", "chat-room lend-room")
                    chatRoom.append(spanNickname)
                }
            }
        }
    }

    // 채팅 웹소켓 보내기
    sendChat(chatSocket, userId, authorId, roomId) {
        const chatInput = document.querySelector('.chat-text')
        const message = chatInput.value
        chatSocket.send(JSON.stringify({
            'message': message,
            'sender': userId,
            'receiver': authorId,
            'room_id': roomId,
            }))
            chatInput.value = ''
            chatInput.focus()
        }
    // 알림 웹소켓 보내기
    sendAlert(roomId, senderId, receiverId, contractStatus) {
        // 상대방에게 채팅 알림 보냄
        chatAlertSocket.send(JSON.stringify({
            'room_id': roomId,
            'sender': senderId,
            'receiver': receiverId,
            'status': contractStatus,
            'created_at': Date.now(),
        }))
    }
}