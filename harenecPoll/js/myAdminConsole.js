function clickButton() {
    let langBtn = document.getElementById('sk_btn');

    if (langBtn) {
        langBtn.click();
    } else {
    }
}

let btnModalClose = document.getElementById("close-modal");
let modalQR = document.getElementById("modalQR");
let flag = 0;

let startedQuestion = new Map();

var testDataDelete = `[
    {
      "id_question": 1,
      "text_q": "SI Hlupak",
      "active": 1,
      "open": 0,
      "id_set": 1,
      "creationDate": "2024-05-01",
      "code": null
    }
  ]`;

  function removeByKey(key) {
    if (startedQuestion.has(key)) {
        startedQuestion.delete(key);
    }
}


var jsonData = `[
    {
        "id_question": "1",
        "text_q": "What is capital os GER?",
        "active": "0",
        "open": "0",
        "creationDate": "2024-05-02"
    },
    {
        "id_question": "2",
        "text_q": "What is capital of SK?",
        "active": "0",
        "open": "1",
        "creationDate": "2024-05-02"
    },
    {
        "id_question": "3",
        "text_q": "What is capital of ZCE?",
        "active": "0",
        "open": "0",
        "creationDate": "2024-05-02"
    }
]`;




var globalSets = `[
    {
        "name_set": "Math"
    },
    {
        "name_set": "English"
    }
]`;

var globalUsers = JSON.parse(`[
    {
        "nick": "aaaaaa"
    },
    {
        "nick": "Joseph"
    },
    {
        "nick": "semirgerkan"
    }
]`);

var tmpSessLogin = sessionLogin;
var tmpSessLogiID = sessionLoginID;
var mainCtn = document.getElementById("main-ctn");
var container = document.getElementById("button-container");


window.addEventListener('DOMContentLoaded', function() {
    clickButton();







getGlobalUsers().then(data => {
    globalUsers = data;

    //var mainCtn = document.getElementById("main-ctn");
    //var container = document.getElementById("button-container");
    
    globalUsers.forEach(function(user) {
        
        getGlobalSets(user.nick).then(data => {

            sessionLogin = user.nick;
            getIdByName().then(data=>{

                sessionLoginID = data;

            })
            globalSets = data;
            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("data-bs-toggle", "collapse");
            button.setAttribute("data-bs-target", `#X${user.nick}`);
            button.setAttribute("aria-expanded", "false");
            button.textContent = user.nick;

           
            container.appendChild(button);//DDD
            container.appendChild(createButtonsOfSets(user.nick));

            var collapseDiv = document.createElement("div");
            collapseDiv.classList.add("collapse");
            collapseDiv.id = "X"+user.nick;
            collapseDiv.classList.add("in-row");
            collapseDiv.classList.add("centered-v");


            var CRUDuserDiv = document.createElement("div");
            CRUDuserDiv.textContent = "DDDDDD";
            CRUDuserDiv.classList.add("in-row");
            CRUDuserDiv.classList.add("centered-v");

            var cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card", "card-body");
            cardBodyDiv.classList.add("collapse-set");
            cardBodyDiv.id = "X"+user.nick + "Div";
            cardBodyDiv.appendChild(createCRUDdiv(user.nick));
            collapseDiv.appendChild(cardBodyDiv);

            container.appendChild(collapseDiv);
            //createButtonsOfSets();
        })
        .catch(error => {
            console.error('Error:', error);
        });

        globalSets = getAllSetsExisting().then( data =>{
            globalSets = data;
        })

    });
    mainCtn.appendChild(container);

    sessionLogin = tmpSessLogin;
}
)


});


async function getAllSetsExisting(){
        try {
            const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/sets`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    
}

function callWhenWholeRecall(){

    getGlobalUsers().then(data => {
        globalUsers = data;
        //var mainCtn = document.getElementById("main-ctn");
        //var container = document.getElementById("button-container");
        
        globalUsers.forEach(function(user) {
            
            getGlobalSets(user.nick).then(data => {

                sessionLogin = user.nick;
                getIdByName().then(data=>{

                    sessionLoginID = data;

                })
                globalSets = data;

                var button = document.createElement("button");
                button.setAttribute("type", "button");
                button.setAttribute("data-bs-toggle", "collapse");
                button.setAttribute("data-bs-target", `#X${user.nick}`);
                button.setAttribute("aria-expanded", "false");
                button.textContent = user.nick;
    
                container.appendChild(button);//DDD
                container.appendChild(createButtonsOfSets(user.nick));
    
                var collapseDiv = document.createElement("div");
                collapseDiv.classList.add("collapse");
                collapseDiv.id = "X"+user.nick;
                collapseDiv.classList.add("in-row");
                collapseDiv.classList.add("centered-v");
    
    
                var CRUDuserDiv = document.createElement("div");
                CRUDuserDiv.textContent = "DDDDDD";
                CRUDuserDiv.classList.add("in-row");
                CRUDuserDiv.classList.add("centered-v");
    
                var cardBodyDiv = document.createElement("div");
                cardBodyDiv.classList.add("card", "card-body");
                cardBodyDiv.classList.add("collapse-set");
                cardBodyDiv.id = "X"+user.nick + "Div";
                cardBodyDiv.appendChild(createCRUDdiv(user.nick));
                collapseDiv.appendChild(cardBodyDiv);
    
                container.appendChild(collapseDiv);
                //createButtonsOfSets();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
            globalSets = getAllSetsExisting().then( data =>{
                globalSets = data;
            })
    
        });
        mainCtn.appendChild(container);
    
        sessionLogin = tmpSessLogin;
    }
    )


}
    



function clickButton() {
    let langBtn = document.getElementById('sk_btn');

    if (langBtn) {
        langBtn.click();
    } else {
    }
}

//clickButton();



//let btnModalClose = document.getElementById("close-modal");
//let modalQR = document.getElementById("modalQR");
window.onclick = function (event) {
    if (event.target == modalQR || event.target == btnModalClose) {
        modalQR.classList.add("hidden");
    }

}
/*
let flag = 0;





var jsonData = `[
    {
        "id_question": "1",
        "text_q": "What is capital os GER?",
        "active": "0",
        "open": "0",
        "creationDate": "2024-05-02"
    },
    {
        "id_question": "2",
        "text_q": "What is capital of SK?",
        "active": "0",
        "open": "1",
        "creationDate": "2024-05-02"
    },
    {
        "id_question": "3",
        "text_q": "What is capital of ZCE?",
        "active": "0",
        "open": "0",
        "creationDate": "2024-05-02"
    }
]`;




var globalSets = `[
    {
        "name_set": "Math"
    },
    {
        "name_set": "English"
    }
]`;

var globalUsers = JSON.parse(`[
    {
        "nick": "aaaaaa"
    },
    {
        "nick": "Joseph"
    },
    {
        "nick": "semirgerkan"
    }
]`);

var tmpSessLogin = sessionLogin;
var tmpSessLogiID = sessionLoginID;*/


