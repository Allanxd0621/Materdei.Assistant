const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const questionButtons = document.getElementById('question-buttons');
const courseButtons = document.getElementById('course-buttons');

let userName = null;

const botResponses = {
  "hello": "Hi there! How can I help you today?",
  "hi": "Hello! Need help with anything?",
  "uniform": "Uniforms must be worn Monday to Friday. Wednesday is wash day.",
  "library": "The library is open from 8 AM to 7 PM on weekdays.",
  "guidance": "The guidance office is located in Room 203, second floor.",
  "enrollment": "Enrollment starts every June. Check our school FB page for updates.",
  "tuition": "For tuition inquiries, please visit the registrar or accounting office.",
  "id": "If you lost your ID, go to the student affairs office for assistance.",
  "handsome": "The most handsome in Mater Dei College is none other than Ceejhay himself.",
  "facebook": 'You can find us on Facebook at <a href="https://web.facebook.com/mdctubigon" target="_blank">Mater Dei College</a>.',
  "wifi": "The wifi password for the Mentors is <strong>M$D$C$Teachers25</strong>.",
  "ceejhay": "Ceejhay is the most annoying person in the whole MDC.",
  "thanks": "You're welcome! If you have any more questions, feel free to ask.",
  "thank you": "You're welcome! If you have any more questions, feel free to ask.",
  "creator": "The creator of MDC chat assistant is Nino Allandino Manalo of Catigian Bohol (freshman).",
  "vision": "  <strong> Vision:</strong> <br> <br> Mater Dei College is a community of dedicated educators and community-oriented students who believe in the search for truth that leads to WISDOM; unselfish living through <strong>SERVICE</strong> as an expression of <strong>charity</strong>; and the pursuit of <strong>PRAYER LIFE</strong> through living the gospel as taught by the Catholic Church and as exemplified by Mary, the mother of God in whose honor the college identifies herself."
};

function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.innerHTML = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(input) {
  const lowerInput = input.toLowerCase();

  // Detect name input
  const nameMatch = lowerInput.match(/(?:i am|i'm|my name is)\s+([a-zA-Z]+)/);
  if (nameMatch) {
    userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
    return `A Mater Dei greeting, ${userName}! 😊`;
  }

  // Show course options for schedule
  if (lowerInput.includes("schedule")) {
    questionButtons.style.display = 'none';
    setTimeout(() => {
      addMessage("Okay! To check your schedule, please choose your course:", "bot");
      showCourseButtons();
    }, 500);
    return "";
  }

  // Keyword detection in sentences
  for (const key in botResponses) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(lowerInput)) {
      return botResponses[key];
    }
  }

  return "I'm sorry, I don't have the answer to that right now. Please ask about another school topic!";
}

function simulateTypingEffect(text) {
  if (!text) return;
  const typingDelay = 15;
  let index = 0;
  let message = "";
  const typingInterval = setInterval(() => {
    message += text.charAt(index);
    index++;
    if (index === 1) {
      addMessage("", "bot");
    }
    const messages = document.querySelectorAll(".message.bot");
    const lastBotMsg = messages[messages.length - 1];
    if (lastBotMsg) {
      lastBotMsg.innerHTML = message;
    }
    if (index >= text.length) {
      clearInterval(typingInterval);
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  }, typingDelay);
}

function showCourseButtons() {
  courseButtons.innerHTML = ""; // Clear old buttons
  const courses = ["BSIT1", "BSHM1", "BSIT"];
  courses.forEach(course => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = course;
    btn.onclick = () => showSchedule(course);
    courseButtons.appendChild(btn);
  });
  courseButtons.style.display = "flex";
}

function showSchedule(course) {
  addMessage(course, "user");
  let schedule = "";

  if (course === "BSIT1") {
    schedule = `📅 <strong>BSIT First Year Schedule</strong><br><br>
    <strong>Section S1</strong><br><br>
    <strong>MWF</strong><br>
    &nbsp;&nbsp;• Computing101 (7am - 8am)<br>
    &nbsp;&nbsp;• History101 (9am - 10am)<br>
    &nbsp;&nbsp;• INSTI101 (10am - 11am)<br>
    &nbsp;&nbsp;• Computing101 (12pm - 1pm)<br>
    &nbsp;&nbsp;• PE (2pm - 3pm, no class on Wed)<br>
    &nbsp;&nbsp;• Programming101 (5pm - 7pm)<br><br>
    <strong>TTh</strong><br>
    &nbsp;&nbsp;• Math (7am - 8:30am)<br>
    &nbsp;&nbsp;• Perdev (9am - 10:30am)<br><br>
    <strong>Section S2</strong><br><br>
    &nbsp;&nbsp;• Programming101 (7am - 8am)<br>
    &nbsp;&nbsp;• History101 (8am - 9am)<br>
    &nbsp;&nbsp;• PE (10am - 11am)<br>
    &nbsp;&nbsp;• Programming101 (12pm - 1pm)<br>
    &nbsp;&nbsp;• Math (2pm - 3pm)<br>
    &nbsp;&nbsp;• Computing (5pm - 7pm)<br><br>
    <strong>TTh</strong><br>
    &nbsp;&nbsp;• Perdev (10:30am - 12pm)<br>
    &nbsp;&nbsp;• INSTI101 (12pm - 1:30pm)`;
  } else if (course === "BSHM1") {
    schedule = "📅 <strong>BSHM First Year Schedule</strong><br><br>&nbsp;&nbsp;• MWF - Lab @ 1PM to 4PM.";
  } else if (course === "BSIT") {
    schedule = "📅 <strong>BSBA 1B Schedule</strong><br><br>&nbsp;&nbsp;• MWF - 7AM to 11AM<br>&nbsp;&nbsp;• TTh - PE & NSTP @ 1PM.";
  }

  addMessage(schedule, "bot");
  courseButtons.style.display = "none";
}

// Handle send button click
sendBtn.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (input !== "") {
    addMessage(input, "user");
    const reply = getBotReply(input);
    simulateTypingEffect(reply);
    userInput.value = "";
  }
});

// Allow Enter key to submit
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});

// Show welcome message on page load
window.onload = function () {
  addMessage("👋 Welcome to MDC Chat Assistant! I'm Mater, your friendly freshman helper. How can I help you today?", "bot");
};
