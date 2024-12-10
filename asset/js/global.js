// URL Script Apps
const scriptURL = 'https://script.google.com/macros/s/AKfycbzHmh5Xxv6wEkwdzcpNHvVyn9S1v86o2HTMlMsK4Jir3AgGcqXOAUP_oEZoRcsjSL5x/exec';

// Price per referral
const prices = {
Telegram: {
BTC: 0.00000096,
ETH: 0.00002476,
USDT: 0.09471885,
SOL: 0.00042197,
BNB: 0.00013232,
XRP: 0.03973359,
DOGE: 0.21928991,
TON: 0.01482759,
},
Testnet: {
BTC: 0.00000129,
ETH: 0.00003312,
USDT: 0.12602998,
SOL: 0.00056387,
BNB: 0.00017671,
XRP: 0.05286325,
DOGE: 0.29173996,
TON: 0.01971941,
},
Exchange: {
BTC: 0.00000161,
ETH: 0.00004146,
USDT: 0.15793087,
SOL: 0.00070433,
BNB: 0.00022070,
XRP: 0.06620194,
DOGE: 0.36241916,
TON: 0.02460121,
},
};

// Account numbers for each method
const walletAddress = {
BTC: "38wR7ytGwyX5f6Za11zN6D1ReTBBesexqu",
ETH: "0x68600cf51910adc507ebcc6ffe7ad5a9f090373a",
USDT: "TYXUvSRTLksro1E8tq6MCrUd4VUrQzQ7S2",
SOL: "7cRXzzjo3Pb8NDB8QuCXvDzr5gja4dTMoBh7XAyqGtTW",
BNB: "0x68600cf51910adc507ebcc6ffe7ad5a9f090373a",
XRP: "rUzWJkXyEtT8ekSSxkBYPqCvHpngcy6Fks",
DOGE: "9yV4Jg6NXbboMhHrMwtpUSVryn8EAFDF7Y",
TON: "UQApbzdWqIOHXB2J1lODGWQRjJVr3CeR0VQKYT0xDz8EhCZf",
};

// Calculate total price based on project and method
function calculateTotal() {
const referralCount = parseFloat(document.getElementById('amount').value) || 0;
const project = document.getElementById('project').value;
const method = document.querySelector('input[name="method"]:checked')?.value;

if (project && method && prices[project]?.[method]) {
const total = referralCount * prices[project][method];
document.getElementById('total').value = `${total.toFixed(8)} ${method}`;
} else {
document.getElementById('total').value = '0';
}
}

// Show platform options based on selected project
function showSubOptions() {
const project = document.getElementById("project").value;
const platform = document.getElementById("platform");

platform.innerHTML = "";

const defaultOption = document.createElement("option");
defaultOption.disabled = true;
defaultOption.selected = true;
defaultOption.hidden = true;
defaultOption.value = "";
defaultOption.textContent = "Select platform";
platform.appendChild(defaultOption);

const options = {
Telegram: ["Blum", "Electra", "Paws", "Tapswap"],
Testnet: ["Grass", "Gradient Network", "Nodepay", "Navigate", "BlockMesh Network", "Dawn"],
Exchange: ["Binance", "OKX", "Bitget", "GateIo", "Bybit"],
}[project] || [];

options.forEach(option => {
const opt = document.createElement("option");
opt.value = option;
opt.textContent = option;
platform.appendChild(opt);
});
}

document.getElementById("platform").addEventListener("click", () => {
const project = document.getElementById("project").value;
if (!project) {
alert("Please select project first.");
document.getElementById("project").focus();
}
});