/*
getGlobalUsers().then(data => {
    globalUsers = data;
    console.log(globalUsers);
    var mainCtn = document.getElementById("main-ctn");
    var container = document.getElementById("button-container");
    
    globalUsers.forEach(function(user) {
        
        getGlobalSets(user.nick).then(data => {

            sessionLogin = user.nick;
            getIdByName().then(data=>{
    
                sessionLoginID = data;
                console.log(sessionLoginID, "DDD");
            })
            globalSets = data;
            console.log(globalSets);
            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("data-bs-toggle", "collapse");
            button.setAttribute("data-bs-target", `#X${user.nick}`);
            button.setAttribute("aria-expanded", "false");
            button.textContent = user.nick;

            var container = document.getElementById("button-container");
            container.appendChild(button);//DDD
            container.appendChild(createButtonsOfSets(user.nick));

            var collapseDiv = document.createElement("div");
            collapseDiv.classList.add("collapse");
            collapseDiv.id = "X"+user.nick;
            collapseDiv.classList.add("in-row");
            collapseDiv.classList.add("centered-v");


            var CRUDuserDiv = document.createElement("div");
            CRUDuserDiv.textContent = "DDDDDD";
            CRUDuserDiv.classList.add("in-row");
            CRUDuserDiv.classList.add("centered-v");

            var cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card", "card-body");
            cardBodyDiv.classList.add("collapse-set");
            cardBodyDiv.id = "X"+user.nick + "Div";
            cardBodyDiv.appendChild(createCRUDdiv(user.nick));
            collapseDiv.appendChild(cardBodyDiv);

            container.appendChild(collapseDiv);
            //createButtonsOfSets();
        })
        .catch(error => {
            console.error('Error:', error);
        });

    });
    mainCtn.appendChild(container);

    sessionLogin = tmpSessLogin;
}
)*/


function createCRUDdiv(userName) {
    var crudCuserDiv = document.createElement("div");
    crudCuserDiv.classList.add("in-row");
    crudCuserDiv.classList.add("centered-h");

    var buttonDel = document.createElement("button");
    buttonDel.setAttribute("type", "button");
    buttonDel.className = "btn btn-danger";
    //buttonDel.setAttribute("data-i18n", "admin_delete_user_button");
    buttonDel.innerText = "Delete User"; //KKKKKKKK bolo zakomentovane
    buttonDel.style.fontSize = "1.6rem";
    buttonDel.addEventListener("click", function() {
        deleteUser(userName);
    });

    var buttonE = document.createElement("button");
    buttonE.setAttribute("type", "button");
    buttonE.className = "btn btn-warning";
    buttonE.innerText = "Edit";
    buttonE.style.fontSize = "1.6rem";
    buttonE.setAttribute("data-toggle", "collapse");
    buttonE.setAttribute("data-target", "#collapseDiv" + userName);
    buttonE.setAttribute("aria-expanded", "false");
    buttonE.setAttribute("aria-controls", "collapseDiv" + userName);
    buttonE.addEventListener("click", function() {
        
        });

        var button = document.createElement("button");
button.classList.add("btn");
button.classList.add("btn-warning");

    //buttonE.className = "btn btn-warning";
button.setAttribute("type", "button");
button.setAttribute("data-bs-toggle", "collapse");
button.setAttribute("data-bs-target", "#collapseExample");
button.setAttribute("aria-expanded", "false");
button.style.fontSize = "1.6rem";
button.setAttribute("aria-controls", "collapseExample");
//button.setAttribute("data-i18n", "admin_edit_user_collapse");
button.innerText = "Edit"; //KKKKKKKK bolo zakomentovane

    var buttonSU = document.createElement("button");
    buttonSU.setAttribute("type", "button");
    buttonSU.className = "btn btn-primary";
    //buttonSU.setAttribute("data-i18n", "admin_set_user_button");
    buttonSU.innerText = "Set to user"; //KKKKKKKK bolo zakomentovane
    buttonSU.style.fontSize = "1.6rem";
    buttonSU.addEventListener("click", function() {
        setUserRole(userName, 0);
    });

    var buttonSA = document.createElement("button");
    buttonSA.setAttribute("type", "button");
    buttonSA.className = "btn btn-primary";
    //buttonSA.setAttribute("data-i18n", "admin_set_admin_button");
    buttonSA.innerText = "Set to admin"; //KKKKKKKK bolo zakomentovane
    buttonSA.style.fontSize = "1.6rem";
    buttonSA.addEventListener("click", function() {
        setUserRole(userName, 1);
    });

    var collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse");
    //collapseDiv.classList.add("content-outline");
    collapseDiv.id = "collapseExample";

    // Create card body div
    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card");
    cardBodyDiv.classList.add("content-outline");
    cardBodyDiv.style.marginBottom = "0rem";
    cardBodyDiv.classList.add("card-body");
    // cardBodyDiv.innerText = "V tomto divku a bude editovat user";

    
    //TODO JOZKO TU IDES ROBIT EDIT USERA HEJ
    var editUserDiv = document.createElement("div");
    editUserDiv.id = "editUserDiv";

    var editUserField = document.createElement("input");
    editUserField.setAttribute("type", "text");
    editUserField.value = userName;
    oldname = userName;
    
    var buttonEditUser = document.createElement("button");
    buttonEditUser.setAttribute("type", "button");
    buttonEditUser.className = "btn btn-primary";
    //buttonEditUser.setAttribute("data-i18n", "admin_edit_user_button");
    buttonEditUser.innerText = "Edit user"; //KKKKKKKK bolo zakomentovane

    editUserDiv.appendChild(editUserField);
    editUserDiv.appendChild(buttonEditUser);

    buttonEditUser.addEventListener('click', function() {
        // DATA NA ODOSLANIE
        // zmenene meno usera
        var editedUserToSend = {
            oldname: oldname,
            username: editUserField.value
        }
        editUserHotFix(editedUserToSend);
    })
    editUserDiv.appendChild(buttonEditUser);
    cardBodyDiv.appendChild(editUserDiv);
    //^^ TODO JOZKO TU IDES ROBIT EDIT USERA HEJ ^^

// Append card body div to collapse div
collapseDiv.appendChild(cardBodyDiv);

    // Append buttons to the crudCuserDiv
    crudCuserDiv.appendChild(buttonDel);
    crudCuserDiv.appendChild(button);
    crudCuserDiv.appendChild(buttonSA);
    crudCuserDiv.appendChild(buttonSU);
    crudCuserDiv.appendChild(collapseDiv);
    clickButton();
    

    return crudCuserDiv;
}

