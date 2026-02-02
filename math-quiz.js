// Math Quiz JavaScript

class MathQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = 20;
        this.passThreshold = 0.8; // 80%

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-quiz-btn')?.addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('next-question-btn')?.addEventListener('click', () => {
            this.nextQuestion();
        });
    }

    startQuiz() {
        this.generateQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;

        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'block';
        document.getElementById('results-screen').style.display = 'none';

        this.showQuestion();
    }

    generateQuestions() {
        this.questions = [];

        for (let i = 0; i < this.totalQuestions; i++) {
            // Randomly choose multiplication or division
            const isMultiplication = Math.random() < 0.5;

            let num1, num2, answer, questionText;

            if (isMultiplication) {
                // Multiplication: 2-9 × 2-9
                num1 = this.getRandomNumber();
                num2 = this.getRandomNumber();
                answer = num1 * num2;
                questionText = `${num1} × ${num2} = ?`;
            } else {
                // Division: Generate a valid division problem
                num2 = this.getRandomNumber();
                const quotient = this.getRandomNumber();
                num1 = num2 * quotient; // Ensure it divides evenly
                answer = quotient;
                questionText = `${num1} ÷ ${num2} = ?`;
            }

            // Generate wrong answers
            const wrongAnswers = this.generateWrongAnswers(answer, isMultiplication);

            // Combine and shuffle
            const options = [answer, ...wrongAnswers]
                .sort(() => Math.random() - 0.5);

            this.questions.push({
                text: questionText,
                answer: answer,
                options: options,
                isMultiplication: isMultiplication
            });
        }
    }

    getRandomNumber() {
        // Generate number from 2-9 (excluding 1 and 10)
        return Math.floor(Math.random() * 8) + 2;
    }

    generateWrongAnswers(correctAnswer, isMultiplication) {
        const wrongAnswers = new Set();

        while (wrongAnswers.size < 3) {
            let wrong;

            if (isMultiplication) {
                // For multiplication, generate nearby products
                const offset = Math.floor(Math.random() * 10) - 5;
                wrong = correctAnswer + offset;
                if (wrong <= 0) wrong = correctAnswer + Math.abs(offset);
            } else {
                // For division, generate nearby quotients
                const offset = Math.floor(Math.random() * 6) - 3;
                wrong = correctAnswer + offset;
                if (wrong <= 0) wrong = correctAnswer + Math.abs(offset);
            }

            if (wrong !== correctAnswer && wrong > 0) {
                wrongAnswers.add(wrong);
            }
        }

        return Array.from(wrongAnswers);
    }

    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];

        // Update progress
        const progressPercent = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
        document.getElementById('progress-text').textContent =
            `Pytanie ${this.currentQuestionIndex + 1} z ${this.totalQuestions}`;

        // Update question
        document.getElementById('question-number').textContent =
            `Pytanie ${this.currentQuestionIndex + 1}`;
        document.getElementById('question-text').textContent = question.text;

        // Create answer options
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'answer-option';
            optionBtn.textContent = option;
            optionBtn.dataset.answer = option;
            optionBtn.addEventListener('click', () => this.selectAnswer(option));
            optionsContainer.appendChild(optionBtn);
        });

        // Hide next button
        document.getElementById('next-question-btn').style.display = 'none';
    }

    selectAnswer(selectedAnswer) {
        const question = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.answer-option');

        // Disable all options
        options.forEach(option => {
            option.classList.add('disabled');
            const optionValue = parseInt(option.dataset.answer);

            if (optionValue === question.answer) {
                option.classList.add('correct');
            } else if (optionValue === selectedAnswer) {
                option.classList.add('incorrect');
            }
        });

        // Check if correct
        if (selectedAnswer === question.answer) {
            this.score++;
        }

        // Show next button or finish
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            document.getElementById('next-question-btn').style.display = 'inline-flex';
        } else {
            setTimeout(() => this.showResults(), 1500);
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    showResults() {
        const percentage = (this.score / this.totalQuestions) * 100;
        const passed = percentage >= (this.passThreshold * 100);

        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('results-screen').style.display = 'block';

        const scoreElement = document.getElementById('results-score');
        scoreElement.textContent = `${this.score} / ${this.totalQuestions} (${percentage.toFixed(0)}%)`;
        scoreElement.className = `results-score ${passed ? 'pass' : 'fail'}`;

        const messageElement = document.getElementById('results-message');
        if (passed) {
            messageElement.innerHTML = `
                <h3 style="color: var(--success);">🎉 Gratulacje! Zaliczyłeś quiz!</h3>
                <p>Świetna robota! Zdobyłeś wystarczającą ilość punktów.</p>
            `;

            // Award entertainment time
            this.awardEntertainmentTime();
        } else {
            messageElement.innerHTML = `
                <h3 style="color: var(--danger);">Niestety, nie udało się tym razem</h3>
                <p>Potrzebujesz minimum 16/20 (80%) aby zaliczyć quiz. Spróbuj ponownie!</p>
            `;
            document.getElementById('reward-container').innerHTML = '';
        }

        // Save score to user profile
        this.saveScore(percentage);
    }

    awardEntertainmentTime() {
        const minutes = 10;

        // Add to user's entertainment time
        if (window.app && window.app.currentUser) {
            window.app.addEntertainmentMinutes(minutes);
            window.app.updateEntertainmentLock();

            // Show reward message
            document.getElementById('reward-container').innerHTML = `
                <div class="reward-message">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14" stroke="white" stroke-width="2" fill="none"/>
                    </svg>
                    <span>Otrzymujesz ${minutes} minut w Strefie Rozrywki!</span>
                </div>
            `;
        }
    }

    saveScore(percentage) {
        if (window.app && window.app.currentUser) {
            const score = {
                score: this.score,
                total: this.totalQuestions,
                percentage: percentage,
                passed: percentage >= (this.passThreshold * 100),
                date: new Date().toISOString()
            };

            window.app.currentUser.quizScores.math.push(score);
            window.app.updateUserData(window.app.currentUser);
        }
    }
}

// Initialize quiz
const mathQuiz = new MathQuiz();
