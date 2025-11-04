// Navigation and Progress
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeQuiz();
    initializeMatchingGame();
    initializeSafetyQuiz();
    updateProgress();
});

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Update progress
            updateProgress();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Progress Bar
function updateProgress() {
    const sections = document.querySelectorAll('.content-section');
    const activeSection = document.querySelector('.content-section.active');
    const sectionIndex = Array.from(sections).indexOf(activeSection);
    const progress = ((sectionIndex + 1) / sections.length) * 100;
    
    document.getElementById('progressBar').style.width = progress + '%';
}

// Safety Quiz
function initializeSafetyQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = this.getAttribute('data-correct') === 'true';
            const feedback = this.parentElement.querySelector('.quiz-feedback');
            
            // Disable all options
            quizOptions.forEach(opt => opt.disabled = true);
            
            // Show result
            if (isCorrect) {
                this.classList.add('correct');
                feedback.classList.add('show', 'correct');
                feedback.innerHTML = '<strong>✓ Correct!</strong> Always disconnect the battery before working on electrical systems to prevent shocks and short circuits.';
            } else {
                this.classList.add('incorrect');
                feedback.classList.add('show', 'incorrect');
                feedback.innerHTML = '<strong>✗ Incorrect.</strong> You should always disconnect the battery first for safety.';
            }
        });
    });
}

// Matching Game
function initializeMatchingGame() {
    const matchingGame = document.getElementById('matchingGame');
    
    const items = [
        { component: 'Battery', description: 'Stores electrical energy and provides power to start the engine' },
        { component: 'Fuse', description: 'Protects circuits from overload by breaking when current is too high' },
        { component: 'Relay', description: 'Electrically operated switch that controls high current with low current' },
        { component: 'Headlamp', description: 'Provides illumination for night driving and visibility' }
    ];
    
    // Shuffle descriptions
    const shuffledDescriptions = [...items.map(item => item.description)].sort(() => Math.random() - 0.5);
    
    let html = '<div class="match-components">';
    items.forEach((item, index) => {
        html += `
            <div class="match-item" draggable="true" data-component="${item.component}" data-index="${index}">
                <strong>${item.component}</strong>
            </div>
        `;
    });
    html += '</div><div class="match-descriptions">';
    
    shuffledDescriptions.forEach((desc, index) => {
        html += `
            <div class="match-item drop-zone" data-description="${desc}" data-index="${index}">
                ${desc}
            </div>
        `;
    });
    html += '</div>';
    
    matchingGame.innerHTML = html;
    
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('[draggable="true"]');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.style.backgroundColor = '#dbeafe';
        });
        
        zone.addEventListener('dragleave', () => {
            zone.style.backgroundColor = '';
        });
        
        zone.addEventListener('drop', e => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            const component = dragging.getAttribute('data-component');
            const description = zone.getAttribute('data-description');
            
            // Check if match is correct
            const items = [
                { component: 'Battery', description: 'Stores electrical energy and provides power to start the engine' },
                { component: 'Fuse', description: 'Protects circuits from overload by breaking when current is too high' },
                { component: 'Relay', description: 'Electrically operated switch that controls high current with low current' },
                { component: 'Headlamp', description: 'Provides illumination for night driving and visibility' }
            ];
            
            const isCorrect = items.some(item => item.component === component && item.description === description);
            
            if (isCorrect) {
                zone.innerHTML = `<strong>${component}</strong><br><small>${description}</small>`;
                zone.classList.add('matched');
                dragging.style.display = 'none';
                zone.style.backgroundColor = '';
            } else {
                zone.style.backgroundColor = '#fee2e2';
                setTimeout(() => {
                    zone.style.backgroundColor = '';
                }, 500);
            }
        });
    });
}

