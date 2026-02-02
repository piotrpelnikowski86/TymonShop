// Tic Tac Toe Game

class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTurnIndicator();
    }

    setupEventListeners() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.cell);
                this.makeMove(index);
            });
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }

    makeMove(index) {
        if (this.board[index] !== '' || !this.gameActive) return;

        // Make move
        this.board[index] = this.currentPlayer;
        const cell = document.querySelector(`[data-cell="${index}"]`);
        cell.textContent = this.currentPlayer;
        cell.classList.add('filled', this.currentPlayer.toLowerCase());

        // Check for win
        if (this.checkWin()) {
            this.endGame(`Gracz ${this.currentPlayer} wygrywa!`);
            return;
        }

        // Check for draw
        if (this.board.every(cell => cell !== '')) {
            this.endGame('Remis!');
            return;
        }

        // Switch player
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateTurnIndicator();
    }

    checkWin() {
        for (let pattern of this.winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                // Highlight winning cells
                pattern.forEach(index => {
                    document.querySelector(`[data-cell="${index}"]`).classList.add('winning');
                });
                return true;
            }
        }
        return false;
    }

    endGame(message) {
        this.gameActive = false;
        document.getElementById('message').textContent = message;
        document.getElementById('message').style.color = 'var(--success)';
        document.getElementById('turn-indicator').textContent = 'Gra zakończona';
    }

    updateTurnIndicator() {
        const color = this.currentPlayer === 'X' ? 'var(--primary)' : 'var(--secondary)';
        document.getElementById('turn-indicator').innerHTML =
            `Ruch: <span style="color: ${color}">Gracz ${this.currentPlayer}</span>`;
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;

        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('filled', 'x', 'o', 'winning');
        });

        document.getElementById('message').textContent = '';
        this.updateTurnIndicator();
    }
}

const ticTacToe = new TicTacToe();
