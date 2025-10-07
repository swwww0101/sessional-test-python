
// Timer
let time = 90 * 60; // 90 minutes in seconds
const timerDisplay = document.getElementById("timer");

let timerInterval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
    time--;
    if(time < 0) {
        clearInterval(timerInterval);
        alert("Time's up! Test will be submitted automatically.");
        submitTest();
    }
}, 1000);

// SECTION A: MCQs
const mcqs = [
    {q:"What is the correct file extension for Python files?", options:[".pyth",".pt",".py",".p"], answer:"c"},
    {q:"Which of the following is a valid Python identifier?", options:["2variable","var_2","var-2","variable.2"], answer:"b"},
    {q:"What will be the output of x=5; x+=3; print(x)?", options:["5","3","8","Error"], answer:"c"},
    {q:"Which statement is used for decision making in Python?", options:["repeat","switch","if","for"], answer:"c"},
    {q:"Which of the following is a looping statement in Python?", options:["do-while","for","repeat-until","next"], answer:"b"},
    {q:"Output of: for i in range(2,6): print(i,end=' ')?", options:["2 3 4 5","1 2 3 4 5","2 3 4 5 6","Error"], answer:"a"},
    {q:"Which of the following is a keyword in Python?", options:["function","lambda","define","sub"], answer:"b"},
    {q:"len([1,[2,3],4]) returns?", options:["2","3","4","Error"], answer:"b"},
    {q:"Which is used to pass variable number of arguments to a function?", options:["**kwargs","*args","both","none"], answer:"c"},
    {q:"list1=[1,2,3]; list1.append([4,5]); len(list1) is?", options:["3","4","5","6"], answer:"b"},
];

function loadMCQs(){
    let sectionA = document.getElementById('section-a');
    mcqs.forEach((q,i)=>{
        let div = document.createElement('div');
        div.classList.add('mcq');
        div.innerHTML = `<p>Q${i+1}: ${q.q}</p>` + q.options.map((opt,j)=>`
            <label><input type="radio" name="q${i+1}" value="${j}"> ${opt}</label>
        `).join('<br>');
        sectionA.appendChild(div);
    });
}

// SECTION B & C coding questions
const codingQuestions = [
    {id:"b1", q:"Write a Python program to input three numbers and print the largest one using nested if statements."},
    {id:"b2", q:"Write a Python program that prints all even numbers between 1 and 50 using a for loop. Also, display their sum."},
    {id:"c1", q:"Write a Python program to accept 10 integers in a list, find largest and smallest, display in reverse, and sum all even numbers using a function OR define recursive function sum_list(lst) to return sum of elements."}
];

function loadCodingQuestions(){
    let sectionB = document.getElementById('section-b');
    let sectionC = document.getElementById('section-c');
    
    codingQuestions.forEach(cq=>{
        let div = document.createElement('div');
        div.classList.add('coding');
        div.innerHTML = `<p>${cq.q}</p><textarea id="${cq.id}" rows="5" cols="80" placeholder="Write your Python code here..."></textarea>`;
        if(cq.id.startsWith('b')) sectionB.appendChild(div);
        else sectionC.appendChild(div);
    });
}

// Submit Test
function submitTest(){
    clearInterval(timerInterval);
    let score = 0;
    mcqs.forEach((q,i)=>{
        const selected = document.querySelector(`input[name=q${i+1}]:checked`);
        if(selected && selected.value == q.answer.charCodeAt(0)-97) score++; // a=0, b=1, etc.
    });
    document.getElementById('result').innerHTML = `Test Submitted Successfully!<br>Your MCQ Score: ${score}/10<br>Check coding questions manually.`;
    document.getElementById('submitBtn').disabled = true;
}

document.getElementById('submitBtn').addEventListener('click', submitTest);

loadMCQs();
loadCodingQuestions();
