const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = 'http://127.0.0.1:8080/api/v1/users';

const handleSubmut = async (e) => {
    e.preventDefault();

    let bodyObj = {
        username: loginUsername.value,
        password: loginPassword.value
    }

    const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: headers
    })
    .catch(e => console.error(e.message));

    const resArr = await res.json();

    if (res.status === 200){
        document.cookie = `userId=${resArr[1]}`;
        window.location.replace(resArr[0]);
    }
}

loginForm.addEventListener('submit', handleSubmut);