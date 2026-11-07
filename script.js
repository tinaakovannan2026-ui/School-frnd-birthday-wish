
const questions = [
    {
        question: "Birthday boy, first question! 😂",
        answers: [
            "I'm so innocent 😇",
            "I'm a certified loosu 🤡",
            "I'm a superstar 😎",
            "Ask my enemies 😂"
        ],
        correct: 1,
        messages: [
            "Innocent-ah? Yaaru nambuvaanga da? 😂",
            "Finally, unmai pesura! 🤣",
            "Oscar award ready pannunga! 🎬",
            "Un enemies list perusa irukku pola! 😂"
        ]
    },
    {
        question: "Un birthday wish enna da? 🎂",
        answers: [
            "Money, please 💸",
            "Food, obviously 🍕",
            "Happiness and success ❤️",
            "Leave me alone 😴"
        ],
        correct: 2,
        messages: [
            "Cash counter anga irukku... poi kelu! 😂",
            "Unakku cake vida food dhaan mukkiyam! 🤣",
            "Super! Unakku nalla things ellam nadakkanum da! ❤️",
            "Birthday annaikku kooda attitude-ah? 😭"
        ]
    },
    {
        question: "Namma duo-ku correct title enna? 😎",
        answers: [
            "Two legends ✨",
            "Two loosus 🤡",
            "Comedy department 😂",
            "All of the above 🏆"
        ],
        correct: 3,
        messages: [
            "Konjam over build-up da! 😂",
            "Adhuvum correct dhaan! 🤣",
            "Daily entertainment guaranteed! 🎬",
            "Correct! Namma duo-va beat panna yaarum illa! ❤️"
        ]
    },
    {
        question: "Final birthday question, Karuvaya... ❤️",
        answers: [
            "I'm the best 😎",
            "I deserve cake 🎂",
            "I deserve all good things 🫶",
            "Where is my gift? 🎁"
        ],
        correct: 2,
        messages: [
            "Confidence-ku oru alavu venama da? 😂",
            "Cake-ku mattum full attendance! 🤣",
            "Exactly! Unakku happiness, health, success ellam kidaikkanum! ❤️",
            "Gift-ku ivlo avasaram-ah? Surprise wait pannu! 🎁"
        ]
    }
];

const memories = [
    {
        image: "photo1.jpg.jpeg",
        title: "The Birthday Legend 😂",
        message: "Indha photo-la irukkura rendu perum innocent-nu solla mudiyadhu! 😂 Aana indha maadhiri moments dhaan namma friendship-ah special-aakkudhu. Happy birthday, Karuvaya! ❤️"
    },
    {
        image: "photo2.jpg.jpeg",
        title: "Certified Chaos 🤡",
        message: "Namma rendu perum serndha comedy-ku separate audience venum! 🤣 Innikki un birthday, so unnoda mokka jokes-kum konjam extra respect kudukkurom da!"
    },
    {
        image: "photo3.jpg.jpeg",
        title: "A Memory to Keep 🫶",
        message: "Indha photo oru chinna moment dhaan. Aana future-la idha paathu smile pannuvom. Un birthday-la indha memory-ah celebrate panradhu enakku happy-ah irukku. 🥹"
    },
    {
        image: "photo4.jpg.jpeg",
        title: "Always My Karuvaya ❤️",
        message: "Unna kalaaikka reasons neraya irukku da! 😂 Aana unakku nalla things nadakkanum-nu manasaara wish panradhukku reasons thevai illa. Happy birthday, loosu! 🫂"
    }
];

let currentQuestion = 0;
let score = 0;
let openedMemories = new Set();
let toastTimer;
let confettiTimer;

const introOverlay = document.getElementById("introOverlay");
const startExperienceButton = document.getElementById("startExperience");

startExperienceButton.addEventListener("click", () => {
    introOverlay.classList.add("leaving");
    confetti(28);
});

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function startGame() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("score").textContent = score;
    showScreen("game");
    loadQuestion();
}

