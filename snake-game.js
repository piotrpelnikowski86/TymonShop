// Snake Game

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;

        this.snake = [];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.gameLoop = null;
        this.gameRunning = false;

        this.init();
    }

    init() {
        this.updateHighScore();
        this.setupEventListeners();
        this.drawStartScreen();
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });

        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (this.dy === 0) { this.dx = 0; this.dy = -1; }
                    break;
                case 'ArrowDown':
                    if (this.dy === 0) { this.dx = 0; this.dy = 1; }
                    break;
                case 'ArrowLeft':
                    if (this.dx === 0) { this.dx = -1; this.dy = 0; }
                    break;
                case 'ArrowRight':
                    if (this.dx === 0) { this.dx = 1; this.dy = 0; }
                    break;
            }
            e.preventDefault();
        });
    }

    startGame() {
        if (this.gameRunning) return;

        this.snake = [
            { x: 10, y: 10 }
        ];
        this.dx = 1;
        this.dy = 0;
        this.score = 0;
        this.updateScore();
        this.placeFood();

        this.gameRunning = true;
        this.gameLoop = setInterval(() => this.update(), 100);

        document.getElementById('start-btn').textContent = 'Gra w toku...';
        document.getElementById('start-btn').disabled = true;
    }

    update() {
        // Move snake
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        // Add new head
        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.updateScore();
            this.placeFood();
        } else {
            // Remove tail
            this.snake.pop();
        }

        this.draw();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary');
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#4CAF50';
        this.snake.forEach((segment, index) => {
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );

            if (index === 0) {
                this.ctx.fillStyle = '#2E7D32';
                this.ctx.fillRect(
                    segment.x * this.gridSize + 4,
                    segment.y * this.gridSize + 4,
                    this.gridSize - 8,
                    this.gridSize - 8
                );
                this.ctx.fillStyle = '#4CAF50';
            }
        });

        // Draw food
        this.ctx.fillStyle = '#FF5722';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    drawStartScreen() {
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary');
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
        this.ctx.font = '24px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Kliknij "Rozpocznij Grę"', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '16px Inter';
        this.ctx.fillText('Użyj strzałek do sterowania', this.canvas.width / 2, this.canvas.height / 2 + 30);
    }

    placeFood() {
        do {
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.gameRunning = false;

        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
            this.updateHighScore();
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '32px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Koniec Gry!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.font = '20px Inter';
        this.ctx.fillText(`Wynik: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);

        document.getElementById('start-btn').textContent = 'Rozpocznij Grę';
        document.getElementById('start-btn').disabled = false;
    }

    resetGame() {
        clearInterval(this.gameLoop);
        this.gameRunning = false;
        this.score = 0;
        this.updateScore();
        this.drawStartScreen();
        document.getElementById('start-btn').textContent = 'Rozpocznij Grę';
        document.getElementById('start-btn').disabled = false;
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
    }

    updateHighScore() {
        document.getElementById('high-score').textContent = this.highScore;
    }

    loadHighScore() {
        return parseInt(localStorage.getItem('snake-high-score') || '0');
    }

    saveHighScore() {
        localStorage.setItem('snake-high-score', this.highScore.toString());
    }
}

const snakeGame = new SnakeGame();
