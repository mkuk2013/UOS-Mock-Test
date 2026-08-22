/**
 * UOS Mock Test Portal - Centralized Local Authentication System
 * Uses LocalStorage for client-side persistence without external backend.
 */

const UOS_STORAGE_KEYS = {
    USERS: 'uos_mock_users_db',
    CURRENT_USER: 'uos_mock_active_session',
    ADMIN_CONFIG: 'uos_mock_admin_config'
};

const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'uos@admin2026',
    role: 'admin'
};

// Main Auth Object
const UOSAuth = {
    // -------------------------------------------------------------
    // USER DATABASE METHODS
    // -------------------------------------------------------------
    getUsers: function() {
        try {
            const data = localStorage.getItem(UOS_STORAGE_KEYS.USERS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading users from localStorage:', e);
            return [];
        }
    },

    saveUsers: function(users) {
        try {
            localStorage.setItem(UOS_STORAGE_KEYS.USERS, JSON.stringify(users));
            return true;
        } catch (e) {
            console.error('Error saving users to localStorage:', e);
            return false;
        }
    },

    // -------------------------------------------------------------
    // ADMIN CONFIG METHODS
    // -------------------------------------------------------------
    getAdminConfig: function() {
        try {
            const data = localStorage.getItem(UOS_STORAGE_KEYS.ADMIN_CONFIG);
            return data ? JSON.parse(data) : DEFAULT_ADMIN;
        } catch (e) {
            return DEFAULT_ADMIN;
        }
    },

    updateAdminPassword: function(newPassword) {
        const config = this.getAdminConfig();
        config.password = newPassword;
        localStorage.setItem(UOS_STORAGE_KEYS.ADMIN_CONFIG, JSON.stringify(config));
        return true;
    },

    // -------------------------------------------------------------
    // DEVICE FINGERPRINT & IDENTIFICATION (SINGLE-DEVICE POLICY)
    // -------------------------------------------------------------
    getDeviceId: function() {
        try {
            let devId = localStorage.getItem('uos_client_device_id');
            if (!devId) {
                devId = 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('uos_client_device_id', devId);
            }
            return devId;
        } catch (e) {
            return 'dev_fallback_' + Date.now();
        }
    },

    // -------------------------------------------------------------
    // CREDENTIAL GENERATOR (TRULY RANDOMIZED)
    // -------------------------------------------------------------
    generateRandomPassword: function(length = 8) {
        const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const lowers = 'abcdefghijkmnpqrstuvwxyz';
        const numbers = '23456789';
        const symbols = '!@#$%&*';
        const allChars = uppers + lowers + numbers + symbols;

        // Ensure at least one character from each set for variety & unpredictability
        const passwordArray = [
            uppers.charAt(Math.floor(Math.random() * uppers.length)),
            lowers.charAt(Math.floor(Math.random() * lowers.length)),
            numbers.charAt(Math.floor(Math.random() * numbers.length)),
            symbols.charAt(Math.floor(Math.random() * symbols.length))
        ];

        // Fill remaining length randomly
        const targetLen = Math.floor(7 + Math.random() * 2); // 7 to 8 random length
        for (let i = 4; i < targetLen; i++) {
            passwordArray.push(allChars.charAt(Math.floor(Math.random() * allChars.length)));
        }

        // Fisher-Yates shuffle so characters and symbols are scattered randomly
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }

        return passwordArray.join('');
    },

    generateCredentials: function(customUsername = '') {
        const users = this.getUsers();
        let username = (customUsername || '').trim().toLowerCase();

        if (!username) {
            // Auto generate username if left blank
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            username = `uos-26-${randomNum}`;
        }

        // Check for duplicate username
        const exists = users.some(u => u.username.toLowerCase() === username);
        if (exists) {
            return { success: false, message: `Username "${username}" pehle se maujood hai. Barah-e-karam koi dusra username likhein.` };
        }

        // Generate totally random password
        const password = this.generateRandomPassword();

        const newUser = {
            id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            username: username,
            password: password,
            boundDeviceId: null, // Will lock to student's device on 1st login
            createdAt: new Date().toISOString(),
            status: 'active', // 'active' | 'disabled'
            lastLogin: null
        };

        users.unshift(newUser);
        this.saveUsers(users);
        return { success: true, user: newUser };
    },

    createCustomUser: function(username, password) {
        const cleanUser = (username || '').trim().toLowerCase();
        const cleanPass = (password || '').trim();

        if (!cleanUser || !cleanPass) {
            return { success: false, message: 'Username and password are required.' };
        }

        const users = this.getUsers();
        const exists = users.some(u => u.username.toLowerCase() === cleanUser);
        if (exists) {
            return { success: false, message: 'Username already exists. Please choose a different one.' };
        }

        const newUser = {
            id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            username: cleanUser,
            password: cleanPass,
            boundDeviceId: null,
            createdAt: new Date().toISOString(),
            status: 'active',
            lastLogin: null
        };

        users.unshift(newUser);
        this.saveUsers(users);
        return { success: true, user: newUser };
    },

    deleteUser: function(userId) {
        let users = this.getUsers();
        users = users.filter(u => u.id !== userId);
        this.saveUsers(users);
        return true;
    },

    toggleUserStatus: function(userId) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.status = user.status === 'active' ? 'disabled' : 'active';
            this.saveUsers(users);
            return user.status;
        }
        return null;
    },

    resetUserDevice: function(userId) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.boundDeviceId = null;
            this.saveUsers(users);
            return true;
        }
        return false;
    },

    resetUserPassword: function(userId, newPassword) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.password = newPassword.trim();
            this.saveUsers(users);
            return true;
        }
        return false;
    },

    // -------------------------------------------------------------
    // AUTHENTICATION & SINGLE-DEVICE ENFORCEMENT
    // -------------------------------------------------------------
    loginStudent: function(username, password) {
        const cleanUser = (username || '').trim().toLowerCase();
        const cleanPass = (password || '').trim();

        if (!cleanUser || !cleanPass) {
            return { success: false, message: 'Please enter both Username and Password.' };
        }

        const users = this.getUsers();
        const user = users.find(u => u.username.toLowerCase() === cleanUser && u.password === cleanPass);

        if (!user) {
            return { success: false, message: 'Invalid Username or Password. Only admin generated credentials are valid.' };
        }

        if (user.status === 'disabled') {
            return { success: false, message: 'This account has been deactivated by Admin. Please contact support.' };
        }

        // Single-Device Strict Policy Enforcement
        const currentDevId = this.getDeviceId();
        if (!user.boundDeviceId) {
            // First time login: Lock to this device!
            user.boundDeviceId = currentDevId;
            user.firstLoginAt = new Date().toISOString();
        } else if (user.boundDeviceId !== currentDevId) {
            // Attempt to login from a second device: Strictly BLOCK
            return {
                success: false,
                message: '❌ Strict Policy: Yeh account pehle se dusre mobile/device par registered hai. Ek account sirf ek hi device par login hoskta hai!'
            };
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        this.saveUsers(users);

        const session = {
            id: user.id,
            username: user.username,
            name: user.username,
            role: 'student',
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(UOS_STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
        return { success: true, session: session };
    },

    // Admin login has ZERO device restrictions (Unlimited multi-device access)
    loginAdmin: function(username, password, rememberMe = true) {
        const cleanUser = (username || '').trim();
        const cleanPass = (password || '').trim();
        const config = this.getAdminConfig();

        if (cleanUser === config.username && cleanPass === config.password) {
            const adminSession = {
                username: config.username,
                role: 'admin',
                loginTime: new Date().toISOString()
            };
            sessionStorage.setItem('uos_admin_active_session', JSON.stringify(adminSession));
            if (rememberMe) {
                localStorage.setItem('uos_admin_active_session', JSON.stringify(adminSession));
            }
            return { success: true };
        }
        return { success: false, message: 'Invalid Admin Credentials.' };
    },

    isAdminLoggedIn: function() {
        try {
            const sess = sessionStorage.getItem('uos_admin_active_session') || localStorage.getItem('uos_admin_active_session');
            return sess ? JSON.parse(sess).role === 'admin' : false;
        } catch (e) {
            return false;
        }
    },

    logoutAdmin: function() {
        sessionStorage.removeItem('uos_admin_active_session');
        localStorage.removeItem('uos_admin_active_session');
    },

    getCurrentStudent: function() {
        try {
            const data = localStorage.getItem(UOS_STORAGE_KEYS.CURRENT_USER);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    logoutStudent: function() {
        localStorage.removeItem(UOS_STORAGE_KEYS.CURRENT_USER);
    },

    // Guard for test pages: If student not logged in, redirect to index.html with login prompt
    requireStudentAuth: function() {
        const currentStudent = this.getCurrentStudent();
        if (!currentStudent) {
            // Save destination so after login student goes back to their intended test
            const currentPath = window.location.pathname.split('/').pop() || window.location.href.split('/').pop().split('?')[0];
            sessionStorage.setItem('uos_intended_test', currentPath);
            window.location.href = `index.html?loginRequired=1&redirect=${encodeURIComponent(currentPath)}`;
            return null;
        }
        return currentStudent;
    },

    // Export / Import Backup
    exportUsersBackup: function() {
        const users = this.getUsers();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `UOS_Mock_Users_Backup_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    },

    importUsersBackup: function(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (Array.isArray(parsed)) {
                this.saveUsers(parsed);
                return { success: true, count: parsed.length };
            }
            return { success: false, message: 'Invalid backup file format. Expected a list of users.' };
        } catch (e) {
            return { success: false, message: 'Failed to parse JSON file.' };
        }
    }
};

// Auto-inject demo sample credentials on first time initialization if DB is empty (in browser environment)
(function initDefaultStore() {
    if (typeof localStorage === 'undefined') return;
    const existing = UOSAuth.getUsers();
    if (existing.length === 0) {
        // Create 2 sample student accounts so everything works immediately out of the box
        const demo1 = {
            id: 'usr_demo_1',
            username: 'uos-26-101',
            password: 'UOS@PASS1',
            name: 'Sample Candidate 1',
            note: 'Demo Account',
            createdAt: new Date().toISOString(),
            status: 'active',
            testsAttempted: 0,
            lastLogin: null
        };
        const demo2 = {
            id: 'usr_demo_2',
            username: 'uos-26-102',
            password: 'UOS@PASS2',
            name: 'Sample Candidate 2',
            note: 'Demo Account',
            createdAt: new Date().toISOString(),
            status: 'active',
            testsAttempted: 0,
            lastLogin: null
        };
        UOSAuth.saveUsers([demo1, demo2]);
    }
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UOSAuth;
}
