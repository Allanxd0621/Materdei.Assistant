// Connect the elements from HTML
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const questionButtons = document.getElementById('question-buttons'); // suggestion buttons container
const courseButtons = document.getElementById('course-buttons'); // course buttons container

// Placeholder for user's name
let userName = null;

// Bot responses for simple keywords
const botResponses = {
  "hello": "Hi there! How can I help you today?",
  "hi": "Hello! Need help with anything?",
  "uniform": "Uniforms must be worn Monday to Friday. But there is a special wash day uniform for Wednesdays.",
  "library": "The library is open from 8 AM to 5 PM on weekdays.",
  "guidance": "The guidance office is located in Room 203, second floor.",
  "enrollment": "Enrollment starts every June. Check our school FB page for updates.",
  "tuition": "For tuition inquiries, please visit the registrar or accounting office.",
  "id": "If you lost your ID, go to the student affairs office for assistance.",
  "handsome": "The most handsome in Mater Dei College is none other than Ceejhay himself.",
  "facebook": 'You can find us on Facebook at <a href="https://web.facebook.com/mdctubigon" target="_blank">Mater Dei College</a>.',
  "wifi": "The wifi password for the Mentors is <strong> M$D$C$Teachers25 </strong>.",
  "Wifi": "The wifi password for the Mentors is <strong> M$D$C$Teachers25 </strong>.",
  "ceejhay" : "Ceejhay is the most annoying person in the whole mdc.",
};

// Add a new message to the chat
function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.innerHTML = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to generate the bot's reply
function getBotReply(input) {
  const lowerInput = input.toLowerCase();

  // Check if user gives their name
  const nameMatch = lowerInput.match(/(?:i am|i'm|my name is)\s+([a-zA-Z]+)/);
  if (nameMatch) {
    userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
    return `A Mater dei Greetings!, ${userName}! 😊`;
  }

  // Handle "schedule" separately
  if (lowerInput.includes("schedule")) {
    // Hide initial question buttons
    questionButtons.style.display = 'none';

    // Ask follow-up question
    setTimeout(() => {
      addMessage("Okay! To check your schedule, please choose your course:", "bot");
      showCourseOptions();
    }, 500);

    return ""; // Don't return a reply yet
  }

  // Check other keyword-based responses
  for (const keyword in botResponses) {
    if (lowerInput.includes(keyword)) {
      const baseReply = botResponses[keyword];
      return userName ? `${baseReply} (Got it, ${userName}!)` : baseReply;
    }
  }

  // Default fallback response
  return userName
    ? `Sorry ${userName}, I’m not sure how to answer that. Try asking about tuition, ID, etc.`
    : "I'm not sure how to answer that yet. Try asking about tuition, ID, etc.";
}

// Simulate typing delay
function simulateTypingEffect(botReply) {
  if (botReply === "") return; // Skip if no reply needed

  const typingMessage = document.createElement('div');
  typingMessage.className = 'message bot';
  typingMessage.textContent = "Taysa typing...";
  chatBox.appendChild(typingMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    chatBox.removeChild(typingMessage);
    addMessage(botReply, "bot");
  }, 1000);
}

// When the user sends a message
function handleSend() {
  const userText = userInput.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");

  const botReply = getBotReply(userText);
  simulateTypingEffect(botReply);

  userInput.value = "";
}

// Show course buttons after user asks for "schedule"
function showCourseOptions() {
  courseButtons.innerHTML = ""; // Clear previous buttons

  const courses = ["BSIT1-S1", "BSIT1-S2", ""];
  courses.forEach(course => {
    const btn = document.createElement("button");
    btn.textContent = course;
    btn.className = "choice-btn";
    btn.addEventListener("click", () => showSchedule(course));
    courseButtons.appendChild(btn);
  });

  courseButtons.style.display = "flex"; // Show the new course buttons
}

// Show specific schedule based on selected course
function showSchedule(course) {
  let schedule = "";

  if (course === "BSIT1-S1") {
    schedule = "📅 <Strong> BSIT 1 Schedule: </strong> Section 1 <br> MWF Schedule <br>  • Computing101(7am to 8am) <br>  • History101(9am to 10am) <br> • INSTI101(10am to 11am) <br> • Computing101(12pm to 1pm) <br> • PE(2pm to 3pm no class every Wednesday) <br> • Programming101(5pm to 7pm). <br> Tue/thu <br>  • Mathematics(7am to 8:30am)";
  } else if (course ==="BSIT1-S2") {
    schedule = "📅 BSIT 2A Schedule: TTh - 8AM to 12 <br> NN, MWF - Lab @ 1PM to 4PM.";
  } else if (course === "BSIT") {
    schedule = "📅 BSBA 1B Schedule: MWF - 7AM to 11AM, TTh - PE & NSTP @ 1PM.";
  }

  addMessage(schedule, "bot");
  courseButtons.style.display = "none"; // Hide course buttons again after answering
}

// Listen to button and Enter key
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

// Show welcome message when the page loads
window.addEventListener('DOMContentLoaded', () => {
  addMessage("Hey! I'm Mater your personal Assistant, how may I help you today?", "bot");
});
