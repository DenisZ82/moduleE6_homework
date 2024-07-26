// Вход в акканунт

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            alert('Login successful!');
            localStorage.setItem('token', data.access); // Сохранение токена
        } else {
            alert('Login failed: ' + JSON.stringify(data));
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