class Question {
    constructor(text, choices, answer, img) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      this.img = img;
      
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Quel est le plus gros félin du monde ?", ["Le tigre", "Le jaguar", "Le ligre", "La panthère"], "Le ligre", "image/ligre.jpg"),
    new Question("Quelle est en moyenne l'espérance vie d'une éléphant ?", ["60 – 70 ans","40 - 50 ans", "80 - 90 ans", "+90 ans"], "60 – 70 ans", "image/elephant.jpg"),
    new Question("Combien d'hectar fait la foret amazonienne ?", ["550 millions d'hectares","600 millions d'hectares", "450 millions d'hectares", "300 millions d'hectares"], "550 millions d'hectares"),
    new Question("Ou vit le lémurien ?", ["Tanzanie","Madagascar", "La Réunion", "Australie"], "Madagascar", "image/lémurien")
  ];

  
  console.log(questions);
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  // Regroup all  functions relative to the App Display
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    wrongAns: function(){
        wrongAnsHTML = `<p>La réponse était : "${quiz.getCurrentQuestion().answer}"</p>
        <img src="${quiz.getCurrentQuestion().img}">`;
        this.elementShown("answer", wrongAnsHTML);

    },

    endQuiz: function() {
      endQuizHTML = `
        <h1 class="fin">Quiz terminé !</h1>
        <h3 class="fin"> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>;
        <button class="btn_retour"><a href="index.html">retour</a></button>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          display.wrongAns();
          quiz.guess(guess);
          quizApp();
        }
      }
      // display choices and handle guess
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices()
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();
  
  console.log(quiz);
  
  