function editUserHotFix(data){


    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/editUser`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                showToast();
                var container = document.getElementById("button-container");
                container.innerHTML = "";
                callWhenWholeRecall();
            } else {
                console.error('Failed to update user flag');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function deleteUser(userName) {
    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/deleteUser?userName=${userName}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the data object to JSON string and send it in the request body
        //body: JSON.stringify(question)
    })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                showToast();
                var container = document.getElementById("button-container");
                container.innerHTML = "";
                callWhenWholeRecall();
                //TU DAVAM
                // Handle further actions if needed
            } else {
                console.error('Failed to delete user');
                // Handle errors if needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if needed
        });
}

// Function to handle edit user button click
function editUser(userName) {
}

// Function to handle set user role button click
function setUserRole(userName, role) {

    let data;
    data = {
        adminValue: role,
    }

    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/updateUserFlag?userName=${userName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the data object to JSON string and send it in the request body
        body: JSON.stringify(data)
    })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                showToast();
                // Handle further actions if needed
            } else {
                console.error('Failed to update user flag');
                // Handle errors if needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if needed
        });
}

    async function getGlobalUsers() {
       
        try {
            const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/users`,{
                method: 'GET'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return testDataDelete; 
        }
        //return globalUsers;
    }


async function getGlobalSets(user) {
    try {
        const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/sets?username=${user}`);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching sets:', error);
        return [];
    }
}


function createButtonsOfSets(user) {

    var collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse");
    collapseDiv.id = "X"+user;


    //var container = document.getElementById("button-container");

    var container = document.createElement("div");
    container.classList.add("content-outline");

    globalSets.forEach(function (item) {
        createSetSection(item.name_set, container);
    });

    container.appendChild(createButton());
    container.appendChild(createNewQuestionCollapse())
    container.appendChild(createNewSetButton());
    container.appendChild(createNewSetCollapse());
    //container.appendChild(createSeeAllQuestionButton());
    //container.appendChild(createSeeAllQuestionCollapse());
    //container.appendChild(createStatsButton());
    //container.appendChild(creatseeStatsCollapse())
    clickButton();
    
    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card", "card-body");
    cardBodyDiv.classList.add("collapse-set");
    cardBodyDiv.id = "X"+user + "Div";
    cardBodyDiv.appendChild(container);
    collapseDiv.appendChild(cardBodyDiv);
    
    return(collapseDiv);
}

function createStatsButton() {
    var statsButton = document.createElement("button");
    statsButton.classList.add("btn", "btn-info");
    statsButton.setAttribute("data-bs-toggle", "collapse");
    statsButton.setAttribute("data-bs-target", "#seeStatsCollapse");
    statsButton.setAttribute("aria-controls", "seeStatsCollapse");
    statsButton.setAttribute("data-i18n", "see_stats_collapse");
    statsButton.style.fontSize = "1.6rem";
     //statsButton.textContent = "SEE STATSXXX";
    return statsButton;
}


function createSeeAllQuestionButton() {
    var newQButton = document.createElement("button");
    newQButton.classList.add("btn", "btn-info");
    newQButton.setAttribute("data-bs-toggle", "collapse");
    newQButton.setAttribute("data-bs-target", "#seeAllQuestionCollapse");
    newQButton.setAttribute("aria-controls", "seeAllQuestionCollapse");
    newQButton.setAttribute("data-i18n", "see_all_questions");
    newQButton.style.fontSize = "1.6rem";
     //newQButton.textContent = "SEE ALL QUESTIONXXX";
    return newQButton;
}

function createButton() {
    var newQButton = document.createElement("button");
    newQButton.classList.add("btn", "btn-success");
    newQButton.setAttribute("data-bs-toggle", "collapse");
    newQButton.setAttribute("data-bs-target", "#newQuestionCollapse");
    newQButton.setAttribute("aria-controls", "newQuestionCollapse"); // Set aria-controls attribute
    newQButton.setAttribute("data-i18n", "new_question_collapse");
    newQButton.style.fontSize = "1.6rem";
     //newQButton.textContent = "NEW QUESTIONWTFXXX";
    return newQButton;
}

function createNewSetButton() {
    var newQButton = document.createElement("button");
    newQButton.classList.add("btn", "btn-success");
    newQButton.setAttribute("data-bs-toggle", "collapse");
    newQButton.setAttribute("data-bs-target", "#newSetCreateCollapse");
    newQButton.setAttribute("aria-controls", "newSetCreateCollapse"); // Set aria-controls attribute
    newQButton.setAttribute("data-i18n", "new_set_collapse");
    newQButton.style.fontSize = "1.6rem";
    // newQButton.textContent = "NEW SETWTFXXX";
    return newQButton;
}

function createDatatable(questionsData) {
    let table = document.createElement('table');
    table.id = 'example';
    table.classList.add('display');

    const thead = document.createElement('thead');
    const trHeader = document.createElement('tr');
    
    const keys = Object.keys(questionsData[0]);
    keys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        trHeader.appendChild(th);
    });
    thead.appendChild(trHeader);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    questionsData.forEach(item => {
        const tr = document.createElement('tr');
        keys.forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    initDatatable();

    return table;
}

function initDatatable() {
    $(document).ready( function () {
        $('#example').DataTable();
    } );
}

function createSeeAllQuestionCollapse() {
    var collapseContainer = document.createElement("div");
    getAllQuestionByName()
        .then(data => {
            collapseContainer.classList.add("collapse");
            collapseContainer.id = "seeAllQuestionCollapse";
            var cardElement = document.createElement("div");
            cardElement.classList.add("card", "card-body");
            cardElement.classList.add("collapse-set");
            
            var allQuestionJozkoDivko = document.createElement("div")
            allQuestionJozkoDivko.id = "allQuestionJozkoDivko";
            var allQbyName;
            allQbyName = data;
   

            if(allQbyName.length != 0){
                var myTable = createDatatable(allQbyName);
                allQuestionJozkoDivko.appendChild(myTable);
            }
            
            //TU JOZKO ROBIS S allQByName DATAMI do divka  allQuestionJozkoDivko
            cardElement.appendChild(allQuestionJozkoDivko);
            collapseContainer.appendChild(cardElement);
            return collapseContainer;
        })

    return collapseContainer;
}

async function getAllQuestionByName() {
    //TU DURI UPRAVIS SPOJAZDNIS BOROVE API A VRATIS DATA

    try {
        const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/question?userId=${sessionLoginID}`,{
            method: 'GET'
        }); /*FFF*/
        const data = await response.json();
       
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return testDataDelete;
    }
    //return testDataDelete;
}

