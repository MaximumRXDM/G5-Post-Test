let currentQuestionIndex = 0;
let hearts = 5;
let timerInterval;
let randomParticipant;
let isCompensatedQuestion = false;
let allowAnswering = false;
let usedCompensation = false;

const questions = [
    {
        question: "1. Butylated hydroxytoluene (BHT) and butylated hydroxyanisole (BHA) are preservatives known to cause _____.",
        choices: ["Heart Diseases", "Diabetes", "Chronic Hives", "Cancers"],
        correctAnswer: 2
    },
    {
        question: "2. Migraine is a neurological condition that can cause symptoms of several kinds. Which of the following food additives is known to cause migraine?",
        choices: ["Tartrazine", "Parabens", "Carrageenan", "Aspartame"],
        correctAnswer: 0
    },
    {
        question: "3. Numbness puts pressure on blood vessels and nerves, reducing sensitivity. Which of the following food additives is associated with numbness?",
        choices: ["MSG", "Guar Gum", "Cottonseed Oil", "Casein"],
        correctAnswer: 0
    },
    {
        question: "4. The most common cause of dementia is Alzheimer’s disease. Studies have linked this disease to _____.",
        choices: ["Potassium Alginate", "Nitrates", "Calcium Sulfate", "Aspartame"],
        correctAnswer: 3
    },
    {
        question: "5. Which of the following food additives is linked to constipation?",
        choices: ["Erythorbic Acid", "Guar Gum", "Lycopene", "Propyl Gallate"],
        correctAnswer: 1,
        showFakeGlitch: true
    },
    {
        question: "6. Which food additive has been correlated with early puberty cases in girls?",
        choices: ["Pectinase", "Parabens", "Molecular Sieve", "Calcium Aluminosilicate"],
        correctAnswer: 1
    },
    {
        question: "7. High trans fat intake has been associated with a higher risk of _____.",
        choices: ["Respiratory Diseases", "Neurological Diseases", "Hives", "Heart Diseases"],
        correctAnswer: 3
    },
    {
        question: "8. Carrageenan is thought to have detrimental effects on _____.",
        choices: ["Skin Allergies", "Digestive Health", "Heart Diseases", "Asthma Attacks"],
        correctAnswer: 2
    },
    {
        question: "9. The controversy surrounding cottonseed oil consumption is linked to _____.",
        choices: ["Decreased Sperm Counts", "Heart Diseases", "Intestinal Ulcers", "Skin Rashes"],
        correctAnswer: 0
    },
    {
        question: "10. Which of the following can cause serious health problems related to weight gain and diabetes?",
        choices: ["Sorbic Acid", "High Fructose Corn Syrup", "Ethyl Maltol", "Cottonseed Oil"],
        correctAnswer: 1
    },
    {
        question: "11. Which of the following food additives is linked to brain tumors?",
        choices: ["Poly(vinyl acetate)", "Aspartame", "Catalase", "Allyl Cyclohexylpropionate"],
        correctAnswer: 2
    },
    {
        question: "12. Monosodium Glutamate (MSG) causes many adverse reactions EXCEPT:",
        choices: ["Numbness", "Facial Pressure or Tightness", "Diabetes", "Headache"],
        correctAnswer: 2
    },
    {
        question: "13. Anorexia is linked to which food additive?",
        choices: ["Parabens", "MSG", "Guar Gum", "Cottonseed Oil"],
        correctAnswer: 3
    },
    {
        question: "14. Tartrazine is a frequently used yellow dye. As a food additive, it has been linked to _____.",
        choices: ["Asthma Attacks", "Thyroid Cancer", "Brain Tumor", "Heart Diseases"],
        correctAnswer: 1
    },
    {
        question: "15. Growth of intestinal ulcers is associated with which food additive?",
        choices: ["Carrageenan", "Cottonseed Oil", "MSG", "Trans Fat"],
        correctAnswer: 0
    },
    {
        question: "Compensation Question: This preservative is used in pickle, margarine, and fruit juices and is known to cause allergies and potential brain damage.",
        choices: ["Propyl Gallate", "Sulfites", "Brominated Oils", "Maleic Hydrazide", "Benzoates"],
        correctAnswer: 1,
        isCompensation: true
    }
];

