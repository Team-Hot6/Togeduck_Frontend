// 전역 변수 및 url을 가져오는 js 파일
// 전역변수는 어디서 사용하는지 적어주기

const front_end_url = window.location.host
const back_end_url = "http://127.0.0.1:8000"
const base_websocket_url = `ws://${window.location.host}`
const websocketBaseUrl = "ws://127.0.0.1:8000/ws/socket-server"
const websocket_Chat_BaseUrl = "ws://127.0.0.1:8000"

// 전역 변수 부분
// chat 부분에서 소켓과 room_id 특정하기 위해 사용
let user_to_user_room_socket = undefined
let room_id = undefined
let receiver_id = undefined