async function getIdByName() {
    //TU DURI UPRAVIS SPOJAZDNIS BOROVE API A VRATIS DATA
    
    try {
        const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/users?userName=${sessionLogin}`,{
            method: 'GET'
        }); /*FFF*/
        
        const data = await response.json();
        console.log(data, "JJJJJ");
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return testDataDelete; 
    }
    //return testDataDelete;
}


function creatseeStatsCollapse(question) {
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = "seeStatsCollapse"; 
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-set");
    cardElement.textContent = "STATS";

    var divkoDoKtorehoBudeAdamkoStatsRobit = document.createElement("div"); //TODO ADAMKO STATS DIV
    //divkoDoKtorehoBudeAdamkoStatsRobit.textContent = "";
    console.log("TOTO TU JE QUESTION", question)
    console.log("TOTO TU JE IDECKO ",question.id_question)
    //tvoja robota v divku pojde tu

    divkoDoKtorehoBudeAdamkoStatsRobit.id = "statsDiv"+question.id_question;
    cardElement.appendChild(divkoDoKtorehoBudeAdamkoStatsRobit);
    collapseContainer.appendChild(cardElement);
    generateList(question.id_question, "statsDiv"+question.id_question);
    
    return collapseContainer;
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


async function generateList(qId, divId) {
    let response = await callApi("GET", `https://node24.webte.fei.stuba.sk/harenecPoll/api.php/stats?questionId=${qId}`);
    const container = document.getElementById(divId);
    console.log("CONTAINER", container)
    const ul = document.createElement('ul');
    ul.classList.add("in-row");

    for (const year in response) {
        if (response.hasOwnProperty(year)) {
            const yearLi = document.createElement('li');
            yearLi.classList.add('year');
            yearLi.textContent = year;
            ul.appendChild(yearLi);

            console.log();

            let yearCounter = countAllResponses(response[year]);

            const answersUl = document.createElement('ul');
            for (const answer in response[year]) {
                if (response[year].hasOwnProperty(answer)) {

                    const answerLi = document.createElement('li');
                    answerLi.classList.add('answer');
                    answerLi.textContent = `${answer}: ${Math.floor((response[year][answer] / yearCounter) * 100)}%`;
                    answersUl.appendChild(answerLi);
                }
            }
            yearLi.appendChild(answersUl);
        }
    }
    container.appendChild(ul);
}

function countAllResponses(data) {
    let counter = 0;
    for (const ans in data) {
        counter += data[ans];
    }
    return counter;
}

function createNewQuestionCollapse() {
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = "newQuestionCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-set");
    // cardElement.textContent = "NEW QUSTIONXXX";

    var divkoDoKtorehoBudeJozkoRobit = document.createElement("div") //TODO JOZKO
    //tu mozes jozko do toho divka sukat vsetky veci ktore chces aby v nom boli + funkcionalitka :P
    //momentalny user je ulozeny v premennej globalnej  SSS var sessionLogin (nevidis ju v .js subore lebo ju taham z phpcka kde ju inicializujem)
    //tvoja robota
    divkoDoKtorehoBudeJozkoRobit.id = "newQuestionInputs";

    var newQuestionLabel = document.createElement("label");
    newQuestionLabel.setAttribute("data-i18n", "new_question_label");
    //newQuestionLabel.textContent = "New"
    // text otazky
    var questionInput = document.createElement("input");
    questionInput.setAttribute("type", "text");

    var selectSetLabel = document.createElement("label");
    selectSetLabel.setAttribute("data-i18n", "choose_set_label");
     //selectSetLabel.innerHTML = "Choose setXXX: ";
    var setSelectBox = document.createElement("select");

    // INFORMACIA PRE JURAJA
    // TU SA NAPLNI SELECT BOX MENAMI SETOV
    // MNE globalSets nefetchne - ja mam prazdne hodnoty na node40
    // ty by si mal vidiet OOP,AZA....
    globalSets.forEach(iitemSet => {
        var opt = document.createElement('option');
        opt.value = iitemSet.name_set;
        opt.textContent = iitemSet.name_set;
        setSelectBox.appendChild(opt);
    });

    // otvorena otazka? + checkbox
    var labelOpen = document.createElement("label");
    labelOpen.setAttribute("data-i18n", "open_question_checkbox");
     //labelOpen.innerHTML = "Open questionXXX: ";
    var openQuestionCheckbox = document.createElement("input");
    openQuestionCheckbox.setAttribute("type", "checkbox");
    divkoDoKtorehoBudeJozkoRobit.appendChild(newQuestionLabel);
    divkoDoKtorehoBudeJozkoRobit.appendChild(questionInput);
    divkoDoKtorehoBudeJozkoRobit.appendChild(selectSetLabel);
    divkoDoKtorehoBudeJozkoRobit.appendChild(setSelectBox);
    divkoDoKtorehoBudeJozkoRobit.appendChild(labelOpen);
    divkoDoKtorehoBudeJozkoRobit.appendChild(openQuestionCheckbox);

    var labelCloudmap = document.createElement("label");
    labelCloudmap.setAttribute("data-i18n", "cloudmap_checkbox");
     //labelCloudmap.innerHTML = "Cloudmap?XXX: ";
    var cloudmapCheckbox = document.createElement("input");
    cloudmapCheckbox.setAttribute("type", "checkbox");

    var labelAdminOwner = document.createElement("label");
    labelAdminOwner.setAttribute("data-i18n", "admin_new_question_admin_owner_checkox");
     //labelAdminOwner.innerHTML = "AdminOwnerXXX: ";
    var adminOwnerCheckbox = document.createElement("input");
    adminOwnerCheckbox.setAttribute("type", "checkbox");

    // // div pre otazku s moznostami --$$
    var divkoPocetMoznosti = document.createElement("div");
    divkoPocetMoznosti.id = "OptionsAmount";
    divkoDoKtorehoBudeJozkoRobit.appendChild(divkoPocetMoznosti);

    openQuestionCheckbox.checked = true;
    // po nacitani stranky checkbox ZASKRTNUTY
    if (openQuestionCheckbox.checked) {
        divkoPocetMoznosti.appendChild(labelCloudmap);
        divkoPocetMoznosti.appendChild(cloudmapCheckbox);
        //BORO PRIDAL
        divkoPocetMoznosti.appendChild(labelAdminOwner);
        divkoPocetMoznosti.appendChild(adminOwnerCheckbox);
    }

    // input number - pocet odpovedi na otazku
    var numberOptionsLabel = document.createElement("label");
    numberOptionsLabel.setAttribute("data-i18n", "num_of_options_label");
     //numberOptionsLabel.innerHTML = "Number of optionsXXX: ";
    var numOfOptions = document.createElement("input");
    numOfOptions.setAttribute("type", "number");
    numOfOptions.setAttribute("min", 1);
    numOfOptions.setAttribute("max", 4);
    numOfOptions.setAttribute("value", 1);

    // tlacidlo na odoslanie poctu monznosti (a,b,c,d)
    var setOptionsBtn = document.createElement("button");
    setOptionsBtn.classList.add("btn", "btn-danger");
    setOptionsBtn.setAttribute("data-i18n", "add_option_button");
     //setOptionsBtn.textContent = "Add optionsXXX";

    var divkoMoznosti = document.createElement("div");
    divkoMoznosti.id = "newQuestionOptions";
    // // div pre otazku s moznostami --$$

    var selectedSetValue = setSelectBox.value;
    setSelectBox.addEventListener('change', function () {
        selectedSetValue = this.value;
        console.log(selectedSetValue);
    });

    openQuestionCheckbox.addEventListener('change', function () {
        if (this.checked) {
            divkoPocetMoznosti.removeChild(numberOptionsLabel);
            divkoPocetMoznosti.removeChild(numOfOptions);
            divkoPocetMoznosti.removeChild(setOptionsBtn);
            divkoPocetMoznosti.removeChild(divkoMoznosti);
            divkoPocetMoznosti.appendChild(labelCloudmap);
            divkoPocetMoznosti.appendChild(cloudmapCheckbox);
            //BORO PRIDAL
            divkoPocetMoznosti.appendChild(labelAdminOwner);
            divkoPocetMoznosti.appendChild(adminOwnerCheckbox);
        } else {
            divkoPocetMoznosti.appendChild(numberOptionsLabel);
            divkoPocetMoznosti.appendChild(numOfOptions);
            divkoPocetMoznosti.appendChild(setOptionsBtn);
            divkoPocetMoznosti.appendChild(divkoMoznosti);
            divkoPocetMoznosti.removeChild(cloudmapCheckbox);
            divkoPocetMoznosti.removeChild(labelCloudmap);
            //BORO PRIDAL
            divkoPocetMoznosti.appendChild(labelAdminOwner);
            divkoPocetMoznosti.appendChild(adminOwnerCheckbox);
            clickButton(); // tu problem
        }
    });

    // defalut NEZASKRKNUTE
    var cloudmapValue = 0;
    cloudmapCheckbox.addEventListener('change', function () {
        if (this.checked) {
            cloudmapValue = 1;   
        } else {
            cloudmapValue = 0;
        }
    });

    var adminCheckBoxValue = 0;
    adminOwnerCheckbox.addEventListener('change', function () {
        if (this.checked) {
            adminCheckBoxValue = 1;   
        } else {
            adminCheckBoxValue = 0;
        }
    });

    var options = [];

    setOptionsBtn.addEventListener('click', function () {
        for (let i = 0; i < numOfOptions.value; i++) {
            let option = {};
            option.id = i;
            option.inputField = createOption(divkoMoznosti);
            option.btn = createButtonForOption(divkoMoznosti);
            option.correct = 0;
            options.push(option);
        }
        options.forEach(option => {
            option.btn.addEventListener('click', function () {
                if (option.correct === 1) {
                    option.correct = 0;
                    option.btn.style.backgroundColor = "grey";
                } else {
                    option.correct = 1;
                    option.btn.style.backgroundColor = "green";
                }
                //option.btn.style.color = "green"; //TUTUTU
                //option.correct = 1;
            })
        });
    })

    var createQuestionButton = document.createElement("button");
    createQuestionButton.classList.add("btn", "btn-primary");
    createQuestionButton.setAttribute("data-i18n", "new_question_create_button");
     //createQuestionButton.textContent = "Create QuestionXXX";
    divkoDoKtorehoBudeJozkoRobit.appendChild(createQuestionButton);

    createQuestionButton.addEventListener('click', function () {
        // ODTIALTO SA BUDU ODOSIELAT DATA
        let usefulOptionsData = [];
        options.forEach(option => {
            option.inputText = option.inputField.value
            usefulOptionsData.push({
                id: option.id,
                optionText: option.inputText,
                correct: option.correct
            })
        });
        let dataToSend;
        if (openQuestionCheckbox.checked === true) {
            dataToSend = {
                question: questionInput.value,
                name_set: findIdByName(selectedSetValue),
                open: 1,
                creationDate: getCurrentTimestamp(),
                active: 0,
                cloudmap: cloudmapValue, //TODO JOZKO TU DAS TOTEN UDAJ Z CLOUDMAP SELECTBOXE
                admin_owner: adminCheckBoxValue
            };
        } else {
            dataToSend = {
                question: questionInput.value,
                name_set: findIdByName(selectedSetValue),
                options: usefulOptionsData,
                open: 0,
                creationDate: getCurrentTimestamp(),
                active: 0,
                cloudmap: 0,
                admin_owner: adminCheckBoxValue
            };
        }
        console.log("CREATE QUESTION DONE");
        console.log(dataToSend); //KKKKKKKK
        createNewQuestionDatabase(dataToSend)
        console.log("CREATE QUESTION DONE");
    })
    //tvoja robota
    //tu vidis ze to divko pridavam do velkeho viditelneho divka, preto robis len v tom svojom divku...
    cardElement.appendChild(divkoDoKtorehoBudeJozkoRobit);
    collapseContainer.appendChild(cardElement);

    return collapseContainer;
}

