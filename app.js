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

    init(){
        this.heading = document.querySelector(".alert-heading");
        this.anwser0 = document.querySelector("#answer0")
        this.anwser1 = document.querySelector("#answer1")
        this.anwser2 = document.querySelector("#answer2")
        this.questionParagraph = document.querySelector("#questionParagraph");

        this.saveAnswerButton = document.querySelector("#saveAnwerButton");
        this.nextQuestionButton = document.querySelector("#nextQuestionButton");

        this.setNextQuestionData();
        
        this.saveAnswerButton.addEventListener("click", this.checkAnswer);
        this.nextQuestionButton.addEventListener("click", this.setNextQuestionData);
    }

    checkAnswer = () => {

    }

    setNextQuestionData = () => {
        this.currentQuestionIndex++;

        if(this.currentQuestionIndex >= this.questions.length){
            console.log("End quiz");
            return;
        }
        const question = this.questions[this.currentQuestionIndex ];
        const qStr = `Question ${this.currentQuestionIndex + 1} z ${this.questions.length}: `;
        this.heading.innerHTML = qStr + question.q;
        this.anwser0.innerHTML = question.ansewrs[0];
        this.anwser1.innerHTML = question.ansewrs[1];
        this.anwser2.innerHTML = question.ansewrs[2];
        this.correctAnswerNum = question.correctAnswerNum;

    }
}

const quiz = new Quiz();