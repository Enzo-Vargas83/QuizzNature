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
    new Question("Quel est le plus grand mamifère marin ?", ["La baleine bleue", "Le requin baleine", "Orque", "Le rorqual"], "La baleine bleue", "image/baleine.jpg"),
    new Question("Quelle taile peut atteindre la baleine bleue ?", ["40m","30 m", "25m", "20m"], "30 m"),
    new Question("Quelle est la longévité moyenne d'une tortue marine ?", ["60 à 80 ans","80 à 90 ans", "100 à 110 ans", "120 à 130 ans"], "60 à 80 ans", "image/tortue.jpg"),
    new Question("Ou se situe la plus grande barrière de corrail du monde ?", ["Australie","Bahamas", "Belize", "Brésil"], "Australie")
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
        <h3 class="fin"> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
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