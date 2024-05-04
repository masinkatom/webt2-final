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
        "open": "0",
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
var globalQuestions = JSON.parse(jsonData);
console.log(globalQuestions);



createButtonsOfSets();


function createButtonsOfSets(){
    var arr = ["DBS", "AZA", "OOP"];
    console.log("Creating buttons", sessionLogin);
    var container = document.getElementById("button-container");
    console.log(container);

    arr.forEach(function(item) {
        createSetSection(item, container);
    });

    container.appendChild(createButton());
    container.appendChild(createNewQuestionCollapse())

}

function createButton() {
    var newQButton = document.createElement("button");
    newQButton.classList.add("btn", "btn-success");
    newQButton.setAttribute("data-bs-toggle", "collapse");
    newQButton.setAttribute("data-bs-target", "#newQuestionCollapse");
    newQButton.setAttribute("aria-controls", "newQuestionCollapse"); // Set aria-controls attribute
    newQButton.style.fontSize = "1.6rem";
    newQButton.textContent = "NEW QUESTIONXXX";
    return newQButton;
}
function createNewQuestionCollapse(){
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = "newQuestionCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-set");
    cardElement.textContent = "NEW QUSTION";
    collapseContainer.appendChild(cardElement);
 
    return collapseContainer;
 }


function createSetSection(item, container){
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
        cardBodyDiv.id = item+"Div";
        collapseDiv.appendChild(cardBodyDiv);

        insertQuestions(cardBodyDiv, item);

        container.appendChild(collapseDiv);
}

function insertQuestions(cardBodyDiv, item){
    console.log(globalQuestions);
    globalQuestions.forEach(function(question) {
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
        
        
        //Info
        var infoButton = document.createElement("button");
        infoButton.classList.add("btn", "btn-primary");
        infoButton.setAttribute("data-bs-toggle", "collapse");
        infoButton.setAttribute("data-bs-target", `#${question.id_question}InfoCollapse`);
        infoButton.style.fontSize = "1.6rem";
        infoButton.textContent = "InfoXXX";

        //InfoModal
        collapseDiv.appendChild(createInfoCollapse(question.id_question, question));
        
        // Copy
        var copyButton = document.createElement("button");
        copyButton.classList.add("btn", "btn-secondary");
        copyButton.setAttribute("data-bs-toggle", "collapse");
        copyButton.setAttribute("data-bs-target", `#${question.id_question}CopyCollapse`);
        copyButton.style.fontSize = "1.6rem";
        copyButton.textContent = "CopyXXX";

        //CopyModal
        collapseDiv.appendChild(createCopyCollapse(question.id_question));

        copyButton.addEventListener("click", function() {
            copyQ(question); //TODO
        });
    
        // Edit
        var editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-warning");
        editButton.setAttribute("data-bs-toggle", "collapse");
        editButton.setAttribute("data-bs-target", `#${question.id_question}EditCollapse`);
        editButton.style.fontSize = "1.6rem";
        editButton.textContent = "EditXX";

        //EditModal
        collapseDiv.appendChild(createEditCollapse(question.id_question, question));
        
        editButton.addEventListener("click", function() {
            editQ(question); //TODO
        });


        //Delete
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.setAttribute("data-bs-toggle", "collapse");
        deleteButton.setAttribute("data-bs-target", `#${question.id_question}DeleteCollapse`);
        deleteButton.style.fontSize = "1.6rem";
        deleteButton.textContent = "DeleteXXX";

        //DeleteModal
        collapseDiv.appendChild(createDeleteCollapse(question.id_question));
        deleteButton.addEventListener("click", function() {
            deleteQ(question); //TODO
        });
    
    
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
    });
}

function createInfoCollapse(questionId, questionFull){
   var collapseContainer = document.createElement("div");
   collapseContainer.classList.add("collapse");
   collapseContainer.id = questionId+"InfoCollapse";
   var cardElement = document.createElement("div");
   cardElement.classList.add("card", "card-body");
   cardElement.classList.add("collapse-info-set");
   cardElement.textContent = "Toto je pre info collapse"+JSON.stringify(questionFull);
   collapseContainer.appendChild(cardElement);

   return collapseContainer;
}

function createCopyCollapse(questionId){
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId+"CopyCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");
    cardElement.textContent = "TOTO JE PRE COPY COLLAPSE"+questionId;
    collapseContainer.appendChild(cardElement);
 
    return collapseContainer;
 }

 function createEditCollapse(questionId, questionFull){
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId+"EditCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");
    cardElement.textContent = "TOTO JE PRE EDIT PANA BOHJA COLLAPSE" + JSON.stringify(questionFull);
    collapseContainer.appendChild(cardElement);
 
    return collapseContainer;
 }

 function createDeleteCollapse(questionId){
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId+"DeleteCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");
    cardElement.textContent = "Delete";
    collapseContainer.appendChild(cardElement);
 
    return collapseContainer;
 }

function deleteQ(question){

}

function showInfoQ(question){

}

function editQ(question){

}

function copyQ(question){

}

function hello(value) {
    console.log("Hello", value);
}

function remove(value) {
    console.log("Remove", value);
}

function add(value) {
    console.log("Add", value);
}
    