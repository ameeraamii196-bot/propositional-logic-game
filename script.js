
/* =========================================
   PROPOSITIONAL LOGIC GAME
========================================= */


/* =========================================
   GAME LEVELS
========================================= */

const levels = [

    /* LEVEL 1 */

    {
        difficulty: "EASY",

        operator: "AND ( ∧ )",

        title: "The Security Door",

        story:
            "An AI security system checks two conditions before opening a laboratory door.",

        facts: [
            "P = The key is valid → TRUE",
            "Q = The user is verified → TRUE"
        ],

        formula: "P ∧ Q",

        answer: "TRUE",

        explanation:
            "AND is TRUE only when both propositions are TRUE. P and Q are both TRUE, so P ∧ Q is TRUE."
    },


    /* LEVEL 2 */

    {
        difficulty: "EASY",

        operator: "NOT ( ¬ )",

        title: "Emergency Alarm",

        story:
            "A robot needs to determine whether the emergency alarm is NOT active.",

        facts: [
            "P = Emergency alarm is active → FALSE"
        ],

        formula: "¬P",

        answer: "TRUE",

        explanation:
            "NOT reverses the truth value. Since P is FALSE, ¬P becomes TRUE."
    },


    /* LEVEL 3 */

    {
        difficulty: "EASY+",

        operator: "OR ( ∨ )",

        title: "Backup Internet",

        story:
            "An AI system can connect to the internet if at least one connection method is available.",

        facts: [
            "P = Wi-Fi available → FALSE",
            "Q = Mobile data available → TRUE"
        ],

        formula: "P ∨ Q",

        answer: "TRUE",

        explanation:
            "OR is TRUE when at least one proposition is TRUE. Q is TRUE, so P ∨ Q is TRUE."
    },


    /* LEVEL 4 */

    {
        difficulty: "MEDIUM",

        operator: "IMPLICATION ( → )",

        title: "Smart Cooling System",

        story:
            "An AI-controlled building follows this rule: if the temperature is high, the cooling system turns on.",

        facts: [
            "P = Temperature is high → TRUE",
            "Q = Cooling system turns on → TRUE"
        ],

        formula: "P → Q",

        answer: "TRUE",

        explanation:
            "P → Q means 'If P, then Q.' Since P is TRUE and Q is also TRUE, the implication is TRUE."
    },


    /* LEVEL 5 */

    {
        difficulty: "MEDIUM+",

        operator: "IMPLICATION ( → )",

        title: "Motion Detector",

        story:
            "An AI security system follows the rule: if motion is detected, the light must turn on.",

        facts: [
            "P = Motion detected → TRUE",
            "Q = Light turns on → FALSE"
        ],

        formula: "P → Q",

        answer: "FALSE",

        explanation:
            "An implication is FALSE when P is TRUE but Q is FALSE. Motion was detected, but the light did not turn on."
    },


    /* LEVEL 6 */

    {
        difficulty: "HARD",

        operator: "COMPOUND LOGIC",

        title: "Autonomous Car",

        story:
            "An autonomous car decides whether it is safe to proceed using multiple conditions.",

        facts: [
            "P = Traffic light is green → TRUE",
            "Q = Road is clear → TRUE",
            "R = Emergency vehicle detected → FALSE"
        ],

        formula: "(P ∧ Q) ∧ ¬R",

        answer: "TRUE",

        explanation:
            "P ∧ Q is TRUE because both P and Q are TRUE. R is FALSE, so ¬R is TRUE. Therefore the complete expression is TRUE."
    },


    /* LEVEL 7 */

    {
        difficulty: "AI CHALLENGE",

        operator: "INFERENCE / MODUS PONENS",

        title: "AI Knowledge Base",

        story:
            "An AI knowledge base contains a rule and a known fact. Can the AI derive a new conclusion?",

        facts: [
            "Rule: If a server is overloaded, the AI sends an alert.",
            "Fact: The server is overloaded."
        ],

        formula: "P → Q,   P   ⟹   Q",

        answer: "TRUE",

        explanation:
            "This is Modus Ponens. If P → Q and P is TRUE, then we can conclude Q is TRUE. The AI can infer that it should send an alert."
    }

];


/* =========================================
   GAME VARIABLES
========================================= */

let currentLevel = 0;

let score = 0;

let answered = false;


/* =========================================
   GET HTML ELEMENTS
========================================= */

