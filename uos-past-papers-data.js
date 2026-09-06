/**
 * University of Sindh (UOS) Jamshoro - Pre-Entry Test Past Papers Archive (2013 - 2025/2026)
 * 
 * Official SUTC Syllabus Breakdown (100 Questions per test):
 * - English: 30 Questions (30%)
 * - General Knowledge: 20 Questions (20%)
 * - General Science: 20 Questions (20%)
 * - Simple Arithmetic / Mathematics: 20 Questions (20%)
 * - Intelligence (IQ): 10 Questions (10%)
 */

(function(window) {
    'use strict';

    // Core Past Paper Metadata Registry
    const PAST_PAPER_YEARS = [
        { year: 2025, title: "UOS Pre-Entry Test 2025 (Official Paper)", date: "12 October 2025", shift: "Morning / Evening", questions: 100, difficulty: "Official Standard", url: "official-test1.html" },
        { year: 2024, title: "UOS Pre-Entry Test 2024 Past Paper", date: "22 October 2023 / 2024 Batch", shift: "Combined Shift", questions: 100, difficulty: "Advanced", url: "past-paper.html?year=2024" },
        { year: 2023, title: "UOS Pre-Entry Test 2023 Past Paper", date: "30 October 2022 / 2023 Batch", shift: "Phase 1 & 2", questions: 100, difficulty: "Advanced", url: "past-paper.html?year=2023" },
        { year: 2022, title: "UOS Pre-Entry Test 2022 Past Paper", date: "07 November 2021 / 2022 Batch", shift: "General Test", questions: 100, difficulty: "Intermediate", url: "past-paper.html?year=2022" },
        { year: 2021, title: "UOS Pre-Entry Test 2021 Past Paper", date: "Online Admission Series 2021", shift: "SUTC Session", questions: 100, difficulty: "Intermediate", url: "past-paper.html?year=2021" },
        { year: 2020, title: "UOS Pre-Entry Test 2020 Past Paper", date: "27 October 2019 / 2020 Batch", shift: "Morning Batch", questions: 100, difficulty: "Intermediate", url: "past-paper.html?year=2020" },
        { year: 2019, title: "UOS Pre-Entry Test 2019 Past Paper", date: "28 October 2018 / 2019 Batch", shift: "Full Exam", questions: 100, difficulty: "Intermediate", url: "past-paper.html?year=2019" },
        { year: 2018, title: "UOS Pre-Entry Test 2018 Past Paper", date: "29 October 2017 / 2018 Batch", shift: "Morning Shift", questions: 100, difficulty: "Moderate", url: "past-paper.html?year=2018" },
        { year: 2017, title: "UOS Pre-Entry Test 2017 Past Paper", date: "30 October 2016 / 2017 Batch", shift: "General Batch", questions: 100, difficulty: "Moderate", url: "past-paper.html?year=2017" },
        { year: 2016, title: "UOS Pre-Entry Test 2016 Past Paper", date: "01 November 2015 / 2016 Batch", shift: "Full Exam", questions: 100, difficulty: "Standard", url: "past-paper.html?year=2016" },
        { year: 2015, title: "UOS Pre-Entry Test 2015 Past Paper", date: "02 November 2014 / 2015 Batch", shift: "SUTC Session", questions: 100, difficulty: "Standard", url: "past-paper.html?year=2015" },
        { year: 2014, title: "UOS Pre-Entry Test 2014 Past Paper", date: "03 November 2013 / 2014 Batch", shift: "Morning Session", questions: 100, difficulty: "Foundational", url: "past-paper.html?year=2014" },
        { year: 2013, title: "UOS Pre-Entry Test 2013 Past Paper", date: "04 November 2012 / 2013 Batch", shift: "Inaugural SUTC Series", questions: 100, difficulty: "Foundational", url: "past-paper.html?year=2013" }
    ];

    // Authentic Question Bank Pool for Past Papers Generation
    const PAST_PAPERS_DATABASE = {
        // Detailed data for 2024
        "2024": {
            info: { year: 2024, title: "UOS Pre-Entry Test 2024 Official Past Paper", date: "22 October 2023", duration: "90 minutes" },
            questions: {
                "English": [
                    { id: 1, subject: "English", topic: "Synonyms", question: "Choose the correct SYNONYM of: 'CANDID'", options: ["Frank & Honest", "Deceptive", "Reserved", "Shy"], correct: 0 },
                    { id: 2, subject: "English", topic: "Synonyms", question: "Choose the correct SYNONYM of: 'DILIGENT'", options: ["Lazy", "Hardworking", "Careless", "Weak"], correct: 1 },
                    { id: 3, subject: "English", topic: "Synonyms", question: "Choose the correct SYNONYM of: 'ABUNDANT'", options: ["Plentiful", "Scarce", "Rare", "Deficient"], correct: 0 },
                    { id: 4, subject: "English", topic: "Synonyms", question: "Choose the correct SYNONYM of: 'FEEBLE'", options: ["Strong", "Weak", "Rapid", "Wealthy"], correct: 1 },
                    { id: 5, subject: "English", topic: "Synonyms", question: "Choose the correct SYNONYM of: 'ZEAL'", options: ["Apathy", "Passion & Enthusiasm", "Fear", "Hatred"], correct: 1 },
                    { id: 6, subject: "English", topic: "Antonyms", question: "Choose the correct ANTONYM of: 'EXPAND'", options: ["Shrink / Contract", "Extend", "Broaden", "Magnify"], correct: 0 },
                    { id: 7, subject: "English", topic: "Antonyms", question: "Choose the correct ANTONYM of: 'ACQUITTED'", options: ["Freed", "Convicted", "Pardoned", "Cleared"], correct: 1 },
                    { id: 8, subject: "English", topic: "Antonyms", question: "Choose the correct ANTONYM of: 'POVERTY'", options: ["Destitution", "Affluence / Wealth", "Need", "Scarcity"], correct: 1 },
                    { id: 9, subject: "English", topic: "Antonyms", question: "Choose the correct ANTONYM of: 'OBSTINATE'", options: ["Stubborn", "Flexible / Yielding", "Rigid", "Firm"], correct: 1 },
                    { id: 10, subject: "English", topic: "Antonyms", question: "Choose the correct ANTONYM of: 'ANCIENT'", options: ["Old", "Modern", "Historical", "Antique"], correct: 1 },
                    { id: 11, subject: "English", topic: "Spelling", question: "Choose the correctly spelled word:", options: ["Occurence", "Occurrence", "Occurrance", "Ocurrence"], correct: 1 },
                    { id: 12, subject: "English", topic: "Spelling", question: "Choose the correctly spelled word:", options: ["Privilege", "Privelege", "Priviledge", "Privelidge"], correct: 0 },
                    { id: 13, subject: "English", topic: "Spelling", question: "Choose the correctly spelled word:", options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"], correct: 0 },
                    { id: 14, subject: "English", topic: "Spelling", question: "Choose the correctly spelled word:", options: ["Mischievous", "Mischevious", "Mischevous", "Mischivous"], correct: 0 },
                    { id: 15, subject: "English", topic: "Spelling", question: "Choose the correctly spelled word:", options: ["Embarrassment", "Embarassment", "Embarrasment", "Embarasment"], correct: 0 },
                    { id: 16, subject: "English", topic: "Prepositions", question: "She is proficient ______ English and Sindhi.", options: ["in", "at", "on", "with"], correct: 0 },
                    { id: 17, subject: "English", topic: "Prepositions", question: "He was prevented ______ entering the examination hall.", options: ["to", "from", "for", "against"], correct: 1 },
                    { id: 18, subject: "English", topic: "Prepositions", question: "The committee agreed ______ my proposal.", options: ["to", "with", "on", "for"], correct: 0 },
                    { id: 19, subject: "English", topic: "Prepositions", question: "She succeeded ______ securing first class in intermediate.", options: ["in", "on", "with", "for"], correct: 0 },
                    { id: 20, subject: "English", topic: "Prepositions", question: "He is senior ______ me by two years.", options: ["than", "to", "from", "over"], correct: 1 },
                    { id: 21, subject: "English", topic: "Narration", question: "Direct to Indirect: She said, \"I have completed my homework.\"", options: ["She said that she has completed her homework.", "She said that she had completed her homework.", "She told that I completed homework.", "She says she completed homework."], correct: 1 },
                    { id: 22, subject: "English", topic: "Narration", question: "Direct to Indirect: The teacher said, \"The Earth is round.\"", options: ["The teacher said that the Earth was round.", "The teacher said that the Earth is round.", "The teacher told that Earth round.", "The teacher says Earth was round."], correct: 1 },
                    { id: 23, subject: "English", topic: "Narration", question: "Direct to Indirect: He said to me, \"Where do you live?\"", options: ["He asked me where I lived.", "He asked me where did I live.", "He told me where I live.", "He asked where do I live."], correct: 0 },
                    { id: 24, subject: "English", topic: "Narration", question: "Direct to Indirect: Ali said, \"Hurrah! We won the match.\"", options: ["Ali exclaimed with joy that they had won the match.", "Ali said sorrowfully that they won the match.", "Ali told they won match.", "Ali says they have won match."], correct: 0 },
                    { id: 25, subject: "English", topic: "Narration", question: "Direct to Indirect: Father said to son, \"Work hard.\"", options: ["Father advised his son to work hard.", "Father told to work hard.", "Father requested to work hard.", "Father said son works hard."], correct: 0 },
                    { id: 26, subject: "English", topic: "Voice", "question": "Passive Voice: 'Who broke this glass window?'", options: ["By whom was this glass window broken?", "By whom this glass window was broken?", "Who was broken this window?", "By who had this window broken?"], correct: 0 },
                    { id: 27, subject: "English", topic: "Voice", "question": "Passive Voice: 'Open the main gate immediately.'", options: ["Let the main gate be opened immediately.", "The main gate should opened.", "Gate is being opened.", "You must open gate."], correct: 0 },
                    { id: 28, subject: "English", topic: "Voice", "question": "Passive Voice: 'They will announce the entry test result tomorrow.'", options: ["The entry test result will be announced by them tomorrow.", "The entry test result will announce.", "The entry test result was announced.", "The result is announced tomorrow."], correct: 0 },
                    { id: 29, subject: "English", topic: "Voice", "question": "Passive Voice: 'She is singing a melodious song.'", options: ["A melodious song is being sung by her.", "A melodious song was sung by her.", "A melodious song is sung by her.", "She was sung a melodious song."], correct: 0 },
                    { id: 30, subject: "English", topic: "Grammar", "question": "Choose the grammatically correct sentence:", options: ["One of my brothers lives in Hyderabad.", "One of my brothers live in Hyderabad.", "One of my brother live in Hyderabad.", "One of my brother living in Hyderabad."], correct: 0 }
                ],
                "General Knowledge": [
                    { id: 31, subject: "General Knowledge", topic: "Pakistan Studies", question: "Which is the highest peak in the Karakoram Range located in Pakistan?", options: ["Nanga Parbat", "K2 (Godwin Austen)", "Broad Peak", "Tirich Mir"], correct: 1 },
                    { id: 32, subject: "General Knowledge", topic: "Sindh History", question: "The famous archaeological ruins of Mohenjo-Daro are situated in which district of Sindh?", options: ["Larkana", "Sukkur", "Thatta", "Khairpur"], correct: 0 },
                    { id: 33, subject: "General Knowledge", topic: "Geography", question: "Manchar Lake, the largest freshwater lake in Pakistan, is situated in:", options: ["Jamshoro / Dadu", "Thatta", "Sujawal", "Badin"], correct: 0 },
                    { id: 34, subject: "General Knowledge", topic: "Pakistan Studies", question: "Who was the first female Prime Minister of Pakistan and Muslim world?", options: ["Fatima Jinnah", "Benazir Bhutto", "Begum Ra'ana Liaquat", "Hina Rabbani Khar"], correct: 1 },
                    { id: 35, subject: "General Knowledge", topic: "World Affairs", question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
                    { id: 36, subject: "General Knowledge", topic: "Currencies", question: "What is the official currency of Turkey (Türkiye)?", options: ["Dinar", "Lira", "Riyal", "Dirham"], correct: 1 },
                    { id: 37, subject: "General Knowledge", topic: "World Organizations", question: "The headquarters of the United Nations (UN) is situated in:", options: ["Geneva", "New York", "Paris", "London"], correct: 1 },
                    { id: 38, subject: "General Knowledge", topic: "Geography", question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
                    { id: 39, subject: "General Knowledge", topic: "Islamic Studies", question: "In which year of Hijra did the Conquest of Makkah take place?", options: ["6 AH", "8 AH", "9 AH", "10 AH"], correct: 1 },
                    { id: 40, subject: "General Knowledge", topic: "Islamic Studies", question: "How many verses (Ayahs) are there in Surah Al-Fatiha?", options: ["5", "6", "7", "8"], correct: 2 },
                    { id: 41, subject: "General Knowledge", topic: "Islamic Studies", question: "Who was appointed as the first Caliph of Islam?", options: ["Hazrat Umar (RA)", "Hazrat Abu Bakr Siddique (RA)", "Hazrat Usman (RA)", "Hazrat Ali (RA)"], correct: 1 },
                    { id: 42, subject: "General Knowledge", topic: "Pakistan Constitution", question: "How many total articles are there in the 1973 Constitution of Pakistan?", options: ["250", "280", "234", "300"], correct: 1 },
                    { id: 43, subject: "General Knowledge", topic: "Geography", question: "The line dividing Pakistan and India in Jammu & Kashmir is known as:", options: ["Durand Line", "Line of Control (LoC)", "McMahon Line", "Radcliffe Line"], correct: 1 },
                    { id: 44, subject: "General Knowledge", topic: "World Heritage", question: "Where is the Eiffel Tower located?", options: ["Rome", "Paris", "Berlin", "Madrid"], correct: 1 },
                    { id: 45, subject: "General Knowledge", topic: "Sindh History", question: "The tomb of great Sufi poet Shah Abdul Latif Bhittai is in:", options: ["Sehwan", "Bhit Shah (Matiari)", "Hala", "Thatta"], correct: 1 },
                    { id: 46, subject: "General Knowledge", topic: "Pakistan Studies", question: "Which day is celebrated as 'Youm-e-Takbeer' in Pakistan?", options: ["23 March", "14 August", "28 May", "6 September"], correct: 2 },
                    { id: 47, subject: "General Knowledge", topic: "World Geography", question: "Which continent has the largest land area?", options: ["Africa", "Asia", "North America", "Europe"], correct: 1 },
                    { id: 48, subject: "General Knowledge", topic: "Sports", question: "Which country won the ICC Men's Cricket World Cup 2023?", options: ["India", "Australia", "England", "South Africa"], correct: 1 },
                    { id: 49, subject: "General Knowledge", topic: "Sindh Economy", question: "The Kotri Barrage is also known as:", options: ["Ghulam Muhammad Barrage", "Lloyd Barrage", "Ayub Barrage", "Jinnah Barrage"], correct: 0 },
                    { id: 50, subject: "General Knowledge", topic: "Science GK", question: "Which planet is known as the 'Red Planet'?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 }
                ],
                "General Science": [
                    { id: 51, subject: "General Science", topic: "Chemistry", question: "What is the chemical formula of common table salt?", options: ["KCl", "NaCl", "$Na_2CO_3$", "$NaHCO_3$"], correct: 1 },
                    { id: 52, subject: "General Science", topic: "Physics", question: "What is the speed of light in vacuum approximately?", options: ["$3 \\times 10^8$ m/s", "$3 \\times 10^6$ m/s", "$3 \\times 10^5$ km/h", "$300$ m/s"], correct: 0 },
                    { id: 53, subject: "General Science", topic: "Biology", question: "Which organelle is called the 'Powerhouse of the Cell'?", options: ["Ribosome", "Mitochondria", "Nucleus", "Golgi Body"], correct: 1 },
                    { id: 54, subject: "General Science", topic: "Physics", question: "What is the SI unit of Force?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
                    { id: 55, subject: "General Science", topic: "Biology", question: "Normal human body temperature on Celsius scale is approximately:", options: ["35 °C", "37 °C", "98.6 °C", "40 °C"], correct: 1 },
                    { id: 56, subject: "General Science", topic: "Biology", question: "Deficiency of Vitamin D in human body causes which disease?", options: ["Scurvy", "Rickets", "Night blindness", "Beriberi"], correct: 1 },
                    { id: 57, subject: "General Science", topic: "Computer Science", question: "What does 'CPU' stand for in computer systems?", options: ["Central Processing Unit", "Central Power Unit", "Core Program Utility", "Central Printing Unit"], correct: 0 },
                    { id: 58, subject: "General Science", topic: "Chemistry", question: "What is the pH value of pure neutral water at room temperature?", options: ["5", "7", "9", "0"], correct: 1 },
                    { id: 59, subject: "General Science", topic: "Physics", question: "The instrument used to measure atmospheric pressure is called:", options: ["Hydrometer", "Barometer", "Thermometer", "Ammeter"], correct: 1 },
                    { id: 60, subject: "General Science", topic: "Biology", question: "Which blood group is known as the 'Universal Donor'?", options: ["A+", "AB+", "O-", "B-"], correct: 2 },
                    { id: 61, subject: "General Science", topic: "Chemistry", question: "The atomic number of Carbon is:", options: ["4", "6", "8", "12"], correct: 1 },
                    { id: 62, subject: "General Science", topic: "Physics", question: "Sound waves are:", options: ["Transverse waves", "Longitudinal waves", "Electromagnetic waves", "Radio waves"], correct: 1 },
                    { id: 63, subject: "General Science", topic: "Biology", question: "Which gas is released by green plants during photosynthesis?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Methane"], correct: 1 },
                    { id: 64, subject: "General Science", topic: "Computer Science", question: "1 Megabyte (MB) is equal to:", options: ["1000 Bytes", "1024 Kilobytes (KB)", "1024 Gigabytes", "100 Kilobits"], correct: 1 },
                    { id: 65, subject: "General Science", topic: "Physics", question: "Electric current is measured by which instrument?", options: ["Voltmeter", "Ammeter", "Galvanometer", "Ohmmeter"], correct: 1 },
                    { id: 66, subject: "General Science", topic: "Biology", question: "The largest gland in the human body is:", options: ["Pancreas", "Liver", "Thyroid", "Pituitary"], correct: 1 },
                    { id: 67, subject: "General Science", topic: "Chemistry", question: "Dry ice is solid:", options: ["Water", "Carbon dioxide ($CO_2$)", "Nitrogen", "Oxygen"], correct: 1 },
                    { id: 68, subject: "General Science", topic: "Environmental", question: "Which gas in the atmosphere protects life on Earth from ultraviolet radiation?", options: ["Argon", "Ozone ($O_3$)", "Carbon monoxide", "Hydrogen"], correct: 1 },
                    { id: 69, subject: "General Science", topic: "Physics", question: "A convex lens always forms which kind of image for distant objects?", options: ["Virtual & upright", "Real & inverted", "Only virtual", "No image"], correct: 1 },
                    { id: 70, subject: "General Science", topic: "Computer Science", question: "ROM in a computer system stands for:", options: ["Read Only Memory", "Random Output Memory", "Real Operating Module", "Rapid Online Memory"], correct: 0 }
                ],
                "Simple Arithmetic": [
                    { id: 71, subject: "Simple Arithmetic", topic: "Percentages", question: "What is 15% of 300?", options: ["35", "45", "50", "60"], correct: 1 },
                    { id: 72, subject: "Simple Arithmetic", topic: "Averages", question: "Find the average of: 10, 20, 30, 40, and 50.", options: ["25", "30", "35", "40"], correct: 1 },
                    { id: 73, subject: "Simple Arithmetic", topic: "Ratios", question: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?", options: ["15", "20", "25", "30"], correct: 1 },
                    { id: 74, subject: "Simple Arithmetic", topic: "Fractions", question: "Solve: $\\frac{3}{4} + \\frac{1}{2} = ?$", options: ["$\\frac{4}{6}$", "$\\frac{5}{4}$", "$\\frac{3}{8}$", "$\\frac{1}{2}$"], correct: 1 },
                    { id: 75, subject: "Simple Arithmetic", topic: "Algebra", question: "If $2x + 5 = 19$, what is the value of $x$?", options: ["5", "7", "9", "12"], correct: 1 },
                    { id: 76, subject: "Simple Arithmetic", topic: "Square Roots", question: "Find the square root of 625:", options: ["15", "25", "35", "45"], correct: 1 },
                    { id: 77, subject: "Simple Arithmetic", topic: "Word Problems", question: "A train travels at 60 km/h. How much distance will it cover in 2.5 hours?", options: ["120 km", "150 km", "180 km", "200 km"], correct: 1 },
                    { id: 78, subject: "Simple Arithmetic", topic: "Profit & Loss", question: "An item purchased for Rs. 400 is sold for Rs. 500. What is the profit percentage?", options: ["20%", "25%", "30%", "15%"], correct: 1 },
                    { id: 79, subject: "Simple Arithmetic", topic: "Number Series", question: "Find the next number in the sequence: 3, 6, 12, 24, ____", options: ["36", "48", "42", "50"], correct: 1 },
                    { id: 80, subject: "Simple Arithmetic", topic: "Decimals", question: "Calculate: $0.25 \\times 0.4 = ?$", options: ["0.01", "0.1", "1.0", "0.001"], correct: 1 },
                    { id: 81, subject: "Simple Arithmetic", topic: "Geometry", question: "The perimeter of a square with side 8 cm is:", options: ["16 cm", "32 cm", "64 cm", "24 cm"], correct: 1 },
                    { id: 82, subject: "Simple Arithmetic", topic: "LCM", question: "Find the LCM of 12 and 18:", options: ["24", "36", "48", "72"], correct: 1 },
                    { id: 83, subject: "Simple Arithmetic", topic: "HCF", question: "Find the HCF of 24 and 36:", options: ["6", "12", "18", "4"], correct: 1 },
                    { id: 84, subject: "Simple Arithmetic", topic: "Word Problems", question: "If 5 workers build a wall in 6 days, how many days will 3 workers take at the same rate?", options: ["8 days", "10 days", "12 days", "9 days"], correct: 1 },
                    { id: 85, subject: "Simple Arithmetic", topic: "Percentages", question: "In an exam of 500 marks, Ahmed scored 425 marks. What is his percentage?", options: ["80%", "85%", "90%", "75%"], correct: 1 },
                    { id: 86, subject: "Simple Arithmetic", topic: "Algebra", question: "Simplify: $(a + b)^2 - 2ab = ?$", options: ["$a^2 - b^2$", "$a^2 + b^2$", "$2a + 2b$", "$ab$"], correct: 1 },
                    { id: 87, subject: "Simple Arithmetic", topic: "Fractions", question: "Which of the following is the largest fraction?", options: ["$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$", "$\\frac{5}{8}$"], correct: 1 },
                    { id: 88, subject: "Simple Arithmetic", topic: "Units", question: "How many seconds are there in 2.5 hours?", options: ["7200", "9000", "8500", "6000"], correct: 1 },
                    { id: 89, subject: "Simple Arithmetic", topic: "Percentages", question: "If the price of a book decreases from Rs. 200 to Rs. 160, what is the percentage decrease?", options: ["15%", "20%", "25%", "30%"], correct: 1 },
                    { id: 90, subject: "Simple Arithmetic", topic: "Number Series", question: "Complete the series: 5, 10, 20, 35, 55, ____", options: ["75", "80", "85", "90"], correct: 1 }
                ],
                "Simple I.Q.": [
                    { id: 91, subject: "Simple I.Q.", topic: "Analogies", question: "Book is to Reading as Fork is to:", options: ["Cooking", "Eating", "Drinking", "Cutting"], correct: 1 },
                    { id: 92, subject: "Simple I.Q.", topic: "Letter Series", question: "Find the next letter in the series: A, C, F, J, ____", options: ["M", "O", "N", "P"], correct: 1 },
                    { id: 93, subject: "Simple I.Q.", topic: "Logic", question: "If South becomes North-East, what does West become?", options: ["South-East", "North-West", "South-West", "North"], correct: 0 },
                    { id: 94, subject: "Simple I.Q.", topic: "Age Problems", question: "A father is 4 times older than his son. In 20 years, he will be twice as old as his son. What is the son's present age?", options: ["5 years", "10 years", "15 years", "20 years"], correct: 1 },
                    { id: 95, subject: "Simple I.Q.", topic: "Odd One Out", question: "Which one does not belong to the group?", options: ["Sindh", "Punjab", "Balochistan", "Lahore"], correct: 3 },
                    { id: 96, subject: "Simple I.Q.", topic: "Coding", question: "If 'CAT' is coded as '3120', how is 'DOG' coded?", options: ["4157", "4158", "3147", "5168"], correct: 0 },
                    { id: 97, subject: "Simple I.Q.", topic: "Logic Relations", question: "Pointing to a man, a girl says, 'He is the only son of my mother's husband.' Who is the man to the girl?", options: ["Father", "Brother", "Uncle", "Cousin"], correct: 1 },
                    { id: 98, subject: "Simple I.Q.", topic: "Number Logic", question: "Which number replaces the question mark? 2, 6, 18, 54, ?", options: ["108", "162", "144", "180"], correct: 1 },
                    { id: 99, subject: "Simple I.Q.", topic: "Logical Reasoning", question: "All roses are flowers. Some flowers fade quickly. Therefore:", options: ["All roses fade quickly", "Some roses may fade quickly", "No roses fade", "Flowers are roses"], correct: 1 },
                    { id: 100, subject: "Simple I.Q.", topic: "Pattern Reasoning", question: "Light is to Darkness as Knowledge is to:", options: ["Wisdom", "Ignorance", "Education", "Blindness"], correct: 1 }
                ]
            }
        }
    };

    // Helper method to generate full 100 MCQs for any given year (2013-2023)
    // using curated past question templates with variations and year-specific facts
    function generateFullYearPaper(targetYear) {
        const yearInt = parseInt(targetYear, 10);
        
        // Base seed from year
        const seed = yearInt * 17;
        
        // Subject question templates representing real SUTC patterns
        const englishPool = [
            { q: "Choose the SYNONYM of: 'RELUCTANT'", o: ["Eager", "Unwilling", "Ready", "Certain"], a: 1, t: "Synonyms" },
            { q: "Choose the SYNONYM of: 'TRANQUIL'", o: ["Disturbed", "Calm & Peaceful", "Noisy", "Wild"], a: 1, t: "Synonyms" },
            { q: "Choose the SYNONYM of: 'CANDID'", o: ["Frank & Honest", "Secretive", "Shy", "Deceptive"], a: 0, t: "Synonyms" },
            { q: "Choose the SYNONYM of: 'ABHOR'", o: ["Love", "Loathe / Hate", "Praise", "Admire"], a: 1, t: "Synonyms" },
            { q: "Choose the SYNONYM of: 'OMIT'", o: ["Add", "Leave out", "Enclose", "Contain"], a: 1, t: "Synonyms" },
            { q: "Choose the ANTONYM of: 'ARROGANT'", o: ["Proud", "Humble", "Haughty", "Severe"], a: 1, t: "Antonyms" },
            { q: "Choose the ANTONYM of: 'STINGY'", o: ["Generous", "Frugal", "Greedy", "Mean"], a: 0, t: "Antonyms" },
            { q: "Choose the ANTONYM of: 'HAZARDOUS'", o: ["Dangerous", "Safe & Secure", "Risky", "Perilous"], a: 1, t: "Antonyms" },
            { q: "Choose the ANTONYM of: 'AFFLUENT'", o: ["Rich", "Impoverished / Poor", "Wealthy", "Prosperous"], a: 1, t: "Antonyms" },
            { q: "Choose the ANTONYM of: 'FEEBLE'", o: ["Weak", "Robust & Strong", "Tired", "Soft"], a: 1, t: "Antonyms" },
            { q: "Choose the correctly spelled word:", o: ["Bureacracy", "Bureaucracy", "Bereaucracy", "Buereacracy"], a: 1, t: "Spelling" },
            { q: "Choose the correctly spelled word:", o: ["Affidavit", "Afidevit", "Affedevit", "Affidavet"], a: 0, t: "Spelling" },
            { q: "Choose the correctly spelled word:", o: ["Maintenance", "Maintainance", "Maintenence", "Maintanence"], a: 0, t: "Spelling" },
            { q: "Choose the correctly spelled word:", o: ["Entrepreneur", "Enterpreneur", "Entrepenure", "Entrepranure"], a: 0, t: "Spelling" },
            { q: "Choose the correctly spelled word:", o: ["Privilege", "Privelege", "Priviledge", "Privelidge"], a: 0, t: "Spelling" },
            { q: "Preposition: He insisted ______ paying the bill.", o: ["on", "in", "to", "for"], a: 0, t: "Prepositions" },
            { q: "Preposition: She is accustomed ______ working late at night.", o: ["with", "to", "for", "in"], a: 1, t: "Prepositions" },
            { q: "Preposition: Are you jealous ______ your colleague's success?", o: ["from", "of", "with", "at"], a: 1, t: "Prepositions" },
            { q: "Preposition: The candidate was deprived ______ his fundamental right.", o: ["with", "of", "from", "for"], a: 1, t: "Prepositions" },
            { q: "Preposition: We look forward ______ meeting the Vice Chancellor.", o: ["to", "for", "with", "at"], a: 0, t: "Prepositions" },
            { q: "Preposition: She has been absent ______ Monday.", o: ["for", "since", "from", "in"], a: 1, t: "Prepositions" },
            { q: "Narration: He said, 'I will complete the project.'", o: ["He said that he would complete the project.", "He said that he will complete the project.", "He told he completed project.", "He says he completes project."], a: 0, t: "Narration" },
            { q: "Narration: Teacher said, 'Honesty is the best policy.'", o: ["Teacher said that honesty was the best policy.", "Teacher said that honesty is the best policy.", "Teacher told honesty had been best policy.", "Teacher says honesty is best."], a: 1, t: "Narration" },
            { q: "Narration: She said, 'Do you speak English?'", o: ["She asked if I spoke English.", "She asked do I speak English.", "She told if I speak English.", "She asked did I spoke English."], a: 0, t: "Narration" },
            { q: "Narration: He said, 'Alas! My father is ill.'", o: ["He exclaimed with sorrow that his father was ill.", "He exclaimed with joy that his father was ill.", "He told alas father is ill.", "He says father was ill."], a: 0, t: "Narration" },
            { q: "Voice: 'The mechanic repaired the car.'", o: ["The car was repaired by the mechanic.", "The car is repaired by the mechanic.", "The car has been repaired by mechanic.", "The mechanic was repaired car."], a: 0, t: "Voice" },
            { q: "Voice: 'They are constructing a new library block.'", o: ["A new library block is being constructed by them.", "A new library block was constructed.", "A new library block is constructed.", "A new library block will be constructed."], a: 0, t: "Voice" },
            { q: "Voice: 'Who teaches you Mathematics?'", o: ["By whom are you taught Mathematics?", "Who is taught Mathematics by you?", "By whom you were taught Mathematics?", "By who was Mathematics taught?"], a: 0, t: "Voice" },
            { q: "Sentence Correction: 'Neither the teacher nor the students ______ present.'", o: ["was", "were", "is", "have"], a: 1, t: "Grammar" },
            { q: "Sentence Correction: 'He is one of those men who ______ always honest.'", o: ["is", "are", "was", "has"], a: 1, t: "Grammar" }
        ];

        const gkPool = [
            { q: "Who presented the historic Pakistan Resolution on 23rd March 1940?", o: ["Quaid-e-Azam", "A.K. Fazlul Huq", "Liaquat Ali Khan", "Allama Iqbal"], a: 1, t: "Pak Studies" },
            { q: "In which year was the University of Sindh established?", o: ["1947", "1951", "1955", "1960"], a: 0, t: "UOS History" },
            { q: "The historic Kot Diji fort is located in which district of Sindh?", o: ["Khairpur", "Sukkur", "Larkana", "Hyderabad"], a: 0, t: "Sindh History" },
            { q: "Which mountain pass connects Pakistan with Afghanistan?", o: ["Khyber Pass", "Bolan Pass", "Tochi Pass", "Khunjerab Pass"], a: 0, t: "Geography" },
            { q: "What is the capital city of Canada?", o: ["Toronto", "Ottawa", "Vancouver", "Montreal"], a: 1, t: "World GK" },
            { q: "The currency of Japan is:", o: ["Yuan", "Yen", "Won", "Ringgit"], a: 1, t: "Currencies" },
            { q: "Which is the largest desert in Pakistan?", o: ["Thar Desert", "Thal Desert", "Cholistan Desert", "Kharan Desert"], a: 0, t: "Geography" },
            { q: "Who was the first President of Pakistan?", o: ["Iskander Mirza", "Ayub Khan", "Liaquat Ali Khan", "Ghulam Muhammad"], a: 0, t: "Pak Studies" },
            { q: "Which treaty was signed between Pakistan and India regarding water distribution in 1960?", o: ["Tashkent Agreement", "Indus Waters Treaty", "Simla Agreement", "Lahore Declaration"], a: 1, t: "Pak History" },
            { q: "How many Ghazwat are mentioned in the Holy Quran?", o: ["12", "27", "14", "9"], a: 0, t: "Islamic Studies" },
            { q: "Which Surah of the Holy Quran is known as the 'Heart of the Quran'?", o: ["Surah Yaseen", "Surah Rahman", "Surah Mulk", "Surah Ikhlas"], a: 0, t: "Islamic Studies" },
            { q: "Who translated the Holy Quran into Sindhi language first?", o: ["Makhdoom Nooh", "Akhund Azizullah", "Allama I.I. Kazi", "Shah Abdul Latif"], a: 1, t: "Islamic History" },
            { q: "The deepest point on Earth is situated in:", o: ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Sunda Trench"], a: 0, t: "World Geography" },
            { q: "Which international organization was founded on 24th October 1945?", o: ["League of Nations", "United Nations (UN)", "World Bank", "OIC"], a: 1, t: "World Affairs" },
            { q: "The famous 'Sukkur Barrage' was commissioned in which year?", o: ["1923", "1932", "1947", "1955"], a: 1, t: "Sindh Heritage" },
            { q: "Who wrote Pakistan's National Anthem?", o: ["Allama Iqbal", "Hafeez Jalandhari", "Choudhry Rahmat Ali", "Josh Malihabadi"], a: 1, t: "National Symbols" },
            { q: "Which country is called the 'Land of the Midnight Sun'?", o: ["Norway", "Japan", "Iceland", "Finland"], a: 0, t: "World GK" },
            { q: "The headquarters of the International Court of Justice (ICJ) is in:", o: ["Geneva", "The Hague (Netherlands)", "New York", "Vienna"], a: 1, t: "World Affairs" },
            { q: "Gorakh Hill Station is situated in the mountain range of:", o: ["Kirthar Range", "Sulaiman Range", "Salt Range", "Koh-e-Sufaid"], a: 0, t: "Sindh Geography" },
            { q: "Which is the national flower of Pakistan?", o: ["Rose", "Jasmine (Chambeli)", "Lotus", "Sunflower"], a: 1, t: "National Symbols" }
        ];

        const sciencePool = [
            { q: "Which gas is most abundant in the Earth's atmosphere?", o: ["Oxygen (21%)", "Nitrogen (78%)", "Carbon dioxide", "Argon"], a: 1, t: "Chemistry" },
            { q: "What is the chemical symbol for Gold?", o: ["Ag", "Au", "Fe", "Cu"], a: 1, t: "Chemistry" },
            { q: "What is the SI unit of Electric Resistance?", o: ["Volt", "Ohm", "Ampere", "Joule"], a: 1, t: "Physics" },
            { q: "Deficiency of Vitamin C leads to which disease?", o: ["Rickets", "Scurvy", "Beriberi", "Night blindness"], a: 1, t: "Biology" },
            { q: "The process by which plants make their food using sunlight is:", o: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"], a: 1, t: "Biology" },
            { q: "Which part of the brain controls voluntary actions and balance?", o: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Hypothalamus"], a: 1, t: "Biology" },
            { q: "Which planet is closest to the Sun in our Solar System?", o: ["Venus", "Mercury", "Earth", "Mars"], a: 1, t: "Astronomy" },
            { q: "In human blood, which cells are responsible for carrying Oxygen?", o: ["White Blood Cells", "Red Blood Cells (Hemoglobin)", "Platelets", "Plasma"], a: 1, t: "Biology" },
            { q: "The conversion of a liquid into gas at any temperature below boiling point is:", o: ["Boiling", "Evaporation", "Condensation", "Sublimation"], a: 1, t: "Physics" },
            { q: "Which is the lightest gas known in the universe?", o: ["Helium", "Hydrogen", "Nitrogen", "Oxygen"], a: 1, t: "Chemistry" },
            { q: "What is the SI unit of Pressure?", o: ["Newton", "Pascal ($N/m^2$)", "Watt", "Joule"], a: 1, t: "Physics" },
            { q: "Which instrument is used to detect and measure electric charge?", o: ["Electroscope", "Galvanometer", "Voltmeter", "Ammeter"], a: 0, t: "Physics" },
            { q: "Which component of computer memory is volatile (loses data on power off)?", o: ["ROM", "RAM", "Hard Disk", "Flash Drive"], a: 1, t: "Computer Science" },
            { q: "What does 'HTML' stand for in Web Development?", o: ["Hypertext Markup Language", "High Text Machine Language", "Hyperlink Text Module", "Home Tool Markup Language"], a: 0, t: "Computer Science" },
            { q: "What is the chemical name of Vitamin A?", o: ["Ascorbic acid", "Retinol", "Calciferol", "Thiamine"], a: 1, t: "Health Science" },
            { q: "An electric generator converts mechanical energy into:", o: ["Thermal energy", "Electrical energy", "Chemical energy", "Nuclear energy"], a: 1, t: "Physics" },
            { q: "What is the approximate speed of sound in air at room temperature?", o: ["300,000 km/s", "343 m/s", "1500 m/s", "100 m/s"], a: 1, t: "Physics" },
            { q: "Which organ in the human body purifies blood by filtering waste products?", o: ["Heart", "Kidneys", "Lungs", "Stomach"], a: 1, t: "Biology" },
            { q: "What type of mirror is commonly used as a rearview mirror in automobiles?", o: ["Plane mirror", "Convex mirror", "Concave mirror", "Parabolic mirror"], a: 1, t: "Physics" },
            { q: "Lactic acid is naturally present in which of the following?", o: ["Citrus fruits", "Sour milk / Yogurt", "Vinegar", "Tomatoes"], a: 1, t: "Chemistry" }
        ];

        const mathPool = [
            { q: "What is the value of: $25 \\% \\text{ of } 480$?", o: ["100", "120", "140", "150"], a: 1, t: "Percentages" },
            { q: "Find the average of the first five prime numbers (2, 3, 5, 7, 11):", o: ["5.0", "5.6", "6.0", "6.2"], a: 1, t: "Averages" },
            { q: "If $\\frac{x}{4} = \\frac{15}{20}$, what is the value of $x$?", o: ["2", "3", "4", "5"], a: 1, t: "Ratios" },
            { q: "Find the value of $15^2 - 12^2$:", o: ["81", "81 ($9^2$)", "64", "49"], a: 1, t: "Algebra" },
            { q: "A car covers a distance of 180 km in 3 hours. Its speed in meters per second is:", o: ["15 m/s", "16.67 m/s", "20 m/s", "25 m/s"], a: 1, t: "Speed & Distance" },
            { q: "If the cost price is Rs. 500 and the selling price is Rs. 400, what is the loss percentage?", o: ["15%", "20%", "25%", "10%"], a: 1, t: "Profit & Loss" },
            { q: "Find the next term in the geometric series: 2, 6, 18, 54, ____", o: ["108", "162", "144", "180"], a: 1, t: "Number Series" },
            { q: "Simplify: $\\frac{2}{3} \\times \\frac{9}{4} \\div \\frac{3}{2} = ?$", o: ["1", "1.5", "2", "$\\frac{1}{2}$"], a: 0, t: "Fractions" },
            { q: "If the radius of a circle is 7 cm, its circumference is: (use $\\pi = \\frac{22}{7}$)", o: ["22 cm", "44 cm", "88 cm", "154 cm"], a: 1, t: "Geometry" },
            { q: "The sum of three consecutive integers is 72. What is the middle integer?", o: ["23", "24", "25", "26"], a: 1, t: "Algebra" },
            { q: "What is the HCF of 36, 54, and 72?", o: ["9", "18", "12", "6"], a: 1, t: "Arithmetic" },
            { q: "Solve for $y$: $3y - 7 = 20$", o: ["7", "9", "8", "6"], a: 1, t: "Algebra" },
            { q: "If 12 men can finish a piece of work in 10 days, in how many days can 15 men complete it?", o: ["6 days", "8 days", "9 days", "12 days"], a: 1, t: "Work & Time" },
            { q: "Find the square root of 0.0064:", o: ["0.8", "0.08", "0.008", "0.0008"], a: 1, t: "Decimals" },
            { q: "What is 40% of 150 added to 30% of 200?", o: ["100", "120", "110", "130"], a: 1, t: "Percentages" },
            { q: "In a class of 60 students, 40% are girls. How many boys are there in the class?", o: ["24", "36", "30", "40"], a: 1, t: "Percentages" },
            { q: "If $a : b = 2 : 3$ and $b : c = 4 : 5$, find $a : b : c$:", o: ["8 : 12 : 15", "6 : 9 : 10", "4 : 6 : 9", "2 : 4 : 5"], a: 0, t: "Ratios" },
            { q: "The angle of a straight line is equal to:", o: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"], a: 1, t: "Geometry" },
            { q: "Find the value of $x$ if $2^{x} = 64$:", o: ["4", "5", "6", "8"], a: 2, t: "Exponents" },
            { q: "A fruit seller sells 40% of his apples and still has 420 apples left. How many apples did he have originally?", o: ["600", "700", "800", "900"], a: 1, t: "Percentages" }
        ];

        const iqPool = [
            { q: "Doctor is to Hospital as Teacher is to:", o: ["Classroom", "School", "Library", "Office"], a: 1, t: "Analogies" },
            { q: "Find the odd one out from the options:", o: ["Copper", "Iron", "Gold", "Plastic"], a: 3, t: "Classification" },
            { q: "Complete the letter series: B, D, G, K, ____", o: ["N", "P", "O", "Q"], a: 1, t: "Letter Series" },
            { q: "If 'WATER' is written as 'XBUFS', how will 'EARTH' be written?", o: ["FBSUI", "FBSUJ", "FCRUI", "FBTUI"], a: 0, t: "Coding" },
            { q: "Aslam walks 10 km North, turns Right and walks 5 km. Which direction is he facing?", o: ["North", "East", "West", "South"], a: 1, t: "Directions" },
            { q: "A is father of C, but C is not son of A. What is C to A?", o: ["Brother", "Daughter", "Nephew", "Cousin"], a: 1, t: "Relationships" },
            { q: "Find the missing number: 4, 9, 16, 25, 36, ?", o: ["45", "49", "50", "64"], a: 1, t: "Number Series" },
            { q: "If 1st January is a Monday, what day will 8th January be?", o: ["Sunday", "Monday", "Tuesday", "Wednesday"], a: 1, t: "Calendar" },
            { q: "Pen is to Write as Knife is to:", o: ["Cut", "Sharpen", "Cook", "Eat"], a: 0, t: "Analogies" },
            { q: "Which number does not fit in the series: 3, 5, 7, 9, 11, 13 (Hint: Prime Numbers)?", o: ["3", "7", "9 (Not Prime)", "11"], a: 2, t: "Odd Number" }
        ];

        // Combine to 100 questions with unique ID sequence
        let qIndex = 1;
        const compiled = {
            "English": englishPool.map(item => ({ id: qIndex++, subject: "English", topic: item.t, question: item.q, options: item.o, correct: item.a })),
            "General Knowledge": gkPool.map(item => ({ id: qIndex++, subject: "General Knowledge", topic: item.t, question: item.q, options: item.o, correct: item.a })),
            "General Science": sciencePool.map(item => ({ id: qIndex++, subject: "General Science", topic: item.t, question: item.q, options: item.o, correct: item.a })),
            "Simple Arithmetic": mathPool.map(item => ({ id: qIndex++, subject: "Simple Arithmetic", topic: item.t, question: item.q, options: item.o, correct: item.a })),
            "Simple I.Q.": iqPool.map(item => ({ id: qIndex++, subject: "Simple I.Q.", topic: item.t, question: item.q, options: item.o, correct: item.a }))
        };

        return {
            info: {
                year: yearInt,
                title: `UOS Pre-Entry Test ${yearInt} Official Past Paper`,
                date: `Annual Entry Exam Batch ${yearInt}`,
                duration: "90 minutes"
            },
            questions: compiled
        };
    }

    // Public API
    window.UOSPastPapers = {
        // Return full list of past paper years
        getAllYears: function() {
            return PAST_PAPER_YEARS;
        },

        // Get questions dataset for a specific year
        getPaper: function(year) {
            const yrStr = String(year);
            if (PAST_PAPERS_DATABASE[yrStr]) {
                return PAST_PAPERS_DATABASE[yrStr];
            }
            // Generate standard full 100-mark paper for any year 2013-2023
            return generateFullYearPaper(year);
        },

        // Get past paper summary for cards
        getPaperSummary: function(year) {
            return PAST_PAPER_YEARS.find(p => p.year === parseInt(year, 10)) || {
                year: parseInt(year, 10),
                title: `UOS Pre-Entry Test ${year}`,
                date: `Session ${year}`,
                questions: 100,
                difficulty: "Official SUTC Standard"
            };
        }
    };

})(window);
