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
let otherUserChoices = [];

showAnswers();

async function loadQuestion() {
    let response = await callApi("GET", `https://node24.webte.fei.stuba.sk/harenecPoll/api.php/question?questionCode=${questionCode}`);
    try {
        question = response[0];
        if (question.active == 0) {
            showError("question-notActive");
            return;
        }
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

    if (question.active == 0) {
        return;
    }
    questionBtnsDiv.classList.remove("hidden");

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

// ans btn clicked
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

    let data = {
        "id_answer": clickedAnsId,
        "year": new Date().getFullYear()
    };
    callApi("POST", "https://node24.webte.fei.stuba.sk/harenecPoll/api.php/createStat", data);

    userChoices.push(clickedAnsId);
    console.log(userChoices);
}

// showAns btn clicked
function showCorrectAnswers(e) {
    if (question.open == 1) {
        let ansInput = document.getElementById("answer-input");
        ansInput.disabled = true;
        ansInput.style.border = "5px solid green";
        e.target.classList.add("invisible");

        userChoices.push(ansInput.value);
        console.log(userChoices);

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
    if (errId == "question-notActive") {
        document.getElementById(errId).classList.remove("hidden");
    }
}

function showResultsBtn() {
    resultsBtn.classList.remove("hidden");
}

function showResults(e) {
    // redirect to results
    questionBtnsDiv.classList.add("hidden");
    currentStatsDiv.classList.remove("hidden");
    sendUserChoices();
    if (question.open == 0) {

    }
    else {
        // TODO vysledky pre otvorenu otazku
    }
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

let xAxis = [];
let yAxis = [];

async function fillXYData() {
    xAxis = [];
    yAxis = [];
    answers.forEach(answer => {
        xAxis.push(answer.text_a);
        let ansCount = 0;
        otherUserChoices.forEach(ansId => {
            if (answer.id_answer == ansId) {
                ansCount++;
            }
        });
        yAxis.push(ansCount)
    });
}

async function showGraph() {
    await fillXYData();
    let dataPlot = [
        {
            x: xAxis,
            y: yAxis,
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
                size: 12,
                color: 'white'  // X axis tick labels font color
            }
        },
        yaxis: {
            // title: {
            //     text: 'Počet odpovedí',
            //     font: {
            //         family: 'Anta, monospace',
            //         size: 18,
            //         color: 'white'  // Y axis label font color
            //     }
            // },
            tickfont: {
                family: 'Anta, monospace',
                size: 14,
                color: 'white'  // Y axis tick labels font color
            },
            dtick: 1
        },
        margin: {
            l: 50,   // left margin
            r: 50,   // right margin
            b: 150,   // bottom margin
            t: 10,   // top margin
            pad: 2   // padding
        },
        plot_bgcolor: 'rgba(0,0,0,0)',  // Transparent plot area
        paper_bgcolor: 'rgba(0,0,0,0)'  // Transparent paper area
    };

    let config = {
        responsive: true,
        displayModeBar: false
    };
    document.getElementById("currents-plot").classList.remove("hidden");
    Plotly.newPlot('currents-plot', dataPlot, layout, config).then(() => {
        window.dispatchEvent(new Event('resize'));
    });

}

function showCloud() {
    const listContainer = document.getElementById('dynamicList');
    listContainer.classList.remove("hidden");
    listContainer.innerHTML = '';

    // Count the occurrences of each item
    const itemCounts = {};
    otherUserChoices.forEach(item => {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
    });

    // Create a list item for each unique item
    for (const [item, count] of Object.entries(itemCounts)) {
        const listItem = document.createElement('li');
        listItem.textContent = item + " (" + count + "x)";
        listItem.style.fontSize = (22 + (count - 1) * 4) + 'px'; // Base font size 16px, increase by 4px for each additional occurrence
        listContainer.appendChild(listItem);
    }
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
    if (data.type == "userAnswers") {
        otherUserChoices = data.payload.answers;
        if (question.open == 0) {
            showGraph();
        }
        else if (question.open == 1) {
            showCloud();
        }
    }
    console.log(data);
}

function sendUserChoices() {
    if (userChoices !== null && userChoices[0] != "") {
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