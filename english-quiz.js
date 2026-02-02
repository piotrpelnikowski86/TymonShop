// English Quiz JavaScript

class EnglishQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = 20;
        this.passThreshold = 0.8;
        this.selectedGrade = 1;

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Grade selector
        document.querySelectorAll('.grade-selector button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.grade-selector button').forEach(b =>
                    b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedGrade = parseInt(e.target.dataset.grade);
            });
        });

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
        const vocabulary = getVocabularyByGrade(this.selectedGrade);

        // Shuffle and select 20 words
        const selectedWords = this.shuffleArray([...vocabulary]).slice(0, this.totalQuestions);

        selectedWords.forEach(word => {
            // Randomly choose: English->Polish or Polish->English
            const askEnglish = Math.random() < 0.5;

            let questionText, correctAnswer, wrongAnswers;

            if (askEnglish) {
                // Ask for Polish translation of English word
                questionText = `Jak przetłumaczyć: "${word.english}"?`;
                correctAnswer = word.polish;
                wrongAnswers = this.generateWrongPolishAnswers(word.polish, vocabulary);
            } else {
                // Ask for English translation of Polish word
                questionText = `Jak przetłumaczyć: "${word.polish}"?`;
                correctAnswer = word.english;
                wrongAnswers = this.generateWrongEnglishAnswers(word.english, vocabulary);
            }

            // Shuffle options
            const options = [correctAnswer, ...wrongAnswers]
                .sort(() => Math.random() - 0.5);

            this.questions.push({
                text: questionText,
                answer: correctAnswer,
                options: options,
                word: word
            });
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    generateWrongPolishAnswers(correctPolish, vocabulary) {
        const wrongAnswers = new Set();
        const availableWords = vocabulary.filter(w => w.polish !== correctPolish);

        while (wrongAnswers.size < 3 && availableWords.length > 0) {
            const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            wrongAnswers.add(randomWord.polish);
        }

        return Array.from(wrongAnswers);
    }

    generateWrongEnglishAnswers(correctEnglish, vocabulary) {
        const wrongAnswers = new Set();
        const availableWords = vocabulary.filter(w => w.english !== correctEnglish);

        while (wrongAnswers.size < 3 && availableWords.length > 0) {
            const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
            wrongAnswers.add(randomWord.english);
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
            const optionValue = option.dataset.answer;

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
                grade: this.selectedGrade,
                date: new Date().toISOString()
            };

            window.app.currentUser.quizScores.english.push(score);
            window.app.updateUserData(window.app.currentUser);
        }
    }
}

// Initialize quiz
const englishQuiz = new EnglishQuiz();
