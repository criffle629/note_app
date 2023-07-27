const registerForm = document.getElementById('register-form');
const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = 'http://127.0.0.1:8080/api/v1/users';

const handleSubmut = async (e) => {
    e.preventDefault();

    let bodyObj = {
        username: registerUsername.value,
        password: registerPassword.value
    }

    const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: headers
    })
    .catch(e => console.error(e.message));

    const resArr = await res.json();

    if (res.status === 200)
        window.location.replace(resArr[0]);
}

registerForm.addEventListener('submit', handleSubmut);