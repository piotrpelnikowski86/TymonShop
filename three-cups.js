// Three Cups Game

class ThreeCupsGame {
    constructor() {
        this.ballPosition = 0;
        this.gameActive = false;
        this.wins = parseInt(localStorage.getItem('three-cups-wins') || '0');
        this.attempts = parseInt(localStorage.getItem('three-cups-attempts') || '0');

        this.init();
    }

    init() {
        this.updateStats();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetStats();
        });

        document.querySelectorAll('.cup').forEach(cup => {
            cup.addEventListener('click', (e) => {
                if (this.gameActive) {
                    this.selectCup(parseInt(e.currentTarget.dataset.cup));
                }
            });
        });
    }

    startGame() {
        if (this.gameActive) return;

        // Hide all balls
        document.querySelectorAll('.ball').forEach(ball => {
            ball.classList.remove('visible');
        });

        // Reset cups
        document.querySelectorAll('.cup').forEach(cup => {
            cup.classList.remove('lifted');
        });

        // Random ball position
        this.ballPosition = Math.floor(Math.random() * 3);

        // Show ball briefly at start
        document.querySelectorAll('.ball')[this.ballPosition].classList.add('visible');
        document.getElementById('message').textContent = 'Śledź kubek z piłeczką!';

        setTimeout(() => {
            document.querySelectorAll('.ball').forEach(ball => {
                ball.classList.remove('visible');
            });
            this.shuffleCups();
        }, 1500);
    }

    shuffleCups() {
        const cups = document.querySelectorAll('.cup');

        // Add shuffle animation
        cups.forEach(cup => cup.classList.add('shuffling'));

        // Simulate shuffle
        let shuffleCount = 0;
        const shuffleInterval = setInterval(() => {
            shuffleCount++;

            if (shuffleCount >= 5) {
                clearInterval(shuffleInterval);
                cups.forEach(cup => cup.classList.remove('shuffling'));
                this.gameActive = true;
                document.getElementById('message').textContent = 'Wybierz kubek z piłeczką!';
            }
        }, 500);
    }

    selectCup(cupIndex) {
        if (!this.gameActive) return;

        this.gameActive = false;
        this.attempts++;
        this.updateStats();
        this.saveStats();

        // Lift all cups
        document.querySelectorAll('.cup').forEach((cup, index) => {
            cup.classList.add('lifted');
            if (index === this.ballPosition) {
                cup.querySelector('.ball').classList.add('visible');
            }
        });

        // Check result
        setTimeout(() => {
            if (cupIndex === this.ballPosition) {
                this.wins++;
                this.updateStats();
                this.saveStats();
                document.getElementById('message').textContent = '🎉 Brawo! Wygrałeś!';
                document.getElementById('message').style.color = 'var(--success)';
            } else {
                document.getElementById('message').textContent = '😔 Nie tym razem! Spróbuj ponownie!';
                document.getElementById('message').style.color = 'var(--danger)';
            }

            setTimeout(() => {
                document.getElementById('message').style.color = '';
            }, 2000);
        }, 500);
    }

    updateStats() {
        document.getElementById('wins').textContent = this.wins;
        document.getElementById('attempts').textContent = this.attempts;
    }

    saveStats() {
        localStorage.setItem('three-cups-wins', this.wins.toString());
        localStorage.setItem('three-cups-attempts', this.attempts.toString());
    }

    resetStats() {
        this.wins = 0;
        this.attempts = 0;
        this.updateStats();
        this.saveStats();
        document.getElementById('message').textContent = 'Statystyki zresetowane!';
    }
}

const threeCupsGame = new ThreeCupsGame();
