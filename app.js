// بررسی نصب Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker ثبت شد:', registration);
    })
    .catch((error) => {
      console.log('Service Worker ثبت نشد:', error);
    });
}

// مدیریت پیام‌ها
async function getMessages() {
  const receiverCode = 'receiver-code'; // کد گیرنده را وارد کنید

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
  const messagesContainer = document.getElementById('messages-container');
  messagesContainer.innerHTML = ''; // پاک کردن محتوای قبلی
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

// دریافت پیام‌ها
getMessages();

// نصب PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('install-btn');
  installBtn.style.display = 'block';

  installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
