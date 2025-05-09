document.getElementById('code-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // جلوگیری از ریفرش شدن صفحه

  const code = document.getElementById('user-code').value.trim();
  if (!code) return;

  // ذخیره کد در localStorage
  localStorage.setItem('userCode', code);

  try {
    const response = await fetch(`https://kharazm.onrender.com/get_message/${code}`);
    const data = await response.json();

    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    if (data.length === 0) {
      messagesDiv.innerHTML = '<p>پیامی برای شما وجود ندارد.</p>';
    } else {
      data.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = msg;
        messagesDiv.appendChild(p);
      });
    }
  } catch (error) {
    alert('خطا در دریافت پیام‌ها');
    console.error(error);
  }
});
