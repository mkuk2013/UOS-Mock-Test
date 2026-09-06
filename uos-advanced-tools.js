/**
 * University of Sindh (UOS) Mock Test Portal - Advanced Tools Suite (2k26)
 * Includes:
 * 1. Official CPN Merit Calculator & Department Admission Predictor
 * 2. High-Yield Revision Flashcards & Formula Bank (3D Flip)
 * 3. 15-Question Rapid-Fire Speed Challenge Mode with Web Audio FX
 * 4. OLED Dark / Light Mode Theme Controller
 */

const UOSAdvanced = (function () {
    'use strict';

    // =========================================================================
    // 1. WEB AUDIO SOUND SYNTHESIZER (No external mp3 files needed)
    // =========================================================================
    let audioCtx = null;
    let soundMuted = localStorage.getItem('uos_sound_muted') === 'true';

    function getAudioContext() {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
        if (soundMuted) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.warn('[Audio] Synth error:', e);
        }
    }

    const sound = {
        isMuted: () => soundMuted,
        toggleMute: () => {
            soundMuted = !soundMuted;
            localStorage.setItem('uos_sound_muted', soundMuted ? 'true' : 'false');
            return soundMuted;
        },
        click: () => {
            playTone(800, 'triangle', 0.05, 0.05);
        },
        correct: () => {
            if (soundMuted) return;
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                // Pleasant major chord chime
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + i * 0.06);
                    gain.gain.setValueAtTime(0.08, now + i * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.06);
                    osc.stop(now + i * 0.06 + 0.35);
                });
            } catch (e) { }
        },
        wrong: () => {
            playTone(220, 'sawtooth', 0.25, 0.08);
        },
        fanfare: () => {
            if (soundMuted) return;
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                const notes = [440, 554.37, 659.25, 880];
                notes.forEach((f, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(f, now + idx * 0.12);
                    gain.gain.setValueAtTime(0.12, now + idx * 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.12);
                    osc.stop(now + idx * 0.12 + 0.45);
                });
            } catch (e) { }
        }
    };

    // =========================================================================
    // 2. THEME ENGINE (OLED Dark Mode & Clean Light Mode)
    // =========================================================================
    const theme = {
        init: () => {
            try {
                const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem('uos_theme') : null;
                const prefersDark = (typeof window !== 'undefined' && window.matchMedia && typeof window.matchMedia === 'function')
                    ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    : false;
                if (saved === 'dark' || (!saved && prefersDark)) {
                    if (typeof document !== 'undefined' && document.documentElement) document.documentElement.classList.add('dark');
                } else {
                    if (typeof document !== 'undefined' && document.documentElement) document.documentElement.classList.remove('dark');
                }
                theme.updateToggleUI();
            } catch (e) {
                console.warn('Theme init warning:', e);
            }
        },
        toggle: () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('uos_theme', isDark ? 'dark' : 'light');
            theme.updateToggleUI();
            sound.click();
            return isDark;
        },
        isDark: () => (typeof document !== 'undefined' && document.documentElement) ? document.documentElement.classList.contains('dark') : false,
        updateToggleUI: () => {
            try {
                if (typeof $ === 'undefined' || typeof document === 'undefined' || !document.documentElement) return;
                const isDark = document.documentElement.classList.contains('dark');
                const $btn = $('#btnThemeToggle, #btnThemeToggleMobile');
                if ($btn && $btn.length) {
                    if (isDark) {
                        $btn.html('<i data-lucide="sun" class="w-4 h-4 text-amber-400"></i><span class="hidden sm:inline text-xs font-bold text-amber-300">Light</span>');
                    } else {
                        $btn.html('<i data-lucide="moon" class="w-4 h-4 text-slate-700"></i><span class="hidden sm:inline text-xs font-bold text-slate-700">Dark</span>');
                    }
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            } catch (e) { }
        }
    };

    // =========================================================================
    // 3. OFFICIAL CPN MERIT CALCULATOR & DEPARTMENT PREDICTOR
    // =========================================================================
    const departmentsDatabase = [
        {
            name: "Doctor of Pharmacy (Pharm-D)",
            faculty: "Faculty of Pharmacy",
            cutoff: 80.5,
            quota: "Pre-Medical / Science",
            icon: "pill",
            desc: "Highly competitive flagship 5-year clinical degree program."
        },
        {
            name: "BS Computer Science (BS CS)",
            faculty: "Faculty of Engineering & Tech",
            cutoff: 77.8,
            quota: "Pre-Engineering / ICS / Gen Sci",
            icon: "laptop",
            desc: "Premier software & computing curriculum in Sindh University."
        },
        {
            name: "BS Software Engineering (BS SE)",
            faculty: "Faculty of Engineering & Tech",
            cutoff: 75.4,
            quota: "Pre-Engineering / ICS",
            icon: "code",
            desc: "Specialized in software development, cloud, and engineering."
        },
        {
            name: "BS Artificial Intelligence (BS AI)",
            faculty: "Faculty of Engineering & Tech",
            cutoff: 74.2,
            quota: "Pre-Engineering / ICS",
            icon: "bot",
            desc: "Modern ML, Deep Learning & Intelligent Systems curriculum."
        },
        {
            name: "BS Information Technology (BS IT)",
            faculty: "Faculty of Engineering & Tech",
            cutoff: 72.8,
            quota: "Pre-Engineering / ICS",
            icon: "network",
            desc: "Network infrastructure, cybersecurity, and databases."
        },
        {
            name: "BBA (Hons) Business Administration",
            faculty: "Institute of Business Admin (IBA)",
            cutoff: 67.5,
            quota: "Open to All Disciplines",
            icon: "briefcase",
            desc: "Corporate management, finance, marketing, and leadership."
        },
        {
            name: "LLB (5-Year Law Degree)",
            faculty: "Institute of Law",
            cutoff: 64.5,
            quota: "Open to All Disciplines",
            icon: "scale",
            desc: "Comprehensive civil, criminal, and constitutional law program."
        },
        {
            name: "BS Chemistry / Biochemistry",
            faculty: "Faculty of Natural Sciences",
            cutoff: 63.0,
            quota: "Pre-Medical / Pre-Engineering",
            icon: "flask-conical",
            desc: "Analytical chemistry, organic synthesis, and molecular biology."
        },
        {
            name: "BS English Language & Literature",
            faculty: "Faculty of Arts",
            cutoff: 61.2,
            quota: "Open to All Disciplines",
            icon: "book-open",
            desc: "Linguistics, critical theory, and world literature."
        },
        {
            name: "BS Criminology",
            faculty: "Faculty of Social Sciences",
            cutoff: 58.5,
            quota: "Open to All Disciplines",
            icon: "shield",
            desc: "Forensics, criminal justice, and investigative sciences."
        },
        {
            name: "BS Accounting & Finance",
            faculty: "Faculty of Commerce",
            cutoff: 56.5,
            quota: "Open to All Disciplines",
            icon: "calculator",
            desc: "Auditing, taxation, banking, and capital markets."
        },
        {
            name: "BS Media & Communication Studies",
            faculty: "Faculty of Social Sciences",
            cutoff: 53.0,
            quota: "Open to All Disciplines",
            icon: "video",
            desc: "Journalism, broadcasting, digital media, and PR."
        }
    ];

    function calculateCPN(sscPct, hscPct, testScore, formulaRatio = '10-30-60') {
        let sscWeight = 0.10;
        let hscWeight = 0.30;
        let testWeight = 0.60;

        if (formulaRatio === '20-40-40') {
            sscWeight = 0.20;
            hscWeight = 0.40;
            testWeight = 0.40;
        } else if (formulaRatio === '10-40-50') {
            sscWeight = 0.10;
            hscWeight = 0.40;
            testWeight = 0.50;
        }

        const cpn = (sscPct * sscWeight) + (hscPct * hscWeight) + (testScore * testWeight);
        return Math.round(cpn * 100) / 100;
    }

    function getDepartmentEligibility(cpn) {
        return departmentsDatabase.map(dept => {
            const diff = cpn - dept.cutoff;
            let status = 'safe'; // Green: Safe Admission
            let badgeText = 'Safe Zone';
            let badgeClass = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';

            if (diff < -4) {
                status = 'reach'; // Red: High Reach
                badgeText = 'High Reach';
                badgeClass = 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30';
            } else if (diff < 1.5) {
                status = 'borderline'; // Amber: Borderline / Competitive
                badgeText = 'Competitive';
                badgeClass = 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30';
            }

            return {
                ...dept,
                diff: Math.round(diff * 10) / 10,
                status,
                badgeText,
                badgeClass
            };
        });
    }

    // =========================================================================
    // 4. HIGH-YIELD FLASHCARD & SHORTCUT FORMULA BANK
    // =========================================================================
    const flashcardData = [
        // English
        {
            id: 1,
            subject: "English",
            category: "english",
            topic: "High-Frequency SU Vocabulary",
            front: "Ephemeral (Adjective)",
            back: "Meaning: Lasting for a very short time; transient.\n\n• Synonym: Fleeting, Short-lived, Temporary\n• Antonym: Eternal, Permanent, Perennial\n• Example: Fame in the digital era is often ephemeral.",
            tip: "Appeared in Sindh University Entry Tests 2021 & 2024."
        },
        {
            id: 2,
            subject: "English",
            category: "english",
            topic: "Essential Preposition Rules",
            front: "Fixed Prepositions with 'A'",
            back: "• Accused OF (a crime)\n• Abstain FROM (bad habits)\n• Abide BY (rules)\n• Agree WITH a person / Agree TO a proposal\n• Afraid OF (the dark)",
            tip: "Preposition questions account for 5 to 7 MCQs in the English section."
        },
        {
            id: 3,
            subject: "English",
            category: "english",
            topic: "Voice & Narration Shortcut",
            front: "Passive Voice with Modals (Can, Must, Should)",
            back: "Rule: Subject + Modal + be + Past Participle (V3)\n\n• Active: 'You must submit the form.'\n• Passive: 'The form must be submitted (by you).'",
            tip: "Never change the tense of modals in passive voice!"
        },
        {
            id: 4,
            subject: "English",
            category: "english",
            topic: "Conditional Sentences",
            front: "Third Conditional (Impossible Past)",
            back: "Structure: If + Past Perfect, would have + V3\n\n• Example: 'If he had studied diligently, he would have secured admission.'",
            tip: "Frequently tested in error detection and sentence completion."
        },

        // Mathematics
        {
            id: 5,
            subject: "Mathematics",
            category: "math",
            topic: "Percentage Increase & Decrease",
            front: "Percentage Change Formula",
            back: "Formula:\n% Change = [(New Value - Old Value) / Old Value] × 100%\n\n• If price increases from 50 to 60:\n[(60 - 50) / 50] × 100 = (10/50) × 100 = 20% Increase.",
            tip: "Always divide by the ORIGINAL (Old) value, not the new one!"
        },
        {
            id: 6,
            subject: "Mathematics",
            category: "math",
            topic: "Speed, Distance & Time",
            front: "Unit Conversion: km/h to m/s",
            back: "Shortcut Multiplier:\n• To convert km/h → m/s: Multiply by 5/18\n  (e.g., 72 km/h × 5/18 = 20 m/s)\n\n• To convert m/s → km/h: Multiply by 18/5\n  (e.g., 25 m/s × 18/5 = 90 km/h)",
            tip: "Crucial for train, boat, and runner word problems."
        },
        {
            id: 7,
            subject: "Mathematics",
            category: "math",
            topic: "Work & Time Shortcut",
            front: "Combined Work (Two People)",
            back: "If A completes work in 'x' days and B in 'y' days:\n\nCombined Time = (x × y) / (x + y) days\n\n• Example: A takes 6 days, B takes 3 days:\n(6 × 3) / (6 + 3) = 18 / 9 = 2 days together.",
            tip: "Saves up to 2 minutes compared to traditional fraction methods."
        },
        {
            id: 8,
            subject: "Mathematics",
            category: "math",
            topic: "Simple Interest Shortcut",
            front: "Simple Interest (SI)",
            back: "Formula:\nSI = (P × R × T) / 100\n• P = Principal amount\n• R = Annual interest rate (%)\n• T = Time in years\n• Total Amount (A) = P + SI",
            tip: "Repeated in basic business arithmetic sections."
        },

        // General Science
        {
            id: 9,
            subject: "Gen. Science",
            category: "science",
            topic: "Vitamin Deficiency Chart",
            front: "Essential Vitamins & Deficiencies",
            back: "• Vitamin A (Retinol) → Night Blindness\n• Vitamin B1 (Thiamine) → Beriberi\n• Vitamin C (Ascorbic Acid) → Scurvy\n• Vitamin D (Calciferol) → Rickets\n• Vitamin K (Phylloquinone) → Defective blood clotting",
            tip: "At least 2 questions appear on vitamins in every SU exam."
        },
        {
            id: 10,
            subject: "Gen. Science",
            category: "science",
            topic: "Universal Physics Constants & SI Units",
            front: "Core SI Units to Remember",
            back: "• Force: Newton (N) = kg·m/s²\n• Work / Energy: Joule (J) = N·m\n• Power: Watt (W) = J/s\n• Pressure: Pascal (Pa) = N/m²\n• Frequency: Hertz (Hz) = 1/s\n• Electric Resistance: Ohm (Ω)",
            tip: "Direct match-the-column questions are common in SUTC."
        },
        {
            id: 11,
            subject: "Gen. Science",
            category: "science",
            topic: "Human Biology & Blood Groups",
            front: "Blood Types & Compatibility",
            back: "• Universal Donor: O Negative (O-)\n• Universal Recipient: AB Positive (AB+)\n• Normal Blood Pressure: 120/80 mmHg\n• Normal Body Temperature: 37°C (98.6°F)\n• Largest Internal Organ: Liver",
            tip: "O- has no A, B, or Rh antigens on red cells."
        },
        {
            id: 12,
            subject: "Gen. Science",
            category: "science",
            topic: "Everyday Chemistry",
            front: "Common Chemical Names & Formulas",
            back: "• Baking Soda: Sodium Bicarbonate (NaHCO₃)\n• Washing Soda: Sodium Carbonate (Na₂CO₃·10H₂O)\n• Caustic Soda: Sodium Hydroxide (NaOH)\n• Laughing Gas: Nitrous Oxide (N₂O)\n• Bleaching Powder: Calcium Hypochlorite (CaOCl₂)",
            tip: "Chemistry section frequently asks common commercial names."
        },

        // General Knowledge
        {
            id: 13,
            subject: "Gen. Knowledge",
            category: "gk",
            topic: "Sindh History & Heritage",
            front: "Three Barrages of Sindh on River Indus",
            back: "1. Sukkur Barrage (Lloyd Barrage): Completed 1932 (Oldest & Largest)\n2. Kotri Barrage (Ghulam Muhammad): Completed 1955 (Near Jamshoro/Hyderabad)\n3. Guddu Barrage: Completed 1962 (Near Kashmore)",
            tip: "Jamshoro, the hometown of UOS, is located right beside Kotri Barrage."
        },
        {
            id: 14,
            subject: "Gen. Knowledge",
            category: "gk",
            topic: "Pakistan History Milestones",
            front: "Constitutions of Pakistan Timeline",
            back: "• 1st Constitution: 23 March 1956 (Chaudhry Muhammad Ali)\n• 2nd Constitution: 8 June 1962 (Presidential, Ayub Khan)\n• 3rd Constitution: 14 August 1973 (Parliamentary, Zulfiqar Ali Bhutto)\n• Total Articles in 1973: 280 Articles",
            tip: "Very frequent question in SUTC GK section."
        },
        {
            id: 15,
            subject: "Gen. Knowledge",
            category: "gk",
            topic: "Geographical Extremes of Pakistan",
            front: "Lakes & Mountains of Pakistan",
            back: "• Highest Peak: K2 (Mount Godwin-Austen) - 8,611 meters\n• Longest River: Indus River (~3,180 km)\n• Largest Natural Freshwater Lake: Manchar Lake (Dadu/Jamshoro, Sindh)\n• Largest Artificial Lake: Keenjhar Lake (Thatta, Sindh)",
            tip: "Manchar Lake is the largest freshwater lake in Pakistan."
        },

        // Intelligence (IQ)
        {
            id: 16,
            subject: "Intelligence (IQ)",
            category: "iq",
            topic: "Number Series Patterns",
            front: "Difference of Differences & Fibonacci",
            back: "Pattern Check Checklist:\n1. Common Difference: (+3, +5, +7...)\n2. Multiplication/Division: (×2, ×3...)\n3. Square/Cube Series: (1, 4, 9, 16, 25... or n² + 1)\n4. Fibonacci Pattern: (Each term = sum of previous two: 1, 1, 2, 3, 5, 8, 13...)",
            tip: "If differences increase steadily, calculate difference of differences."
        },
        {
            id: 17,
            subject: "Intelligence (IQ)",
            category: "iq",
            topic: "Directions & Compass Relations",
            front: "Cardinal Directions Trick",
            back: "Clockwise Order: North (N) → East (E) → South (S) → West (W)\n(Mnemonic: 'Never Eat Soggy Waffles')\n\n• A 90° turn clockwise from North faces East.\n• Opposite of North-East (NE) is South-West (SW).",
            tip: "Draw a small + on your rough sheet to track turns quickly."
        }
    ];

    function getFlashcards(category = 'all') {
        if (category === 'all') return flashcardData;
        return flashcardData.filter(card => card.category === category);
    }

    // =========================================================================
    // 5. RAPID-FIRE SPEED CHALLENGE GENERATOR
    // =========================================================================
    function generateRapidFireQuestions(count = 15) {
        let rawPool = [];

        if (typeof UOSPastPapers !== 'undefined') {
            [2025, 2024, 2023, 2022, 2021, 2020].forEach(yr => {
                const paper = UOSPastPapers.getPaper(yr);
                if (paper && paper.questions) {
                    if (Array.isArray(paper.questions)) {
                        rawPool = rawPool.concat(paper.questions);
                    } else if (typeof paper.questions === 'object') {
                        Object.values(paper.questions).forEach(subList => {
                            if (Array.isArray(subList)) rawPool = rawPool.concat(subList);
                        });
                    }
                }
            });
        }

        // Normalize each question into standardized format { q, o, a, t, exp }
        let normalized = rawPool.map(item => {
            const questionText = item.question || item.q || '';
            const optionsList = item.options || item.o || [];
            const answerIdx = (item.correct !== undefined) ? item.correct : ((item.a !== undefined) ? item.a : 0);
            const subject = item.subject || item.t || 'SUTC Exam';
            const explanation = item.explanation || item.exp || (optionsList[answerIdx] ? `Correct answer is: ${optionsList[answerIdx]}` : '');
            return {
                q: questionText,
                o: optionsList,
                a: answerIdx,
                t: subject,
                exp: explanation
            };
        }).filter(item => item.q && Array.isArray(item.o) && item.o.length >= 2);

        // Fallback default high-yield questions
        const fallback = [
            { q: "Choose the synonym of 'CANDID':", o: ["Frank & Outspoken", "Secretive", "Deceitful", "Proud"], a: 0, t: "English", exp: "Candid means truthful and straightforward; frank." },
            { q: "She is capable _____ doing incredible research.", o: ["of", "for", "to", "in"], a: 0, t: "English", exp: "The adjective 'capable' takes the preposition 'of'." },
            { q: "Sukkur Barrage on River Indus was completed in:", o: ["1932", "1947", "1955", "1962"], a: 0, t: "Pakistan Studies", exp: "Sukkur Barrage (Lloyd Barrage) was inaugurated in 1932." },
            { q: "What is the chemical symbol for Table Salt?", o: ["NaCl", "KCl", "NaOH", "HCl"], a: 0, t: "Chemistry", exp: "Common salt is Sodium Chloride (NaCl)." },
            { q: "Which organelle is known as the powerhouse of the cell?", o: ["Mitochondria", "Ribosome", "Nucleus", "Golgi Body"], a: 0, t: "Biology", exp: "Mitochondria generate most of the chemical energy needed by cells." },
            { q: "If 15% of a number is 45, what is the number?", o: ["300", "250", "200", "350"], a: 0, t: "Mathematics", exp: "Let x be the number: 0.15x = 45 => x = 45 / 0.15 = 300." },
            { q: "Complete the sequence: 2, 6, 12, 20, 30, ?", o: ["42", "40", "36", "48"], a: 0, t: "Intelligence", exp: "Differences are +4, +6, +8, +10, so next is +12 => 30 + 12 = 42." },
            { q: "The largest freshwater lake of Pakistan is:", o: ["Manchar Lake", "Keenjhar Lake", "Saif-ul-Malook", "Haleji Lake"], a: 0, t: "Geography", exp: "Manchar Lake in Jamshoro/Dadu district is Pakistan's largest freshwater lake." },
            { q: "Choose the antonym of 'OBSCURE':", o: ["Clear & Obvious", "Dark", "Hidden", "Vague"], a: 0, t: "English", exp: "Obscure means not discovered or known; its antonym is clear or obvious." },
            { q: "A train travels at 90 km/h. How many meters does it travel per second?", o: ["25 m/s", "20 m/s", "30 m/s", "15 m/s"], a: 0, t: "Mathematics", exp: "90 × (5/18) = 5 × 5 = 25 m/s." },
            { q: "Which Vitamin deficiency causes Rickets in children?", o: ["Vitamin D", "Vitamin A", "Vitamin C", "Vitamin B12"], a: 0, t: "Health Science", exp: "Vitamin D promotes calcium absorption; deficiency causes bone softening (Rickets)." },
            { q: "Who was the first Governor-General of Pakistan?", o: ["Quaid-e-Azam Muhammad Ali Jinnah", "Liaquat Ali Khan", "Khawaja Nazimuddin", "Ghulam Muhammad"], a: 0, t: "History", exp: "Quaid-e-Azam Muhammad Ali Jinnah served as the 1st Governor General (1947-1948)." },
            { q: "If a car is bought for Rs. 500,000 and sold for Rs. 600,000, what is the profit %?", o: ["20%", "25%", "15%", "10%"], a: 0, t: "Mathematics", exp: "Profit = 100,000. Profit % = (100,000 / 500,000) × 100 = 20%." },
            { q: "Sound waves cannot travel through:", o: ["Vacuum", "Water", "Steel", "Air"], a: 0, t: "Physics", exp: "Sound is a mechanical wave and requires a material medium to propagate." },
            { q: "Pointing to a photograph, a man said: 'She is the daughter of my grandfather's only son.' Who is she to him?", o: ["Sister", "Mother", "Aunt", "Daughter"], a: 0, t: "Intelligence", exp: "Grandfather's only son is the man's father. Father's daughter is his sister." }
        ];

        normalized = normalized.concat(fallback);

        const shuffled = [...normalized].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // =========================================================================
    // 6. CANDIDATE PROGRESS TRACKER (LocalStorage Aggregate)
    // =========================================================================
    const progress = {
        getHistory: () => {
            try {
                return JSON.parse(localStorage.getItem('uos_candidate_test_history') || '[]');
            } catch (e) {
                return [];
            }
        },
        recordTestResult: (paperTitle, score, total = 100, subjectBreakdown = null) => {
            const history = progress.getHistory();
            const record = {
                id: 'res_' + Date.now(),
                title: paperTitle,
                score,
                total,
                percentage: Math.round((score / total) * 100),
                timestamp: new Date().toISOString(),
                formattedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                subjectBreakdown: subjectBreakdown || {
                    english: Math.round(score * 0.3),
                    science: Math.round(score * 0.2),
                    gk: Math.round(score * 0.2),
                    math: Math.round(score * 0.2),
                    iq: Math.round(score * 0.1)
                }
            };
            history.unshift(record);
            if (history.length > 25) history.pop();
            localStorage.setItem('uos_candidate_test_history', JSON.stringify(history));
            return record;
        },
        getAnalyticsSummary: () => {
            const history = progress.getHistory();
            if (!history.length) {
                return {
                    totalTests: 0,
                    avgScore: 0,
                    highestScore: 0,
                    predictedCPN: 0,
                    subjectMastery: { english: 0, science: 0, gk: 0, math: 0, iq: 0 }
                };
            }

            const totalTests = history.length;
            const sumScore = history.reduce((acc, h) => acc + h.score, 0);
            const avgScore = Math.round(sumScore / totalTests);
            const highestScore = Math.max(...history.map(h => h.score));

            const subjectSums = { english: 0, science: 0, gk: 0, math: 0, iq: 0 };
            history.forEach(h => {
                if (h.subjectBreakdown) {
                    subjectSums.english += (h.subjectBreakdown.english || 0);
                    subjectSums.science += (h.subjectBreakdown.science || 0);
                    subjectSums.gk += (h.subjectBreakdown.gk || 0);
                    subjectSums.math += (h.subjectBreakdown.math || 0);
                    subjectSums.iq += (h.subjectBreakdown.iq || 0);
                }
            });

            const subjectMastery = {
                english: Math.min(100, Math.round((subjectSums.english / (totalTests * 30)) * 100)),
                science: Math.min(100, Math.round((subjectSums.science / (totalTests * 20)) * 100)),
                gk: Math.min(100, Math.round((subjectSums.gk / (totalTests * 20)) * 100)),
                math: Math.min(100, Math.round((subjectSums.math / (totalTests * 20)) * 100)),
                iq: Math.min(100, Math.round((subjectSums.iq / (totalTests * 10)) * 100))
            };

            return {
                totalTests,
                avgScore,
                highestScore,
                subjectMastery
            };
        }
    };

    return {
        sound,
        theme,
        calculateCPN,
        getDepartmentEligibility,
        departmentsDatabase,
        getFlashcards,
        generateRapidFireQuestions,
        progress
    };
})();

// Export to window and CommonJS
if (typeof window !== 'undefined') {
    window.UOSAdvanced = UOSAdvanced;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UOSAdvanced;
}

// Auto-initialize theme on script load
if (typeof document !== 'undefined') {
    UOSAdvanced.theme.init();
}
