const quizData = [
  {
    subject: " ⚙️ Power Train & Engine Technology",
    questions: [
      {
        question: "What is the main function of the crankshaft?",
        options: [
          "Mix air and fuel",
          "Convert linear motion of pistons into rotational motion",
          "Reduce engine temperature",
          "Open and close valves",
        ],
        correctOption: "Convert linear motion of pistons into rotational motion",
      },
      {
        question: "What is the main function of the pistons in a car engine?",
        options: [
          "Convert rotational motion to linear motion",
          "Compress air into the tires",
          "Convert combustion pressure to mechanical motion",
          "Cool the engine block",
        ],
        correctOption: "Convert combustion pressure to mechanical motion",
      }
    ],
  },
  {
    subject: "🔧 Vehicle Dynamics & Mechanical System",
    questions: [
      {
        question: "What is the function of the Differential?",
        options: [
          "Controls fuel injection timing",
          "Measures vehicle accelerator",
          "Enables wheels to rotate at different speed",
          "Balances air-fuel mixture",
        ],
        correctOption: "Enables wheels to rotate at different speed",
      },
      {
        question: "What component transmits torque from the transmission to the wheels?",
        options: ["Driveshaft", "Radiator", "Fuel injector", "Clutch plate"],
        correctOption: "Driveshaft",
      }
    ],
  },
  {
    subject: "⏲ Control Systems & ADAS",
    questions: [
      {
        question: "What does ADAS stand for?",
        options: [
          "Advanced Driver Assistance Systems",
          "Auto Driving Assist System",
          "Active Driving Alert System",
          "Automatic Driving Alarm Sensor",
        ],
        correctOption: "Advanced Driver Assistance Systems",
      },
      {
        question: "What is the main function of ABS (Anti-lock Braking System)?",
        options: [
          "Apply more braking force",
          "Improve fuel efficiency",
          "Prevent wheels from locking during braking",
          "Reduce brake pad wear",
        ],
        correctOption: "Prevent wheels from locking during braking",
      }
    ],
  }
];

// DOM Elements
const subjectsList = document.querySelector(".subjects");
const subjectsContainer = document.querySelector(".subjects-container");
const modelContainer = document.getElementById("modelContainer");
const questionsContainer = document.querySelector(".questions-container");
const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".answers");
const scoreContainer = document.querySelector(".score");
const nextBtn = document.querySelector(".next-btn");
const finalScore = document.querySelector(".final-score");
const resultContainer = document.querySelector(".result-container");
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart-btn");
const quitBtns = document.querySelectorAll(".quit-btn");

// Audio
const audio1 = new Audio("assets/error.wav");
const audio2 = new Audio("assets/win.wav");
const audio3 = new Audio("assets/Correct.mp3");
const audio4 = new Audio("assets/lose.mp3");

// State
let subject = "";
let score = 0;
let index = 0;
let acceptingAnswers = true;

const getSubjects = () => {
  const subjects = quizData
    .map((data) => {
      return `<li class="subject" id="${data.subject.toLowerCase()}">
                ${data.subject}
              </li>`;
    })
    .join("");
  subjectsList.innerHTML = subjects;

  const subjectItems = document.querySelectorAll(".subject");
  subjectItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectedSubject = e.currentTarget.id;
      subject = selectedSubject;
      subjectsContainer.classList.remove("show");
      questionsContainer.classList.add("show");
      getQuestions();

      if (selectedSubject.includes("power train")) {
        modelContainer.style.display = "block";
        modelContainer.innerHTML = `
          <model-viewer 
            src="assets/car_engine.glb" 
            alt="Car Engine"
            auto-rotate 
            camera-controls 
            style="width: 100%; height: 100%;">
          </model-viewer>`;
      } else if (selectedSubject.includes("vehicle dynamics")) {
        modelContainer.style.display = "block";
        modelContainer.innerHTML = `
          <model-viewer 
            src="assets/Car_suspension.glb" 
            alt="Car Suspension"
            auto-rotate 
            camera-controls 
            style="width: 100%; height: 100%;">
          </model-viewer>`;
      } else if (selectedSubject.includes("control systems")) {
        modelContainer.style.display = "block";
        modelContainer.innerHTML = `
          <model-viewer 
            src="assets/Car.glb" 
            alt="Car Model"
            auto-rotate 
            camera-controls 
            style="width: 100%; height: 100%;">
          </model-viewer>`;
      } else {
        modelContainer.style.display = "none";
        modelContainer.innerHTML = "";
      }
    });
  });
};

const getQuestions = () => {
  scoreContainer.innerHTML = `<strong>Score:</strong> ${score}/5`;

  const subjectData = quizData.find((data) => data.subject.toLowerCase() === subject);
  const { questions } = subjectData;
  const { question, options, correctOption } = questions[index];

  questionContainer.innerHTML = `<strong>Question:</strong> ${question}`;

  optionsContainer.innerHTML = options
    .map((option) => `<li class="answer">${option}</li>`)
    .join("");

  document.querySelectorAll(".answer").forEach((answer) => {
    answer.addEventListener("click", (e) => handleClick(e, correctOption));
  });
};

const handleClick = (e, correctOption) => {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;

  nextBtn.classList.add("show");
  const selected = e.currentTarget;

  if (selected.textContent === correctOption) {
    selected.classList.add("win");
    score++;
    scoreContainer.innerHTML = `<strong>Score:</strong> ${score}/5`;
    audio3.play();
  } else {
    selected.classList.add("lose");
    audio1.play();
  }

  document.querySelectorAll(".answer").forEach((answer) => {
    answer.style.pointerEvents = "none";
  });

  const subjectData = quizData.find((data) => data.subject.toLowerCase() === subject);
  if (index === subjectData.questions.length - 1) {
    nextBtn.textContent = "Show Result";
  }
};

nextBtn.addEventListener("click", () => {
  index++;
  nextBtn.classList.remove("show");
  acceptingAnswers = true;

  const subjectData = quizData.find((data) => data.subject.toLowerCase() === subject);
  if (index >= subjectData.questions.length) {
    questionsContainer.classList.remove("show");
    resultContainer.classList.add("show");
    finalScore.textContent = score;

    if (score > 1) {
      result.classList.add("win");
      audio2.play();
    } else {
      result.classList.add("lose");
      audio4.play();
    }

    return;
  }

  getQuestions();
});

restartBtn.addEventListener("click", () => {
  score = 0;
  index = 0;
  acceptingAnswers = true;
  resultContainer.classList.remove("show");
  questionsContainer.classList.add("show");
  nextBtn.textContent = "Next question";
  result.classList.remove("win", "lose");
  getQuestions();
  audio2.play(); // replay win tone for restart motivation
});

quitBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    score = 0;
    index = 0;
    acceptingAnswers = true;
    questionsContainer.classList.remove("show");
    resultContainer.classList.remove("show");
    subjectsContainer.classList.add("show");
    nextBtn.textContent = "Next question";
    result.classList.remove("win", "lose");
    modelContainer.style.display = "none";
    modelContainer.innerHTML = "";
    audio1.play(); // quit = lose sound
  })
);

getSubjects();
