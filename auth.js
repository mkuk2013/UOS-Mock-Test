/**
 * UOS Mock Test Portal - Centralized Cloud (Supabase) & Local Authentication System
 * Direct Supabase Cloud Database (PostgreSQL REST API) with LocalStorage Fallback.
 * Only candidate user credentials & single-device bindings are stored in the cloud.
 */

const UOS_STORAGE_KEYS = {
    USERS: 'uos_mock_users_db',
    CURRENT_USER: 'uos_mock_active_session',
    ADMIN_CONFIG: 'uos_mock_admin_config',
    SUPABASE_CONFIG: 'uos_supabase_cloud_config'
};

const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'uos@admin2026',
    role: 'admin'
};

const DEFAULT_SUPABASE = {
    url: 'https://icowpqadyrxnjohocvqy.supabase.co',
    key: 'sb_publishable_LJu48LY0lzdMYma3nZiZ1g_xYSokBtQ',
    enabled: true
};

// Safe Storage Mock for Node environments / testing
if (typeof localStorage === 'undefined') {
    const memoryStore = {};
    global.localStorage = {
        getItem: (k) => memoryStore[k] || null,
        setItem: (k, v) => { memoryStore[k] = String(v); },
        removeItem: (k) => { delete memoryStore[k]; },
        clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); }
    };
}
if (typeof sessionStorage === 'undefined') {
    const sessionMemoryStore = {};
    global.sessionStorage = {
        getItem: (k) => sessionMemoryStore[k] || null,
        setItem: (k, v) => { sessionMemoryStore[k] = String(v); },
        removeItem: (k) => { delete sessionMemoryStore[k]; },
        clear: () => { Object.keys(sessionMemoryStore).forEach(k => delete sessionMemoryStore[k]); }
    };
}

// Helpers for Supabase PostgreSQL schema normalization
function formatUserForCloud(u) {
    return {
        id: u.id,
        username: u.username,
        password: u.password,
        bounddeviceid: u.boundDeviceId || u.bounddeviceid || null,
        status: u.status || 'active',
        createdat: u.createdAt || u.createdat || new Date().toISOString(),
        lastlogin: u.lastLogin || u.lastlogin || null
    };
}

function parseUserFromCloud(cu) {
    return {
        id: cu.id,
        username: cu.username,
        password: cu.password,
        boundDeviceId: cu.bounddeviceid || cu.boundDeviceId || null,
        status: cu.status || 'active',
        createdAt: cu.createdat || cu.createdAt || new Date().toISOString(),
        lastLogin: cu.lastlogin || cu.lastLogin || null
    };
}

