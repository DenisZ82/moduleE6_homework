const websocket = new WebSocket('ws://localhost:8000/');

const output = document.getElementById('output');

const btnReg = document.querySelector('.btn_reg')

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

btnReg.addEventListener('click', () => {
    output.innerHTML = `
    <div class="div">
        <form id="registrationForm">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <label for="password1">Password:</label>
            <input type="password" id="password1" name="password1" required><br><br>
            <label for="password2">Confirm Password:</label>
            <input type="password" id="password2" name="password2" required><br><br>
            <button type="submit">Register</button>
       </form>
    </div>
    `;
});


