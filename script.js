const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// List of keywords and their corresponding bot replies
const botResponses = {
  "hello": "Hi there! How can I help you today?",
  "hi": "Hello! Need help with anything?",
  "schedule": "You can view the school schedule on our website or ask your class adviser.",
  "uniform": "Uniforms must be worn Monday to Friday.But there is a special wash day uniform for Wednesdays.",
  "library": "The library is open from 8 AM to 5 PM on weekdays.",
  "guidance": "The guidance office is located in Room 203, second floor.",
  "enrollment": "Enrollment starts every June. Check our school FB page for updates.",
  "tuition": "For tuition inquiries, please visit the registrar or accounting office.",
  "id": "If you lost your ID, go to the student affairs office for assistance.",
  "handsome": "The most handsome in Mater dei College is none other than Ceejhay himself.",
  "nigga": "Ayaw pag sulti-sulti og inana kay pusilon ka sa mga guard",
  "facebook": 'You can find us on Facebook at<a href="https://web.facebook.com/mdctubigon" target="_blank">Mater Dei College.</a>.',
};
function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  if (sender === "bot") {
    message.innerHTML = text; // Allow HTML for bot messages
  } else {
    message.textContent = text; // Escape user messages
  }
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();

  // Check if any keyword exists in the input
  for (let keyword in botResponses) {
    if (input.includes(keyword)) {
      return botResponses[keyword];
    }
  }

  // Default reply if wala kasabot ang bot
  return "I'm sorry, wakoy nasabtan saimo ge chat.";
}

function handleSend() {
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  const botReply = getBotReply(userText);
  setTimeout(() => addMessage(botReply, "bot"), 500);
  userInput.value = "";
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

// Show welcome message on load
window.addEventListener('DOMContentLoaded', () => {
  addMessage("Hey! I’m Ceejhay 🤖, how can I help you today?", "bot");
});