// Main Auth Object
const UOSAuth = {
    // -------------------------------------------------------------
    // SUPABASE CLOUD DATABASE CONFIGURATION & METHODS
    // -------------------------------------------------------------
    getSupabaseConfig: function() {
        try {
            const data = localStorage.getItem(UOS_STORAGE_KEYS.SUPABASE_CONFIG);
            return data ? JSON.parse(data) : DEFAULT_SUPABASE;
        } catch (e) {
            return DEFAULT_SUPABASE;
        }
    },

    saveSupabaseConfig: function(url, anonKey, enabled = true) {
        let cleanUrl = (url || '').trim().replace(/\/+$/, '');
        let cleanKey = (anonKey || '').trim();

        const config = {
            url: cleanUrl,
            key: cleanKey,
            enabled: !!(cleanUrl && cleanKey) && enabled,
            lastUpdated: new Date().toISOString()
        };

        localStorage.setItem(UOS_STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(config));
        return config;
    },

    isCloudEnabled: function() {
        const cfg = this.getSupabaseConfig();
        return !!(cfg && cfg.enabled && cfg.url && cfg.key);
    },

    getSupabaseHeaders: function() {
        const cfg = this.getSupabaseConfig();
        return {
            'apikey': cfg.key,
            'Authorization': `Bearer ${cfg.key}`,
            'Content-Type': 'application/json'
        };
    },

    // Fetch all users live from Supabase table `uos_mock_users`
    fetchUsersFromCloud: async function() {
        if (!this.isCloudEnabled()) return this.getUsers();

        const cfg = this.getSupabaseConfig();
        const endpoint = `${cfg.url}/rest/v1/uos_mock_users?select=*&order=createdat.desc`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4500);

            const response = await fetch(endpoint, {
                headers: this.getSupabaseHeaders(),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const cloudUsers = await response.json();
                if (Array.isArray(cloudUsers)) {
                    const parsedUsers = cloudUsers.map(parseUserFromCloud);
                    this.saveLocalUsers(parsedUsers);
                    return parsedUsers;
                }
            }
        } catch (e) {
            console.warn('[Supabase Auth] Could not fetch from cloud, using local cache:', e.message);
        }
        return this.getUsers();
    },

    // Push single user to Supabase Cloud
    pushUserToCloud: async function(user) {
        if (!this.isCloudEnabled()) return false;

        const cfg = this.getSupabaseConfig();
        const endpoint = `${cfg.url}/rest/v1/uos_mock_users`;
        const payload = formatUserForCloud(user);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    ...this.getSupabaseHeaders(),
                    'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify(payload)
            });
            return response.ok;
        } catch (e) {
            console.warn('[Supabase Auth] Failed to push user:', e.message);
            return false;
        }
    },

    // Push all users to Supabase Cloud
    pushAllUsersToCloud: async function(users) {
        if (!this.isCloudEnabled()) return false;
        if (!users || users.length === 0) return true;

        const cfg = this.getSupabaseConfig();
        const endpoint = `${cfg.url}/rest/v1/uos_mock_users`;
        const payloadList = users.map(formatUserForCloud);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    ...this.getSupabaseHeaders(),
                    'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify(payloadList)
            });
            return response.ok;
        } catch (e) {
            console.warn('[Supabase Auth] Failed to batch push users:', e.message);
            return false;
        }
    },

    // Update single user in Supabase Cloud
    updateUserInCloud: async function(userId, fields) {
        if (!this.isCloudEnabled()) return false;

        const cfg = this.getSupabaseConfig();
        const endpoint = `${cfg.url}/rest/v1/uos_mock_users?id=eq.${encodeURIComponent(userId)}`;

        // Map field names to database columns
        const cloudFields = {};
        if ('boundDeviceId' in fields || 'bounddeviceid' in fields) {
            cloudFields.bounddeviceid = fields.boundDeviceId || fields.bounddeviceid || null;
        }
        if ('status' in fields) {
            cloudFields.status = fields.status;
        }
        if ('password' in fields) {
            cloudFields.password = fields.password;
        }
        if ('lastLogin' in fields || 'lastlogin' in fields) {
            cloudFields.lastlogin = fields.lastLogin || fields.lastlogin;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: this.getSupabaseHeaders(),
                body: JSON.stringify(cloudFields)
            });
            return response.ok;
        } catch (e) {
            console.warn('[Supabase Auth] Failed to update user in cloud:', e.message);
            return false;
        }
    },

    // Delete single user in Supabase Cloud
    deleteUserFromCloud: async function(userId) {
        if (!this.isCloudEnabled()) return false;

        const cfg = this.getSupabaseConfig();
        const endpoint = `${cfg.url}/rest/v1/uos_mock_users?id=eq.${encodeURIComponent(userId)}`;

        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: this.getSupabaseHeaders()
            });
            return response.ok;
        } catch (e) {
            console.warn('[Supabase Auth] Failed to delete user from cloud:', e.message);
            return false;
        }
    },

    // Test Supabase Connection
    testCloudConnection: async function(url, anonKey) {
        let cleanUrl = (url || '').trim().replace(/\/+$/, '');
        let cleanKey = (anonKey || '').trim();

        if (!cleanUrl || !cleanKey) {
            return { success: false, message: 'Supabase URL aur Anon Key dono required hain.' };
        }

        const endpoint = `${cleanUrl}/rest/v1/uos_mock_users?select=id&limit=1`;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const res = await fetch(endpoint, {
                headers: {
                    'apikey': cleanKey,
                    'Authorization': `Bearer ${cleanKey}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok || res.status === 200 || res.status === 206) {
                return { success: true, message: 'Supabase Cloud Database se successfully connect ho gaya!' };
            } else if (res.status === 404 || res.status === 400) {
                const errData = await res.json().catch(() => ({}));
                return { success: false, message: errData.message || `HTTP Error ${res.status}` };
            } else if (res.status === 401 || res.status === 403) {
                return { success: false, message: 'Invalid Anon Key ya Permissions issue.' };
            } else {
                return { success: false, message: `Server error with status code ${res.status}` };
            }
        } catch (e) {
            return { success: false, message: 'Connection failed. Internet connection ya Supabase URL check karein.' };
        }
    },

    // -------------------------------------------------------------
    // USER DATABASE METHODS (LOCAL CACHE + CLOUD SYNC)
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

    saveLocalUsers: function(users) {
        try {
            localStorage.setItem(UOS_STORAGE_KEYS.USERS, JSON.stringify(users));
            return true;
        } catch (e) {
            console.error('Error saving users to localStorage:', e);
            return false;
        }
    },

    saveUsers: function(users) {
        this.saveLocalUsers(users);
        if (this.isCloudEnabled()) {
            this.pushAllUsersToCloud(users);
        }
        return true;
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

        const passwordArray = [
            uppers.charAt(Math.floor(Math.random() * uppers.length)),
            lowers.charAt(Math.floor(Math.random() * lowers.length)),
            numbers.charAt(Math.floor(Math.random() * numbers.length)),
            symbols.charAt(Math.floor(Math.random() * symbols.length))
        ];

        const targetLen = Math.floor(7 + Math.random() * 2);
        for (let i = 4; i < targetLen; i++) {
            passwordArray.push(allChars.charAt(Math.floor(Math.random() * allChars.length)));
        }

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
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            username = `uos-26-${randomNum}`;
        }

        const exists = users.some(u => u.username.toLowerCase() === username);
        if (exists) {
            return { success: false, message: `Username "${username}" pehle se maujood hai. Barah-e-karam koi dusra username likhein.` };
        }

        const password = this.generateRandomPassword();

        const newUser = {
            id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            username: username,
            password: password,
            boundDeviceId: null,
            createdAt: new Date().toISOString(),
            status: 'active',
            lastLogin: null
        };

        users.unshift(newUser);
        this.saveLocalUsers(users);

        if (this.isCloudEnabled()) {
            this.pushUserToCloud(newUser);
        }

        return { success: true, user: newUser };
    },

    deleteUser: function(userId) {
        let users = this.getUsers();
        users = users.filter(u => u.id !== userId);
        this.saveLocalUsers(users);

        if (this.isCloudEnabled()) {
            this.deleteUserFromCloud(userId);
        }
        return true;
    },

    toggleUserStatus: function(userId) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.status = user.status === 'active' ? 'disabled' : 'active';
            this.saveLocalUsers(users);

            if (this.isCloudEnabled()) {
                this.updateUserInCloud(userId, { status: user.status });
            }
            return user.status;
        }
        return null;
    },

    resetUserDevice: function(userId) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.boundDeviceId = null;
            this.saveLocalUsers(users);

            if (this.isCloudEnabled()) {
                this.updateUserInCloud(userId, { boundDeviceId: null });
            }
            return true;
        }
        return false;
    },

    resetUserPassword: function(userId, newPassword) {
        const users = this.getUsers();
        const user = users.find(u => u.id === userId);
        if (user) {
            user.password = newPassword.trim();
            this.saveLocalUsers(users);

            if (this.isCloudEnabled()) {
                this.updateUserInCloud(userId, { password: user.password });
            }
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

        // Single-Device Strict Policy Enforcement (Students only)
        const currentDevId = this.getDeviceId();
        if (!user.boundDeviceId) {
            user.boundDeviceId = currentDevId;
            user.firstLoginAt = new Date().toISOString();
            if (this.isCloudEnabled()) {
                this.updateUserInCloud(user.id, { boundDeviceId: currentDevId });
            }
        } else if (user.boundDeviceId !== currentDevId) {
            return {
                success: false,
                message: '❌ Strict Policy: Yeh candidate account pehle se dusre mobile/device par registered hai. Ek student account sirf ek hi device par login hoskta hai!'
            };
        }

        user.lastLogin = new Date().toISOString();
        this.saveLocalUsers(users);
        if (this.isCloudEnabled()) {
            this.updateUserInCloud(user.id, { lastLogin: user.lastLogin });
        }

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

    // Async Student Login with Live Cloud Fetch from Supabase
    loginStudentAsync: async function(username, password) {
        if (this.isCloudEnabled()) {
            await this.fetchUsersFromCloud();
        }
        return this.loginStudent(username, password);
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

    requireStudentAuth: function() {
        const currentStudent = this.getCurrentStudent();
        if (!currentStudent) {
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

// Auto-inject demo sample credentials on first time initialization if DB is empty
(function initDefaultStore() {
    if (typeof localStorage === 'undefined') return;
    const existing = UOSAuth.getUsers();
    if (existing.length === 0) {
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
        UOSAuth.saveLocalUsers([demo1, demo2]);
    }
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UOSAuth;
}
