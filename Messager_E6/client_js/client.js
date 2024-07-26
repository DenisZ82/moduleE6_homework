const domain = 'http://localhost:8000';
const socket = new WebSocket('ws://localhost:8000/ws/chat/');

const output = document.getElementById('output');
const outputRoomsButton = document.getElementById('outputRooms');
const createRoomButton = document.getElementById('createRoom');
const roomList = document.getElementById('roomList');

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


// Функция для добавления сообщения в чат
function addMessage(message) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

// Обработчик получения сообщений от WebSocket
socket.addEventListener('message', function (event) {
    addMessage(event.data);
});

// Обработчик отправки сообщений
document.getElementById('chat-message-submit').addEventListener('click', function () {
    const input = document.getElementById('chat-message-input');
    const message = input.value;
    socket.send(message);
    input.value = '';
});

// Запрет на отправку пустых сообщений
document.getElementById('chat-message-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('chat-message-submit').click();
    }
});
