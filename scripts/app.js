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

  // Add click event listeners to subjects
  const subjectItems = document.querySelectorAll(".subject");
  subjectItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectedSubject = e.currentTarget.id;

      // Hide subject selection
      subjectsContainer.classList.remove("show");

      // Show relevant 3D model
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

getSubjects();
