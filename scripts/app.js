// Multiple Choice Question of various subjects

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
      },
      {
        question: "What is the primary purpose of the flywheel in a car engine?",
        options: [
          "To pump fuel into the cylinders",
          "To keep the crankshaft turning smoothly between power strokes",
          "To open and close the engine valves",
          "To increase engine compression",
        ],
        correctOption: "To keep the crankshaft turning smoothly between power strokes",
      },
      {
        question: "Which part cools the engine by removing excess heat?",
        options: ["Oil filter", "Alternator", "Radiator", "Crankshaft"],
        correctOption: "Radiator",
      },
      {
        question: "What is the camshaft responsible for?",
        options: [
          "Fuel compression",
          "Oil circulation",
          "Exhaust emission control",
          "Valve timing and movement",
        ],
        correctOption: "Valve timing and movement",
      },
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
      },
      {
        question: "What does suspension in a vehicle primarily do?",
        options: [
          "Provide engine power",
          "Increase fuel efficiency",
          "Cool the brake system",
          "Absorb road shocks and maintain tire contact",
        ],
        correctOption: "Absorb road shocks and maintain tire contact",
      },
      {
        question: "What is Ackermann steering principle?",
        options: [
          "Principle of reverse steering",
          "All wheels turn in opposite directions",
          "Used in all-wheel-drive systems",
          "Inner wheel turns more sharply than outer",
        ],
        correctOption: "Inner wheel turns more sharply than outer",
      },
      {
        question: "What is the purpose of anti-roll bars (sway bars)?",
        options: [
          "Reduce braking distance",
          "To provide extra weight to the vehicle",
          "Reduce body roll during cornering",
          "Improve suspension stiffness",
        ],
        correctOption: "Reduce body roll during cornering",
      },
    ],
  },
  {
    subject: "⏲ Control Sytems & ADAS",
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
      },
      {
        question: "Which sensor is used in Adaptive Cruise Control (ACC)?",
        options: ["Accelerometer", "Radar", "Temperature sensor", "LDR"],
        correctOption: "Radar",
      },
      {
        question: "What does TPMS stand for?",
        options: [
          "Tire Pressure Management Software",
          "Tire Pressure Monitoring System",
          "Traffic Pattern Monitoring System",
          "Traction Power Management System",
        ],
        correctOption: "Tire Pressure Monitoring System",
      },
      {
        question: "What is the main role of an ECU in a car?",
        options: [
          "To Process data from sensors and control actuators",
          "To control the car's air conditioning system only",
          "To reduce vehicle weight",
          "To charge the battery",
        ],
        correctOption: "To Process data from sensors and control actuators",
      },
    ],
  },
];

// DOM elements
const subjectsList = document.querySelector(".subjects");
const subjectsContainer = document.querySelector(".subjects-container");
const questionsContainer = document.querySelector(".questions-container");
const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".answers");
const nextBtn = document.querySelector(".next-btn");
const scoreContainer = document.querySelector(".score");
const finalScore = document.querySelector(".final-score");
const resultContainer = document.querySelector(".result-container");
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart-btn");
const quitBtns = document.querySelectorAll(".quit-btn");

const modelContainer = document.getElementById("modelContainer");

// State variables
let subject = "";
let score = 0;
let index = 0;
let acceptingAnswers = true;

// Audio
const audio1 = new Audio("assets/error.wav");
const audio2 = new Audio("assets/win.wav");
const audio3 = new Audio("assets/Correct.mp3");
const audio4 = new Audio("assets/lose.mp3");

const getSubjects = () => {
  const subjects = quizData
    .map((data) => {
      return `<li class="subject" id='${data.subject.toLowerCase()}'>
              ${data.subject} <i class="fa-solid fa-chevron-right"></i>
            </li>`;
    })
    .join("");
  subjectsList.innerHTML = subjects;

  const subjectContainers = document.querySelectorAll(".subject");
  subjectContainers.forEach((container) => {
    container.addEventListener("click", (e) => {
      subject = e.currentTarget.id;
      subjectsContainer.classList.remove("show");
      questionsContainer.classList.add("show");
      getQuestions();

      // Show 3D model based on selected subject
      if (subject.includes("power train")) {
        modelContainer.style.display = "block";
        modelContainer.innerHTML = `
          <model-viewer 
            src="assets/car_engine.glb" 
            alt="Car Engine" 
            auto-rotate 
            camera-controls 
            style="width: 100%; height: 100%;">
          </model-viewer>`;
      } else if (subject.includes("vehicle dynamics")) {
        modelContainer.style.display = "block";
        modelContainer.innerHTML = `
          <model-viewer 
            src="assets/Car_suspension.glb" 
            alt="Car Suspension" 
            auto-rotate 
            camera-controls 
            style="width: 100%; height: 100%;">
          </model-viewer>`;
      } else if (subject.includes("control sytems") || subject.includes("control systems")) {
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
    audio2.play();
  } else {
    selected.classList.add("lose");
    audio1.play();
  }

  if (index === 4) {
    nextBtn.textContent = "Show Result";
  }
};

nextBtn.addEventListener("click", () => {
  index++;
  nextBtn.classList.remove("show");
  acceptingAnswers = true;

  if (index > 4) {
    questionsContainer.classList.remove("show");
    resultContainer.classList.add("show");
    finalScore.textContent = score;

    if (score > 2) {
      result.classList.add("win");
      audio3.play();
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
  getQuestions();
  audio2.play();
});

quitBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    resultContainer.classList.remove("show");
    questionsContainer.classList.remove("show");
    subjectsContainer.classList.add("show");
    nextBtn.textContent = "Next question";
    score = 0;
    index = 0;
    acceptingAnswers = true;
    modelContainer.style.display = "none";
    modelContainer.innerHTML = "";
    audio1.play();
  })
);

getSubjects();
