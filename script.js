const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let userName = null;

const botResponses = {
  "hello": "Hi there! How can I help you today?",
  "hi": "Hello! Need help with anything?",
  "schedule": "You can view the school schedule on our website or ask your class adviser.",
  "uniform": "Uniforms must be worn Monday to Friday. But there is a special wash day uniform for Wednesdays.",
  "library": "The library is open from 8 AM to 5 PM on weekdays.",
  "guidance": "The guidance office is located in Room 203, second floor.",
  "enrollment": "Enrollment starts every June. Check our school FB page for updates.",
  "tuition": "For tuition inquiries, please visit the registrar or accounting office.",
  "id": "If you lost your ID, go to the student affairs office for assistance.",
  "handsome": "The most handsome in Mater dei College is none other than Ceejhay himself.",
  "facebook": 'You can find us on Facebook at <a href="https://web.facebook.com/mdctubigon" target="_blank">Mater Dei College</a>.',
};

// Add message to chat box
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

// Generate bot reply
function getBotReply(input) {
  const lowerInput = input.toLowerCase();

  // Check if user is giving their name
  const nameMatch = lowerInput.match(/(?:i am|i'm|my name is)\s+([a-zA-Z]+)/);
  if (nameMatch) {
    userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
    return `Nice to meet you, ${userName}! 😊`;
  }

  // Keyword-based responses
  for (const keyword in botResponses) {
    if (lowerInput.includes(keyword)) {
      const baseReply = botResponses[keyword];
      return userName ? `${baseReply} (Got it, ${userName}!)` : baseReply;
    }
  }

  // Default/fallback response
  return userName
    ? `Sorry ${userName}, I’m not sure how to answer that. Try asking about schedule, ID, etc.`
    : "I'm not sure how to answer that yet. Try asking about schedule, ID, etc.";
}

// Simulate typing delay before showing bot message
function simulateTypingEffect(botReply) {
  const typingMessage = document.createElement('div');
  typingMessage.className = 'message bot';
  typingMessage.textContent = "Taysa typing...";
  chatBox.appendChild(typingMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    chatBox.removeChild(typingMessage);
    addMessage(botReply, "bot");
  }, 1000); // 1 second delay
}

// Handle send button or Enter key
function handleSend() {
  const userText = userInput.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");

  const botReply = getBotReply(userText);
  simulateTypingEffect(botReply);

  userInput.value = "";
}

// Event listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

// Welcome message on load
window.addEventListener('DOMContentLoaded', () => {
  addMessage("Hey! I’m Ceejhay 🤖, how can I help you today?", "bot");
});
