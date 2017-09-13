var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// daca apasam click pe start/reset buton
document.getElementById("startreset").onclick = function(){
    //daca jucam
    if(playing == true){
        location.reload();// reload page
    }else{//daca nu jucam
        //schimbam starea  la jucam
        playing = true;
        //resetam scor la 0
        score =0;
        document.getElementById("scoreValue").innerHTML = score;
        //afisam cronometrul
        show("timeremaining");
            timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        // ascundem box game over
        hide("gemaover");
        //schimbam butonul start cu reset
        document.getElementById("startreset").innerHTML = "Reseteaza jocul";
        //reducem timpul cu 1 sec/sec cu un loops
         startCountdown();
        
        //generam Q&A
        generateQA();
    }
}
        
        //cand dam clik pe box cu raspus
     for(i=1; i<5; i++){
         document.getElementById("box"+i).onclick = function(){
         //verificam daca jucam
         if(playing == true){//da: verificam daca raspunsul e corect sau nu
             if(this.innerHTML == correctAnswer){
                 //da
                //crestem scor cu 1
                 score++;
                 
                 document.getElementById("scoreValue").innerHTML = score;
                 //arata casuta corecta ptr 1 sec 
                 hide("wrong");
                 show("correct");
                 setTimeout(function(){
                     hide("correct");
                 }, 1000);
                 
                 //generam Q&A
                 generateQA();
                 
             }else{//raspuns gresit
                 hide("correct");
                 show("wrong");
                 setTimeout(function(){
                     hide("wrong");
                 }, 1000);
             }
         }
     }
     }             
                
            //nu
                //try again box ptr 1 sec
    //functii
        //pornire cronometru
        function startCountdown(){
              action = setInterval(function(){
                 timeremaining -= 1; 
                  document.getElementById("timeremainingvalue").innerHTML = timeremaining;
                  if(timeremaining == 0){//game over
                      stopCountdown();
                      show("gemaover");
                      document.getElementById("gemaover").innerHTML = "<p>Sfarsit!</p><p>Scorul tau este "+ score + ".</p>";
                      hide("timeremaining");
                      hide("correct");
                      hide("wrong");
                      playing = false;
                      document.getElementById("startreset").innerHTML = "Start joc";
                  }
                  
              }, 1000);
          }  

    //oprire cronomentru
    function stopCountdown(){
        clearInterval(action);
    }

//ascunde element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}


//arata un element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generare intrebare si raspunsuri
function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+ correctPosition).innerHTML = correctAnswer; //fill 1 box with correct answer
    
    //generare raspunsuri gresite
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); // generare raspusul gresit
            }while(answers.indexOf(wrongAnswer)>-1)
            
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);
        }
    }
    
}