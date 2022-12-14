function firstRnder() {
    const sayHiElement = document.querySelector('.sayHi')
    const storageMemory = localStorage.getItem('MemoryAccount')
    let status = localStorage.getItem('status');
    !status && localStorage.setItem('status', 'login')
    if (storageMemory) {
        sayHiElement.textContent = storageMemory
    }
    changePage()
}

function changePage(e) {
    const yellowBox = document.querySelector('.yellowbox')
    const lightblueBox = document.querySelector('.lightbluebox')
    const helloContent = document.querySelector('.hello')
    const wlecome = document.querySelector('.welcome')
    const loginBox = document.querySelector('.login-box')
    const singUpBox = document.querySelector('.signup-box')
    let status = localStorage.getItem('status')

    function addClass() {
        lightblueBox.classList.add('right')
        yellowBox.classList.add('left')
        helloContent.classList.add('InBoxRight')
        wlecome.classList.add('InBoxRight')
        loginBox.classList.add('InBoxRight')
        singUpBox.classList.add('InBoxRight')
    }

    function removeClass() {
        lightblueBox.classList.remove('right')
        yellowBox.classList.remove('left')
        helloContent.classList.remove('InBoxRight')
        wlecome.classList.remove('InBoxRight')
        loginBox.classList.remove('InBoxRight')
        singUpBox.classList.remove('InBoxRight')
    }

    if (!e && status === 'signup') {
        addClass()
    } else if (e && status === 'signup') {
        removeClass()
        localStorage.setItem('status', 'login')
    } else if (e) {
        addClass()
        localStorage.setItem('status', 'signup')
    }
}

window.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.signup-btn')
    const signUpBtn = document.querySelector('#signUpBtn')
    const loginBtn = document.querySelector('#loginBtn')
    const logOutLink = document.querySelector('#logout')

    firstRnder()

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            changePage(e)
        })
    })
})