const quizData = [
  {
    question: "How often do you feel overwhelmed by stress in your daily life?",
    options: ["1 (Not at all)", "2", "3", "4", "5 (A lot)"],
  },
  {
    question: "Have you noticed changes in your sleeping patterns, such as difficulty falling asleep or staying asleep?",
    options: ["1 (Very disorganized)", "2", "3", "4", "5 (Very organized)"],
  },
  {
    question: "Do you often feel sad, empty, or hopeless?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Have you experienced a loss of interest or pleasure in activities you used to enjoy?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Are you frequently irritable, easily angered, or prone to outbursts of emotion?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Do you have trouble concentrating or making decisions?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Have you experienced changes in your appetite or weight, such as significant weight loss or gain?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Do you often feel fatigued or lack energy, even after getting enough rest?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Have you noticed an increase in physical symptoms such as headaches, stomachaches, or muscle tension?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  {
    question: "Do you ever have thoughts of harming yourself or others, or do you feel like life isn't worth living?",
    options: ["1 (Not adventurous)", "2", "3", "4", "5 (Very adventurous)"],
  },
  
];

let currentQuestion = 0;
let userAnswers = [];
function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    questionElement.innerText = quizData[currentQuestion].question;
    optionsElement.innerHTML = '';
  
    for (let i = 0; i < quizData[currentQuestion].options.length; i++) {
      const option = document.createElement('button');
      option.className = 'option';
      option.innerText = quizData[currentQuestion].options[i];
      option.onclick = function() {
        userAnswers[currentQuestion] = i + 1;
        // Change background color of clicked option
        option.style.backgroundColor = '#00ABE4';
        // Remove background color from other options
        const options = document.querySelectorAll('.option');
        options.forEach(opt => {
          if (opt !== option) {
            opt.style.backgroundColor = '';
          }
        });
      };
      optionsElement.appendChild(option);
      optionsElement.appendChild(document.createElement('br'));
    }
  
    // Show/hide previous and next buttons based on current question
    if (currentQuestion === 0) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'inline';
    }
  
    if (currentQuestion === quizData.length) {
      nextBtn.style.display = 'none'; // Hide next button on last question
    } else {
      nextBtn.style.display = 'inline'; // Show next button on other questions
    }
  }

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      showResult();
    }
  }
  

function showResult() {
  const resultElement = document.getElementById('result');
  
  // Calculate average score
  let totalScore = userAnswers.reduce((acc, val) => acc + val, 0);
  let averageScore = totalScore / userAnswers.length;
  
  let feedback = '';
  if (averageScore <= 2) {
    feedback = 'You are doing great!';
  } else if (averageScore <= 3) {
    feedback = 'You have medium risk.';
  } else if (averageScore <= 4) {
    feedback = 'You should consider taking some actions.';
  } else {
    feedback = 'You need immediate attention.';
  }
  
  // Hide question container and show result
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('prev-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  
  resultElement.innerText = `Your average score is: ${averageScore.toFixed(2)}\n\n`;
  resultElement.innerText += `Based on your score, ${feedback}`;
}

loadQuestion();