// دریافت شماره تلفن کاربر از LocalStorage یا درخواست آن در صورت عدم وجود
let userPhone = localStorage.getItem('userPhone');

if (!userPhone) {
    userPhone = prompt("لطفاً شماره تلفن خود را وارد کنید:");
    localStorage.setItem('userPhone', userPhone);
}

// بارگذاری پیام‌ها از سرور
async function loadMessages() {
    const response = await fetch(`https://kharazm.onrender.com/get_message/${userPhone}`);
    const data = await response.json();
    if (data.status === "error") {
        alert("پیامی برای شما موجود نیست.");
    } else {
        displayMessages(data);
    }
}

// نمایش پیام‌ها در صفحه
function displayMessages(messages) {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    messages.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.innerHTML = `<strong>${msg.title}</strong>: ${msg.body}`;
        messageList.appendChild(messageItem);
    });
}

// بارگذاری پیام‌ها در هنگام کلیک بر روی دکمه
document.getElementById('load-messages').addEventListener('click', loadMessages);