// Elements
const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const choicesContainer = document.getElementById('choices-container');
const timerEl = document.getElementById('timer');
const heartsContainer = document.getElementById('hearts');
const randomParticipantEl = document.getElementById('random-participant');
const intro = document.getElementById('intro');
const outro = document.getElementById('outro');
const compensationIntro = document.getElementById('compensation-intro');
const pinContainer = document.getElementById('pin-container');
const pinInput = document.getElementById('pin');
const pinSubmitBtn = document.getElementById('pin-submit');

// Correct PIN for validation
const correctPin = "131019"; // The correct PIN

// Show the PIN container before starting the quiz
pinContainer.style.display = "block";  // Ensure PIN container is visible initially

// Handle PIN submission
pinSubmitBtn.addEventListener('click', validatePin);

function validatePin() {
    const enteredPin = pinInput.value;

    if (enteredPin === correctPin) {
        pinContainer.style.display = "none"; // Hide PIN container
        intro.style.display = 'block'; // Show the intro screen
        startBtn.disabled = false; // Enable Start Quiz button after correct PIN
    } else {
        alert("Incorrect PIN. Please try again.");
        pinInput.value = ''; // Clear the input field
        startBtn.disabled = true; // Keep Start Quiz button disabled if PIN is incorrect
    }
}

// Start the quiz when the "Start Quiz" button is clicked
startBtn.addEventListener('click', startQuiz);

// Disable the Start Quiz button initially
startBtn.disabled = true;

// Start the quiz when the "Start Quiz" button is clicked
startBtn.addEventListener('click', startQuiz);

// Start Quiz
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    intro.style.display = 'none';
    quizContainer.style.display = 'block';
    displayQuestion();
    updateHearts();
    startTimer();
}

// List of participants
const participants = [
    "Dela Rosa, Elijah Kristoff", 
    "Doronilla, John Daniel", 
    "Jose, Heaven Ryelie", 
    "Reyes, Mark Lemuel", 
    "Torres, Ethan", 
    "Torres, Isaiah", 
    "Alcantara, Elijah Mica", 
    "Atienza, Eirra Mae", 
    "Bagay, Jillene", 
    "Borlongan, Hertricia", 
    "Buta, Learshi", 
    "Cabrera, Ashlynn", 
    "Cataluña, Shannen Faith", 
    "Cruz, Alexia Krystin", 
    "Cruz, Julia Ysabel", 
    "Devine, Elwina", 
    "Dispo, Coleen Margareth", 
    "Galang, Micaella", 
    "Jardeleza, Princess Emjade", 
    "Jose, Angelica Rain", 
    "Layam, Maraya Angelina", 
    "Leyson, Renalyn", 
    "Lopez, Yumi Seanelle", 
    "Manahan, Mariz", 
    "Reyes, Reona Yra", 
    "Santiago, Iyya", 
    "Sweeney, Althea"
];

// Update the random participant selection logic
function getRandomParticipant() {
    const randomIndex = Math.floor(Math.random() * participants.length);
    return participants[randomIndex];
}

// Update the displayQuestion function
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        if (hearts <= 0 && !isCompensatedQuestion && !usedCompensation) {
            showCompensationIntro();
        } else {
            endQuiz();
        }
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    choicesContainer.innerHTML = '';

    // Initially hide the participant name
    randomParticipantEl.style.display = "none";

    // Show fake answer key if it's a glitch question
    if (currentQuestion.showFakeGlitch) {
        showFakeAnswerKey();
    }

    currentQuestion.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.classList.add('choice');
        choiceBtn.innerText = choice;
        choiceBtn.addEventListener('click', () => {
            if (allowAnswering) handleAnswer(index, choiceBtn);
        });
        choicesContainer.appendChild(choiceBtn);
    });

    disableAnswering(); // Disable answering until timer is up
}