// Main Quiz
function initializeQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    
    const questions = [
        {
            question: "What is the typical voltage of a car battery?",
            options: ["6V", "12V", "24V", "48V"],
            correct: 1,
            explanation: "Most cars use a 12V battery system. Heavy vehicles may use 24V."
        },
        {
            question: "Which terminal should you disconnect FIRST when removing a battery?",
            options: ["Positive (+)", "Negative (-)", "Either one", "Both at the same time"],
            correct: 1,
            explanation: "Always disconnect the negative terminal first to prevent short circuits."
        },
        {
            question: "What does a fuse do?",
            options: [
                "Increases voltage",
                "Stores electricity",
                "Protects circuits from overload",
                "Amplifies current"
            ],
            correct: 2,
            explanation: "Fuses protect electrical circuits by breaking the circuit when current exceeds safe levels."
        },
        {
            question: "What tool is essential for measuring voltage in a circuit?",
            options: ["Hammer", "Multimeter", "Screwdriver", "Torque wrench"],
            correct: 1,
            explanation: "A multimeter can measure voltage, current, and resistance in electrical circuits."
        },
        {
            question: "Why should you never touch halogen bulb glass with bare hands?",
            options: [
                "It's too hot",
                "Oils from skin cause hot spots and premature failure",
                "It will shock you",
                "It will break immediately"
            ],
            correct: 1,
            explanation: "Oils from your skin create hot spots on halogen bulbs, causing them to fail prematurely."
        },
        {
            question: "What is the purpose of a relay in an automotive electrical system?",
            options: [
                "To store electricity",
                "To allow a small current to control a larger current",
                "To increase voltage",
                "To reduce resistance"
            ],
            correct: 1,
            explanation: "Relays act as electrically operated switches, allowing low current to control high current circuits."
        },
        {
            question: "What should you wear when working on electrical systems?",
            options: [
                "Just normal clothes",
                "PPE including safety glasses and gloves",
                "Swimming gear",
                "Nothing special"
            ],
            correct: 1,
            explanation: "Always wear appropriate PPE including safety glasses and insulated gloves when working with electrical systems."
        },
        {
            question: "What color is typically used for a 10A fuse?",
            options: ["Red", "Blue", "Green", "Yellow"],
            correct: 0,
            explanation: "Automotive fuses are color-coded by amperage. Red is typically 10A."
        },
        {
            question: "What examination method involves listening for unusual sounds?",
            options: ["Visual", "Aural", "Functional", "Measurements"],
            correct: 1,
            explanation: "Aural examination involves using your hearing to detect unusual sounds like clicking, buzzing, or arcing."
        },
        {
            question: "When should you check if brake lights are working?",
            options: [
                "Once a year",
                "Only when they stop working",
                "Regularly as part of vehicle checks",
                "Never"
            ],
            correct: 2,
            explanation: "Brake lights are critical for safety and should be checked regularly as part of routine vehicle maintenance."
        }
    ];
    
    let html = '';
    questions.forEach((q, index) => {
        html += `
            <div class="quiz-card">
                <h4><i class="fas fa-question-circle"></i> Question ${index + 1}</h4>
                <p><strong>${q.question}</strong></p>
                <div class="quiz-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            html += `
                <button class="quiz-option" data-question="${index}" data-option="${optIndex}">
                    ${option}
                </button>
            `;
        });
        
        html += `
                </div>
                <div class="quiz-feedback" data-question="${index}"></div>
            </div>
        `;
    });
    
    quizContainer.innerHTML = html;
    
    // Add event listeners
    const options = document.querySelectorAll('#quizContainer .quiz-option');
    let answeredQuestions = new Set();
    let correctAnswers = 0;
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const questionIndex = parseInt(this.getAttribute('data-question'));
            const optionIndex = parseInt(this.getAttribute('data-option'));
            const question = questions[questionIndex];
            const feedback = document.querySelector(`.quiz-feedback[data-question="${questionIndex}"]`);
            const allOptions = document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`);
            
            // Disable all options for this question
            allOptions.forEach(opt => opt.disabled = true);
            
            // Check if correct
            const isCorrect = optionIndex === question.correct;
            
            // Update score if not already answered
            if (!answeredQuestions.has(questionIndex)) {
                answeredQuestions.add(questionIndex);
                if (isCorrect) {
                    correctAnswers++;
                }
            }
            
            // Show result
            if (isCorrect) {
                this.classList.add('correct');
                feedback.classList.add('show', 'correct');
                feedback.innerHTML = `<strong>✓ Correct!</strong> ${question.explanation}`;
            } else {
                this.classList.add('incorrect');
                allOptions[question.correct].classList.add('correct');
                feedback.classList.add('show', 'incorrect');
                feedback.innerHTML = `<strong>✗ Incorrect.</strong> The correct answer is: <strong>${question.options[question.correct]}</strong><br>${question.explanation}`;
            }
            
            // Check if all questions answered
            if (answeredQuestions.size === questions.length) {
                setTimeout(() => {
                    showFinalScore(correctAnswers, questions.length);
                }, 1000);
            }
        });
    });
}