function findIdByName(name) {
    // Iterate through the globalSets array
    console.log(globalSets.length, name, "TU JE ERROR", globalSets);
    for (let i = 0; i < globalSets.length; i++) {
        console.log(globalSets[i].name_set, globalSets[i].name_set === name);
        // If the name_set matches, return the corresponding id_set
        if (globalSets[i].name_set === name) {
            console.log(globalSets[i].id_set);
            console.log(globalSets[i].id_set, "TU PRESNEJSIE")
            return globalSets[i].id_set;
        }
    }
    // If the name_set is not found, return null or handle it as needed
    return null;
}

async function createNewQuestionDatabase(dataToSend) {

    
    console.log(dataToSend);
    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the data object to JSON string and send it in the request body
        body: JSON.stringify(dataToSend)
    })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                showToast();
                console.log('Question updated successfully');
                var container = document.getElementById("button-container");
                container.innerHTML = "";
                callWhenWholeRecall();
                // Handle further actions if needed
            } else {
                console.error('Failed to update question');
                // Handle errors if needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if needed
        });
}


function createNewSetCollapse() {
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse"); ///OOO
    collapseContainer.id = "newSetCreateCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-set");
    // cardElement.textContent = "NEW SETXXX";

    var tuRobis = document.createElement("div") //TODO JOZKO
    //tu mozes jozko do toho divka sukat vsetky veci ktore chces aby v nom boli + funkcionalitka :P
    //momentalny user je ulozeny v premennej globalnej  SSS var sessionLogin (nevidis ju v .js subore lebo ju taham z phpcka kde ju inicializujem)
    //tvoja robota
    tuRobis.id = "newSetCreateInputs";
    var newSetLabel = document.createElement("label");
    newSetLabel.setAttribute("data-i18n", "new_set_label");
    //newSetLabel.textContent = "New Set";
    var newSetInput = document.createElement("input");
    newSetInput.setAttribute("type", "text");
    tuRobis.appendChild(newSetLabel);
    tuRobis.appendChild(newSetInput);

    var createSetButton = document.createElement("button");
    createSetButton.classList.add("btn", "btn-primary");
    createSetButton.setAttribute("data-i18n", "new_set_create_button");
     //createSetButton.textContent = "Create SetXXX";
    tuRobis.appendChild(createSetButton);

    createSetButton.addEventListener('click', function () {
        
        var createdSet = newSetInput.value; // NOVY SET
        console.log("CREATE SET DONE");
        createdSet = createdSet.replace(/\s+/g, '_')
        console.log(createdSet);
        let createdSetToSend = { 
            setName: createdSet,
            userName: sessionLoginID 
        }; 
        createNewSetDatabase(createdSetToSend); //********
        console.log("CREATE SET DONE");
    })
    //s

    cardElement.appendChild(tuRobis);
    collapseContainer.appendChild(cardElement);

    return collapseContainer;
}

