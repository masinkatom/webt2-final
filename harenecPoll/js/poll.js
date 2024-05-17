let questionDummy =
    [
        {
            "id_question": 4,
            "text_q": "What is the function of mitochondria?",
            "active": 0,
            "open": 0,
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
const correctsBtn = document.getElementById("results-send");
const questionBtnsDiv = document.getElementById("question-buttons");
const currentStatsDiv = document.getElementById("current-stats");

var ws = new WebSocket("wss://node10.webte.fei.stuba.sk/wss2");

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
        correctsBtn.innerText = "Odoslať odpoveď";
        const ansInput = document.createElement("input");
        ansInput.setAttribute("type", "text");
        ansInput.id = "answer-input";
        ansInput.placeholder = ". . . . ."
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

function showCorrectAnswers(e) {
    if (question.open == 1) {
        let ansInput = document.getElementById("answer-input");
        ansInput.disabled = true;
        ansInput.style.border = "5px solid green";
        e.target.classList.add("invisible");
        let data = {
            "id_answer": "2",
            "year": "2022"
        };
        userChoices.push(ansInput.value);
        console.log(userChoices);
        // callApi("POST", "https://node24.webte.fei.stuba.sk/harenecPoll/api.php/createStat", data);
    }
    else if (question.open == 0) {
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

    }

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
    questionBtnsDiv.classList.add("hidden");
    currentStatsDiv.classList.remove("hidden");
    sendUserChoices();
    showGraph();
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


// Plotly to show results
function showGraph() {
    let dataPlot = [
        {
            x: ['giraffes', 'orangutans', 'monkeys'],
            y: [20, 14, 23],
            type: 'bar',
            marker: {
    
                color: 'rgb(191, 175, 0)',
            
                line: {
            
                  color: 'rgb(255, 255, 255)',
            
                  width: 3
            
                }
            
              }
        }
    ];
    
    let layout = {
        xaxis: {
            tickfont: {
                family: 'Anta, monospace',
                size: 14,
                color: 'white'  // X axis tick labels font color
            }
        },
        yaxis: {
            title: {
                text: 'Počet odpovedí',
                font: {
                    family: 'Anta, monospace',
                    size: 18,
                    color: 'white'  // Y axis label font color
                }
            },
            tickfont: {
                family: 'Anta, monospace',
                size: 14,
                color: 'white'  // Y axis tick labels font color
            }
        },
        margin: {
            l: 50,   // left margin
            r: 50,   // right margin
            b: 50,   // bottom margin
            t: 10,   // top margin
            pad: 4   // padding
        },
        plot_bgcolor: 'rgba(0,0,0,0)',  // Transparent plot area
        paper_bgcolor: 'rgba(0,0,0,0)'  // Transparent paper area
    };
    
    let config = { 
        responsive: true,
        displayModeBar: false
    };
    
    Plotly.newPlot('currents-plot', dataPlot, layout, config).then( () => {
        window.dispatchEvent(new Event('resize'));
    });

}


// WebSocket connection code

// code to keep the connection alive
const heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(prepareData("ping"));
    }
}, 20000);


ws.onopen = function (e) {
    console.log("connected");
}

ws.onmessage = function (e) {
    let data = JSON.parse(e.data);
    console.log(data);
}

function sendUserChoices() {
    if (userChoices !== null) {
        let toSend;
        if (question.open == 0) {
            toSend = {
                questionId: questionId,
                open: 0,
                answers: userChoices
            }
        }
        else {
            toSend = {
                questionId: questionId,
                open: 1,
                answers: userChoices
            }
        }
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(prepareData("choices", toSend));
        }
    }
}

function prepareData(type, data = []) {
    return JSON.stringify(
        {
            type: type,
            payload: data
        });
}