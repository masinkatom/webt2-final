let questionDummy =
    [
        {
            "id_question": 4,
            "text_q": "What is the function of mitochondria?",
            "active": 0,
            "open": 1,
            "id_set": 20,
            "creationDate": "2024-05-02",
            "code": "abcde",
            "cloudmap": null,
            "adminOwner": 0
        }
    ];

let answersDummy =
    [
        {
            "id_answer": 7,
            "text_a": "Powerhouse of the cell",
            "correct": 1,
            "id_question": 4
        },
        {
            "id_answer": 8,
            "text_a": "Transportation of oxygen",
            "correct": 0,
            "id_question": 4
        }

    ];

const urlParams = new URLSearchParams(window.location.search);
const questionCode = urlParams.get('code');

const questionElm = document.getElementById("question-element");
const answerDiv = document.getElementById("answer-element");
const resultsBtn = document.getElementById("results-redirect");
const correctsBtn = document.getElementById("results-correct");

resultsBtn.addEventListener("click", showResults);
correctsBtn.addEventListener("click", showCorrectAnswers);

let question;
let questionId;
let answers;
let corrects = [];
let userChoices = [];

showAnswers();

async function loadQuestion() {
    let response = await callApi("GET", `https://node24.webte.fei.stuba.sk/harenecPoll/api.php/question?questionCode=${questionCode}`);
    try {
        question = response[0];
        questionId = question.id_question;
        questionElm.textContent = question.text_q;
    } catch (error) {
        showError("question-404");
    }

}

async function loadAnswers() {
    let response = await callApi("GET", `https://node24.webte.fei.stuba.sk/harenecPoll/api.php/answer?questionId=${questionId}`);
    answers = response;
    answers.forEach(answer => {
        if (answer.correct == 1) {
            corrects.push(answer);
        }
    });
}

async function showAnswers() {
    await loadQuestion();

    if (question.open == 1) {
        const ansInput = document.createElement("input");
        ansInput.setAttribute("type", "text");
        answerDiv.appendChild(ansInput);
    }
    else if (question.open == 0) {
        await loadAnswers();
        answers.forEach(answer => {
            const ansBtn = document.createElement("button");
            ansBtn.setAttribute("type", "text");
            ansBtn.innerText = answer.text_a;
            ansBtn.setAttribute("ans-id", answer.id_answer);
            ansBtn.classList.add("animated");
            ansBtn.addEventListener("click", answerHandler);
            answerDiv.appendChild(ansBtn)

        });
    }

}

function answerHandler(e) {
    let clickedAnsId = e.target.getAttribute("ans-id");
    corrects.every(correct => {
        if (clickedAnsId == correct.id_answer) {
            e.target.style.backgroundColor = "green";
            return false;
        }
        
        else if (clickedAnsId != correct.id_answer) {
            e.target.style.backgroundColor = "red";
            return true;
        }
    });
    e.target.removeEventListener("click", answerHandler);
    
    showResultsBtn();

    userChoices.push(clickedAnsId);
    console.log(userChoices);
}

function showCorrectAnswers() {
    Array.from(answerDiv.children).every(btn => {
        btn.removeEventListener("click", answerHandler);

        corrects.every(correct => {
            btn.style.backgroundColor = "red";

            if (btn.getAttribute("ans-id") == correct.id_answer) {
                btn.style.backgroundColor = "green";
                return false;
            }
            return true;
            
        });
        return true;
    });
    showResultsBtn();
}

function showError(errId) {
    if (errId == "question-404") {
        document.getElementById(errId).classList.remove("hidden");
    }
}

function showResultsBtn() {
    resultsBtn.classList.remove("hidden");
}

function showResults(e) {
    // TODO redirect to results site
}

async function callApi(method, url, data = []) {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    if (method === "GET") {
        options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok, code:' + response.statusText);
        }
        const responseData = await response.json();
        return responseData; // Return the JSON data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
}
