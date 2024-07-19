const domain = 'http://localhost:8000';
// const websocket = new WebSocket('ws://localhost:8000/chat/');

const output = document.getElementById('output');
const outputRoomsButton = document.getElementById('outputRooms');
const roomList = document.getElementById('roomList');

// const btnReg = document.querySelector('.btn_reg')
// const btnLogin = document.querySelector('.btn_login')
// const outputRooms = document.querySelector('.outputRooms')

outputRoomsButton.addEventListener('click', function() {
    fetch(`${domain}/api/rooms/`)
        .then(response => response.json())
        .then(data => {
            roomList.innerHTML = ''; // Очистка списка перед добавлением новых комнат
            data.forEach(room => {
                const li = document.createElement('li');
                li.textContent = `${room.name}`;
                roomList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching rooms:', error));
});

// регистрация пользователя

// btnReg.addEventListener('click', () => {
//     output.innerHTML = `
//     <div class="div">
//         <form id="registrationForm">
//             <label for="username">Username:</label>
//             <input type="text" id="username" name="username" required><br><br>
//             <label for="password1">Password:</label>
//             <input type="password" id="password1" name="password1" required><br><br>
//             <label for="password2">Confirm Password:</label>
//             <input type="password" id="password2" name="password2" required><br><br>
//             <button type="submit">Register</button>
//        </form>
//     </div>
//     `;
// });

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    // const email = document.getElementById('email').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;

    fetch('http://localhost:8000/api/auth/registration/', {
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
        if (data.key) {
            alert('Registration successful!');
            // Возможно, вы захотите сохранить токен и перенаправить пользователя
            localStorage.setItem('token', data.key);
        } else {
            // Обработка ошибок
            alert('Registration failed: ' + JSON.stringify(data));
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

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

// Список комнат
// document.getElementById('outputRooms').addEventListener('click', function(event) {

//     output.innerHTML = `
//     <div class="div">
//         <h1>Список комнат</h1>
//     </div>
//     `;
// });


// document.querySelector('#room-name-input').focus();
// document.querySelector('#room-name-input').onkeyup = function(e) {
//     if (e.keyCode === 13) {  // enter, return
//         document.querySelector('#room-name-submit').click();
//     }
// };

// document.querySelector('#room-name-submit').onclick = function(e) {
//     var roomName = document.querySelector('#room-name-input').value;
//     window.location.pathname = '/chat/' + roomName + '/';
// };
