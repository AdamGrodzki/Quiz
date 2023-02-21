window.onload = function(){
    quiz.init();
    // console.log("app started");
}

class Quiz{
    questions = [
        {q: "Ile to jest 10 /2 ?", ansewrs: ["4","5", "4.5"], correctAnswerNum: 1},
        {q: "Ile to jest 16 + 2 ?", ansewrs: ["18","16", "20"], correctAnswerNum: 0},
        {q: "Ile to jest 8 * 2 ?", ansewrs: ["18","10", "16"], correctAnswerNum: 2},
    ];

    currentQuestionIndex = -1;
    heading = null;
    questionParagraph = null;
    anwser0 = null;
    answer1 = null;
    answer2 = null;
    correctAnswerNum = null;

    userSelectedInput = null;
    userCorrectAnwersNum = 0 ;
    userIncorrectAnwersNum = 0;
    saveAnswerButton = null;
    nextQuestionButton = null;

    modalWindow = null;

    init(){
        this.heading = document.querySelector(".alert-heading");
        this.anwser0 = document.querySelector("#answer0");
        this.anwser1 = document.querySelector("#answer1");
        this.anwser2 = document.querySelector("#answer2");
        this.questionParagraph = document.querySelector("#questionParagraph");

        this.saveAnswerButton = document.querySelector("#saveAnswerButton");
        this.nextQuestionButton = document.querySelector("#nextQuestionButton");

        this.setNextQuestionData();
        
        this.saveAnswerButton.addEventListener("click", this.checkAnswer);
        this.nextQuestionButton.addEventListener("click", this.setNextQuestionData);

        this.initModal();
    }

    initModal = () => {
        this.modalWindow = new bootstrap.Modal(document.getElementById("modalWindow"));

        document.getElementById("closeModal").addEventListener("click", this.restartQuiz);
    }

    checkAnswer = () => {
        this.userSelectedInput = document.querySelector("input[type='radio']:checked");
        if(!this.userSelectedInput) return;

        const selectedIndex = this.userSelectedInput.getAttribute("data-index");

        if(selectedIndex == this.correctAnswerNum){
            // correct
            this.userCorrectAnwersNum++;
            this.userSelectedInput.classList.add("is-valid");
        }else {
            //incorrect
            this.userIncorrectAnwersNum++;
            this.userSelectedInput.classList.add("is-invalid");
        }

        this.setUserStats();

        this.saveAnswerButton.classList.add("disabled");
        this.nextQuestionButton.classList.remove("disabled");
    }

    setUserStats = () => {
        document.getElementById("corrrectAnswers").innerHTML = this.userCorrectAnwersNum;
        document.getElementById("incorrectAnswers").innerHTML = this.userIncorrectAnwersNum;
    
    }

    setNextQuestionData = () => {
        this.currentQuestionIndex++;

        if(this.currentQuestionIndex >= this.questions.length){
            console.log("End quiz");
            this.showModalResults();
            return;
        }
        const question = this.questions[this.currentQuestionIndex ];
        const qStr = `Question ${this.currentQuestionIndex + 1} z ${this.questions.length}: `;
        this.heading.innerHTML = qStr + question.q;
        this.anwser0.innerHTML = question.ansewrs[0];
        this.anwser1.innerHTML = question.ansewrs[1];
        this.anwser2.innerHTML = question.ansewrs[2];
        this.correctAnswerNum = question.correctAnswerNum;

        document.querySelectorAll("input[type='radio']").forEach((el) => {
            el.classList.remove("is-valid");
            el.classList.remove("is-invalid");
            el.checked = false;
        });

        this.saveAnswerButton.classList.remove("disabled");
        this.nextQuestionButton.classList.add("disabled");
    }
    showModalResults = () => {
        
        const modalParagraph = document.getElementById("modalResults");

        let information;
        if(this.userCorrectAnwersNum >= this.userIncorrectAnwersNum){
            information = "Brawo";
        }else{
            information = ": (";
        }
        modalParagraph.innerHTML = information;
        this.modalWindow.toggle();
    }
    restartQuiz = () => {
        this.currentQuestionIndex =-1;
        this.userCorrectAnwersNum = 0;
        this.userIncorrectAnwersNum =0;

        this.setUserStats();
        this.setNextQuestionData();
    }
}

const quiz = new Quiz();