async function createNewSetDatabase(dataToSend) {

    
    console.log(dataToSend, "CREATE NEW SET");
    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/createSet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the data object to JSON string and send it in the request body
        body: JSON.stringify(dataToSend)
    })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                console.log('Question updated successfully');
                var container = document.getElementById("button-container");
                container.innerHTML = "";
                callWhenWholeRecall();
                // Handle further actions if needed
            } else {
                console.error('Failed to update question');
                // Handle errors if needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if needed
        });
}




function createOption(parentDiv) {
    var optionLabel = document.createElement("label");
    optionLabel.setAttribute("data-i18n", "option_label");
     //optionLabel.innerHTML = "OptionXXX: ";
    var answerText = document.createElement("input");
    answerText.setAttribute("type", "text");
    parentDiv.appendChild(optionLabel);
    parentDiv.appendChild(answerText);

    return answerText;
}

function createButtonForOption(parentDiv) {
    var correctAnswerBtn = document.createElement("button");
    correctAnswerBtn.classList.add("btn", "btn-secondary");
    correctAnswerBtn.setAttribute("data-i18n", "correct_option_button");
     //correctAnswerBtn.textContent = "CorrectXXX";
    parentDiv.appendChild(correctAnswerBtn);
    clickButton(); // tu problem
    return correctAnswerBtn;
}

function createSetSection(item, container) {
    var button = document.createElement("button");

    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#${item}`);
    button.setAttribute("aria-expanded", "false");
    button.textContent = item;

    container.appendChild(button);

    var collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse");
    collapseDiv.id = item;

    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card", "card-body");
    cardBodyDiv.classList.add("collapse-set");
    cardBodyDiv.id = item + "Div";
    collapseDiv.appendChild(cardBodyDiv);

    insertQuestions(cardBodyDiv, item).then(()=>{

        var exportButton = document.createElement("button");
    exportButton.classList.add("btn", "btn-warning");
    exportButton.style.fontSize = "1.6rem";
    exportButton.textContent = "export"

    exportButton.addEventListener('click', function() {
        getQuestionsBySet(item).then(data => {
            questions = data;
            console.log("EXPORT", questions)
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions));
        
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", item+"-questions.json");
        
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
        
            // Odstránenie odkazu z dokumentu
            downloadAnchorNode.remove();
        
        });
    });

    cardBodyDiv.appendChild(exportButton);
    });

    
    

    container.appendChild(collapseDiv);
}



async function getQuestionsBySet(setname) {
    try {
        const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/sets?setname=${setname}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}






async function insertQuestions(cardBodyDiv, item) {

    //questions = getQuestionsBySet(item); //TODO

    getQuestionsBySet(item).then(data => {
        questions = data;

        questions.forEach(function (question) {
            // Create a new div element
            var div = document.createElement("div");
            div.classList.add("content-outline");

            var columnDiv = document.createElement("div");
            columnDiv.classList.add("in-column");

            var questionDiv = document.createElement("div");
            questionDiv.classList.add("content-question-outline");
            var collapseDiv = document.createElement("div");


            var textSection = document.createElement("div");
            textSection.classList.add("in-row-q");

            var questionElement = document.createElement("h4");
            questionElement.textContent = question.text_q;

            textSection.appendChild(questionElement);

            // Append the text node to the div
            div.appendChild(textSection);

            var buttonSection = document.createElement("div");
            buttonSection.classList.add("in-row-q");

            //Play
            var playButton = document.createElement("button");
            playButton.classList.add("btn", "btn-success");
            //playButton.setAttribute("data-bs-toggle", "collapse");
            //playButton.setAttribute("data-bs-target", `#${question.id_question}InfoCollapse`);
            playButton.style.fontSize = "1.6rem";
            playButton.textContent = question.active === 0?"START":"STOP";
            playButton.addEventListener("click", () => {
                if(question.active === 0){
                    question.active = 1;
                    playButton.textContent = "STOP";
                    playButton.style.backgroundColor = "red";
                    playQuestionWithQR(question);
                }else{
                    question.active = 0;
                    playButton.textContent = "START";
                    playButton.style.backgroundColor = "green";
                    stopQuestionWithQR(question);
                }

            });
            //DDD

            //Info
            var infoButton = document.createElement("button");
            infoButton.classList.add("btn", "btn-primary");
            infoButton.setAttribute("data-bs-toggle", "collapse");
            infoButton.setAttribute("data-bs-target", `#${question.id_question}InfoCollapse`);
            infoButton.style.fontSize = "1.6rem";
            infoButton.setAttribute("data-i18n", "info_collapse");
             //infoButton.textContent = "InfoXXX";

            //InfoModal
            collapseDiv.appendChild(createInfoCollapse(question.id_question, question));

            // Copy
            var copyButton = document.createElement("button");
            copyButton.classList.add("btn", "btn-secondary");
            copyButton.setAttribute("data-bs-toggle", "collapse");
            copyButton.setAttribute("data-bs-target", `#${question.id_question}CopyCollapse`);
            copyButton.style.fontSize = "1.6rem";
            copyButton.setAttribute("data-i18n", "copy_collapse");
             //copyButton.textContent = "CopyXXX";

            //CopyModal
            collapseDiv.appendChild(createCopyCollapse(question.id_question, question));

            // Edit
            var editButton = document.createElement("button");
            editButton.classList.add("btn", "btn-warning");
            editButton.setAttribute("data-bs-toggle", "collapse");
            editButton.setAttribute("data-bs-target", `#${question.id_question}EditCollapse`);
            editButton.style.fontSize = "1.6rem";
            editButton.setAttribute("data-i18n", "edit_collapse");
             //editButton.textContent = "EditXXX";

            //EditModal
            collapseDiv.appendChild(createEditCollapse(question.id_question, question));

            editButton.addEventListener("click", function () {
                //editQ(question); //TODO
            });


            //Delete
            var deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger");
            deleteButton.setAttribute("data-bs-toggle", "collapse");
            deleteButton.setAttribute("data-bs-target", `#${question.id_question}DeleteCollapse`);
            deleteButton.style.fontSize = "1.6rem";
            deleteButton.setAttribute("data-i18n", "delete_collapse");
             //deleteButton.textContent = "DeleteXXX";

            //DeleteModal
            collapseDiv.appendChild(createDeleteCollapse(question.id_question, question.text_q));



            buttonSection.appendChild(playButton);
            buttonSection.appendChild(infoButton);
            buttonSection.appendChild(copyButton);
            buttonSection.appendChild(editButton);
            buttonSection.appendChild(deleteButton);



            questionDiv.appendChild(textSection);
            questionDiv.appendChild(buttonSection);
            columnDiv.appendChild(questionDiv);
            columnDiv.appendChild(collapseDiv);
            div.appendChild(columnDiv);
            cardBodyDiv.appendChild(div);
            clickButton();
        });

    })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });

}

