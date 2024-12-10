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
const total = document.getElementById('total').value;

// Dapatkan tanggal dan waktu saat ini
const now = new Date();
const formattedDate = now.toLocaleDateString('id-ID', { 
year: 'numeric', 
month: 'long', 
day: 'numeric' 
});
const formattedTime = now.toLocaleTimeString('id-ID', { 
hour: '2-digit', 
minute: '2-digit', 
second: '2-digit' 
});

// Buat tautan kontak Telegram
const telegramLink = `https://t.me/${telegram}`;

// Format pesan untuk bot
const message = `
*NEW ORDER RECEIVED*\n
Date: ${formattedDate}\n
Time: ${formattedTime}\n
------------------------\n
Project: ${project}\n
Platform: ${platform}\n
Amount: ${amount}\n
Referral: ${refferal}\n
------------------------\n
Name: ${name}\n
Contact: [${telegram}](${telegramLink})\n
Payment: ${method}\n
Total: ${total}
`;

// Kirim data ke bot Telegram
const botToken = '7555714605:AAEr1TbWrE8K8oB8ayVobOfhDhcxxwMr768';
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
