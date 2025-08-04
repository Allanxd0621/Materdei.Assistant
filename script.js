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
  "vision": "  <strong> Vision:</strong> <br> <br> Mater Dei College is a community of dedicated educators and community-oriented students who believe in the search for truth that leads to  <strong> WISDOM;</strong> unselfish living through <strong>SERVICE</strong> as an expression of <strong>charity</strong>; and the pursuit of <strong>PRAYER LIFE</strong> through living the gospel as taught by the Catholic Church and as exemplified by Mary, the mother of God in whose honor the college identifies herself.",
  "mission": "<strong> Mater Dei </strong> <br> <br> College commits herself to provide a holistic Catholic education to deserving youth with a preferential option for the economically-disadvantaged of northern Bohol to enable them to become responsible citizens and servant leaders in nation building.",
  "goal statement": "<strong>Goal Statement:</strong> <br> <br> Mater Dei College strives to produce graduates who are God-loving,law-abiding, environment-friendly, and morally principled professionals who by their able response to the call of duty, actively participate in total human formation and in the positive transformation of the communities.",
  "alma mater song": "<strong> MDC ALMA MATER SONG </strong> <br> <i> Dr. Benjamin Mejorada <br> <br> I beneath the wings <br> Of our great founderd's vision <br> That scared in time <br> to shape our life's ambition <br> With faith, abiding, hope <br> Assuring us along <br> Our minds you feed <br> And clear them of the wrong <br> <br> <strong> II <br> </strong> Hail,Mater Dei <br> with pride and joy we sing to you <br> And sound your trump <br> Of fame to any place we go <br> Enthrone your values right <br> in every work we do <br> Our hearts be one <br> And spirits whole for MDC <br> <br> <strong> Refrain:</strong> <br> The challenges we face <br> In life's full battle strand <br> The dreams we follow to <br> Achieve a mission grand <br> A burning trust we have <br> In your prime faculty <br> Will give you honor, <br> Love,respect and loyalty. <br> <br> <strong>III </strong> <br> O Mater Dei <br> We thank you for the learning years <br> The beacon light that guides <br> Us to the trinity <br> <br> Of humble Wisdom, prayer life, and charity <br> Thru service, go MDC go <br> Let's drum our cheers...",
  "MDC hymn": "<strong> MDC HYMN </strong> <br> <br> Borne in the hearts of our forebears <br> Are wisdom, love, and prayer, <br> Values native to our own culture <br> Based on the gospel truths, thru Mater Dei. <br> <br> We're the youths of Mater Dei <br> Our dear Alma, Thee we pray; <br> Deep in wisdom, love, and prayer, <br> we pledge our love to thee, o Mater Dei. <br> <br> From North to south of lovely Bohol, <br> From Batasan,Clarin, to Talibon, <br> For Wisdom, love, and prayer for all <br> We come to MDC Tubigon. <br> <br>  From East to West of lovely Bohol, <br> From Anda,Jagna across Loon. <br> For Wisdom, Love, and Prayers for all <br> We come to MDC Tubigon. <br> <br> To Christ thru Mary, for God and country, <br> O mother Mary, we recourse to thee <br> Where we live and lead in our life and deed <br> we will always be for Mater Dei. <br> <br> We hoist your high above Cabulijan skies <br> we pledge our love to thee, O Mater Dei! "
}
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

  return "I'm sorry, Can you be more specific BOGO KAYKO!";
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
