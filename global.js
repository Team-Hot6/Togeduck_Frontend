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


function setCookie(key, value, miuntes) {
    let expire = new Date(); // 현재 시간
    expire.setMinutes(expire.getMinutes() + miuntes); // 현재 시간에 miuntes을 더해 만료시각을 지정

    let cookie_key = encodeURIComponent(key)
    let cookie_value = encodeURIComponent(value)
    let cookie_expire = expire.toUTCString()

    document.cookie = `${cookie_key}=${cookie_value}; expires=${cookie_expire}; path=/;`
}


function getCookie(key) {
    let cookie_key = key + "=";
    let all_cookies = decodeURIComponent(document.cookie).split('; ');   
    let result;

    for(let i = 0; i < all_cookies.length; i++) {
        if(all_cookies[i].match(cookie_key)){
            result = all_cookies[i];
            break
        }
    }
    result = result.slice(cookie_key.length, result.length);
    return result
};