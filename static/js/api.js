console.log('api.js 연결')

const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5000/"

async function get_articles() {
    const response = await fetch(`${backend_base_url}/articles/`, {
        method: "GET",
    })
    return response
}