function stopQuestionWithQR(question){
    console.log("STOP NA OTAZKU POZOR PES");
    console.log(question); ///333
    console.log("STOP NA OTAZKU");
    setActiveFlagToZero(question.id_question);
    //question.code = "";
    editQFLAG(question.text_q, question, question.id_question);
    //dajak vysledky riesit este neviem

    var questionCODE = startedQuestion.get(question.id_question);
    console.log("POZOR PES");
    questionCODE==null?console.log("ZLE JE"):window.open("https://node24.webte.fei.stuba.sk/"+questionCODE, "_blank")/*window.location.assign("https://node24.webte.fei.stuba.sk/"+questionCODE*/;
    removeByKey(question.id_question)



}



async function setActiveFlagToZero(questionId){ 
    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/update?questionActiveUpdateZero=${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
           
            if (response.ok) {
                console.log('User flag updated successfully');
            } else {
                console.error('Failed to update user flag');
            }
        })
        .catch(error => {
            console.error('Error:', error);

        });
}

function generateRandomWord() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        word += letters[randomIndex];
    }   

    var codeDiv = document.getElementById("thesis-name-modal");
    codeDiv.textContent = " - "+word+" - ";
    return word;
}


function playQuestionWithQR(question){
    modalQR.classList.remove("hidden");
    console.log("SPUSTAM PLAY NA OTAZKU");
    console.log(question);
    console.log("SPUSTAM PLAY NA OTAZKU");

    var divWithGQ = document.getElementById("modalQRDivAdmin");
    divWithGQ.innerHTML = '';

    setActiveFlagToOne(question.id_question);
    question.code = generateRandomWord();
    editQFLAG(question.text_q, question, question.id_question);

    startedQuestion.set(question.id_question, question.code);


    //vygeneruj QR kod
    var qrcode = new QRCode(divWithGQ, {
        text: "https://node24.webte.fei.stuba.sk/harenecPoll/poll.php?code="+question.code, // uprav podla spravneho node
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    //vygeneruj kodik
    //kodik hod do databazy (prepis udaj ktory tam uz je)
    //nastartuj adamkove websockey nwm co 
}

async function setActiveFlagToOne(questionId){ 
    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/update?questionActiveUpdate=${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the data object to JSON string and send it in the request body
        //body: JSON.stringify(data)
    })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                console.log('User flag updated successfully');
                // Handle further actions if needed
            } else {
                console.error('Failed to update user flag');
                // Handle errors if needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if needed
        });
}

function createInfoCollapse(questionId, questionFull) {
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId + "InfoCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");

    cardElement.appendChild(showInfoQ(questionFull));
    cardElement.appendChild(createStatsButton());
    cardElement.appendChild(creatseeStatsCollapse(questionFull));

    collapseContainer.appendChild(cardElement);


    return collapseContainer;
}

function createCopyCollapse(questionId, questionFull) {
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId + "CopyCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");

    cardElement.appendChild(createCopyForm(questionFull));
    collapseContainer.appendChild(cardElement);

    return collapseContainer;
}

function createInputField(textValue) {
    let inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("value", textValue);
    return inputField;
}

function createEditCollapse(questionId, questionFull) {
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId + "EditCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");

    var divkoDoKtorehoJozkoRobiEdit = document.createElement("div"); //TODO JOZKO
    //question id mas ako parameter
    //aj znenie celej specifickej otazky ktoru chceme upravovat mas v parametru questionFull 

    var labelQuestionText = document.createElement("label");
    labelQuestionText.innerHTML = "Question : ";
    var QuestionTextEdit = createInputField(questionFull.text_q);
    divkoDoKtorehoJozkoRobiEdit.appendChild(labelQuestionText);
    divkoDoKtorehoJozkoRobiEdit.appendChild(QuestionTextEdit);

    //XX var labelOpen = document.createElement("label");
    //XX labelOpen.innerHTML = "Open: ";
    //XX var OpenQuestionEdit = createInputField(questionFull.open);
    // var OpenQuestionEdit = document.createElement("input");
    // OpenQuestionEdit.setAttribute("type", "checkbox");
    // if (questionFull.open === '1') {
    //     OpenQuestionEdit.checked = true;
    // } else {
    //     OpenQuestionEdit.checked = false;
    // }
    //XX divkoDoKtorehoJozkoRobiEdit.appendChild(labelOpen);
    //XX divkoDoKtorehoJozkoRobiEdit.appendChild(OpenQuestionEdit);

    //XX var labelActive = document.createElement("label");
    //XX labelActive.innerHTML = "Active: ";
    //XX var activeQuestionEdit = createInputField(questionFull.active);
    //XX divkoDoKtorehoJozkoRobiEdit.appendChild(labelActive);
    //XX divkoDoKtorehoJozkoRobiEdit.appendChild(activeQuestionEdit);

    var updateQuestionBtn = document.createElement("button");
    updateQuestionBtn.classList.add("btn", "btn-primary");
    updateQuestionBtn.textContent = "Update Question";
    divkoDoKtorehoJozkoRobiEdit.appendChild(updateQuestionBtn);

    updateQuestionBtn.addEventListener('click', function () {
        // ODTIALTO SA BUDU ODOSIELAT DATA
        let fakeJson = {
            "creationDate": getCurrentTimestamp(),
            "text_q": QuestionTextEdit.value,
            //"originName": questionFull.text_q
            /*"open": OpenQuestionEdit.value,
            "active": activeQuestionEdit.value*/
        }

        editQ(questionFull.text_q, fakeJson, questionFull.id_question); //TODO JURAJ
    })
    // ############
    // ############

    cardElement.appendChild(divkoDoKtorehoJozkoRobiEdit);
    collapseContainer.appendChild(cardElement);
    return collapseContainer;
}

function getCurrentTimestamp() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const currentTimestamp = year.toString() + '-' + month + '-' + day;
    return currentTimestamp;
}

