// ثبت Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker ثبت شد:', registration);
    })
    .catch((error) => {
      console.log('Service Worker ثبت نشد:', error);
    });
}

// بررسی شماره در localStorage
const storedPhone = localStorage.getItem('receiverCode');
const phoneFormContainer = document.getElementById('phone-form-container');
const messagesContainer = document.getElementById('messages-container');

if (storedPhone) {
  phoneFormContainer.style.display = 'none';
  messagesContainer.style.display = 'block';
  getMessages(storedPhone);
} else {
  phoneFormContainer.style.display = 'block';
  messagesContainer.style.display = 'none';
}

// مدیریت فرم شماره
const phoneForm = document.getElementById('phone-form');
phoneForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const phone = document.getElementById('phone').value.trim();
  if (phone) {
    localStorage.setItem('receiverCode', phone);
    phoneFormContainer.style.display = 'none';
    messagesContainer.style.display = 'block';
    getMessages(phone);
  }
});

// دریافت پیام‌ها
async function getMessages(receiverCode) {
  try {
    const response = await fetch(`https://kharazm.onrender.com/get_message/${receiverCode}`);
    const data = await response.json();
    if (data.status && data.status === 'error') {
      alert(data.message);
      return;
    }
    displayMessages(data);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

// نمایش پیام‌ها
function displayMessages(messages) {
  messagesContainer.innerHTML = '';
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
      <h3>${message.title}</h3>
      <p>${message.body}</p>
      <small>${new Date(message.timestamp).toLocaleString()}</small>
    `;
    messagesContainer.appendChild(messageElement);
  });
}

// نصب PWA
let deferred