// Show Fake Answer Key
function showFakeAnswerKey() {
    const fakeAnswerKey = document.createElement('div');
    fakeAnswerKey.classList.add('fake-answer-key');
    fakeAnswerKey.innerText = "if Answers: 6. Pectinase; 7. Neurological Diseases; 8. Asthma Attacks; 9. Skin Rashes; 10. Ethyl Maltol'(int.answer(function; correct=true))'";
    document.body.appendChild(fakeAnswerKey);
    setTimeout(() => {
        fakeAnswerKey.remove();
    }, 3000); // Remove fake key after 3 seconds
}

// Start Timer
function startTimer() {
    let timeLeft = 1;
    timerEl.innerText = `Time Left: ${timeLeft}s`;
    allowAnswering = false; // Initially, do not allow answering

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer when it hits 0
            allowAnswering = true; // Enable answering after time runs out
            randomParticipant = getRandomParticipant(); // Get a random participant
            randomParticipantEl.innerText = `Participant: ${randomParticipant}`;
            randomParticipantEl.style.display = "block"; // Show participant name
            enableAnswering(); // Enable answer choices
        }
    }, 1000);
}

// Change participant when clicking on their name
randomParticipantEl.addEventListener('click', () => {
    randomParticipant = getRandomParticipant(); // Get a new random participant
    randomParticipantEl.innerText = `Participant: ${randomParticipant}`;
});

// Disable answering while timer is counting down
function disableAnswering() {
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => {
        button.disabled = true; // Disable button
        button.classList.add('disabled'); // Optionally, style the disabled button
    });
}

// Enable answering once timer is finished
function enableAnswering() {
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => {
        button.disabled = false; // Enable button
        button.classList.remove('disabled'); // Remove the disabled class
        button.style.cursor = "pointer"; // Ensure the cursor is clickable
    });
}

// Handle when the answer is selected
function handleAnswer(selectedIndex, choiceBtn) {
    if (!allowAnswering) return; // Don't allow answering until time is up

    const currentQuestion = questions[currentQuestionIndex];

    // Special case for question 15 (index 14)
    if (currentQuestionIndex === 14) {
        if (selectedIndex === currentQuestion.correctAnswer) {
            // Win question 15 with hearts
            if (hearts > 1) {
                markVictory(); // Show permanent victory message
                displayVictoryGIF(true); // Display GIF permanently
                return;
            } else {
                // If they have 1 or fewer hearts, move to compensation question
                hearts = 0; // Set hearts to zero to trigger compensation logic
                showCompensationIntro();
                return;
            }
        } else {
            // Lose question 15 with 1 or fewer hearts
            hearts = 0;
            updateHearts();
            showCompensationIntro();
            return;
        }
    }

    // Handle the compensation question
    if (currentQuestion.isCompensation) {
        if (selectedIndex === currentQuestion.correctAnswer) {
            choiceBtn.classList.add('correct');
            choiceBtn.innerText = "YOU WON!";
            updateChoices("ADDITIONAL 5 POINTS TO EVERYONE'S TEST");
            displayVictoryGIF(false); // Display GIF temporarily (5 seconds)
        } else {
            choiceBtn.classList.add('incorrect');
            choiceBtn.innerText = "YOU LOSE!";
            updateChoices("DEDUCTED 5 POINTS TO EVERYONE'S TEST");
            displayVictoryGIF(false); // Display GIF temporarily (5 seconds)
        }
        return;
    }

    // Handle regular questions
    if (selectedIndex === currentQuestion.correctAnswer) {
        markCorrect();
    } else {
        markIncorrect(choiceBtn);
    }
}



