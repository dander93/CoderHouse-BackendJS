(() => {

    const cx = io();
    window.dataLayer = window.dataLayer || {};

    const setLoggedUser = () => {
        do {
            window.dataLayer.user = prompt('Ingrese su mail');
        } while (!window.dataLayer.user);

        const usrIput = document.getElementById('userInput');
        usrIput.value = window.dataLayer.user;
        usrIput.parentNode.classList.remove('d-none');
    };

    setLoggedUser();

    cx.on('error', async (data) => {
        console.error(JSON.parse(await data));
    });

    cx.emit('getMessages');
    cx.on('listMessages', (data) => {

        const mensajes = JSON.parse(data);

        const list = document.getElementById('message-list').cloneNode();

        mensajes.forEach((mensaje, index) => {

            const li = document.createElement('li');

            li.classList.add('list-group-item');

            if (index % 2 == 0) {
                li.classList.add('list-group-item-warning');
            }

            const text = document.createElement('p');
            text.innerText = `${mensaje.user}: ${mensaje.message}`;

            li.appendChild(text);

            list.appendChild(li);
        });

        document.getElementById('message-list').replaceWith(list);
    });

    cx.on('messageAdded', () => cx.emit('getMessages'));

    const messenger = document.getElementById('message-box');
    messenger.addEventListener('submit', (event) => {

        event.preventDefault();
        const data = new FormData(event.target).get('message');

        event.target.reset();

        const request = {
            user: window.dataLayer.user,
            message: data
        };

        cx.emit('addMessage', JSON.stringify(request));
    });
})();