function showFinalScore(correct, total) {
    const scoreSection = document.getElementById('quizScore');
    const scoreValue = document.getElementById('scoreValue');
    const totalQuestions = document.getElementById('totalQuestions');
    const scoreMessage = document.getElementById('scoreMessage');
    
    scoreValue.textContent = correct;
    totalQuestions.textContent = total;
    
    const percentage = (correct / total) * 100;
    let message = '';
    
    if (percentage >= 90) {
        message = '🌟 Excellent work! You have a strong understanding of vehicle electrical systems!';
    } else if (percentage >= 70) {
        message = '👍 Good job! You have a solid grasp of the basics. Review the areas you missed.';
    } else if (percentage >= 50) {
        message = '📚 Not bad, but you should review the material and try again to improve your understanding.';
    } else {
        message = '💪 You need more practice. Review all the sections carefully and try the quiz again.';
    }
    
    scoreMessage.textContent = message;
    scoreSection.style.display = 'block';
    scoreSection.scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
    const scoreSection = document.getElementById('quizScore');
    scoreSection.style.display = 'none';
    
    // Reset all quiz options
    const allOptions = document.querySelectorAll('#quizContainer .quiz-option');
    const allFeedback = document.querySelectorAll('#quizContainer .quiz-feedback');
    
    allOptions.forEach(option => {
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
    });
    
    allFeedback.forEach(feedback => {
        feedback.classList.remove('show', 'correct', 'incorrect');
        feedback.innerHTML = '';
    });
    
    // Scroll to top of quiz
    document.getElementById('quizContainer').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add touch feedback for mobile
document.querySelectorAll('button, .card, .nav-btn').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// Service Worker Registration for PWA capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, but app still works
        });
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
    const activeButton = document.querySelector('.nav-btn.active');
    const currentIndex = navButtons.indexOf(activeButton);
    
    if (e.key === 'ArrowRight' && currentIndex < navButtons.length - 1) {
        navButtons[currentIndex + 1].click();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navButtons[currentIndex - 1].click();
    }
});

// Track learning progress in localStorage
function saveProgress(section) {
    const progress = JSON.parse(localStorage.getItem('vehicleElectricalProgress') || '{}');
    progress[section] = true;
    progress.lastVisit = new Date().toISOString();
    localStorage.setItem('vehicleElectricalProgress', JSON.stringify(progress));
}

// Load saved progress
function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('vehicleElectricalProgress') || '{}');
    return progress;
}

// Update progress when section changes
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        saveProgress(section);
    });
});

// Add print functionality
function printSection() {
    window.print();
}

// Add share functionality
function shareLesson() {
    if (navigator.share) {
        navigator.share({
            title: 'Vehicle Electrical Systems - Entry Level 3',
            text: 'Check out this interactive learning resource for vehicle electrical systems!',
            url: window.location.href
        }).catch(() => {
            // Share failed or was cancelled
        });
    } else {
        // Fallback: copy link to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Initialize tooltips for complex terms
const technicalTerms = {
    'multimeter': 'A device that measures voltage, current, and resistance',
    'relay': 'An electrically operated switch',
    'fuse': 'A safety device that protects circuits from overload',
    'amperage': 'The measure of electrical current flow',
    'voltage': 'The measure of electrical potential difference',
    'resistance': 'Opposition to current flow, measured in Ohms'
};

// Add accessibility features
function enhanceAccessibility() {
    // Add ARIA labels
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const section = btn.getAttribute('data-section');
        btn.setAttribute('aria-label', `Navigate to ${section} section`);
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
enhanceAccessibility();

console.log('Vehicle Electrical Systems Learning App Loaded Successfully! 🚗⚡');