// Compensation question logic
function showCompensationIntro() {
    if (hearts <= 0 && !usedCompensation) {
        compensationIntro.style.display = "block"; // Show compensation question
        setTimeout(() => {
            compensationIntro.style.display = "none"; // Hide after showing
            currentQuestionIndex = questions.length - 1; // Set to the compensation question
            displayQuestion(); // Show the compensation question
            startTimer(); // Start the timer for the compensation question
        }, 1000);
    }
}

// Helper function to update all other choices to a specific text
function updateChoices(text) {
    const allChoices = document.querySelectorAll('.choice');
    allChoices.forEach(choice => {
        if (!choice.classList.contains('correct') && !choice.classList.contains('incorrect')) {
            choice.innerText = text;
        }
    });
}

// Mark Correct
function markCorrect() {
    document.querySelectorAll('.choice').forEach(choice => {
        choice.classList.remove('incorrect');
        choice.classList.add('correct');
        choice.innerText = questions[currentQuestionIndex].choices[questions[currentQuestionIndex].correctAnswer];
    });

    setTimeout(() => {
        allowAnswering = false;
        currentQuestionIndex++;
        displayQuestion();
        startTimer(); // Restart the timer for the next question
    }, 2000);
}

// Mark Answer as Incorrect
function markIncorrect(choiceBtn) {
    if (hearts > 0) hearts--; // Decrease heart if answer is wrong
    updateHearts();

    // Change the participant who will answer next
    randomParticipant = getRandomParticipant();  // Get a new random participant
    randomParticipantEl.innerText = `Participant: ${randomParticipant}`;  // Display the new participant
    randomParticipantEl.style.display = "block";

    choiceBtn.classList.add('incorrect'); // Highlight wrong choice
}


// Update Hearts Display
function updateHearts() {
    heartsContainer.innerHTML = '';
    for (let i = 0; i < hearts; i++) {
        const heart = document.createElement('img');
        heart.src = "https://i.ibb.co/KhFtdhr/pngfind-com-minecraft-heart-png-697698.png";
        heart.classList.add('heart');
        heartsContainer.appendChild(heart);
    }
}

// Disable clicking when the timer is counting down
function disableAnswering() {
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => {
        button.disabled = true;
        button.style.cursor = "not-allowed"; // Update cursor to indicate disabled state
    });
}

// Enable clicking when the time runs out
function enableAnswering() {
    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(button => {
        button.disabled = false;  // Enable button click
        button.style.cursor = "pointer";  // Update cursor to indicate clickable state
    });
}

function endQuiz() {
    // End quiz logic (Show outro, etc.)
    outro.style.display = 'block'; // Show outro screen
    quizContainer.style.display = 'none'; // Hide the quiz
}

// Show victory message for question 15
function markVictory() {
    document.querySelectorAll('.choice').forEach(choice => {
        choice.classList.add('correct');
        choice.innerText = "YOU WON! +5 POINTS FOR EVERYONE";
    });
}

// Display Victory GIF after winning/losing compensation
function displayVictoryGIF(isPermanent) {
    const gifOverlay = document.createElement('div');
    gifOverlay.style.position = "fixed";
    gifOverlay.style.top = 0;
    gifOverlay.style.left = 0;
    gifOverlay.style.width = "100vw";
    gifOverlay.style.height = "100vh";
    gifOverlay.style.backgroundImage = "url('https://i.giphy.com/52dbzNuEB0XsMjGbf9.webp')";
    gifOverlay.style.backgroundSize = "cover";
    gifOverlay.style.backgroundRepeat = "no-repeat";
    gifOverlay.style.zIndex = 1000; // Ensure it overlays other elements

    document.body.appendChild(gifOverlay);

    if (!isPermanent) {
        // Remove GIF overlay after 5 seconds for temporary display
        setTimeout(() => {
            gifOverlay.remove();
        }, 5000);
    }
}
