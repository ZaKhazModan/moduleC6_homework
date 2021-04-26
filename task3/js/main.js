const message = document.querySelector('.input-msg');
const outputText = document.querySelector('.output');
const mapLink = document.querySelector('.geolok-href');
const btnSendMessage = document.querySelector('.send-msg');
const btnGeoLok = document.querySelector('.geo-lok');
const URL = 'wss://echo.websocket.org/';

// Функция сна - для того, 
// чтобы успело произойти подключение
function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}


function createMessage(text, margin = null) {
    const msg = document.createElement("p");
    msg.style.width='180px';
    msg.style.height='20px';
    msg.style.padding='10px';
    msg.style.background='white';
    msg.style.borderStyle='solid';
    msg.style.borderColor='#bbd8ed';
    msg.style.borderRadius='10px';
    msg.innerHTML = text;
    if (margin) {
        // для клиента:
        msg.style.marginLeft = margin;
    }
    outputText.appendChild(msg);
};

const websocket = new WebSocket(URL);
sleep(3000);

btnSendMessage.addEventListener('click', () => {
    let text = message.value;
    if (!text) {
        alert('Введите текст для отправки!');
    } else {
        createMessage(text, '250px');
        websocket.send(text);
        websocket.onmessage = function(evt) {
            createMessage(evt.data);
        }
        websocket.onerror = (evt) => {
            console.log('ERROR!');
        }
    }
});

const error = () => {
	status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
	const latitude  = position.coords.latitude;
	const longitude = position.coords.longitude;
    const link = document.createElement("a");
	link.style.display='block';
    link.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	link.textContent = 'гео-локация';
    link.target = '_blank';
    link.style.marginLeft = '320px';
    link.style.padding = '10px 20px';
    link.style.color = '#0a67c5';
    link.style.background = 'white';
    link.style.borderStyle = 'solid';
    link.style.borderColor = '#bbd8ed';
    link.style.borderRadius = '10px';
    outputText.appendChild(link);
};

btnGeoLok.addEventListener('click', () => {
	if (!navigator.geolocation) {
        status.textContent = 'Нет поддержки геолокации';
	} else {
        navigator.geolocation.getCurrentPosition(success, error);
	}
});