function firstRnder() {
    const sayHiElement = document.querySelector('.sayHi')
    const storageMemory = localStorage.getItem('MemoryAccount')
    let status = localStorage.getItem('status')
    !status && localStorage.setItem('status', 'login')
    if(storageMemory){
      sayHiElement.textContent = storageMemory
    }
    console.log('첫번째 렌더링2')
    changePage()
  }
  
  function changePage(e){
    const yellowBox = document.querySelector('.yellowbox')
    const lightblueBox = document.querySelector('.lightbluebox')
    const helloContent = document.querySelector('.hello')
    const wlecome = document.querySelector('.welcome')
    const loginBox = document.querySelector('.login-box')
    const singUpBox = document.querySelector('.signup-box')
    let status = localStorage.getItem('status')
    console.log('찍히나3')

  
    function addClass() {
      lightblueBox.classList.add('right')
      yellowBox.classList.add('left')
      helloContent.classList.add('InBoxRight')
      wlecome.classList.add('InBoxRight')
      loginBox.classList.add('InBoxRight')
      singUpBox.classList.add('InBoxRight')
    }
    console.log('얘는 뭐지4')
  
    function removeClass() {
      lightblueBox.classList.remove('right')
      yellowBox.classList.remove('left')
      helloContent.classList.remove('InBoxRight')
      wlecome.classList.remove('InBoxRight')
      loginBox.classList.remove('InBoxRight')
      singUpBox.classList.remove('InBoxRight')
    }
    console.log('배경이 지워지는 건가5')
  
    if(!e && status === 'signup') {
      addClass()
    } else if (e && status === 'signup'){
      removeClass()
      localStorage.setItem('status', 'login')
    } else if(e) {
      addClass()
      localStorage.setItem('status', 'signup')
    }
  } console.log('여기도 필요하나1')
  
  window.addEventListener('DOMContentLoaded', function(){
    const buttons = document.querySelectorAll('.signup-btn')
    const signUpBtn = document.querySelector('#signUpBtn')
    const loginBtn = document.querySelector('#loginBtn')
    const logOutLink = document.querySelector('#logout')
  
    firstRnder()
    console.log('여기부터 렌더링가나6')
  
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        changePage(e)
        console.log('체인지?7')
      })
    })
  
  //   // sign up button 
  //   signUpBtn.addEventListener('click', () => {
  //     const signUpName = document.querySelector('#signUpName')
  //     const signUpEmail = document.querySelector('#signUpEmail')
  //     const signUpPassword = document.querySelector('#signUpPassword')
  //     const storageKey = signUpEmail.value + signUpPassword.value
  //     const checkUser = Boolean(localStorage.getItem(storageKey))
  
  //     function successAction() {
  //       if(checkUser) {
  //         return alert('The email has already created it, please re-enter')
  //       }
  //       localStorage.setItem(storageKey, signUpName.value)
  //       signUpName.value = ''
  //       signUpEmail.value = ''
  //       signUpPassword.value = ''
  //       alert('Created successfully, please go to sign in page')
  //     }
  
  //     if(signUpEmail.value === '' || signUpPassword.value === ''){
  //       alert('The input box cannot be empty')
  //     } else {
  //       successAction()
  //     }
  //   })
  
  //   // login button
  //   loginBtn.addEventListener('click', () => {
  //     const loginEmail = document.querySelector('#loginEmail')
  //     const loginPassword = document.querySelector('#loginPassword')
  //     const sayHiElement = document.querySelector('.sayHi')
  //     const storageKey = loginEmail.value + loginPassword.value
  //     const userName = localStorage.getItem(storageKey)
  //     const checkUser = Boolean(userName)
  
  //     function loginAction() {
  //       if(!checkUser) { 
  //         return alert('Please create an account first')
  //       } 
  
  //       const confirmMemory = confirm('Do you want to save this password?') 
  //       loginEmail.value = ''
  //       loginPassword.value = ''
  //       alert('sign in suceesfully')
  //       sayHiElement.textContent = `Hi~ ${userName}`
  //       if(confirmMemory){
  //         localStorage.setItem('MemoryAccount', `Hi~ ${userName}`)
  //       }
  //     }
  
  //     if(!loginEmail.value || !loginPassword.value){
  //       alert('The input box cannot be empty')
  //     } else {
  //       loginAction()
  //     }
  //   })
  
  //   // logOut
  //   logOutLink.addEventListener('click', () => {
  //     const sayHiElement = document.querySelector('.sayHi')
  //     localStorage.clear()
  //     sayHiElement.textContent = 'Hello, Friend !'
  //   })
  })