const domain = 'http://localhost:8000';

// Регистрация пользователя

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    // const email = document.getElementById('email').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;

    fetch(`${domain}/api/auth/registration/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            // email: email,
            password1: password1,
            password2: password2
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Registration successful!');
            // Возможно, вы захотите сохранить токен и перенаправить пользователя
            // localStorage.setItem('token', data.key);
        } else {
            // Обработка ошибок
            alert('Registration failed: ' + JSON.stringify(data));
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Выход из аккаунта

document.getElementById('logoutButton').addEventListener('click', function() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8000/api/auth/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Logout successful!');
            localStorage.removeItem('token'); // Удаление токена
        } else {
            alert('Logout failed.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});