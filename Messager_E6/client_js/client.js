const domain = ('http://localhost:8000/');
const websocket = new WebSocket('ws://localhost:8000/');

const output = document.getElementById('output');

const btnReg = document.querySelector('.btn_reg')


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




   document.getElementById('registrationForm').addEventListener('submit', function(event) {
       event.preventDefault();

       const username = document.getElementById('username').value;
       const email = document.getElementById('email').value;
       const password1 = document.getElementById('password1').value;
       const password2 = document.getElementById('password2').value;

       fetch('http://your-backend-domain/api/auth/registration/', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               username: username,
               email: email,
               password1: password1,
               password2: password2
           })
       })
       .then(response => response.json())
       .then(data => {
           if (data.key) {
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

   document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;

    fetch('http://your-backend-domain/api/auth/registration/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.key) {
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

