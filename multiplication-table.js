// Multiplication Table JavaScript

class MultiplicationTable {
    constructor() {
        this.currentMode = 'table';
        this.practiceStats = {
            correct: 0,
            total: 0
        };
        this.currentQuestion = null;

        this.init();
    }

    init() {
        this.generateTable();
        this.setupEventListeners();
        this.generateNewQuestion();
    }

    generateTable() {
        const table = document.getElementById('multiplication-table');

        // Create header row and column
        table.innerHTML = '';

        // Top-left cell (empty)
        const emptyCell = document.createElement('div');
        emptyCell.className = 'table-cell header';
        emptyCell.textContent = '×';
        table.appendChild(emptyCell);

        // Top row headers (2-9)
        for (let i = 2; i <= 9; i++) {
            const headerCell = document.createElement('div');
            headerCell.className = 'table-cell header';
            headerCell.textContent = i;
            table.appendChild(headerCell);
        }

        // Generate rows
        for (let row = 2; row <= 9; row++) {
            // Row header
            const rowHeader = document.createElement('div');
            rowHeader.className = 'table-cell header';
            rowHeader.textContent = row;
            table.appendChild(rowHeader);

            // Cells
            for (let col = 2; col <= 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'table-cell';
                const result = row * col;
                cell.textContent = result;
                cell.title = `${row} × ${col} = ${result}`;
                table.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        // Mode toggle
        document.getElementById('table-mode-btn')?.addEventListener('click', () => {
            this.switchMode('table');
        });

        document.getElementById('practice-mode-btn')?.addEventListener('click', () => {
            this.switchMode('practice');
        });

        // Practice mode
        document.getElementById('check-answer-btn')?.addEventListener('click', () => {
            this.checkAnswer();
        });

        document.getElementById('practice-answer')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });

        document.getElementById('reset-practice-btn')?.addEventListener('click', () => {
            this.resetPractice();
        });
    }

    switchMode(mode) {
        this.currentMode = mode;

        const tableMode = document.getElementById('table-mode');
        const practiceMode = document.getElementById('practice-mode');
        const tableModeBtn = document.getElementById('table-mode-btn');
        const practiceModeBtn = document.getElementById('practice-mode-btn');

        if (mode === 'table') {
            tableMode.style.display = 'block';
            practiceMode.style.display = 'none';
            tableModeBtn.className = 'btn btn-primary';
            practiceModeBtn.className = 'btn';
        } else {
            tableMode.style.display = 'none';
            practiceMode.style.display = 'block';
            tableModeBtn.className = 'btn';
            practiceModeBtn.className = 'btn btn-primary';
            this.generateNewQuestion();
        }
    }

    generateNewQuestion() {
        const num1 = Math.floor(Math.random() * 8) + 2; // 2-9
        const num2 = Math.floor(Math.random() * 8) + 2; // 2-9

        this.currentQuestion = {
            num1: num1,
            num2: num2,
            answer: num1 * num2
        };

        document.getElementById('practice-question').textContent =
            `${num1} × ${num2} = ?`;
        document.getElementById('practice-answer').value = '';
        document.getElementById('practice-answer').focus();
        document.getElementById('practice-feedback').textContent = '';
        document.getElementById('practice-feedback').className = 'practice-feedback';
    }

    checkAnswer() {
        const userAnswer = parseInt(document.getElementById('practice-answer').value);
        const feedback = document.getElementById('practice-feedback');

        if (isNaN(userAnswer)) {
            feedback.textContent = 'Wprowadź odpowiedź!';
            feedback.className = 'practice-feedback';
            return;
        }

        this.practiceStats.total++;

        if (userAnswer === this.currentQuestion.answer) {
            this.practiceStats.correct++;
            feedback.textContent = '✓ Brawo! Poprawna odpowiedź!';
            feedback.className = 'practice-feedback correct';

            setTimeout(() => {
                this.generateNewQuestion();
            }, 1500);
        } else {
            feedback.textContent = `✗ Niepoprawnie. Prawidłowa odpowiedź: ${this.currentQuestion.answer}`;
            feedback.className = 'practice-feedback incorrect';

            setTimeout(() => {
                this.generateNewQuestion();
            }, 2500);
        }

        this.updateStats();
    }

    updateStats() {
        document.getElementById('correct-count').textContent = this.practiceStats.correct;
        document.getElementById('total-count').textContent = this.practiceStats.total;
    }

    resetPractice() {
        this.practiceStats = { correct: 0, total: 0 };
        this.updateStats();
        this.generateNewQuestion();
    }
}

// Initialize
const multiplicationTable = new MultiplicationTable();
