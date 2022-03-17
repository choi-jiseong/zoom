const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
    console.log("Connected to Server!!");
})

const ul = document.querySelector('ul');
socket.addEventListener('message', (msg) => {
    // console.log("just got this:", msg.data, " from the server");
    // 웹페이지의 ul 태그를 찾고
    // 동적으로 li 태그를 생성하고 
    // 그 ul 태그의 내용으로 서버로부터 받은 메시지를 설정하고
    // 그 li를 그 ul 태그의 자식으로 추가한다.
    const li = document.createElement('li'); // <li></li>
    li.innerText = msg.data; 
    ul.appendChild(li);

});

socket.addEventListener('close', () => {
    console.log('disconnected');
});

setTimeout(() => {
    socket.send("hello from the broswer");
}, 3000);

function makeMessage(type, payload) {
    const msg = {type, payload}; // {'type': type, 'payload' : payload}
    return JSON.stringify(msg);
}

const messageForm = document.querySelector("#message");
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // form 태그 내의 input 태그에 입력된 값을 읽어온다.
    const input = messageForm.querySelector("input");
    // console.log(input.value);
    console.log('Submit event occurred', input.value);
    socket.send(makeMessage('new_message', input.value));

    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    ul.appendChild(li);

    input.value = '';
    
})

const nickForm = document.querySelector("#nick");
nickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // form 태그 내의 input 태그에 입력된 값을 읽어온다.
    const input = nickForm.querySelector("input");
    // console.log(input.value);
    console.log('Submit event occurred', input.value);
    socket.send(makeMessage('nickname', input.value));
    
    input.value = '';
    
})
