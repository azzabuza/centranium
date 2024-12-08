
document.getElementById('shoppingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah formulir dikirimkan secara default
    
    // Ambil data dari formulir
    const project = document.getElementById('project').value;
    const platform = document.getElementById('platform').value;
    const amount = document.getElementById('amount').value;
    const refferal = document.getElementById('refferal').value;
    const name = document.getElementById('name').value;
    const telegram = document.getElementById('telegram').value;
    const method = document.querySelector('input[name="method"]:checked')?.value;

    // Format pesan untuk bot
    const message = `
        *New Order Received!*\n
        *Project:* ${project}\n
        *Platform:* ${platform}\n
        *Amount:* ${amount}\n
        *Referral URL/Code:* ${refferal}\n
        *Name:* ${name}\n
        *Contact (Telegram):* ${telegram}\n
        *Payment Method:* ${method}
    `;

    // Kirim data ke bot Telegram
    const botToken = '7459894598:AAGl2lQzvy_GZAzUdfwBlc1tSbZSaiI54Lc';
    const chatId = '6115365841';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    // Lakukan request untuk mengirimkan pesan ke bot Telegram
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Message sent to Telegram:', data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
});

