const socket = io()

let userName;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    userName = prompt('Please enter your good name: ')
} while (!userName)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
});

function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()     // to remove the new line while sending
    }

    // Append
    appendMessage(msg, 'outgoing');
    textarea.value = ''
    scrollToBottom();

    // send to server
    socket.emit('message', msg);
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


// Receive messaage

// client code only run in browser
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom()
})


function scrollToBottom () {
    messageArea.scrollTop = messageArea.scrollHeight            // for automatic scroll to bottom of chat
}