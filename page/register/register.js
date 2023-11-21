// const users = [
//     {
//         id: 1,
//         email: 'tien@gmail.com',
//         name: "",
//         password: '12345',
//         role: 1,
//         cart: [],
//         status: 1
//     },
//     {
//         id: 2,
//         email: 'phuc@gmail.com',
//         name: "",
//         password: '12345',
//         role: 2,
//         cart: [],
//         status: 1
//     },
//     {
//         id: 3,
//         email: 'hieu@gmail.com',
//         name: "",
//         password: '12345',
//         role: 2,
//         cart: [],
//         status: 2
//     }
// ]
// localStorage.setItem('users',JSON.stringify(users) ) || []

function handleRegister(event) {
    event.preventDefault()
    const emailValue = document.getElementById('email')
    const usenameValue = document.getElementById('username')
    const passwordValue = document.getElementById('password')
    const confirmpasswordValue = document.getElementById('confirm-password')
    const mainData = JSON.parse(localStorage.getItem('users')) || []
    const checkEmail = mainData.find((item) => item.email == emailValue.value)
    if (checkEmail) {
        return alert("Email đã tồn tại")
    } if (confirmpasswordValue.value != passwordValue.value) {
        alert('password không trùng khớp')
    } else {
        const newUsers = {
            id: mainData[mainData.length - 1].id + 1,
            userName: usenameValue.value,
            email: emailValue.value,
            password: passwordValue.value,
            role: 1,
            cart: [],
            status: 1,
        }
        alert('đăng kí thành công')
        location.href = "../login/login.html  "
        mainData.push(newUsers)
        localStorage.setItem('users', JSON.stringify(mainData))
    }

}