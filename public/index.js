const socket = io();

const modal = document.getElementById('backModal');
const modalName = document.getElementById('modalName');

const avatar = document.getElementById('avatar');
const clientName = document.getElementById('name');
const clientStatus = document.getElementById('status');
const statusSig = document.getElementById('statusSig');

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
let hostName = ''

avatar.style.display = 'none';

statusSig.style.boxShadow = '1px 1px 2px 2px #fff9;';
statusSig.style.backgroundColor = '#fcd98d';
clientStatus.style.color = '#ffc241'
clientStatus.textContent = 'Ausente'

function getName() {
  if(modalName.value) {
    hostName = modalName.value
    socket.emit('new user', modalName.value);
    modal.style.display = 'none'
  } else {
    alert('Atenção preencha o campo com seu nome!')
  }
}

socket.on('new user', (name) => {
  if(hostName !== name) {
    avatar.style.display = 'block';
    statusSig.style.boxShadow = '1px 1px 2px 2px #56e6c9;';
    clientStatus.style.color = '#45ccb1';
    statusSig.style.backgroundColor = '#45ccb1';
    clientStatus.textContent = 'Online';
    clientName.textContent = name
  }
})

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value, hostName);
    input.value = '';
  }
})

socket.on('chat message', (msg, n) => {
  const item = document.createElement('li')
  if (hostName !== n) {
    item.style.backgroundColor = '#a5d3eb';   
    item.style.alignSelf = 'flex-start';
    item.style.borderTopRightRadius = '15px';
  } else {
    item.style.alignSelf = 'flex-end';
    item.style.backgroundColor = '#aad4c8'
    item.style.borderTopLeftRadius = '15px';
  }

  item.textContent = msg
  messages.appendChild(item);

  window.scrollTo(0, document.body.scrollHeight)
})