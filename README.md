# Overview
Car Quiz 3D is a browser-based web application designed to test and reinforce your understanding of automotive systems. Whether you're an engineering student, a car enthusiast, or someone who wants to learn about vehicle technologies, this app provides an interactive and engaging learning experience.

# Subjects Included
When the application starts, users are prompted to choose from three subject areas:

Power Train & Engine Technology

Vehicle Dynamics & Mechanical Systems

Control Systems & ADAS (Advanced Driver Assistance Systems)

Each subject contains five multiple-choice questions that are directly related to that topic. The quiz begins as soon as a subject is selected.

# Quiz Mechanics
The quiz is designed to present one question at a time, with four answer choices. Users receive immediate feedback after answering, including visual indicators for correct and incorrect selections. The current score is displayed throughout the quiz. Once all five questions are answered, a results screen is shown with the final score and options to restart the quiz or return to the main menu.

# 3D Model Viewer Integration
One of the key features of the app is the inclusion of an interactive 3D model viewer. Based on the selected topic, the application loads a relevant 3D model (for example, an engine, suspension system, or full car) directly in the browser. These models are rendered using Google's <model-viewer> component, allowing users to rotate and inspect them interactively during the quiz.

# Audio Feedback
The app includes audio cues to enhance user engagement. A correct answer triggers a confirmation sound, while an incorrect answer plays an error tone. When the quiz ends, different audio feedback is used to reflect a win or a loss. Background music also plays throughout the experience, creating an immersive and enjoyable learning environment.

# Technology Stack
This project is built entirely with standard web technologies:

HTML is used to structure the application.

CSS is used to handle visual styling, layout, and responsive design.

JavaScript provides the logic for subject selection, question loading, answer checking, and user interaction.

model-viewer enables 3D model rendering directly in the browser.

Audio files are triggered using the JavaScript Audio API.

# Mobile and Accessibility Support
The user interface is designed to be responsive and mobile-friendly. Buttons and touch targets are sized appropriately for small screens, and layouts adapt fluidly to various device sizes. Additionally, the app includes keyboard navigation support and visual focus indicators to ensure accessibility for all users.