// Handle form submission
document.getElementById('shoppingForm').addEventListener('submit', function (e) {
e.preventDefault();

const formData = new FormData(e.target);
console.log("Data to be sent:", Object.fromEntries(formData.entries()));

// Validate fields
if (!formData.get("project") || !formData.get("platform") || !formData.get("amount") || !formData.get("refferal") || !formData.get("name") || !formData.get("telegram") || !formData.get("method") || !formData.get("total")) {
alert("Please complete all data.");
return;
}

document.querySelector(".shopping-button").style.display = "none";
document.getElementById("waiting-process").style.display = "block";

fetch(scriptURL, { method: 'POST', body: formData })
.then(response => {
console.log("Response status:", response.status);
if (!response.ok) {
throw new Error(`Server responded with status ${response.status}`);
}
return response.json();
})
.then(data => {
console.log("Server response data:", data);

document.querySelector(".shopping-button").style.display = "block";
document.getElementById("waiting-process").style.display = "none";

document.querySelector(".info-payment").innerHTML = `
<div class="payment-content">
<div class="data-payment">
<table>
<tr>
<td>Project</td>
<td><span>${formData.get("project")}</span></td>
</tr>
<tr>
<td>Platform</td>
<td><span>${formData.get("platform")}</span></td>
</tr>
<tr>
<td>Amount</td>
<td><span>${formData.get("amount")}</span></td>
</tr>
<tr>
<td>Refferal</td>
<td><span>${formData.get("refferal")}</span></td>
</tr>
<tr>
<td>Method</td>
<td><span>${formData.get("method")}</span></td>
</tr>
<tr>
<td>Total</td>
<td><span>${formData.get("total")}</span></td>
</tr>
</table>
</div>
<p>Thank you, <span>${formData.get("name")}</span></p>
<p>Please make a transaction of <span>${formData.get("total")}</span> to the following wallet address:</p>
<div class="crypto-address">
<p id="addressCrypto">${walletAddress[formData.get("method")]}</p>
<button onclick="copyText()">Copy Wallet Address</button>
</div>
<div class="nav-payment">
<button id="cancel">Cancel</button>
<a href="https://t.me/+6285640067363" id="confirmation">Confirm</a>
</div>
</div>`;
document.querySelector(".info-payment").style.display = "block";

e.target.reset();
showSubOptions();
})
.catch(error => {
console.error('Fetch Error:', error);
document.querySelector(".shopping-button").style.display = "block";
document.getElementById("waiting-process").style.display = "none";
alert("Failed to make transaction.");
});
});

// Event listener Cancel Button
document.addEventListener('click', function (e) {
if (e.target && e.target.id === 'cancel') {
const infoPaymentDiv = document.querySelector('.info-payment');
if (infoPaymentDiv) {
infoPaymentDiv.style.display = 'none';
}
}
});

// Copy text to clipboard
function copyText() {
const textElement = document.getElementById('addressCrypto');
if (!textElement) {
console.error('Element with ID "addressCrypto" not found.');
return;
}

const ultraText = textElement.textContent || textElement.innerText;

// Check if the Clipboard API is supported
if (navigator.clipboard) {
navigator.clipboard.writeText(ultraText)
.then(() => {
alert('Text copied successfully!');
})
.catch(err => {
console.error('Failed to copy text:', err);
alert('Failed to copy text.');
});
} else {
const textArea = document.createElement('textarea');
textArea.value = ultraText;
document.body.appendChild(textArea);
textArea.select();
try {
document.execCommand('copy');
alert('Text copied successfully!');
} catch (err) {
console.error('Failed to copy text using fallback:', err);
alert('Failed to copy text.');
}
document.body.removeChild(textArea); 
}
}

// Add event listeners
document.getElementById('project').addEventListener('change', () => {
showSubOptions();
calculateTotal();
});
document.getElementById('amount').addEventListener('input', calculateTotal);
document.querySelectorAll('input[name="method"]').forEach(radio => radio.addEventListener('change', calculateTotal));


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

// Format pesan untuk bot
const message = `
*NEW ORDER RECEIVED!!!*\n
Date: ${formattedDate}\n
Time: ${formattedTime}\n\n
Project: ${project}\n
Platform: ${platform}\n
Amount: ${amount}\n
Referral: ${refferal}\n\n
Name: ${name}\n
Contact: ${telegram}\n
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

