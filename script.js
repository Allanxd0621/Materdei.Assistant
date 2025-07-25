const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  let userName = null;

  const botResponses = {
    "hello": "Hi there! How can I help you today?",
    "hi": "Hello! Need help with anything?",
    "schedule": "Our class schedule is posted on the bulletin board and website.",
    "uniform": "Wear your school uniform Monday to Thursday. Friday is wash day!",
    "library": "Library is open from 8 AM to 5 PM, Monday to Friday.",
    "guidance": "You can find the guidance office on the second floor, Room 203.",
    "enrollment": "Enrollment usually begins in June. Check our Facebook page for announcements.",
    "tuition": "Tuition fees vary per course. You can ask the registrar for details.",
    "id": "Lost your ID? Visit the student affairs office for a replacement.",
    "facebook": 'The Facebook account of our school is <a href="https://www.facebook.com/mdctubigon" target="_blank">Mater Dei College</a>.',
  };

  // Add message to chat box
  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerHTML = text; // Use innerHTML to allow links
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

