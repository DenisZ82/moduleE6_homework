const domain = 'http://localhost:8000';
// const socket = new WebSocket('ws://localhost:8000/ws/chat/');

const output = document.getElementById('output');
const outputRoomsButton = document.getElementById('outputRooms');
const createRoomButton = document.getElementById('createRoom');
const roomList = document.getElementById('roomList');

// Регистрация пользователя

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

outputRoomsButton.addEventListener('click', function() {
    fetch(`${domain}/api/rooms/`)
        .then(response => response.json())
        .then(data => {
            roomList.innerHTML = ''; // Очистка списка перед добавлением новых комнат
            data.forEach(room => {
                const tr = document.createElement('tr');
                const td = document.createElement('td');                
                td.textContent = `${room.name}`;
                tr.appendChild(td);
                const td2 = document.createElement('td');
                td2.innerHTML = `<button>Подключиться</button>`;
                tr.appendChild(td2);
                roomList.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching rooms:', error));
});

// Создание комнаты

document.getElementById('createRoomForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const roomname = document.getElementById('roomname').value;

    fetch(`${domain}/api/rooms/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: roomname,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Room created successfully!');
        } else {
            // Обработка ошибок
            alert('Room created failed: ' + JSON.stringify(data));
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

});

// // Функция для добавления сообщения в чат
// function addMessage(message) {
//     const chatContainer = document.getElementById('chat-container');
//     const messageElement = document.createElement('div');
//     messageElement.className = 'chat-message';
//     messageElement.textContent = message;
//     chatContainer.appendChild(messageElement);
//     chatContainer.scrollTop = chatContainer.scrollHeight;
// };

// // Обработчик получения сообщений от WebSocket
// socket.addEventListener('message', function (event) {
//     addMessage(event.data);
// });

// // Обработчик отправки сообщений
// document.getElementById('chat-message-submit').addEventListener('click', function () {
//     const input = document.getElementById('chat-message-input');
//     const message = input.value;
//     socket.send(message);
//     input.value = '';
// });

// // Запрет на отправку пустых сообщений
// document.getElementById('chat-message-input').addEventListener('keypress', function (event) {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         document.getElementById('chat-message-submit').click();
//     }
// });









// Мусор (удалить при завершении проекта)

// Список комнат

// outputRoomsButton.addEventListener('click', function() {
//     fetch(`${domain}/api/rooms/`)
//         .then(response => response.json())
//         .then(data => {
//             roomList.innerHTML = ''; // Очистка списка перед добавлением новых комнат
//             data.forEach(room => {
//                 const li = document.createElement('li');
//                 li.textContent = `${room.name}`;                 
//                 roomList.appendChild(li);
//             });
//         })
//         .catch(error => console.error('Error fetching rooms:', error));
// });

// const btnReg = document.querySelector('.btn_reg')
// const btnLogin = document.querySelector('.btn_login')
// const outputRooms = document.querySelector('.outputRooms')

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


