<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math Monsters</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Press Start 2P', cursive;
            background: linear-gradient(to bottom, #a0e9ff, #e6f7ff);
            color: #3f3f3f;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 16px;
            text-align: center;
        }
        .game-container {
            background-color: #fffde7;
            padding: 25px;
            border-radius: 25px;
            box-shadow: 0 12px 24px rgba(0,0,0,0.15), 0 0 0 5px #ffffff, 0 0 0 10px #ffd700;
            width: 100%;
            max-width: 600px; /* Slightly wider for more complex content */
        }
        .monster-area {
            width: 160px;
            height: 160px;
            margin: 15px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 90px;
            background-color: #fffacd;
            border-radius: 50%;
            border: 4px dashed #ffb6c1;
        }
        .monster-emoji {
            transition: transform 0.4s ease-in-out;
        }
        .monster-happy { animation: bounceHappy 0.7s ease-out; }
        .monster-sad { animation: shakeSad 0.7s ease-out; }

        @keyframes bounceHappy {
            0%, 100% { transform: scale(1) rotate(0deg) translateY(0); }
            30% { transform: scale(1.3) rotate(5deg) translateY(-20px); }
            60% { transform: scale(1.1) rotate(-3deg) translateY(5px); }
            80% { transform: scale(1.2) rotate(3deg) translateY(-10px); }
        }
        @keyframes shakeSad {
            0%, 100% { transform: scale(1) rotate(0deg); }
            20% { transform: scale(0.9) rotate(-8deg) translateX(-8px); }
            40% { transform: scale(0.9) rotate(8deg) translateX(8px); }
            60% { transform: scale(0.9) rotate(-8deg) translateX(-8px); }
            80% { transform: scale(0.9) rotate(8deg) translateX(8px); }
        }

        .question-text-display { /* Renamed from questionArea */
            font-size: 22px; /* Slightly smaller if visual is present */
            margin-bottom: 10px;
            color: #0077cc;
            min-height: 30px;
            line-height: 1.3;
        }
        
        .visual-content-area { /* New area for shapes/clock */
            width: 200px;
            height: 200px;
            margin: 10px auto 15px;
            background-color: #ffffff;
            border: 3px solid #0077cc;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .visual-content-area svg {
            max-width: 90%;
            max-height: 90%;
        }

        .answer-options-area {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px; /* Adjusted gap */
            margin: 20px 0;
            flex-wrap: wrap;
        }
        .answer-button {
            background-color: #ffda77;
            color: #8B4513;
            padding: 12px 18px; /* Adjusted padding */
            font-size: 18px; /* Adjusted font size */
            border: 3px solid #ffc107;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Press Start 2P', cursive;
            box-shadow: 0 5px 0 #e0a800;
            min-width: 70px;
        }
        .answer-button:hover { background-color: #ffc107; transform: translateY(-2px); box-shadow: 0 7px 0 #e0a800; }
        .answer-button:active { transform: translateY(2px); box-shadow: 0 2px 0 #e0a800; }
        .answer-button.disabled { opacity: 0.6; cursor: not-allowed; background-color: #ffe0b2; box-shadow: 0 5px 0 #f5c964; }

        .skip-button {
            background-color: #ff7f7f; color: white; padding: 12px 24px; font-size: 16px;
            border: none; border-radius: 12px; cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
            font-family: 'Press Start 2P', cursive; box-shadow: 0 4px 0 #d9534f; margin-top: 10px;
        }
        .skip-button:hover { background-color: #ff6666; transform: translateY(-2px); box-shadow: 0 6px 0 #d9534f; }
        .skip-button:active { transform: translateY(1px); box-shadow: 0 2px 0 #d9534f; }

        .message-area {
            font-size: 18px; margin-top: 20px; min-height: 30px; font-weight: bold;
            padding: 10px 15px; border-radius: 10px; transition: background-color 0.3s, color 0.3s;
        }
        .message-correct { color: #ffffff; background-color: #28a745; }
        .message-incorrect { color: #ffffff; background-color: #dc3545; }
        .message-info { color: #3f3f3f; background-color: #ffecb3; }

        .score-area { font-size: 16px; margin-top: 25px; color: #555; }
        .monster-collection { margin-top: 30px; background-color: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 15px; }
        .monster-collection h3 { font-size: 20px; color: #0077cc; margin-bottom: 10px; }
        .monster-icon {
            font-size: 35px; margin: 0 8px; cursor: pointer; opacity: 0.4;
            transition: opacity 0.3s ease, transform 0.2s ease; display: inline-block;
        }
        .monster-icon:hover { transform: scale(1.2); }
        .monster-icon.unlocked { opacity: 1; }
        .monster-icon.active-monster {
            border: 4px solid #ffcc00; border-radius: 50%; padding: 4px;
            background-color: rgba(255, 223, 102, 0.4); transform: scale(1.15); box-shadow: 0 0 10px #ffcc00;
        }
        .level-select { margin-bottom: 20px; }
        .level-select label { margin-right: 10px; font-size: 16px; color: #0077cc; }
        .level-select select {
            padding: 10px; font-size: 16px; border-radius: 10px;
            border: 3px solid #0077cc; font-family: 'Press Start 2P', cursive; background-color: #fff;
        }
    </style>
</head>
<body>

    <div class="game-container">
        <h1 class="text-4xl font-bold mb-6 text-orange-500">Math Monsters</h1>

        <div class="level-select">
            <label for="level">Level:</label>
            <select id="level">
                <option value="1">Level 1 (0-10 Add)</option>
                <option value="2">Level 2 (0-20 Add)</option>
                <option value="3">Level 3 (0-50 Add/Sub)</option>
                <option value="4">Level 4 (Identify Shapes)</option>
                <option value="5">Level 5 (Tell Time o'clock/half-past)</option>
            </select>
        </div>

        <div class="monster-area" id="monsterArea">
            </div>

        <div class="question-text-display" id="questionTextDisplay">
            </div>
        
        <div class="visual-content-area" id="visualContentArea" style="display: none;">
            </div>

        <div id="answerOptionsArea" class="answer-options-area">
            </div>

        <button id="skipButton" class="skip-button">Skip Question</button>

        <div class="message-area" id="messageArea">
            </div>

        <div class="score-area">
            Score: <span id="score">0</span> | Streak: <span id="streak">0</span>
        </div>

        <div class="monster-collection">
            <h3>Your Monsters:</h3>
            <div id="monsterIconsContainer">
                </div>
        </div>
    </div>

    <script>
        // --- Game Configuration ---
        const monsters = [
            { id: 'm1', emoji: '👻', unlocked: true, name: 'Ghostly Gus' },
            { id: 'm2', emoji: '🎃', unlocked: false, name: 'Pumpkin Pete', unlockScore: 5 },
            { id: 'm3', emoji: '👹', unlocked: false, name: 'Ogre Oscar', unlockScore: 10 },
            { id: 'm4', emoji: '👽', unlocked: false, name: 'Alien Al', unlockScore: 15 },
            { id: 'm5', emoji: '🐲', unlocked: false, name: 'Dragon Denny', unlockScore: 20 }
        ];
        const shapesData = [
            { name: 'Circle', draw: (el) => el.innerHTML = `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#3498db" stroke="#2980b9" stroke-width="4"/></svg>` },
            { name: 'Square', draw: (el) => el.innerHTML = `<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="#e74c3c" stroke="#c0392b" stroke-width="4"/></svg>` },
            { name: 'Triangle', draw: (el) => el.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="#2ecc71" stroke="#27ae60" stroke-width="4"/></svg>` },
            { name: 'Rectangle', draw: (el) => el.innerHTML = `<svg viewBox="0 0 100 100"><rect x="10" y="25" width="80" height="50" fill="#f1c40f" stroke="#f39c12" stroke-width="4"/></svg>` },
            { name: 'Star', draw: (el) => el.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="50,5 61,39 98,39 68,61 79,95 50,75 21,95 32,61 2,39 39,39" fill="#9b59b6" stroke="#8e44ad" stroke-width="4"/></svg>` }
        ];

        let currentMonsterId = 'm1';
        let score = 0;
        let streak = 0;
        let currentQuestion = { text: "", answer: null, options: [], type: 'math' };
        let maxNumber = 10;
        let allowSubtraction = false;
        let currentLevelType = 'math'; // 'math', 'shapes', 'time'

        // --- HTML Elements ---
        const monsterArea = document.getElementById('monsterArea');
        const questionTextDisplay = document.getElementById('questionTextDisplay');
        const visualContentArea = document.getElementById('visualContentArea');
        const answerOptionsArea = document.getElementById('answerOptionsArea');
        const skipButton = document.getElementById('skipButton');
        const messageArea = document.getElementById('messageArea');
        const scoreDisplay = document.getElementById('score');
        const streakDisplay = document.getElementById('streak');
        const monsterIconsContainer = document.getElementById('monsterIconsContainer');
        const levelSelect = document.getElementById('level');

        // --- Speech Synthesis ---
        const synth = window.speechSynthesis;
        let voices = [];
        function populateVoiceList() { /* ... (same as before) ... */ }
        populateVoiceList();
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }
        function speak(text) { /* ... (same as before, ensure it handles null/undefined text gracefully) ... */ 
            if (typeof speechSynthesis === 'undefined' || !text) return;
            if (synth.speaking) {
                // Optional: synth.cancel(); // To interrupt previous speech
                return; // Or queue, for now, skip if busy
            }
            const utterThis = new SpeechSynthesisUtterance(text);
            utterThis.onerror = (event) => console.error('SpeechSynthesisUtterance.onerror', event);
            let selectedVoice = voices.find(voice => voice.name.includes('Google') && voice.lang.includes('en-US')) ||
                                voices.find(voice => voice.lang.includes('en-US')) ||
                                voices.find(voice => voice.lang.startsWith('en')) || // Broader English match
                                voices[0];
            if (selectedVoice) utterThis.voice = selectedVoice;
            utterThis.pitch = 1.2;
            utterThis.rate = 0.9;
            synth.speak(utterThis);
        }


        // --- Question Generation ---
        function generateMathQuestion() {
            let num1 = Math.floor(Math.random() * (maxNumber + 1));
            let num2 = Math.floor(Math.random() * (maxNumber + 1));
            let operation = '+';
            let answer;

            if (allowSubtraction && Math.random() > 0.4) {
                operation = '-';
                if (num1 < num2) [num1, num2] = [num2, num1];
                answer = num1 - num2;
            } else {
                operation = '+';
                answer = num1 + num2;
                if (answer > maxNumber + (maxNumber > 10 ? 5 : 2)) {
                    num2 = Math.floor(Math.random() * Math.max(0, (maxNumber - num1 + (maxNumber > 10 ? 3 : 1))));
                    if (num2 < 0) num2 = 0;
                    answer = num1 + num2;
                }
            }
            currentQuestion.text = `${num1} ${operation} ${num2} = ?`;
            currentQuestion.answer = answer;
            currentQuestion.options = generateMathOptions(answer, maxNumber);
            visualContentArea.style.display = 'none'; // Hide visual area for math
            visualContentArea.innerHTML = '';
        }

        function generateShapeQuestion() {
            const randomIndex = Math.floor(Math.random() * shapesData.length);
            const selectedShape = shapesData[randomIndex];
            
            currentQuestion.text = "What shape is this?";
            currentQuestion.answer = selectedShape.name;
            currentQuestion.options = generateShapeOptions(selectedShape.name);
            
            visualContentArea.style.display = 'flex';
            selectedShape.draw(visualContentArea);
            speak("What shape is this? Look at the screen.");
        }
        
        function drawClock(hour, minute) {
            const clockSize = 180; // SVG viewbox size
            const centerX = clockSize / 2;
            const centerY = clockSize / 2;
            const hourHandLength = clockSize * 0.25;
            const minuteHandLength = clockSize * 0.38;
            const handStrokeWidth = clockSize * 0.03;

            // Calculate angles
            const minuteAngle = (minute / 60) * 360;
            const hourAngle = ((hour % 12 + minute / 60) / 12) * 360;

            // Function to get hand coordinates
            const getHandCoords = (angle, length) => {
                const radians = (angle - 90) * Math.PI / 180; // -90 to start from 12 o'clock
                return {
                    x2: centerX + length * Math.cos(radians),
                    y2: centerY + length * Math.sin(radians)
                };
            };

            const hourHand = getHandCoords(hourAngle, hourHandLength);
            const minuteHand = getHandCoords(minuteAngle, minuteHandLength);

            let clockHTML = `<svg viewBox="0 0 ${clockSize} ${clockSize}" xmlns="http://www.w3.org/2000/svg">`;
            // Clock face
            clockHTML += `<circle cx="${centerX}" cy="${centerY}" r="${clockSize * 0.45}" fill="#fff" stroke="#333" stroke-width="3"/>`;
            // Hour markings (simple dots for now)
            for (let i = 0; i < 12; i++) {
                const angle = i * 30 - 90; // -90 to start from 12
                const markX = centerX + (clockSize * 0.4) * Math.cos(angle * Math.PI / 180);
                const markY = centerY + (clockSize * 0.4) * Math.sin(angle * Math.PI / 180);
                clockHTML += `<circle cx="${markX}" cy="${markY}" r="${clockSize*0.015}" fill="#333"/>`;
            }
            // Center dot
             clockHTML += `<circle cx="${centerX}" cy="${centerY}" r="${clockSize*0.03}" fill="#000"/>`;
            // Hands
            clockHTML += `<line x1="${centerX}" y1="${centerY}" x2="${minuteHand.x2}" y2="${minuteHand.y2}" stroke="#333" stroke-width="${handStrokeWidth}" stroke-linecap="round"/>`; // Minute hand
            clockHTML += `<line x1="${centerX}" y1="${centerY}" x2="${hourHand.x2}" y2="${hourHand.y2}" stroke="#000" stroke-width="${handStrokeWidth * 1.2}" stroke-linecap="round"/>`; // Hour hand (thicker)
            clockHTML += `</svg>`;
            visualContentArea.innerHTML = clockHTML;
        }


        function generateTimeQuestion() {
            const hour = Math.floor(Math.random() * 12) + 1; // 1 to 12
            const minute = Math.random() < 0.5 ? 0 : 30; // 00 or 30

            const minuteStr = minute === 0 ? "00" : "30";
            const timeString = `${hour}:${minuteStr}`;
            
            currentQuestion.text = "What time is it?";
            currentQuestion.answer = timeString;
            currentQuestion.options = generateTimeOptions(timeString);
            
            visualContentArea.style.display = 'flex';
            drawClock(hour, minute);
            speak("What time does the clock show?");
        }

        // --- Option Generation ---
        function generateMathOptions(correctAnswer, maxNum) { /* ... (same as before) ... */ 
            let options = new Set();
            options.add(correctAnswer);
            let attempts = 0;
            while (options.size < 3 && attempts < 20) {
                let distractor;
                const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                const offsetType = Math.random();
                if (offsetType < 0.5) { 
                    distractor = correctAnswer + (plusOrMinus * (Math.floor(Math.random() * 3) + 1));
                } else if (offsetType < 0.8) {
                    distractor = correctAnswer + (plusOrMinus * (Math.floor(Math.random() * 5) + 1));
                } else { 
                    distractor = Math.floor(Math.random() * (maxNum + Math.min(5, maxNum)));
                }
                if (distractor >= 0 && distractor !== correctAnswer && !options.has(distractor)) {
                    options.add(distractor);
                }
                attempts++;
            }
            let filler = 0;
            while(options.size < 3) {
                if (filler >=0 && !options.has(filler)) { options.add(filler); }
                filler++;
                if (filler > maxNum + 5) break;
            }
            return Array.from(options).sort(() => Math.random() - 0.5);
        }

        function generateShapeOptions(correctShapeName) {
            let options = new Set();
            options.add(correctShapeName);
            let availableShapes = shapesData.map(s => s.name).filter(name => name !== correctShapeName);
            
            while (options.size < 3 && availableShapes.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableShapes.length);
                options.add(availableShapes.splice(randomIndex, 1)[0]);
            }
            // Fallback if not enough unique shapes (shouldn't happen with 5 shapes)
            const allShapeNames = shapesData.map(s => s.name);
            let fillerIndex = 0;
            while(options.size < 3 && fillerIndex < allShapeNames.length) {
                if (!options.has(allShapeNames[fillerIndex])) {
                    options.add(allShapeNames[fillerIndex]);
                }
                fillerIndex++;
            }
            return Array.from(options).sort(() => Math.random() - 0.5);
        }

        function generateTimeOptions(correctTimeStr) {
            let options = new Set();
            options.add(correctTimeStr);
            const [correctHour, correctMinute] = correctTimeStr.split(':').map(Number);

            let attempts = 0;
            while (options.size < 3 && attempts < 20) {
                let randomHour = Math.floor(Math.random() * 12) + 1;
                let randomMinute = Math.random() < 0.5 ? 0 : 30;
                let distractorTimeStr = `${randomHour}:${randomMinute === 0 ? "00" : "30"}`;

                // Try to make distractors somewhat plausible
                if (Math.random() < 0.4) { // Off by 30 mins
                    randomHour = correctHour;
                    randomMinute = correctMinute === 0 ? 30 : 0;
                } else if (Math.random() < 0.7) { // Off by an hour
                    randomHour = (correctHour % 12) + (Math.random() < 0.5 ? -1 : 1);
                    if (randomHour === 0) randomHour = 12;
                    if (randomHour === 13) randomHour = 1;
                    randomMinute = correctMinute;
                }
                distractorTimeStr = `${randomHour}:${randomMinute === 0 ? "00" : "30"}`;

                if (!options.has(distractorTimeStr)) {
                    options.add(distractorTimeStr);
                }
                attempts++;
            }
             // Fallback for unique options
            let hourFiller = 1;
            let minFiller = 0;
            while(options.size < 3) {
                let fillerTime = `${hourFiller}:${minFiller === 0 ? "00" : "30"}`;
                if (!options.has(fillerTime)) {
                    options.add(fillerTime);
                }
                minFiller += 30;
                if (minFiller >= 60) {
                    minFiller = 0;
                    hourFiller++;
                    if (hourFiller > 12) hourFiller = 1;
                }
                if (hourFiller === 1 && minFiller === 0 && options.size > 1) break; // Avoid infinite loop if somehow stuck
            }
            return Array.from(options).sort(() => Math.random() - 0.5);
        }

        // --- Main Game Flow ---
        function generateQuestion() {
            currentQuestion.type = currentLevelType;
            if (currentLevelType === 'math') {
                generateMathQuestion();
            } else if (currentLevelType === 'shapes') {
                generateShapeQuestion();
            } else if (currentLevelType === 'time') {
                generateTimeQuestion();
            }

            questionTextDisplay.textContent = currentQuestion.text;
            if (currentLevelType === 'math') { // Only speak math questions automatically if not shape/time (they have custom speak calls)
                speak(currentQuestion.text.replace("= ?", "equals what?"));
            }


            answerOptionsArea.innerHTML = '';
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('answer-button');
                button.textContent = option;
                button.onclick = () => handleAnswerClick(option);
                answerOptionsArea.appendChild(button);
            });
            enableAnswerButtons(true);
        }

        function handleAnswerClick(chosenAnswer) {
            enableAnswerButtons(false);
            const monsterElement = document.querySelector('#monsterArea .monster-emoji');
            messageArea.className = 'message-area';

            if (chosenAnswer === currentQuestion.answer) {
                messageArea.textContent = "Correct! Yum yum!";
                messageArea.classList.add('message-correct');
                speak("Correct! Great job!");
                score++; streak++;
                if (monsterElement) monsterElement.classList.add('monster-happy');
                unlockMonsters();
            } else {
                messageArea.textContent = `Oops! The answer was ${currentQuestion.answer}.`;
                messageArea.classList.add('message-incorrect');
                speak(`Not quite! The correct answer was ${currentQuestion.answer}.`);
                streak = 0;
                if (monsterElement) monsterElement.classList.add('monster-sad');
            }
            updateScoreDisplay();

            setTimeout(() => {
                if (monsterElement) monsterElement.classList.remove('monster-happy', 'monster-sad');
                messageArea.textContent = "";
                messageArea.className = 'message-area';
                generateQuestion();
            }, 2500);
        }
        
        function enableAnswerButtons(enable) { /* ... (same as before) ... */ 
            const buttons = answerOptionsArea.querySelectorAll('.answer-button');
            buttons.forEach(button => {
                button.disabled = !enable;
                button.classList.toggle('disabled', !enable);
            });
        }
        function updateScoreDisplay() { /* ... (same as before) ... */ 
            scoreDisplay.textContent = score;
            streakDisplay.textContent = streak;
        }
        function displayCurrentMonster() { /* ... (same as before) ... */ 
             const monster = monsters.find(m => m.id === currentMonsterId);
            if (monster) {
                monsterArea.innerHTML = `<span class="monster-emoji">${monster.emoji}</span>`;
            }
            updateMonsterIconsVisual();
        }
        function unlockMonsters() { /* ... (same as before) ... */ 
            let newUnlock = false;
            monsters.forEach(monster => {
                if (!monster.unlocked && score >= monster.unlockScore) {
                    monster.unlocked = true;
                    newUnlock = true;
                    setTimeout(() => {
                        const unlockMsg = `Wow! You've unlocked ${monster.name}!`;
                        messageArea.textContent = unlockMsg;
                        messageArea.className = 'message-area message-info';
                        speak(unlockMsg);
                    }, 1000);
                }
            });
            if (newUnlock) renderMonsterIcons();
        }
        function renderMonsterIcons() { /* ... (same as before) ... */ 
            monsterIconsContainer.innerHTML = '';
            monsters.forEach(monster => {
                const iconSpan = document.createElement('span');
                iconSpan.classList.add('monster-icon');
                iconSpan.textContent = monster.emoji;
                iconSpan.title = `${monster.name}${monster.unlocked ? '' : ` (Unlock at ${monster.unlockScore} points)`}`;
                if (monster.unlocked) {
                    iconSpan.classList.add('unlocked');
                    iconSpan.onclick = () => {
                        if (currentMonsterId !== monster.id) {
                            currentMonsterId = monster.id;
                            displayCurrentMonster();
                            speak(`You chose ${monster.name}!`);
                        }
                    };
                }
                if (monster.id === currentMonsterId) iconSpan.classList.add('active-monster');
                monsterIconsContainer.appendChild(iconSpan);
            });
        }
        function updateMonsterIconsVisual() { /* ... (same as before) ... */
            const icons = monsterIconsContainer.querySelectorAll('.monster-icon');
            icons.forEach(icon => {
                icon.classList.remove('active-monster');
                const monsterName = icon.title.split(' (')[0];
                const monster = monsters.find(m => m.name === monsterName);
                if (monster && monster.id === currentMonsterId) {
                    icon.classList.add('active-monster');
                }
            });
         }

        function handleLevelChange() {
            const selectedLevelValue = levelSelect.value;
            let levelSpeakText = `Level ${selectedLevelValue} selected.`;

            switch (selectedLevelValue) {
                case '1':
                    currentLevelType = 'math'; maxNumber = 10; allowSubtraction = false;
                    levelSpeakText += " Addition up to 10.";
                    break;
                case '2':
                    currentLevelType = 'math'; maxNumber = 20; allowSubtraction = false;
                    levelSpeakText += " Addition up to 20.";
                    break;
                case '3':
                    currentLevelType = 'math'; maxNumber = 50; allowSubtraction = true;
                    levelSpeakText += " Addition and Subtraction up to 50.";
                    break;
                case '4':
                    currentLevelType = 'shapes';
                    levelSpeakText = "Shape identification level!";
                    break;
                case '5':
                    currentLevelType = 'time';
                    levelSpeakText = "Telling time level!";
                    break;
            }
            score = 0; streak = 0;
            updateScoreDisplay();
            generateQuestion(); // This will now use currentLevelType
            speak(levelSpeakText + " Let's go!");
        }

        // --- Event Listeners ---
        skipButton.addEventListener('click', () => { /* ... (same as before, ensure visual area is handled if needed) ... */
            enableAnswerButtons(false);
            messageArea.textContent = `Skipped! The answer was ${currentQuestion.answer}.`;
            messageArea.className = 'message-area message-info';
            speak(`Skipping! The correct answer was ${currentQuestion.answer}.`);
            streak = 0;
            updateScoreDisplay();
            const monsterElement = document.querySelector('#monsterArea .monster-emoji');
            if (monsterElement) monsterElement.classList.add('monster-sad');

            setTimeout(() => {
                if (monsterElement) monsterElement.classList.remove('monster-sad');
                messageArea.textContent = "";
                messageArea.className = 'message-area';
                // visualContentArea.style.display = 'none'; // Hide visual area on skip if it was shown
                // visualContentArea.innerHTML = '';
                generateQuestion();
            }, 2000);
         });
        levelSelect.addEventListener('change', handleLevelChange);

        // --- Initialization ---
        function initGame() {
            populateVoiceList();
            displayCurrentMonster();
            renderMonsterIcons();
            handleLevelChange();
            updateScoreDisplay();
            document.body.classList.add('game-initialized');
        }

        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => {
                populateVoiceList();
                if (!document.body.classList.contains('game-initialized')) initGame();
            };
        }
        setTimeout(() => {
             if (!document.body.classList.contains('game-initialized')) initGame();
        }, 250); // Slightly longer timeout for voice init robustness
    </script>
</body>
</html>
