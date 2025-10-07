
// Basic timer and screen handling
let time = 90 * 60; // 90 minutes
let timerInterval;
document.getElementById('start-form').addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('start-screen').style.display='none';
    document.getElementById('exam-screen').style.display='block';
    startTimer();
    loadMCQs();
});
function startTimer(){
    timerInterval = setInterval(()=>{
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        document.getElementById('timer').textContent = minutes+":"+(seconds<10?'0':'')+seconds;
        if(time<=0){ submitTest(); }
        time--;
    },1000);
}
// Simple MCQs placeholder
function loadMCQs(){
    let sectionA = document.getElementById('section-a');
    for(let i=1;i<=10;i++){
        let div = document.createElement('div');
        div.innerHTML=`<p>Q${i}: Sample MCQ question ${i}?</p>
        <label><input type="radio" name="q${i}" value="a"> Option A</label>
        <label><input type="radio" name="q${i}" value="b"> Option B</label>
        <label><input type="radio" name="q${i}" value="c"> Option C</label>
        <label><input type="radio" name="q${i}" value="d"> Option D</label>`;
        sectionA.appendChild(div);
    }
}
// Submit Test
document.getElementById('submit-btn').addEventListener('click', submitTest);
function submitTest(){
    clearInterval(timerInterval);
    document.getElementById('exam-screen').style.display='none';
    document.getElementById('results-screen').style.display='block';
    document.getElementById('results').innerHTML='<p>Your answers have been recorded.</p>';
}
// Disable copy/paste, right-click, and tab switch detection (basic)
document.addEventListener('contextmenu', e=>e.preventDefault());
document.addEventListener('copy', e=>e.preventDefault());
document.addEventListener('cut', e=>e.preventDefault());
window.addEventListener('blur', e=>{
    alert('Tab switched! Exam will auto-submit.');
    submitTest();
});
// Webcam preview (local only)
navigator.mediaDevices.getUserMedia({ video:true })
.then(stream => {
    let video=document.createElement('video');
    video.srcObject=stream;
    video.autoplay=true;
    video.style.width='150px';
    video.style.position='fixed';
    video.style.bottom='10px';
    video.style.right='10px';
    document.body.appendChild(video);
})
.catch(err=>{ console.log('Webcam not allowed or available.'); });
