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
var globalQuestions = JSON.parse(jsonData);
console.log(globalQuestions);

var globalQuestionSets = ["DBS", "AZA", "OOP"];

console.log("CO DOPICI");
createButtonsOfSets();


function createButtonsOfSets(){
    
    console.log("Creating buttons", sessionLogin);
    var container = document.getElementById("button-container");
    console.log(container);

    globalQuestionSets.forEach(function(item) {
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
    newQButton.textContent = "NEW QUESTIONWTFXXX";
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
        collapseDiv.appendChild(createCopyCollapse(question.id_question, question));
    
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
   
   cardElement.appendChild(showInfoQ(questionFull));
   
   collapseContainer.appendChild(cardElement);
   

   return collapseContainer;
}

function createCopyCollapse(questionId, questionFull){
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId+"CopyCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");
    
    cardElement.appendChild(createCopyForm(questionFull));
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


 function createCopyForm(questionFull){
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

    globalQuestionSets.forEach(function(set) {
        var optionElement = document.createElement("option");
        optionElement.setAttribute("value", set.toLowerCase());
        optionElement.textContent = set;
        selectElement.appendChild(optionElement);
    });

    var copyButt = document.createElement("button");
    copyButt.setAttribute("type", "button"); 
    copyButt.classList.add("btn", "btn-success");
    copyButt.classList.add("bigger-button-font");
    copyButt.textContent = "CopyXXX";
    copyButt.addEventListener("click", function() {
        copyQ(questionFull, selectElement.value);
});

container.appendChild(selectElement);
container.appendChild(copyButt);

formElement.appendChild(container);

return formElement;
 }

 function createDeleteCollapse(questionId){
    var collapseContainer = document.createElement("div");
    collapseContainer.classList.add("collapse");
    collapseContainer.id = questionId+"DeleteCollapse";
    var cardElement = document.createElement("div");
    cardElement.classList.add("card", "card-body");
    cardElement.classList.add("collapse-info-set");
    cardElement.classList.add("centered");
    var italicText = document.createElement("h4");
    italicText.textContent = "Are you sure?XXX";
    italicText.classList.add("centered");
    cardElement.appendChild(italicText);
    //cardElement.textContent = "DeleteTA CO DOPICIDOPICIXdX";
    collapseContainer.appendChild(cardElement);


    var deleteReally = document.createElement("button");
    deleteReally.type = "button";
    deleteReally.classList.add("btn", "btn-danger");
    deleteReally.textContent = "DeleteXXX";
    deleteReally.classList.add("bigger-button-font");
    deleteReally.addEventListener("click", function() {
        deleteQ(questionId);
    });

    cardElement.appendChild(deleteReally);

    return collapseContainer;
 }

function deleteQ(questionId){
    console.log("DELETE QUESTION"+questionId);
}

function showInfoQ(question){
    if(question.open === "0"){
        return showQuestionsWithAnswers(question);
    }
    else{
        return showQuestionWithoutAnswes(question);
    }
}

function showQuestionWithoutAnswes(question){
    var infoElement = document.createElement("i");
    infoElement.textContent = question.text_q;
    return infoElement;
}

function showQuestionsWithAnswers(question){
    var answersData = [
        { id_answer: 1, text_a: "Option A", correct: "1", id_question: 1 },
        { id_answer: 2, text_a: "Option B", correct: "0", id_question: 1 },
        { id_answer: 3, text_a: "Option C", correct: "0", id_question: 1 },
    ]; //TODO BORO TU MUSI DODAT TOTEOTAZKY

  
    var returnDiv = document.createElement("div");
    returnDiv.classList.add("in-column");

    var infoElement = document.createElement("h4");
    infoElement.textContent =  question.text_q;
    returnDiv.appendChild(infoElement);
    infoElement.classList.add("bigger-font");

    var ulElement = document.createElement("ul");


    answersData.forEach(function(answer) {
        var liElement = document.createElement("li");
        liElement.textContent = answer.text_a;
        liElement.classList.add("bigger-font");
        var correctness = answer.correct === "1" ? "correctXXX" : "incorectXXX";
        liElement.textContent += " (" + correctness + ")";

        ulElement.appendChild(liElement);
    });

    returnDiv.appendChild(ulElement);
    return returnDiv;

}

function editQ(question){

}

function copyQ(questionFull, whereToCopy){
    console.log("COPYING questionFUll " + JSON.stringify(questionFull));
    console.log("where to copy: "+whereToCopy);
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
    