const quizData = [
  {
    subject: " ⚙️ Power Train & Engine Technology",
    questions: [] // Will fill later
  },
  {
    subject: "🔧 Vehicle Dynamics & Mechanical System",
    questions: []
  },
  {
    subject: "⏲ Control Systems & ADAS",
    questions: []
  }
];

// DOM Elements
const subjectsList = document.querySelector(".subjects");

// Populate subject buttons
const getSubjects = () => {
  const subjects = quizData
    .map((data) => {
      return `<li class="subject" id="${data.subject.toLowerCase()}">
                ${data.subject}
              </li>`;
    })
    .join("");
  subjectsList.innerHTML = subjects;
};

getSubjects();