function loadQuestion() {
    const data = questions[currentQuestion];

    document.getElementById("question").textContent = data.question;
    document.getElementById("questionCount").textContent =
        `BIRTHDAY CHALLENGE ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("gameMessage").textContent = "";

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    data.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;

        button.addEventListener("click", () => {
            // Prevent clicking multiple answers for one question.
            if (answersContainer.dataset.answered === "true") {
                return;
            }

            answersContainer.dataset.answered = "true";

            if (index === data.correct) {
                score += 10;
                document.getElementById("score").textContent = score;
            }

            document.getElementById("gameMessage").textContent =
                data.messages[index];

            answersContainer.querySelectorAll("button").forEach(btn => {
                btn.disabled = true;
            });

            const nextButton = document.createElement("button");
            nextButton.className = "next-question";
            nextButton.textContent =
                currentQuestion === questions.length - 1
                    ? "Unlock My Birthday Surprise 🎁"
                    : "Next Challenge ➜";

            nextButton.addEventListener("click", () => {
                currentQuestion++;

                if (currentQuestion < questions.length) {
                    loadQuestion();
                } else {
                    showScreen("surprise");
                    confetti(75);
                }
            });

            answersContainer.appendChild(nextButton);
        });

        answersContainer.appendChild(button);
    });

    answersContainer.dataset.answered = "false";
}

function showMemories() {
    showScreen("memories");

    const grid = document.getElementById("memoryGrid");
    grid.innerHTML = "";
    openedMemories.clear();

    document.getElementById("memoryProgress").textContent =
        "0 / 4 memories opened ✦";

    document.getElementById("letterButton").classList.add("hidden");

    memories.forEach((memory, index) => {
        const card = document.createElement("div");

        card.className = "memory-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Flip photo card ${index + 1}`);

        const inner = document.createElement("div");
        inner.className = "card-inner";

        const front = document.createElement("div");
        front.className = "card-front";

        const img = document.createElement("img");
        img.src = memory.image;
        img.alt = memory.title;
        img.loading = "lazy";

        img.onerror = () => {
            img.style.display = "none";
            front.style.background =
                "linear-gradient(135deg, #34234f, #733b6b)";
            const errorText = document.createElement("div");
            errorText.className = "front-label";
            errorText.textContent = "Photo not found — check filename";
            front.appendChild(errorText);
        };

        const shade = document.createElement("div");
        shade.className = "photo-shade";

        const label = document.createElement("div");
        label.className = "front-label";
        label.textContent = `MEMORY ${index + 1} · TAP TO REVEAL ✦`;

        front.append(img, shade, label);

        const back = document.createElement("div");
        back.className = "card-back";

        const number = document.createElement("span");
        number.className = "memory-number";
        number.textContent = `MEMORY 0${index + 1}`;

        const heading = document.createElement("h3");
        heading.textContent = memory.title;

        const message = document.createElement("p");
        message.textContent = memory.message;

        const heart = document.createElement("div");
        heart.className = "card-heart";
        heart.textContent = "❤️";

        back.append(number, heading, message, heart);
        inner.append(front, back);
        card.appendChild(inner);

        function flipCard() {
            const nowFlipped = card.classList.toggle("flipped");

            if (nowFlipped) {
                openedMemories.add(index);
            } else {
                openedMemories.delete(index);
            }

            document.getElementById("memoryProgress").textContent =
                `${openedMemories.size} / 4 memories opened ✦`;

            if (openedMemories.size === 4) {
                document.getElementById("letterButton").classList.remove("hidden");
                showToast("All memories unlocked! Final surprise ready 💌");
                confetti(40);
            }
        }

        card.addEventListener("click", flipCard);

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                flipCard();
            }
        });

        grid.appendChild(card);
    });
}

function showEnding() {
    showScreen("ending");
    confetti(55);
}

function celebrate() {
    const finalMessage = document.getElementById("finalMessage");

    finalMessage.textContent =
        "Happy Birthday, Karuvaya! 🎂 May your next chapter be full of happiness, love and success. ❤️✨";

    confetti(120);
    showToast("Birthday wish sent with extra friendship love ❤️");
}

function replayIntro() {
    currentQuestion = 0;
    score = 0;
    openedMemories.clear();

    document.getElementById("score").textContent = "0";
    document.getElementById("finalMessage").textContent = "";

    introOverlay.classList.remove("leaving");
    showScreen("welcome");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

function confetti(amount = 50) {
    const container = document.getElementById("confettiContainer");
    const symbols = ["✦", "✨", "🎉", "💖", "🎂", "⭐", "💕", "🎈"];

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.fontSize = `${12 + Math.random() * 18}px`;
        piece.style.animationDelay = `${Math.random() * 1.5}s`;
        piece.style.setProperty(
            "--drift",
            `${Math.round(Math.random() * 180 - 90)}px`
        );

        container.appendChild(piece);

        setTimeout(() => piece.remove(), 5000);
    }
}
