
function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const db = JSON.parse(localStorage.getItem("users")) || [];

    const userLogin = db.find((item, index) => {
        return item.email === emailInput.value && item.password === passwordInput.value;
    });

    if (userLogin) {
        if (userLogin.status === 1) {
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            alert("Đăng nhập thành công");
            window.location.href = './adminpage.html';
        } else {
            alert("Tài khoản bị khóa");
        }
    } else {
        alert("Email hoặc mật khẩu không đúng");
    }
}



