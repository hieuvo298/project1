function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const db = JSON.parse(localStorage.getItem("users"));
    const userLogin = db.find((item) => {
        return item.email === emailInput.value && item.password === passwordInput.value;
    });

    if (userLogin) {
        if (userLogin.status === 1) {
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            alert('Đăng nhập thành công');
            window.location.href = "../../index.html";
        } else {
            alert('Tài khoản bị khóa');
        }
    } else {
        alert("Email hoặc mật khẩu không đúng");
    }
}
const initialState = {
    loginDataDisplay: "",
    newUserText: "",
    logoutBtnExist: false,
};
    function loginNav(){
        const dbUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    if(!dbUserLogin.length==1){
        location.href="http://127.0.0.1:5501/page/history/history.html"
    }
    else{
        location.href="http://127.0.0.1:5501/page/login/login.html"
    }
    }


function successLogin() {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const loginData = document.querySelector('.header-info span a');
    const newUser = document.getElementById('login');
    const logoutBtnContainer = document.querySelector('.header-info');
    if (!initialState.loginDataDisplay) {
        initialState.loginDataDisplay = loginData.style.display;
        initialState.newUserText = newUser.innerText;
        initialState.logoutBtnExist = document.getElementById('logoutBtn') !== null;
    }

    if (newUser && userLogin) {
        loginData.style.display = "none";
        newUser.innerText = `Hello ${userLogin.userName.toUpperCase()}`;
        const existingLogoutBtn = document.getElementById('logoutBtn');
        if (!existingLogoutBtn && !initialState.logoutBtnExist) {
            const logoutBtn = document.createElement('button');
            logoutBtn.innerText = 'Log out';
            logoutBtn.id = 'logoutBtn'; 
            logoutBtn.addEventListener('click', logout);
            logoutBtnContainer.appendChild(logoutBtn);
    }
}

function logout() {
    localStorage.removeItem("userLogin");   
    const loginData = document.querySelector('.header-info span a');
    const newUser = document.getElementById('login');
    const logoutBtn = document.getElementById('logoutBtn');
    newUser.innerText = initialState.newUserText;

    if (logoutBtn) {
        logoutBtn.remove();
    }
    window.location.reload()
}
}

document.getElementById('login').addEventListener('click', loginNav);

successLogin();