const levelElement =
    document.getElementById("level");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const operatorElement =
    document.getElementById("operator");

const titleElement =
    document.getElementById("title");

const storyElement =
    document.getElementById("story");

const factsElement =
    document.getElementById("facts");

const formulaElement =
    document.getElementById("formula");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextBtn");

const trueButton =
    document.getElementById("trueBtn");

const falseButton =
    document.getElementById("falseBtn");

const gameArea =
    document.getElementById("gameArea");

const finishScreen =
    document.getElementById("finish");

const finalScore =
    document.getElementById("finalScore");

const restartButton =
    document.getElementById("restartBtn");


/* =========================================
   LOAD LEVEL
========================================= */

function loadLevel() {

    answered = false;

    const level = levels[currentLevel];


    /* Level badge */

    levelElement.textContent =
        `Level ${currentLevel + 1} • ${level.difficulty}`;


    /* Score */

    scoreElement.textContent =
        `Score: ${score}`;


    /* Operator */

    operatorElement.textContent =
        level.operator;


    /* Title */

    titleElement.textContent =
        level.title;


    /* Story */

    storyElement.textContent =
        level.story;


    /* Formula */

    formulaElement.textContent =
        level.formula;


    /* Facts */

    factsElement.innerHTML = "";


    level.facts.forEach(function (fact) {

        const div =
            document.createElement("div");

        div.classList.add("fact");

        div.textContent =
            "• " + fact;

        factsElement.appendChild(div);

    });


    /* Reset feedback */

    feedbackElement.style.display =
        "none";

    feedbackElement.innerHTML = "";

    feedbackElement.className =
        "feedback";


    /* Hide next button */

    nextButton.style.display =
        "none";


    /* Enable answer buttons */

    trueButton.disabled = false;

    falseButton.disabled = false;


    /* Progress */

    const progress =
        (currentLevel / levels.length) * 100;

    progressBar.style.width =
        progress + "%";
}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(userAnswer) {

    if (answered) {
        return;
    }


    answered = true;


    const level =
        levels[currentLevel];


    const isCorrect =
        userAnswer === level.answer;


    /* Correct */

    if (isCorrect) {

        score += 10;


        feedbackElement.className =
            "feedback correct";


        feedbackElement.innerHTML = `
            <strong>✅ Correct! +10 points</strong>

            <br><br>

            ${level.explanation}
        `;

    }


    /* Wrong */

    else {

        feedbackElement.className =
            "feedback wrong";


        feedbackElement.innerHTML = `
            <strong>❌ Not quite!</strong>

            <br><br>

            The correct answer is
            <strong>${level.answer}</strong>.

            <br><br>

            ${level.explanation}
        `;

    }


    /* Update score */

    scoreElement.textContent =
        `Score: ${score}`;


    /* Show feedback */

    feedbackElement.style.display =
        "block";


    /* Disable answer buttons */

    trueButton.disabled = true;

    falseButton.disabled = true;


    /* Next button */

    if (currentLevel === levels.length - 1) {

        nextButton.textContent =
            "🏁 Finish Game";

    }

    else {

        nextButton.textContent =
            "Next Challenge →";

    }


    nextButton.style.display =
        "block";
}


/* =========================================
   NEXT LEVEL
========================================= */

function nextLevel() {

    currentLevel++;


    if (currentLevel >= levels.length) {

        showFinishScreen();

        return;
    }


    loadLevel();
}


/* =========================================
   SHOW FINISH SCREEN
========================================= */

function showFinishScreen() {

    gameArea.style.display =
        "none";


    finishScreen.style.display =
        "block";


    finalScore.textContent =
        `${score} / ${levels.length * 10}`;


    progressBar.style.width =
        "100%";
}


/* =========================================
   RESTART GAME
========================================= */

function restartGame() {

    currentLevel = 0;

    score = 0;

    answered = false;


    gameArea.style.display =
        "block";


    finishScreen.style.display =
        "none";


    loadLevel();
}


/* =========================================
   BUTTON EVENTS
========================================= */

trueButton.addEventListener(
    "click",
    function () {

        checkAnswer("TRUE");

    }
);


falseButton.addEventListener(
    "click",
    function () {

        checkAnswer("FALSE");

    }
);


nextButton.addEventListener(
    "click",
    nextLevel
);


restartButton.addEventListener(
    "click",
    restartGame
);


/* =========================================
   START GAME
========================================= */

loadLevel();
