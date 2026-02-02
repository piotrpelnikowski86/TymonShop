// ============================================
// TymonTeam - Main Application
// ============================================

class TymonApp {
    constructor() {
        this.currentUser = null;
        this.currentTheme = 'light';
        this.currentZone = null;

        this.init();
    }

    init() {
        // Load saved theme
        this.loadTheme();

        // Load user session
        this.loadUserSession();

        // Setup event listeners
        this.setupEventListeners();

        // Show appropriate screen
        if (this.currentUser) {
            this.showMainScreen();
        } else {
            this.showLoginScreen();
        }
    }

    // ============================================
    // Theme Management
    // ============================================

    loadTheme() {
        const savedTheme = localStorage.getItem('tymon-theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('tymon-theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    // ============================================
    // User Session Management
    // ============================================

    loadUserSession() {
        const savedUser = localStorage.getItem('tymon-current-user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    saveUserSession() {
        if (this.currentUser) {
            localStorage.setItem('tymon-current-user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('tymon-current-user');
        }
    }

    login(username) {
        // Get or create user data
        let users = this.getAllUsers();
        let user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

        if (!user) {
            // Create new user
            user = {
                username: username,
                createdAt: new Date().toISOString(),
                quizScores: {
                    math: [],
                    english: []
                },
                entertainmentMinutes: {
                    earned: 0,
                    used: 0,
                    lastSession: null
                }
            };
            users.push(user);
            this.saveAllUsers(users);
        }

        this.currentUser = user;
        this.saveUserSession();
        this.showMainScreen();
    }

    logout() {
        // Save any pending user data
        if (this.currentUser) {
            this.updateUserData(this.currentUser);
        }

        this.currentUser = null;
        this.saveUserSession();
        this.showLoginScreen();
    }

    getAllUsers() {
        const users = localStorage.getItem('tymon-users');
        return users ? JSON.parse(users) : [];
    }

    saveAllUsers(users) {
        localStorage.setItem('tymon-users', JSON.stringify(users));
    }

    updateUserData(userData) {
        let users = this.getAllUsers();
        const index = users.findIndex(u => u.username === userData.username);

        if (index !== -1) {
            users[index] = userData;
        } else {
            users.push(userData);
        }

        this.saveAllUsers(users);
        this.currentUser = userData;
        this.saveUserSession();
    }

    // Add entertainment minutes to user
    addEntertainmentMinutes(minutes) {
        if (!this.currentUser) return;

        this.currentUser.entertainmentMinutes.earned += minutes;
        this.updateUserData(this.currentUser);
    }

    // Check if user can access entertainment zone
    canAccessEntertainment() {
        if (!this.currentUser) return false;

        const { earned, used } = this.currentUser.entertainmentMinutes;
        const remaining = earned - used;

        return remaining > 0;
    }

    // Get remaining entertainment time
    getRemainingTime() {
        if (!this.currentUser) return 0;

        const { earned, used } = this.currentUser.entertainmentMinutes;
        return Math.max(0, earned - used);
    }

    // ============================================
    // Screen Management
    // ============================================

    showLoginScreen() {
        document.getElementById('login-screen').classList.add('active');
        document.getElementById('main-screen').classList.remove('active');
    }

    showMainScreen() {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-screen').classList.add('active');

        // Update user display
        document.getElementById('user-display').textContent = this.currentUser.username;

        // Show zone selection
        this.showZoneSelection();

        // Update entertainment lock status
        this.updateEntertainmentLock();
    }

    showZoneSelection() {
        // Hide all views
        document.querySelectorAll('.main-content > div').forEach(div => {
            div.classList.remove('active-view');
        });

        // Show zone selection
        document.getElementById('zone-selection').classList.add('active-view');

        // Clear dynamic content
        document.getElementById('dynamic-content').innerHTML = '';

        this.currentZone = null;
    }

    updateEntertainmentLock() {
        const lock = document.getElementById('entertainment-lock');
        if (this.canAccessEntertainment()) {
            lock.classList.add('hidden');
        } else {
            lock.classList.remove('hidden');
        }
    }

    // ============================================
    // Navigation
    // ============================================

    navigateToZone(zone) {
        this.currentZone = zone;

        switch (zone) {
            case 'learning':
                this.loadLearningZone();
                break;
            case 'entertainment':
                this.loadEntertainmentZone();
                break;
            case 'creative':
                this.loadCreativeZone();
                break;
        }
    }

    loadLearningZone() {
        const content = `
            <div class="zone-content">
                <div class="zone-header">
                    <button class="btn btn-icon back-btn" onclick="app.showZoneSelection()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <h2>Strefa Nauki</h2>
                    <div></div>
                </div>
                
                <div class="subject-grid">
                    <div class="glass-card subject-card" onclick="app.loadMathSection()">
                        <div class="subject-icon math-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </div>
                        <h3>Matematyka</h3>
                        <p>Tabliczka mnożenia i quiz matematyczny</p>
                    </div>
                    
                    <div class="glass-card subject-card" onclick="app.loadEnglishSection()">
                        <div class="subject-icon english-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                        </div>
                        <h3>Język Angielski</h3>
                        <p>Baza słówek i quiz językowy</p>
                    </div>
                    
                    <div class="glass-card subject-card" onclick="app.loadMaterialsSection()">
                        <div class="subject-icon materials-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                        </div>
                        <h3>Materiały Edukacyjne</h3>
                        <p>Dodatkowe materiały i artykuły</p>
                    </div>
                </div>
            </div>
        `;

        this.loadDynamicContent(content);
    }

    loadEntertainmentZone() {
        // Check if user has entertainment minutes
        const { earned, used } = this.currentUser.entertainmentMinutes;
        const available = earned - used;

        if (available <= 0) {
            this.showAccessDeniedMessage(); // Changed to showAccessDeniedMessage
            return;
        }

        // Navigate to entertainment zone
        window.location.href = 'entertainment-zone.html';
    }

    loadCreativeZone() {
        window.location.href = 'creative-zone.html';
    }

    loadMathSection() {
        const content = `
            <div class="zone-content">
                <div class="zone-header">
                    <button class="btn btn-icon back-btn" onclick="app.loadLearningZone()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <h2>Matematyka</h2>
                    <div></div>
                </div>
                
                <div class="activity-grid">
                    <div class="glass-card activity-card" onclick="window.location.href='multiplication-table.html'">
                        <div class="activity-number">1</div>
                        <h3>Tabliczka Mnożenia</h3>
                        <p>Ucz się i praktykuj tabliczkę mnożenia</p>
                        <button class="btn btn-primary">Rozpocznij</button>
                    </div>
                    
                    <div class="glass-card activity-card" onclick="window.location.href='math-quiz.html'">
                        <div class="activity-number">2</div>
                        <h3>Quiz Matematyczny</h3>
                        <p>20 pytań z mnożenia i dzielenia</p>
                        <div class="quiz-reward">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>Nagroda: 10 minut rozrywki</span>
                        </div>
                        <button class="btn btn-primary">Rozpocznij Quiz</button>
                    </div>
                </div>
            </div>
        `;

        this.loadDynamicContent(content);
    }

    loadEnglishSection() {
        const content = `
            <div class="zone-content">
                <div class="zone-header">
                    <button class="btn btn-icon back-btn" onclick="app.loadLearningZone()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <h2>Język Angielski</h2>
                    <div></div>
                </div>
                
                <div class="activity-grid">
                    <div class="glass-card activity-card" onclick="window.location.href='english-vocab.html'">
                        <div class="activity-number">1</div>
                        <h3>Baza Słówek</h3>
                        <p>Przeglądaj słówka dla klas 1-3</p>
                        <button class="btn btn-primary">Przeglądaj</button>
                    </div>
                    
                    <div class="glass-card activity-card" onclick="window.location.href='english-quiz.html'">
                        <div class="activity-number">2</div>
                        <h3>Quiz Językowy</h3>
                        <p>20 pytań ze słówek angielskich</p>
                        <div class="quiz-reward">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>Nagroda: 10 minut rozrywki</span>
                        </div>
                        <button class="btn btn-primary">Rozpocznij Quiz</button>
                    </div>
                </div>
            </div>
        `;

        this.loadDynamicContent(content);
    }

    loadMaterialsSection() {
        window.location.href = 'materials.html';
    }

    loadDynamicContent(html) {
        // Hide zone selection
        document.getElementById('zone-selection').classList.remove('active-view');

        // Load content
        const dynamicContent = document.getElementById('dynamic-content');
        dynamicContent.innerHTML = html;
        dynamicContent.classList.add('active-view');
    }

    showAccessDeniedMessage() {
        const content = `
            <div class="zone-content access-denied">
                <div class="zone-header">
                    <button class="btn btn-icon back-btn" onclick="app.showZoneSelection()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <h2>Dostęp Zablokowany</h2>
                    <div></div>
                </div>
                
                <div class="glass-card access-message">
                    <div class="lock-icon-large">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                    </div>
                    <h3>Strefa Rozrywki Zablokowana</h3>
                    <p>Aby uzyskać dostęp do strefy rozrywki, musisz zdać quiz (matematyczny lub angielski) z wynikiem minimum 80%.</p>
                    <p><strong>Za każdy zdany quiz otrzymasz 10 minut rozrywki!</strong></p>
                    <button class="btn btn-primary" onclick="app.loadLearningZone()">Przejdź do Strefy Nauki</button>
                </div>
            </div>
        `;

        this.loadDynamicContent(content);
    }

    // ============================================
    // Event Listeners
    // ============================================

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Login form
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username-input').value.trim();
            if (username) {
                this.login(username);
            }
        });

        // Logout button
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            this.logout();
        });

        // Zone cards
        document.querySelectorAll('.zone-card').forEach(card => {
            card.addEventListener('click', () => {
                const zone = card.dataset.zone;
                if (zone) {
                    this.navigateToZone(zone);
                }
            });
        });

        // Admin access
        document.getElementById('admin-access-btn')?.addEventListener('click', () => {
            this.showAdminModal();
        });

        // Admin modal close
        document.getElementById('admin-modal-close')?.addEventListener('click', () => {
            this.hideAdminModal();
        });

        // Admin login
        document.getElementById('admin-login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            this.adminLogin(password);
        });
    }

    // ============================================
    // Admin Functions
    // ============================================

    showAdminModal() {
        document.getElementById('admin-modal').classList.add('active');
    }

    hideAdminModal() {
        document.getElementById('admin-modal').classList.remove('active');
        document.getElementById('admin-password').value = '';
    }

    adminLogin(password) {
        // Simple password check (in production, use proper authentication)
        if (password === 'admin123') {
            window.location.href = 'admin-panel.html';
        } else {
            alert('Nieprawidłowe hasło!');
        }
    }
}

// Initialize app
const app = new TymonApp();

// Make app globally accessible
window.app = app;
