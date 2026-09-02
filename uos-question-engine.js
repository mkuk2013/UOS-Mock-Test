/**
 * University of Sindh (UOS) Mock Test - Question Engine & Dynamic Syllabus Generator
 * 
 * Official UOS Syllabus Distribution (100 MCQs Total):
 * 1. English: 30% (30 MCQs)
 *    - Synonyms & Antonyms
 *    - Correct Spelling of Words
 *    - Direct & Indirect Narrations
 *    - Active & Passive Voice
 *    - Prepositions
 *    - Grammar Error Detection & Sentence Correction
 * 
 * 2. General Science: 20% (20 MCQs)
 *    - Basics of Physics, Chemistry, Biology
 *    - Basic Computer Science
 *    - Scientific Units (SI Units), Measuring Instruments, Lenses (Concave/Convex)
 *    - Vitamins (Deficiencies & Results) and Common Diseases
 * 
 * 3. General Knowledge: 20% (20 MCQs)
 *    - Pakistan Studies: Subcontinent events, borders, neighbors, lakes, dams, mountain ranges
 *    - World Geography & Current Affairs: Capitals, currencies, rivers, oceans, deserts, landlocked countries, UN/IMF/World Bank
 *    - Islamic Studies: Life of Prophet (PBUH), Ghazwat, Khulafaa-e-Rashideen, Quranic information
 *    - General Abbreviations & historical milestones
 * 
 * 4. Simple Arithmetic: 20% (20 MCQs)
 *    - Basic operations, fractions (proper/improper/mixed), square roots
 *    - Percentages, ratios, averages
 *    - Profit & loss, time, speed, distance word problems
 *    - LCM & HCF, basic algebra, number series
 * 
 * 5. Intelligence / IQ: 10% (10 MCQs)
 *    - Logical and analytical reasoning
 *    - Number and letter series
 *    - Basic age calculation
 *    - Shape / pattern / relationship problems
 */