function createCopyForm(questionFull) {
    var formElement = document.createElement("form");

    var labelElement = document.createElement("label");
    labelElement.setAttribute("for", "sets");
    labelElement.textContent = "Choose where to copy:";
    formElement.appendChild(labelElement);

    var container = document.createElement("div");
    container.classList.add("in-row");
    container.classList.add("centered-v");

    var selectElement = document.createElement("select");
    selectElement.setAttribute("name", "sets");
    selectElement.setAttribute("id", "sets");

    globalSets.forEach(function (set) {
        set = set.name_set;
        var optionElement = document.createElement("option");
        optionElement.setAttribute("value", set.toLowerCase());
        optionElement.textContent = set;
        selectElement.appendChild(optionElement);
    });

    var copyButt = document.createElement("button");
    copyButt.setAttribute("type", "button");
    copyButt.classList.add("btn", "btn-success");
    copyButt.classList.add("bigger-button-font");
    copyButt.setAttribute("data-i18n", "copy_submit_button");
     //copyButt.textContent = "CopyXXX";
    copyButt.addEventListener("click", function () {
        copyQ(questionFull, selectElement.value);
    });

    container.appendChild(selectElement);
    container.appendChild(copyButt);

    formElement.appendChild(container);

    return formElement;
}

function createDeleteCollapse(questionId, questionName) {
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId + "DeleteCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");
    cardElement.classList.add("centered");
    var italicText = document.createElement("h4");
    italicText.setAttribute("data-i18n", "delete_you_sure");
     //italicText.textContent = "Are you sure?XXX";
    italicText.classList.add("centered");
    cardElement.appendChild(italicText);
   collapseContainer.appendChild(cardElement);


    var deleteReally = document.createElement("button");
    deleteReally.type = "button";
    deleteReally.classList.add("btn", "btn-danger");
    deleteReally.setAttribute("data-i18n", "delete_button");
     //deleteReally.textContent = "DeleteXXX";
    deleteReally.classList.add("bigger-button-font");
    deleteReally.addEventListener("click", function () {
        deleteQ(questionId, questionName)
            .then(() => {
                //TODO ADAMKO SHOW DAJAKY OZNAM MODAL INFO ZE BOLO VYMAZANE
            })
    });

    cardElement.appendChild(deleteReally);

    return collapseContainer;
}

async function deleteQ(questionId, questionName) { //TODO BORO Dokoncit aby islo delete
    console.log("DELETE QUESTION" + questionId);
    console.log("Deleting quesiton" + questionName);
    try {
        const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/questions?questionName=${questionId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        var container = document.getElementById("button-container");
                container.innerHTML = "";
                callWhenWholeRecall();
                showToast();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    } //PPPPPP
}

function showInfoQ(question) {
    if (question.open.toString() === "0") {
        //console.log(showQuestionsWithAnswers(question));
        return showQuestionsWithAnswers(question);
    }
    else {
        return showQuestionWithoutAnswes(question);
    }
}

function showQuestionWithoutAnswes(question) {
    var infoElement = document.createElement("i");
    infoElement.textContent = question.text_q;
    return infoElement;
}

async function getAnswersByQuestion(questionText) {
    try {
        const response = await fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/answer?questionAnswer=${questionText}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}




function showQuestionsWithAnswers(question) {
    var returnDiv = document.createElement("div");
    /*var answersData = [
        { id_answer: 1, text_a: "Option A", correct: "1", id_question: 1 },
        { id_answer: 2, text_a: "Option B", correct: "0", id_question: 1 },
        { id_answer: 3, text_a: "Option C", correct: "0", id_question: 1 },
    ]; //TODO BORO TU MUSI DODAT TOTEOTAZKY
*/
    getAnswersByQuestion(question.text_q)
        .then(data => {
            returnDiv.classList.add("in-column");

            var infoElement = document.createElement("h4");
            infoElement.textContent = question.text_q;
            returnDiv.appendChild(infoElement);
            infoElement.classList.add("bigger-font");

            var ulElement = document.createElement("ul");


            data.forEach(function (answer) {

                var liElement = document.createElement("li");
                liElement.textContent = answer.text_a;
                liElement.classList.add("bigger-font");
                var correctness = answer.correct === 1 ? "OK" : "X";
                liElement.textContent += " (" + correctness + ")";

                ulElement.appendChild(liElement);
            });

            returnDiv.appendChild(ulElement);
            return returnDiv;
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });

    return returnDiv;

}

function editQFLAG(originName, question, id) {
    console.log("Poslem toto");
    console.log(id)
    console.log(question);
    console.log(originName);
    console.log("Posielam toto hore");
    console.log(JSON.stringify(question));
    //const data = question;

    // Send a POST request to the server
    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/update?questionUpdate=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the data object to JSON string and send it in the request body
        body: JSON.stringify(question)
    })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                console.log('Question updated successfully');
                //TU PRIDAL BORO
                showToast();
                // Handle further actions if needed
            } else {
                console.error('Failed to update question');
                // Handle errors if needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if needed
        });
}

function editQ(originName, question, id) {
    console.log("Poslem toto");
    console.log(id)
    console.log(question);
    console.log(originName);
    console.log("Posielam toto hore");
    console.log(JSON.stringify(question));
    //const data = question;

    // Send a POST request to the server
    fetch(`https://node24.webte.fei.stuba.sk/harenecPoll/api.php/update?questionUpdate=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the data object to JSON string and send it in the request body
        body: JSON.stringify(question)
    })
        .then(response => {
            // Check if the request was successful
            if (response.ok) {
                console.log('Question updated successfully');
                //TU PRIDAL BORO
                showToast();
                var container = document.getElementById("button-container");
                container.innerHTML = "";
                createButtonsOfSets();
                // Handle further actions if needed
            } else {
                console.error('Failed to update question');
                // Handle errors if needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if needed
        });
}

function copyQ(questionFull, whereToCopy) {
    var mergedObject = {
        "text_q": questionFull.text_q,
        "active": questionFull.active,
        "open": questionFull.open,
        "id_set": findIdByName(whereToCopy),
        "creationDate": questionFull.creationDate,
        "code": questionFull.code
    }; //TODO IDEM TU ROBIT CCCCCCC

    console.log("DDD")
    console.log(findIdByName(whereToCopy));
    console.log(whereToCopy);
    console.log("DDD")

    whereToCopy = whereToCopy.toUpperCase();
    var dataToSend = {
        question: questionFull.text_q,
        name_set: findIdByName(whereToCopy),
        //options: usefulOptionsData,
        open: questionFull.open,
        creationDate: getCurrentTimestamp(),
        active: 0,
        cloudmap: questionFull.cloudmap
    };

    console.log(dataToSend);


    createNewQuestionDatabase(dataToSend)



    console.log("KOPIROVANIE OTAZKY DO NOVEHO SETU")
    console.log(mergedObject); //TODO JURAJ DOKONCI API CALL NA COPY
    console.log("KOPIROVANIE OTAZKY DO NOVEHO SETU")
}   

function showToast() {
    var snackbar = document.createElement('div');
    snackbar.id = "snackbar";
    snackbar.textContent = "Operácia sa podarila";
    document.body.appendChild(snackbar);

    snackbar.className = "show";

    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}

