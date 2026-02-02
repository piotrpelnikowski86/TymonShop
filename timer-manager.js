// Timer Manager for Entertainment Zone

class TimerManager {
    constructor() {
        this.remainingSeconds = 0;
        this.timerInterval = null;
        this.sessionStarted = false;

        this.init();
    }

    init() {
        // Load user data
        this.loadUserSession();

        // Check if user can access
        if (!this.canAccess()) {
            alert('Brak dostępu! Musisz zdać quiz z wynikiem 80% aby uzyskać dostęp do strefy rozrywki.');
            window.location.href = 'index.html';
            return;
        }

        // Initialize timer
        this.initializeTimer();

        // Setup event listeners
        this.setupEventListeners();

        // Start timer
        this.startTimer();
    }

    loadUserSession() {
        const savedUser = localStorage.getItem('tymon-current-user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            window.location.href = 'index.html';
        }
    }

    canAccess() {
        if (!this.currentUser) return false;

        const { earned, used } = this.currentUser.entertainmentMinutes;
        return (earned - used) > 0;
    }

    initializeTimer() {
        const { earned, used, lastSession } = this.currentUser.entertainmentMinutes;

        // Calculate remaining time
        const remainingMinutes = earned - used;
        this.remainingSeconds = remainingMinutes * 60;

        // Check if there's an active session
        if (lastSession && lastSession.active) {
            const sessionStart = new Date(lastSession.startTime);
            const now = new Date();
            const elapsedSeconds = Math.floor((now - sessionStart) / 1000);

            // Subtract elapsed time from session
            this.remainingSeconds = Math.max(0, lastSession.remainingSeconds - elapsedSeconds);
        }

        this.updateDisplay();
    }

    startTimer() {
        // Mark session as active
        if (!this.currentUser.entertainmentMinutes.lastSession ||
            !this.currentUser.entertainmentMinutes.lastSession.active) {
            this.currentUser.entertainmentMinutes.lastSession = {
                active: true,
                startTime: new Date().toISOString(),
                remainingSeconds: this.remainingSeconds
            };
            this.saveUserData();
        }

        // Start countdown
        this.timerInterval = setInterval(() => {
            this.tick();
        }, 1000);

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.pauseTimer();
        });
    }

    tick() {
        if (this.remainingSeconds > 0) {
            this.remainingSeconds--;
            this.updateDisplay();

            // Warning at 1 minute
            if (this.remainingSeconds === 60) {
                document.getElementById('timer-warning')?.classList.add('active');
            }

            // Save every 10 seconds
            if (this.remainingSeconds % 10 === 0) {
                this.saveProgress();
            }
        } else {
            this.timeExpired();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        document.getElementById('timer-text').textContent = timeString;

        // Update user display
        if (this.currentUser) {
            document.getElementById('user-display').textContent = this.currentUser.username;
        }
    }

    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Calculate time used
        if (this.currentUser.entertainmentMinutes.lastSession) {
            const session = this.currentUser.entertainmentMinutes.lastSession;
            const sessionStart = new Date(session.startTime);
            const now = new Date();
            const elapsedMinutes = Math.floor((now - sessionStart) / 1000 / 60);

            // Add elapsed time to used minutes
            this.currentUser.entertainmentMinutes.used += elapsedMinutes;

            // Mark session as inactive
            this.currentUser.entertainmentMinutes.lastSession = {
                active: false,
                startTime: null,
                remainingSeconds: 0
            };

            this.saveUserData();
        }
    }

    saveProgress() {
        // Update session data
        if (this.currentUser.entertainmentMinutes.lastSession) {
            this.currentUser.entertainmentMinutes.lastSession.remainingSeconds = this.remainingSeconds;
            this.saveUserData();
        }
    }

    timeExpired() {
        clearInterval(this.timerInterval);

        // Mark session as complete
        this.pauseTimer();

        alert('Czas się skończył! Zdaj kolejny quiz aby zdobyć więcej czasu rozrywki.');
        window.location.href = 'index.html';
    }

    saveUserData() {
        localStorage.setItem('tymon-current-user', JSON.stringify(this.currentUser));

        // Also update in users array
        let users = JSON.parse(localStorage.getItem('tymon-users') || '[]');
        const index = users.findIndex(u => u.username === this.currentUser.username);
        if (index !== -1) {
            users[index] = this.currentUser;
            localStorage.setItem('tymon-users', JSON.stringify(users));
        }
    }

    setupEventListeners() {
        document.getElementById('back-btn')?.addEventListener('click', () => {
            this.pauseTimer();
            window.location.href = 'index.html';
        });
    }
}

// Initialize timer manager
const timerManager = new TimerManager();