(function(window) {
    'use strict';

    const STORAGE_KEY_TESTS = 'uos_dynamic_mock_tests';
    const STORAGE_KEY_TIMESTAMP = 'uos_last_questions_update';

    // =========================================================================
    // 1. MASSIVE CURATED QUESTION POOL BY SYLLABUS CATEGORY
    // =========================================================================

    const QUESTION_BANK = {
        // -------------------------------------------------------------
        // ENGLISH (Target: 30 MCQs per test)
        // -------------------------------------------------------------
        english: {
            synonyms: [
                { q: "Choose the correct SYNONYM of 'OMIT':", opts: ["Recluse", "Mistake", "Destroy", "Neglect"], ans: 3 },
                { q: "Choose the correct SYNONYM of 'IMMACULATE':", opts: ["Dirty", "Pure & Spotless", "Filthy", "Neutral"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'PERFECT':", opts: ["Bad", "Inactive", "Faultless", "Workless"], ans: 2 },
                { q: "Choose the correct SYNONYM of 'ORAL':", opts: ["Unnatural", "Spoken", "Formal", "Written"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'SYNTAX':", opts: ["A point", "Grammar structure", "Hope", "Noise"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'ABUNDANT':", opts: ["Plentiful", "Scarce", "Rare", "Deficient"], ans: 0 },
                { q: "Choose the correct SYNONYM of 'CANDID':", opts: ["Frank & Honest", "Deceptive", "Secretive", "Shy"], ans: 0 },
                { q: "Choose the correct SYNONYM of 'DILIGENT':", opts: ["Lazy", "Hardworking", "Careless", "Weak"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'FEEBLE':", opts: ["Strong", "Weak", "Fast", "Rich"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'HAZARDOUS':", opts: ["Safe", "Dangerous", "Secure", "Easy"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'TRANQUIL':", opts: ["Noisy", "Calm & Peaceful", "Violent", "Rough"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'ZEAL':", opts: ["Apathy", "Passion & Enthusiasm", "Hatred", "Fear"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'AUTHENTIC':", opts: ["Fake", "Genuine", "Copied", "Counterfeit"], ans: 1 },
                { q: "Choose the correct SYNONYM of 'CONCISE':", opts: ["Brief & Clear", "Lengthy", "Vague", "Wordy"], ans: 0 },
                { q: "Choose the correct SYNONYM of 'RELUCTANT':", opts: ["Eager", "Unwilling", "Ready", "Excited"], ans: 1 }
            ],
            antonyms: [
                { q: "Choose the correct ANTONYM of 'CLARITY':", opts: ["Exaggeration", "Candour", "Confusion", "Reserve"], ans: 2 },
                { q: "Choose the correct ANTONYM of 'CONFESS':", opts: ["Deny", "Refuse", "Contest", "Contend"], ans: 0 },
                { q: "Choose the correct ANTONYM of 'ABHOR':", opts: ["Love & Admire", "Likeness", "Attractiveness", "Loathe"], ans: 0 },
                { q: "Choose the correct ANTONYM of 'FIXED':", opts: ["Hesitant", "Corrected", "Loose / Variable", "Delay"], ans: 2 },
                { q: "Choose the correct ANTONYM of 'VIOLENT':", opts: ["Tame", "Humble", "Gentle & Peaceful", "Harmless"], ans: 2 },
                { q: "Choose the correct ANTONYM of 'EXPAND':", opts: ["Contract / Shrink", "Enlarge", "Extend", "Broaden"], ans: 0 },
                { q: "Choose the correct ANTONYM of 'ACQUITTED':", opts: ["Freed", "Convicted / Found Guilty", "Pardoned", "Released"], ans: 1 },
                { q: "Choose the correct ANTONYM of 'POVERTY':", opts: ["Destitution", "Affluence / Wealth", "Need", "Hardship"], ans: 1 },
                { q: "Choose the correct ANTONYM of 'COURTEOUS':", opts: ["Polite", "Rude / Impolite", "Gentle", "Generous"], ans: 1 },
                { q: "Choose the correct ANTONYM of 'OBSTINATE':", opts: ["Stubborn", "Flexible / Yielding", "Rigid", "Firm"], ans: 1 },
                { q: "Choose the correct ANTONYM of 'ANCIENT':", opts: ["Old", "Modern", "Historic", "Past"], ans: 1 },
                { q: "Choose the correct ANTONYM of 'BRAVERY':", opts: ["Courage", "Heroism", "Cowardice", "Boldness"], ans: 2 }
            ],
            spelling: [
                { q: "Choose the CORRECTLY spelled word:", opts: ["Affedevit", "Afidevit", "Affidevit", "Affidavit"], ans: 3 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Centrefuge", "Centrefuse", "Centifuse", "Centrifuge"], ans: 3 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Deference", "Defferance", "Defference", "Deffirence"], ans: 0 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Enterpreneur", "Entreorenure", "Entrepreneur", "Enterprenure"], ans: 2 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Bureacracy", "Bereaucracy", "Buereacracy", "Bureaucracy"], ans: 3 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Occurence", "Occurrence", "Occurrance", "Ocurrence"], ans: 1 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Privilege", "Privelege", "Priviledge", "Privelidge"], ans: 0 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"], ans: 0 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Mischievous", "Mischevious", "Mischevous", "Mischivous"], ans: 0 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Maintenance", "Maintainance", "Maintenence", "Maintanence"], ans: 0 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Embarrassment", "Embarassment", "Embarrasment", "Embarasment"], ans: 0 },
                { q: "Choose the CORRECTLY spelled word:", opts: ["Guarantee", "Garantee", "Gaurantee", "Garrentee"], ans: 0 }
            ],
            narration: [
                { q: "Change into Indirect Speech: He said to me, \"I am ready.\"", opts: ["He told to me that he is ready.", "He told me that he was ready.", "He told me that I am ready.", "He told me that I will be ready."], ans: 1 },
                { q: "Change into Indirect Speech: Karim says, \"I shall go there.\"", opts: ["Karim said that he went there.", "Karim says that he will go there.", "Karim says that he went there.", "Karim said that I will go there."], ans: 1 },
                { q: "Change into Indirect Speech: Sultan will say to me, \"I am your classmate.\"", opts: ["Sultan will tell me that he is my classmate.", "Sultan will tell me that he was my classmate.", "Sultan will tell me that he will be my classmate.", "Sultan said me that he is my classmate."], ans: 0 },
                { q: "Change into Indirect Speech: He said to you, \"You may go out.\"", opts: ["He told you that you might be go out.", "He said you that you might be go out.", "He told you that you may go out.", "He told you that you might go out."], ans: 3 },
                { q: "Change into Indirect Speech: She said, \"I have completed my assignment.\"", opts: ["She said that she has completed her assignment.", "She said that she had completed her assignment.", "She said that she was completed her assignment.", "She told she had completed her assignment."], ans: 1 },
                { q: "Change into Indirect Speech: The teacher said, \"The Earth rotates around the sun.\"", opts: ["The teacher said that the Earth rotated around the sun.", "The teacher said that the Earth rotates around the sun.", "The teacher told that Earth is rotating.", "The teacher asked if Earth rotates around sun."], ans: 1 },
                { q: "Change into Indirect Speech: He said to her, \"Where are you going?\"", opts: ["He asked her where she was going.", "He asked her where was she going.", "He told her where she went.", "He asked her where are you going."], ans: 0 },
                { q: "Change into Indirect Speech: Ali said, \"Alas! I have lost my phone.\"", opts: ["Ali exclaimed with joy that he lost his phone.", "Ali exclaimed with sorrow that he had lost his phone.", "Ali said sorrowfully he has lost his phone.", "Ali told that alas he lost his phone."], ans: 1 }
            ],
            voice: [
                { q: "Change into Passive Voice: 'My father loves me.'", opts: ["I loved my father.", "I was loved by my father.", "I were loved by my father.", "I am loved by my father."], ans: 3 },
                { q: "Change into Passive Voice: 'My friends are watching the match.'", opts: ["The match is watched by my friends.", "The match had being watched by my friends.", "The match is being watched by my friends.", "The match has being watched by my friends."], ans: 2 },
                { q: "Change into Passive Voice: 'Sahil spoke the truth.'", opts: ["The truth was spoke by Sahil.", "The truth spoken by Sahil.", "The truth is spoke by Sahil.", "The truth was spoken by Sahil."], ans: 3 },
                { q: "Change into Passive Voice: 'Somebody had already adopted him.'", opts: ["He have been already adopted.", "He had already been adopted.", "He had already adopted.", "He has been already adopted."], ans: 1 },
                { q: "Change into Passive Voice: 'I must help him.'", opts: ["He must helped by me.", "I must held him.", "He must get help from me.", "He must be helped by me."], ans: 3 },
                { q: "Change into Passive Voice: 'Who wrote this book?'", opts: ["By whom was this book written?", "By whom this book was written?", "Who was written this book by?", "By who this book had been written?"], ans: 0 },
                { q: "Change into Passive Voice: 'Open the door.'", opts: ["The door should open.", "Let the door be opened.", "Door is being opened.", "You must open door."], ans: 1 },
                { q: "Change into Passive Voice: 'They will finish the project tomorrow.'", opts: ["The project will finish by them tomorrow.", "The project will be finished by them tomorrow.", "The project is finished by them tomorrow.", "The project shall be finish tomorrow."], ans: 1 }
            ],
            prepositions: [
                { q: "Choose the correct PREPOSITION: I am going to join my duties ____ a week.", opts: ["for", "in", "at", "to"], ans: 1 },
                { q: "Choose the correct PREPOSITION: Sattar is ____ vacation.", opts: ["with", "on", "for", "in"], ans: 1 },
                { q: "Choose the correct PREPOSITION: Look ____ the blackboard.", opts: ["on", "by", "in", "at"], ans: 3 },
                { q: "Choose the correct PREPOSITION: She is old ____ her age.", opts: ["to", "for", "of", "at"], ans: 1 },
                { q: "Choose the correct PREPOSITION: The plane is ____ to fly.", opts: ["with", "about", "at", "by"], ans: 1 },
                { q: "Choose the correct PREPOSITION: He is proficient ____ English and Urdu.", opts: ["in", "at", "on", "with"], ans: 0 },
                { q: "Choose the correct PREPOSITION: She prevented him ____ going out in the rain.", opts: ["to", "from", "for", "against"], ans: 1 },
                { q: "Choose the correct PREPOSITION: We agreed ____ the terms and conditions.", opts: ["to", "with", "on", "for"], ans: 0 },
                { q: "Choose the correct PREPOSITION: He is addicted ____ playing mobile games.", opts: ["in", "to", "for", "at"], ans: 1 },
                { q: "Choose the correct PREPOSITION: I am fond ____ classical music.", opts: ["for", "of", "about", "with"], ans: 1 },
                { q: "Choose the correct PREPOSITION: She succeeded ____ passing the entrance test.", opts: ["in", "for", "on", "at"], ans: 0 }
            ],
            grammar: [
                { q: "Sentence Correction: 'Neither of the boys (was / were) present yesterday.'", opts: ["were present", "was present", "are present", "have been present"], ans: 1 },
                { q: "Find the grammatical error: 'One of my friends [A] / are going [B] / to London [C] / next month [D].'", opts: ["One of my friends", "are going (should be 'is going')", "to London", "next month"], ans: 1 },
                { q: "Sentence Correction: 'If I was rich, I would help everyone.'", opts: ["If I am rich", "If I were rich", "If I had rich", "If I will be rich"], ans: 1 },
                { q: "Choose the correct sentence:", opts: ["He is senior than me.", "He is senior to me.", "He is more senior than me.", "He is senior from me."], ans: 1 },
                { q: "Choose the correct sentence:", opts: ["The sceneries of Murree is beautiful.", "The scenery of Murree is beautiful.", "The sceneries of Murree are beautiful.", "Scenery of Murree are beautiful."], ans: 1 },
                { q: "Fill in the blank with correct conditional: 'If it rains tomorrow, we ____ the match.'", opts: ["cancel", "will cancel", "would cancel", "cancelled"], ans: 1 }
            ]
        },

        // -------------------------------------------------------------
        // GENERAL SCIENCE (Target: 20 MCQs per test)
        // -------------------------------------------------------------
        science: {
            physics: [
                { q: "Chemical Symbol of Potassium is:", opts: ["Mg", "Pa", "Au", "K"], ans: 3 },
                { q: "Oxygen in the upper atmosphere is converted into:", opts: ["Hydrogen", "Ozone ($O_3$)", "Nitrogen", "$CO_2$"], ans: 1 },
                { q: "Sound cannot travel through which medium?", opts: ["Solids", "Liquids", "Vacuum", "Gases"], ans: 2 },
                { q: "One centimeter is equal to how many meters?", opts: ["$\\frac{1}{100}$ meter", "$\\frac{1}{10}$ meter", "1 meter", "$\\frac{1}{1000}$ meter"], ans: 0 },
                { q: "Which lens is used to correct Myopia (short-sightedness)?", opts: ["Convex Lens", "Concave Lens", "Bifocal Lens", "Cylindrical Lens"], ans: 1 },
                { q: "Which lens is used to correct Hypermetropia (long-sightedness)?", opts: ["Convex Lens", "Concave Lens", "Plano-concave", "Parabolic Lens"], ans: 0 },
                { q: "What is the SI unit of Electric Current?", opts: ["Volt", "Ohm", "Ampere", "Watt"], ans: 2 },
                { q: "What is the SI unit of Force?", opts: ["Joule", "Newton", "Pascal", "Watt"], ans: 1 },
                { q: "What is the SI unit of Pressure?", opts: ["Pascal", "Newton", "Tesla", "Coulomb"], ans: 0 },
                { q: "The instrument used to measure atmospheric pressure is:", opts: ["Anemometer", "Barometer", "Hygrometer", "Hydrometer"], ans: 1 },
                { q: "The instrument used for measuring humidity in the air is:", opts: ["Pantograph", "Hygrograph / Hygrometer", "Hydrograph", "Barograph"], ans: 1 },
                { q: "Speed of light in vacuum is approximately:", opts: ["$3 \\times 10^8$ m/s", "$3 \\times 10^6$ m/s", "$3 \\times 10^5$ km/h", "$1.5 \\times 10^8$ m/s"], ans: 0 },
                { q: "Which planet has the shortest day in our solar system?", opts: ["Neptune", "Venus", "Saturn", "Jupiter"], ans: 3 },
                { q: "What is the boiling point of pure water at sea level?", opts: ["$90^\\circ\\text{C}$", "$100^\\circ\\text{C}$", "$110^\\circ\\text{C}$", "$212^\\circ\\text{C}$"], ans: 1 }
            ],
            chemistry: [
                { q: "Diamond and Graphite are allotropic forms of which element?", opts: ["Silicon", "Carbon", "Sulphur", "Germanium"], ans: 1 },
                { q: "Which acid is produced when milk turns sour?", opts: ["Tartaric acid", "Lactic acid", "Butyric acid", "Acetic acid"], ans: 1 },
                { q: "What is the pH value of pure distilled water at $25^\\circ\\text{C}$?", opts: ["0", "7 (Neutral)", "14", "5.6"], ans: 1 },
                { q: "The atomic number of an atom represents the number of:", opts: ["Neutrons", "Protons", "Electrons + Neutrons", "Molecules"], ans: 1 },
                { q: "Chemical formula of Common Salt (Table Salt) is:", opts: ["$NaHCO_3$", "$NaCl$", "$KCl$", "$CaCO_3$"], ans: 1 },
                { q: "The lightest gas in the universe is:", opts: ["Helium", "Hydrogen", "Nitrogen", "Oxygen"], ans: 1 },
                { q: "Which gas is used in fire extinguishers?", opts: ["Oxygen", "Carbon Dioxide ($CO_2$)", "Hydrogen", "Nitrogen"], ans: 1 }
            ],
            biology: [
                { q: "The largest part of the human brain is:", opts: ["Cerebellum", "Cerebrum", "Mid-brain", "Medulla"], ans: 1 },
                { q: "Saliva in humans is naturally:", opts: ["Acidic", "Slightly Alkaline / Neutral", "Strongly Acidic", "None of these"], ans: 1 },
                { q: "The mammal which lays eggs is:", opts: ["Bat", "Duck-billed platypus", "Squirrel", "Kangaroo"], ans: 1 },
                { q: "Snake venom / snake bite first attacks which system?", opts: ["Lungs", "Brain", "Nervous & Circulatory system", "Digestive system"], ans: 2 },
                { q: "Milk is a poor source of which essential mineral?", opts: ["Calcium", "Iron", "Protein", "Phosphorus"], ans: 1 },
                { q: "Which blood group is known as the 'Universal Donor'?", opts: ["Group A", "Group B", "Group AB", "Group O Negative"], ans: 3 },
                { q: "Which blood group is known as the 'Universal Recipient'?", opts: ["Group AB Positive", "Group O", "Group A", "Group B"], ans: 0 },
                { q: "The normal human body temperature is approximately:", opts: ["$37^\\circ\\text{C} / 98.6^\\circ\\text{F}$", "$35^\\circ\\text{C} / 95^\\circ\\text{F}$", "$39^\\circ\\text{C} / 102^\\circ\\text{F}$", "$36^\\circ\\text{C} / 96^\\circ\\text{F}$"], ans: 0 }
            ],
            vitamins_diseases: [
                { q: "Deficiency of Vitamin A causes which disease?", opts: ["Scurvy", "Night Blindness", "Rickets", "Beriberi"], ans: 1 },
                { q: "Deficiency of Vitamin C leads to which disease?", opts: ["Scurvy (bleeding gums)", "Rickets", "Goitre", "Anemia"], ans: 0 },
                { q: "Deficiency of Vitamin D in children causes:", opts: ["Beriberi", "Rickets (soft bones)", "Scurvy", "Pellagra"], ans: 1 },
                { q: "Deficiency of Vitamin B1 (Thiamine) causes:", opts: ["Beriberi", "Scurvy", "Night Blindness", "Rickets"], ans: 0 },
                { q: "Vitamin K plays a vital role in:", opts: ["Vision", "Blood Clotting / Coagulation", "Digestion", "Hearing"], ans: 1 },
                { q: "Goitre disease is caused due to deficiency of which mineral?", opts: ["Iron", "Iodine", "Calcium", "Zinc"], ans: 1 },
                { q: "Malaria is transmitted to humans by which mosquito?", opts: ["Male Anopheles", "Female Anopheles", "Aedes Aegypti", "Culex"], ans: 1 },
                { q: "Dengue fever is transmitted by which mosquito species?", opts: ["Female Anopheles", "Aedes Aegypti", "House fly", "Tick"], ans: 1 }
            ],
            computer: [
                { q: "The physical components of a computer are called:", opts: ["Software", "Hardware", "Firmware", "Liveware"], ans: 1 },
                { q: "1 Megabyte (MB) is equal to:", opts: ["1000 Kilobytes", "1024 Kilobytes (KB)", "1024 Bytes", "1048576 Bits"], ans: 1 },
                { q: "CPU stands for:", opts: ["Central Power Unit", "Central Processing Unit", "Central Program Utility", "Computer Processing Unit"], ans: 1 },
                { q: "RAM stands for:", opts: ["Read Access Memory", "Random Access Memory", "Rapid Action Memory", "Real Access Module"], ans: 1 },
                { q: "Which of the following is an example of an Operating System?", opts: ["Microsoft Word", "Windows 11", "Google Chrome", "Adobe Photoshop"], ans: 1 },
                { q: "What is the shortcut key to copy selected text in Windows?", opts: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"], ans: 1 }
            ]
        },

        // -------------------------------------------------------------
        // GENERAL KNOWLEDGE (Target: 20 MCQs per test)
        // -------------------------------------------------------------
        gk: {
            pak_studies: [
                { q: "The border between Pakistan and Afghanistan is officially known as:", opts: ["Silk Line", "Safak Line", "Durand Line", "Radcliffe Line"], ans: 2 },
                { q: "The boundary line between India and Pakistan demarcated in 1947 is:", opts: ["Durand Line", "Radcliffe Line", "McMahon Line", "24th Parallel"], ans: 1 },
                { q: "The Karakoram Highway connects Pakistan with which neighboring country?", opts: ["Afghanistan", "China", "Iran", "India"], ans: 1 },
                { q: "Karoonjhar Mountains are located in which district of Sindh?", opts: ["Sehwan", "Thatta", "Tharparkar (Nagarparkar)", "Rohri"], ans: 2 },
                { q: "Hamal Lake is situated in which district of Sindh?", opts: ["Qambar-Shahdadkot", "Dadu", "Sehwan", "Hyderabad"], ans: 0 },
                { q: "Manchar Lake, the largest freshwater lake in Pakistan, is in district:", opts: ["Thatta", "Jamshoro / Dadu", "Badin", "Sanghar"], ans: 1 },
                { q: "Tarbela Dam is constructed on which river?", opts: ["Jhelum River", "Indus River", "Chenab River", "Ravi River"], ans: 1 },
                { q: "Mangla Dam is built on which river?", opts: ["Indus", "Jhelum", "Kabul", "Sutlej"], ans: 1 },
                { q: "Muhammad Bin Qasim conquered Sindh in which year?", opts: ["712 AD", "632 AD", "1001 AD", "750 AD"], ans: 0 },
                { q: "Muhammad Bin Qasim entered Sindh through which ancient port?", opts: ["Mansura", "Debal", "Manora", "Bhambhore"], ans: 1 },
                { q: "The second highest mountain peak in the world, K2 (Godwin-Austen), is in which range?", opts: ["Himalayas", "Karakoram Range", "Hindu Kush", "Sulaiman"], ans: 1 },
                { q: "Nanga Parbat, known as 'Killer Mountain', is located in which mountain range?", opts: ["Karakoram", "Himalayas", "Hindu Kush", "Pamir"], ans: 1 },
                { q: "The Constitution of 1973 of Pakistan consists of how many Articles?", opts: ["234", "250", "270", "280 Articles"], ans: 3 },
                { q: "Who was the last Mughal Emperor of the subcontinent?", opts: ["Aurangzeb Alamgir", "Jalal-ud-din Akbar", "Bahadur Shah Zafar", "Babur"], ans: 2 },
                { q: "Shalimar Gardens in Lahore were built by which Mughal emperor?", opts: ["Akbar", "Jahangir", "Shah Jahan", "Babur"], ans: 2 }
            ],
            geography_current: [
                { q: "The largest river in the world by water volume is:", opts: ["Indus River", "Nile River", "Amazon River", "Yangtze"], ans: 2 },
                { q: "The longest river in the world is:", opts: ["Amazon River", "Nile River", "Mississippi", "Danube"], ans: 1 },
                { q: "The largest ocean in the world is:", opts: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"], ans: 1 },
                { q: "The largest desert in the world is:", opts: ["Gobi Desert", "Sahara Desert", "Thar Desert", "Kalahari"], ans: 1 },
                { q: "Which country is completely landlocked in South Asia?", opts: ["Pakistan", "Afghanistan", "India", "Bangladesh"], ans: 1 },
                { q: "Capital city of South Korea is:", opts: ["Pyongyang", "Bishkek", "Male", "Seoul"], ans: 3 },
                { q: "Capital city of Turkey is:", opts: ["Istanbul", "Ankara", "Izmir", "Antalya"], ans: 1 },
                { q: "Capital city of Canada is:", opts: ["Toronto", "Ottawa", "Vancouver", "Montreal"], ans: 1 },
                { q: "Currency of Japan is:", opts: ["Yuan", "Yen", "Won", "Rial"], ans: 1 },
                { q: "'Kwacha' is the official currency of:", opts: ["Togo", "Zambia", "Maldives", "Taiwan"], ans: 1 },
                { q: "Headquarters of the United Nations (UNO) is located in:", opts: ["Geneva", "New York City", "London", "Paris"], ans: 1 },
                { q: "Headquarters of the International Monetary Fund (IMF) and World Bank is in:", opts: ["New York", "Washington, D.C.", "Geneva", "Zurich"], ans: 1 },
                { q: "The lowest point on land on Earth's surface is:", opts: ["Caspian Sea", "Dead Sea", "Lake Assal", "Lake Eyre"], ans: 1 },
                { q: "The South Pole is located on which continent?", opts: ["Africa", "Australia", "Greenland", "Antarctica"], ans: 3 },
                { q: "'Land of the Rising Sun' is known as:", opts: ["China", "Japan", "Norway", "Thailand"], ans: 1 }
            ],
            islamic_studies: [
                { q: "In which year of Hijrah did the Battle of Badr take place?", opts: ["1st Hijri", "2nd Hijri", "3rd Hijri", "5th Hijri"], ans: 1 },
                { q: "The Battle of Uhud was fought in which Hijri year?", opts: ["2nd Hijri", "3rd Hijri", "4th Hijri", "6th Hijri"], ans: 1 },
                { q: "Who was the first Caliph of Islam (Khulafaa-e-Rashideen)?", opts: ["Hazrat Umar (RA)", "Hazrat Abu Bakr Siddique (RA)", "Hazrat Usman (RA)", "Hazrat Ali (RA)"], ans: 1 },
                { q: "Who was titled 'Saifullah' (Sword of Allah)?", opts: ["Hazrat Ali (RA)", "Hazrat Khalid bin Walid (RA)", "Hazrat Hamza (RA)", "Hazrat Saad (RA)"], ans: 1 },
                { q: "How many Surahs are there in the Holy Quran?", opts: ["110", "112", "114", "116"], ans: 2 },
                { q: "Which Surah is known as the 'Heart of the Quran' (Qalb-ul-Quran)?", opts: ["Surah Al-Fatiha", "Surah Yaseen", "Surah Al-Rahman", "Surah Al-Baqarah"], ans: 1 },
                { q: "The longest Surah in the Holy Quran is:", opts: ["Surah Aal-e-Imran", "Surah Al-Baqarah", "Surah An-Nisa", "Surah Al-Ma'idah"], ans: 1 },
                { q: "The Treaty of Hudaibiyyah was signed in which Hijri year?", opts: ["5th Hijri", "6th Hijri", "7th Hijri", "8th Hijri"], ans: 1 }
            ],
            abbreviations_general: [
                { q: "LNG stands for:", opts: ["Liquid Natural Gas", "Liquefied Natural Gas", "Lithogram Natural Gas", "Linear Natural Gas"], ans: 1 },
                { q: "UNESCO stands for:", opts: ["United Nations Educational, Scientific and Cultural Organization", "United Nations Economic and Social Council", "United National Education Society", "Union of Educational Sciences"], ans: 0 },
                { q: "NATO stands for:", opts: ["North American Treaty Organization", "North Atlantic Treaty Organization", "National Alliance of Treaties", "Northern Atlantic Trade Office"], ans: 1 },
                { q: "OPEC stands for:", opts: ["Organization of Petroleum Exporting Countries", "Oil Producing and Exporting Corporation", "Overseas Petroleum Energy Council", "Office of Petroleum Economy"], ans: 0 }
            ]
        },

        // -------------------------------------------------------------
        // SIMPLE ARITHMETIC / MATHEMATICS (Target: 20 MCQs per test)
        // -------------------------------------------------------------
        math_templates: [
            { q: "Evaluate the nested square root: $\\sqrt{248+\\sqrt{52+\\sqrt{144}}}$", opts: ["18.8", "16.6", "16", "14"], ans: 2 },
            { q: "If $36xy = 18xyz$, then what is the value of $z$?", opts: ["5", "3", "4", "2"], ans: 3 },
            { q: "What is the next term in the sequence: $1, 3, 8, 19, \\dots$?", opts: ["40", "41", "42", "38"], ans: 2 },
            { q: "Which of the following values is the greatest?", opts: ["$\\frac{1}{4}$ of 236 (=59)", "$\\frac{1}{3}$ of 741 (=247)", "$\\frac{1}{16}$ of 1028 (=64.25)", "$\\frac{1}{9}$ of 504 (=56)"], ans: 1 },
            { q: "A person washes 8 cars in 18 minutes. At the same rate, how many cars will he wash in 3 hours (180 mins)?", opts: ["13", "40", "125", "80"], ans: 3 },
            { q: "If $\\frac{x}{4} = \\frac{y}{2}$, then which equation is correct?", opts: ["$x = 2y$", "$y = 2x$", "$x = y$", "$y = x^2$"], ans: 0 },
            { q: "2 apples and 3 mangoes cost Rs. 86. 4 apples and 1 mango cost Rs. 112. What is the cost of 1 apple?", opts: ["Rs. 35", "Rs. 30", "Rs. 25", "Rs. 20"], ans: 2 },
            { q: "A trader lost 20% by selling a radio set for Rs. 680. What was the original cost price?", opts: ["Rs. 800", "Rs. 900", "Rs. 850", "Rs. 820"], ans: 2 },
            { q: "Evaluate: $\\sqrt{\\frac{1}{4}} + \\sqrt[3]{\\frac{1}{8}}$", opts: ["0", "1", "$\\frac{1}{2}$", "$\\sqrt[3]{\\frac{1}{2}}$"], ans: 1 },
            { q: "If $\\sqrt{2^n} = 64$, then find the value of $n$:", opts: ["8", "10", "12", "16"], ans: 2 },
            { q: "Find the third proportional to the numbers 4 and 42 ($4 : 42 = 42 : x$):", opts: ["441", "541", "641", "341"], ans: 0 },
            { q: "The ratio of boys and girls in a school is $9:5$. If the total students are 1050, the number of boys is:", opts: ["785", "890", "675", "650"], ans: 2 },
            { q: "What percentage is equivalent to the mixed fraction $5\\frac{1}{4}$?", opts: ["525%", "425%", "625%", "550%"], ans: 0 },
            { q: "Calculate the value of $90^2 - 70^2$ using $(a-b)(a+b)$:", opts: ["3000", "3100", "3200", "3500"], ans: 2 },
            { q: "What is the value of $a^2 + b^2$, if $a+b = 5$ and $ab = 2$?", opts: ["21", "24", "25", "30"], ans: 0 },
            { q: "If 5 meters of cloth costs Rs. 50, how many meters can be purchased for Rs. 750?", opts: ["15", "25", "45", "75"], ans: 3 },
            { q: "What is the exact value of $\\tan(45^\\circ)$?", opts: ["$\\frac{1}{\\sqrt{3}}$", "$\\frac{1}{\\sqrt{2}}$", "1", "$\\sqrt{3}$"], ans: 2 },
            { q: "The number 1 (one) is classified as:", opts: ["Prime number", "Composite number", "Even number", "Neither prime nor composite"], ans: 3 },
            { q: "What is the average of first 5 multiples of 3 ($3, 6, 9, 12, 15$)?", opts: ["6", "9", "12", "10"], ans: 1 },
            { q: "LCM of 12, 18, and 24 is:", opts: ["36", "48", "72", "144"], ans: 2 }
        ],

        // -------------------------------------------------------------
        // INTELLIGENCE QUESTIONS / IQ (Target: 10 MCQs per test)
        // -------------------------------------------------------------
        iq: [
            { q: "What is the next number in the following series: $64, 32, 16, 8, \\dots$?", opts: ["2", "4", "6", "1"], ans: 1 },
            { q: "If $5+3=538$ and $9+1=9110$, then $8+4 = \\text{?}$", opts: ["8412", "4812", "8432", "1284"], ans: 0 },
            { q: "'Talent' is most opposite in meaning to:", opts: ["Ungrateful", "Silent", "Untalented", "Inability"], ans: 3 },
            { q: "If 'BEST' is coded as 'DGUV' (+2 shifts), then 'ENTER' is coded as:", opts: ["GPVXC", "GPVGT", "GPVTA", "HIUTV"], ans: 1 },
            { q: "Next number in the series $3, 8, 13, 18, 23, \\dots$ is:", opts: ["27", "28", "29", "26"], ans: 1 },
            { q: "How many even prime numbers exist in mathematics?", opts: ["Only 1 (number 2)", "4", "5", "Infinite"], ans: 0 },
            { q: "Find the odd one out from the options:", opts: ["Sea", "Lake", "Stream", "Bridge"], ans: 3 },
            { q: "A father is 4 times as old as his son. In 20 years, he will be twice as old as his son. What is the son's present age?", opts: ["5 years", "10 years", "12 years", "15 years"], ans: 1 },
            { q: "Complete the letter series: A, C, F, J, O, ____?", opts: ["U", "T", "V", "S"], ans: 0 },
            { q: "Doctor is to Patient as Teacher is to:", opts: ["School", "Student", "Book", "Classroom"], ans: 1 },
            { q: "If SOUTH-EAST becomes NORTH, and NORTH-EAST becomes WEST, what will WEST become?", opts: ["SOUTH-EAST", "NORTH-WEST", "SOUTH", "EAST"], ans: 0 },
            { q: "Find the missing number in series: $2, 6, 12, 20, 30, \\dots$?", opts: ["40", "42", "44", "48"], ans: 1 }
        ]
    };

    // =========================================================================
    // 2. ALGORITHMIC GENERATORS FOR ENDLESS UNIQUE COMBINATIONS
    // =========================================================================

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // Dynamic Math Question Generator
    function generateDynamicMathMCQ(typeIndex) {
        switch (typeIndex % 6) {
            case 0: { // Percentage problem
                const base = randInt(2, 20) * 50; // 100 to 1000
                const percent = randInt(2, 9) * 5; // 10%, 15%, 20%...
                const result = (base * percent) / 100;
                const opts = [
                    `${result}`,
                    `${result + 10}`,
                    `${Math.max(5, result - 10)}`,
                    `${result + 25}`
                ];
                const shuffled = shuffleOptions(opts, `${result}`);
                return {
                    q: `What is ${percent}% of ${base}?`,
                    opts: shuffled.options,
                    ans: shuffled.correctIndex
                };
            }
            case 1: { // Speed, Distance, Time
                const speed = randInt(4, 12) * 10; // 40 to 120 km/h
                const time = randInt(2, 6); // 2 to 6 hours
                const dist = speed * time;
                const opts = [
                    `${dist} km`,
                    `${dist + 30} km`,
                    `${dist - 20} km`,
                    `${dist + 50} km`
                ];
                const shuffled = shuffleOptions(opts, `${dist} km`);
                return {
                    q: `A car travels at an average speed of ${speed} km/h for ${time} hours. How much distance does it cover?`,
                    opts: shuffled.options,
                    ans: shuffled.correctIndex
                };
            }
            case 2: { // Profit and Loss
                const cp = randInt(3, 15) * 100; // 300 to 1500
                const profitPercent = randInt(2, 5) * 5; // 10, 15, 20, 25%
                const sp = cp + (cp * profitPercent) / 100;
                const opts = [
                    `Rs. ${sp}`,
                    `Rs. ${sp + 50}`,
                    `Rs. ${sp - 50}`,
                    `Rs. ${sp + 100}`
                ];
                const shuffled = shuffleOptions(opts, `Rs. ${sp}`);
                return {
                    q: `An article bought for Rs. ${cp} is sold at a profit of ${profitPercent}%. What is its selling price?`,
                    opts: shuffled.options,
                    ans: shuffled.correctIndex
                };
            }
            case 3: { // Linear Algebra Equation
                const a = randInt(2, 7);
                const b = randInt(3, 20);
                const xVal = randInt(2, 10);
                const c = (a * xVal) + b;
                const opts = [
                    `${xVal}`,
                    `${xVal + 1}`,
                    `${Math.max(1, xVal - 1)}`,
                    `${xVal + 2}`
                ];
                const shuffled = shuffleOptions(opts, `${xVal}`);
                return {
                    q: `Solve for $x$: $${a}x + ${b} = ${c}$`,
                    opts: shuffled.options,
                    ans: shuffled.correctIndex
                };
            }
            case 4: { // Ratio Problem
                const r1 = randInt(2, 5);
                const r2 = randInt(2, 5);
                const unit = randInt(10, 40);
                const total = (r1 + r2) * unit;
                const ansVal = r1 * unit;
                const opts = [
                    `${ansVal}`,
                    `${r2 * unit}`,
                    `${ansVal + 15}`,
                    `${ansVal - 10}`
                ];
                const shuffled = shuffleOptions(opts, `${ansVal}`);
                return {
                    q: `Divide Rs. ${total} between Aslam and Bilal in the ratio $${r1}:${r2}$. What is Aslam's share?`,
                    opts: shuffled.options,
                    ans: shuffled.correctIndex
                };
            }
            case 5: { // Averages
                const n1 = randInt(10, 30);
                const n2 = n1 + randInt(2, 8);
                const n3 = n2 + randInt(2, 8);
                const avg = Math.round((n1 + n2 + n3) / 3);
                const actualSum = avg * 3;
                const fixedN3 = actualSum - n1 - n2;
                const opts = [
                    `${avg}`,
                    `${avg + 2}`,
                    `${avg - 2}`,
                    `${avg + 4}`
                ];
                const shuffled = shuffleOptions(opts, `${avg}`);
                return {
                    q: `Find the arithmetic average (mean) of numbers ${n1}, ${n2}, and ${fixedN3}:`,
                    opts: shuffled.options,
                    ans: shuffled.correctIndex
                };
            }
        }
    }

    // Dynamic IQ Question Generator
    function generateDynamicIQMCQ(typeIndex) {
        if (typeIndex % 2 === 0) {
            // Number Series
            const start = randInt(2, 10);
            const step = randInt(3, 8);
            const s1 = start;
            const s2 = s1 + step;
            const s3 = s2 + step;
            const s4 = s3 + step;
            const next = s4 + step;
            const opts = [
                `${next}`,
                `${next + 2}`,
                `${next - 1}`,
                `${next + step}`
            ];
            const shuffled = shuffleOptions(opts, `${next}`);
            return {
                q: `What is the next number in the arithmetic progression: ${s1}, ${s2}, ${s3}, ${s4}, ___?`,
                opts: shuffled.options,
                ans: shuffled.correctIndex
            };
        } else {
            // Age problem
            const sonAge = randInt(8, 16);
            const diff = randInt(22, 30);
            const fatherAge = sonAge + diff;
            const inYears = randInt(4, 10);
            const fatherFuture = fatherAge + inYears;
            const opts = [
                `${fatherFuture} years`,
                `${fatherFuture + 2} years`,
                `${fatherFuture - 3} years`,
                `${fatherFuture + 5} years`
            ];
            const shuffled = shuffleOptions(opts, `${fatherFuture} years`);
            return {
                q: `A father is currently ${diff} years older than his son. If the son is currently ${sonAge} years old, how old will the father be in ${inYears} years?`,
                opts: shuffled.options,
                ans: shuffled.correctIndex
            };
        }
    }

    function shuffleOptions(opts, correctText) {
        const unique = [...new Set(opts)];
        while (unique.length < 4) {
            unique.push(`None of these (${unique.length})`);
        }
        const shuffled = shuffleArray(unique);
        const correctIndex = shuffled.indexOf(correctText);
        return {
            options: shuffled,
            correctIndex: correctIndex !== -1 ? correctIndex : 0
        };
    }

    // =========================================================================
    // 3. MASTER 100-MCQ TEST COMPOSER STRICTLY ADHERING TO UOS QUOTAS
    // =========================================================================

    function compose100MCQTest(testId) {
        const testQuestions = {
            english: [],
            science: [],
            gk: [],
            math: [],
            iq: []
        };

        // 1. ENGLISH: Exactly 30 Questions
        // (Synonyms: 6, Antonyms: 6, Spellings: 5, Narrations: 4, Voices: 4, Prepositions: 3, Grammar: 2)
        const eng = QUESTION_BANK.english;
        const synPool = shuffleArray(eng.synonyms);
        const antPool = shuffleArray(eng.antonyms);
        const spellPool = shuffleArray(eng.spelling);
        const narrPool = shuffleArray(eng.narration);
        const voicePool = shuffleArray(eng.voice);
        const prepPool = shuffleArray(eng.prepositions);
        const gramPool = shuffleArray(eng.grammar);

        testQuestions.english.push(
            ...synPool.slice(0, 6).map(i => ({ ...i, topic: 'Synonyms' })),
            ...antPool.slice(0, 6).map(i => ({ ...i, topic: 'Antonyms' })),
            ...spellPool.slice(0, 5).map(i => ({ ...i, topic: 'Spelling' })),
            ...narrPool.slice(0, 4).map(i => ({ ...i, topic: 'Narration' })),
            ...voicePool.slice(0, 4).map(i => ({ ...i, topic: 'Active & Passive Voice' })),
            ...prepPool.slice(0, 3).map(i => ({ ...i, topic: 'Prepositions' })),
            ...gramPool.slice(0, 2).map(i => ({ ...i, topic: 'Grammar & Correction' }))
        );

        // 2. GENERAL SCIENCE: Exactly 20 Questions
        // (Physics: 6, Chemistry: 4, Biology: 4, Vitamins & Diseases: 4, Computer: 2)
        const sci = QUESTION_BANK.science;
        const physPool = shuffleArray(sci.physics);
        const chemPool = shuffleArray(sci.chemistry);
        const bioPool = shuffleArray(sci.biology);
        const vitPool = shuffleArray(sci.vitamins_diseases);
        const compPool = shuffleArray(sci.computer);

        testQuestions.science.push(
            ...physPool.slice(0, 6).map(i => ({ ...i, topic: 'Physics & Units' })),
            ...chemPool.slice(0, 4).map(i => ({ ...i, topic: 'Chemistry' })),
            ...bioPool.slice(0, 4).map(i => ({ ...i, topic: 'Biology' })),
            ...vitPool.slice(0, 4).map(i => ({ ...i, topic: 'Vitamins & Health' })),
            ...compPool.slice(0, 2).map(i => ({ ...i, topic: 'Computer Science' }))
        );

        // 3. GENERAL KNOWLEDGE: Exactly 20 Questions
        // (Pak Studies: 7, Geography & World: 6, Islamic Studies: 5, Abbreviations: 2)
        const gk = QUESTION_BANK.gk;
        const pakPool = shuffleArray(gk.pak_studies);
        const geoPool = shuffleArray(gk.geography_current);
        const islPool = shuffleArray(gk.islamic_studies);
        const abbrPool = shuffleArray(gk.abbreviations_general);

        testQuestions.gk.push(
            ...pakPool.slice(0, 7).map(i => ({ ...i, topic: 'Pakistan Studies' })),
            ...geoPool.slice(0, 6).map(i => ({ ...i, topic: 'World Geography' })),
            ...islPool.slice(0, 5).map(i => ({ ...i, topic: 'Islamic Studies' })),
            ...abbrPool.slice(0, 2).map(i => ({ ...i, topic: 'Abbreviations' }))
        );

        // 4. SIMPLE ARITHMETIC / MATH: Exactly 20 Questions
        // Mix of curated core items + dynamic variations
        const staticMath = shuffleArray(QUESTION_BANK.math_templates);
        const mathItems = [...staticMath.slice(0, 12).map(i => ({ ...i, topic: 'Arithmetic & Algebra' }))];
        for (let m = 0; m < 8; m++) {
            mathItems.push({
                ...generateDynamicMathMCQ(testId * 10 + m),
                topic: 'Problem Solving & Arithmetic'
            });
        }
        testQuestions.math = shuffleArray(mathItems).slice(0, 20);

        // 5. INTELLIGENCE / IQ: Exactly 10 Questions
        const staticIQ = shuffleArray(QUESTION_BANK.iq);
        const iqItems = [...staticIQ.slice(0, 6).map(i => ({ ...i, topic: 'Logical Reasoning' }))];
        for (let q = 0; q < 4; q++) {
            iqItems.push({
                ...generateDynamicIQMCQ(testId * 5 + q),
                topic: 'Pattern & Series'
            });
        }
        testQuestions.iq = shuffleArray(iqItems).slice(0, 10);

        return testQuestions;
    }

    // Convert section questions into ordered 100 list with formatted labels
    function buildFullOrdered100List(sectionObj) {
        const fullList = [];
        let globalId = 1;

        // 1-30: English
        sectionObj.english.forEach(item => {
            fullList.push({
                id: globalId++,
                subject: 'English',
                topic: item.topic || 'English',
                question: item.q,
                options: item.opts,
                correct: item.ans
            });
        });

        // 31-50: General Knowledge
        sectionObj.gk.forEach(item => {
            fullList.push({
                id: globalId++,
                subject: 'General Knowledge',
                topic: item.topic || 'General Knowledge',
                question: item.q,
                options: item.opts,
                correct: item.ans
            });
        });

        // 51-70: General Science
        sectionObj.science.forEach(item => {
            fullList.push({
                id: globalId++,
                subject: 'General Science',
                topic: item.topic || 'General Science',
                question: item.q,
                options: item.opts,
                correct: item.ans
            });
        });

        // 71-90: Mathematics
        sectionObj.math.forEach(item => {
            fullList.push({
                id: globalId++,
                subject: 'Mathematics',
                topic: item.topic || 'Mathematics',
                question: item.q,
                options: item.opts,
                correct: item.ans
            });
        });

        // 91-100: Intelligence / IQ
        sectionObj.iq.forEach(item => {
            fullList.push({
                id: globalId++,
                subject: 'Intelligence',
                topic: item.topic || 'I.Q',
                question: item.q,
                options: item.opts,
                correct: item.ans
            });
        });

        return fullList;
    }

    // Format for Bootstrap Quizzes (uos-quiz1, uos-quiz2, practice-test1)
    // Options prefixed with A., B., C., D. and grouped into questionsData object
    function formatForBootstrapQuiz(flatList) {
        const questionsData = {
            "English": [],
            "General Knowledge": [],
            "General Science": [],
            "Mathematics": [],
            "I.Q": []
        };

        flatList.forEach((q, idx) => {
            const num = idx + 1;
            const prefixOpts = q.options.map((opt, oIdx) => {
                const letter = String.fromCharCode(65 + oIdx); // A, B, C, D
                const cleaned = String(opt).replace(/^[A-D]\.\s*/, '').trim();
                return `${letter}. ${cleaned}`;
            });

            const qObj = {
                id: num,
                subject: q.subject === 'Intelligence' ? 'I.Q' : q.subject,
                topic: q.topic,
                question: `${num}. ${q.question}`,
                options: prefixOpts,
                correct: q.correct
            };

            if (num >= 1 && num <= 30) {
                questionsData["English"].push(qObj);
            } else if (num >= 31 && num <= 50) {
                questionsData["General Knowledge"].push(qObj);
            } else if (num >= 51 && num <= 70) {
                questionsData["General Science"].push(qObj);
            } else if (num >= 71 && num <= 90) {
                questionsData["Mathematics"].push(qObj);
            } else {
                questionsData["I.Q"].push(qObj);
            }
        });

        return questionsData;
    }

    // Format for Tailwind Quizzes (uos-quiz3 through uos-quiz10)
    // Flat array with plain options
    function formatForTailwindQuiz(flatList) {
        return flatList.map((q, idx) => {
            const cleanOpts = q.options.map(opt => String(opt).replace(/^[A-D]\.\s*/, '').trim());
            return {
                id: idx + 1,
                subject: q.subject,
                topic: q.topic,
                question: q.question,
                options: cleanOpts,
                correct: q.correct
            };
        });
    }

    // =========================================================================
    // 4. PUBLIC API ENGINE OBJECT
    // =========================================================================

    const UOSQuestionEngine = {
        /**
         * Regenerates all 10 Mock Tests + Second Phase test with fresh, unique sets
         * Saves directly into localStorage
         */
        shuffleAndRegenerateAll: function() {
            const allTests = {};
            const totalTestsToGenerate = 10;

            for (let testId = 1; testId <= totalTestsToGenerate; testId++) {
                const sectionObj = compose100MCQTest(testId);
                const flat100 = buildFullOrdered100List(sectionObj);
                allTests[testId] = {
                    testId: testId,
                    generatedAt: new Date().toISOString(),
                    questions: flat100
                };
            }

            // Also create a special test for practice-test1 (phase2)
            const phase2Obj = compose100MCQTest(99);
            allTests['phase2'] = {
                testId: 'phase2',
                generatedAt: new Date().toISOString(),
                questions: buildFullOrdered100List(phase2Obj)
            };

            try {
                localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(allTests));
                localStorage.setItem(STORAGE_KEY_TIMESTAMP, new Date().toISOString());
            } catch (e) {
                console.warn('[UOSQuestionEngine] Could not persist to localStorage:', e);
            }

            return {
                success: true,
                totalTests: totalTestsToGenerate,
                totalQuestions: totalTestsToGenerate * 100,
                timestamp: new Date()
            };
        },

        /**
         * Retrieves raw flat 100 questions for a given test ID
         */
        getRawTestQuestions: function(testId) {
            let store = null;
            try {
                const raw = localStorage.getItem(STORAGE_KEY_TESTS);
                if (raw) store = JSON.parse(raw);
            } catch (e) {
                store = null;
            }

            const key = String(testId);
            if (store && store[key] && Array.isArray(store[key].questions) && store[key].questions.length === 100) {
                return store[key].questions;
            }

            // Fallback: Generate fresh if not in storage
            const freshSection = compose100MCQTest(parseInt(testId) || 1);
            return buildFullOrdered100List(freshSection);
        },

        /**
         * Returns questionsData object structure for Bootstrap Quizzes (1, 2, practice-test1)
         */
        getQuestionsDataForBootstrapQuiz: function(testId) {
            const raw = this.getRawTestQuestions(testId);
            return formatForBootstrapQuiz(raw);
        },

        /**
         * Returns flat array structure for Tailwind Quizzes (3 to 10)
         */
        getQuestionsForTailwindQuiz: function(testId) {
            const raw = this.getRawTestQuestions(testId);
            return formatForTailwindQuiz(raw);
        },

        /**
         * Check if dynamic questions are currently stored
         */
        hasDynamicQuestions: function() {
            try {
                return !!localStorage.getItem(STORAGE_KEY_TIMESTAMP);
            } catch (e) {
                return false;
            }
        },

        /**
         * Get last updated timestamp in human-readable format
         */
        getLastUpdatedTime: function() {
            try {
                const ts = localStorage.getItem(STORAGE_KEY_TIMESTAMP);
                if (!ts) return null;
                const d = new Date(ts);
                return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ', ' + d.toLocaleDateString();
            } catch (e) {
                return null;
            }
        },

        /**
         * Reset to initial / clear stored questions
         */
        resetToDefaults: function() {
            try {
                localStorage.removeItem(STORAGE_KEY_TESTS);
                localStorage.removeItem(STORAGE_KEY_TIMESTAMP);
            } catch (e) {}
        }
    };

    window.UOSQuestionEngine = UOSQuestionEngine;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = UOSQuestionEngine;
    }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));

