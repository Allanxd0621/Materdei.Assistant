const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const questionButtons = document.getElementById('question-buttons');
const courseButtons = document.getElementById('course-buttons');

let userName = null;

const botResponses = {
  "hello": "Hi there! How can I help you today?",
  "hi": "Hello! Need help with anything?",
  "uniform": "Uniforms must be worn Monday to Friday. But there is a special wash day uniform for Wednesdays.",
  "library": "The library is open from 8 AM to 7 PM on weekdays.",
  "guidance": "The guidance office is located in Room 203, second floor.",
  "enrollment": "Enrollment starts every June. Check our school FB page for updates.",
  "tuition": "For tuition inquiries, please visit the registrar or accounting office.",
  "id": "If you lost your ID, go to the student affairs office for assistance.",
  "handsome": "The most handsome in Mater Dei College is none other than Ceejhay himself.",
  "facebook": 'You can find us on Facebook at <a href="https://web.facebook.com/mdctubigon" target="_blank">Mater Dei College</a>.',
  "wifi": "The wifi password for the Mentors is <strong>M$D$C$Teachers25</strong>.",
  "Wifi": "The wifi password for the Mentors is <strong>M$D$C$Teachers25</strong>.",
  "ceejhay": "Ceejhay is the most annoying person in the whole MDC.",
  "thanks": "You're welcome! If you have any more questions, feel free to ask.",
  "thank you": "You're welcome! If you have any more questions, feel free to ask.",
  "creator": "The creator of MDC chat assistant is Nino Allandino Manalo of Catigian Bohol (freshman)."
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
  const nameMatch = lowerInput.match(/(?:i am|i'm|my name is)\s+([a-zA-Z]+)/);
  if (nameMatch) {
    userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
    return `A Mater dei Greetings!, ${userName}! 😊`;
  }

  if (lowerInput.includes("schedule")) {
    questionButtons.style.display = 'none';
    setTimeout(() => {
      addMessage("Okay! To check your schedule, please choose your course:", "bot");
      showCourseButtons();
    }, 500);
    return "";
  }

  for (const key in botResponses) {
    if (lowerInput.includes(key)) {
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
    if (index >= text.length) {
      clearInterval(typingInterval);
    }
    if (index === 1) {
      addMessage("", "bot");
    }
    const messages = document.querySelectorAll(".message.bot");
    const lastBotMsg = messages[messages.length - 1];
    if (lastBotMsg) {
      lastBotMsg.innerHTML = message;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  }, typingDelay);
}

function showCourseButtons() {
  courseButtons.innerHTML = ""; // Clear previous buttons
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
    schedule = `This is the Schedule for BSIT first year:<br><br>
    <strong>BSIT1-S1</strong><br><br>
    <strong>MWF Schedule</strong><br>
    &nbsp;&nbsp;• Computing101 (7am - 8am)<br>
    &nbsp;&nbsp;• History101 (9am - 10am)<br>
    &nbsp;&nbsp;• INSTI101 (10am - 11am)<br>
    &nbsp;&nbsp;• Computing101 (12pm - 1pm)<br>
    &nbsp;&nbsp;• PE (2pm - 3pm, no class every Wednesday)<br>
    &nbsp;&nbsp;• Programming101 (5pm - 7pm)<br><br>
    <strong>Tue/Thu</strong><br>
    &nbsp;&nbsp;• Mathematics (7am - 8:30am)<br>
    &nbsp;&nbsp;• Perdev (9am - 10:30am)<br><br>
    <strong>BSIT1-S2</strong><br><br>
    &nbsp;&nbsp;• Programming101 (7am - 8am)<br>
    &nbsp;&nbsp;• History101 (8am - 9am)<br>
    &nbsp;&nbsp;• PE (10am - 11am)<br>
    &nbsp;&nbsp;• Programming101 (12pm - 1pm)<br>
    &nbsp;&nbsp;• Mathematics (2pm - 3pm)<br>
    &nbsp;&nbsp;• Computing (5pm - 7pm)<br><br>
    <strong>Tue/Thu</strong><br>
    &nbsp;&nbsp;• Perdev (10:30am - 12pm)<br>
    &nbsp;&nbsp;• INSTI101 (12pm - 1:30pm)`;
  } else if (course === "BSHM1") {
    schedule = "This is the schedule for BSHM first year:<br><br>&nbsp;&nbsp;• MWF - Lab @ 1PM to 4PM.";
  } else if (course === "BSIT") {
    schedule = "📅 BSBA 1B Schedule:<br><br>&nbsp;&nbsp;• MWF - 7AM to 11AM<br>&nbsp;&nbsp;• TTh - PE & NSTP @ 1PM.";
  }

  addMessage(schedule, "bot");
  courseButtons.style.display = "none";
}

sendBtn.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (input !== "") {
    addMessage(input, "user");
    const reply = getBotReply(input);
    simulateTypingEffect(reply);
    userInput.value = "";
  }
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});

// Show welcome message when the page loads
window.onload = function () {
  addMessage("MDC My Family!, Hi I'm Mater your friendly freshman chat support, how can I help you?", "bot");
};
