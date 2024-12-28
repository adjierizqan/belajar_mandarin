let vocabulary = []; // This will hold the vocabulary data from the CSV file.
let currentWord = {};
let isAnswerChecked = false; // Track if the answer has been checked

// Function to read the CSV file and convert data into vocabulary array
document.getElementById("upload").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    Papa.parse(file, {
      complete: function (results) {
        // Convert the CSV data into an array of objects
        vocabulary = results.data.map((item) => ({
          mandarin: item.Mandarin,
          pinyin: item.Pinyin,
          english: item.English,
          example: item.Example,
        }));

        loadWord(); // Load the first word after file is processed
      },
      header: true, // Use the first row as headers
      skipEmptyLines: true,
    });
  }
});

// Get a random word from the vocabulary
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * vocabulary.length);
  return vocabulary[randomIndex];
}

function loadWord() {
  if (vocabulary.length > 0) {
    currentWord = getRandomWord();
    document.getElementById(
      "mandarin"
    ).innerText = `Mandarin: ${currentWord.mandarin}`;
    document.getElementById("guess").value = "";
    document.getElementById("result").innerText = "";
    isAnswerChecked = false; // Reset the answer check flag
  } else {
    document.getElementById("mandarin").innerText =
      "Please upload a vocabulary file first.";
  }
}

// Check if the guess is correct
function checkAnswer() {
  const guess = document.getElementById("guess").value.trim().toLowerCase();
  const resultElement = document.getElementById("result");
  const correctAnswers = [
    currentWord.pinyin.toLowerCase(),
    currentWord.mandarin.toLowerCase(),
    currentWord.english.toLowerCase(),
    currentWord.example.toLowerCase(),
  ];

  if (correctAnswers.includes(guess)) {
    resultElement.style.color = "green";
    resultElement.innerHTML = `Correct! The correct answer is: ${currentWord.mandarin}, ${currentWord.pinyin}, or "${currentWord.english}".<br>And the example is: ${currentWord.example}`;
  } else {
    resultElement.style.color = "red";
    resultElement.innerHTML = `Incorrect! The correct answer is: ${currentWord.mandarin}, ${currentWord.pinyin}, or "${currentWord.english}".<br>And the example is: ${currentWord.example}`;
  }

  isAnswerChecked = true; // Mark that the answer has been checked
}

// Handle Enter key for both checking the answer and loading the next word
document.getElementById("guess").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (!isAnswerChecked) {
      checkAnswer(); // If the answer hasn't been checked yet, check it
    } else {
      nextWord(); // If the answer is already checked, load the next word
    }
  }
});

// Load the next word after checking the answer
function nextWord() {
  loadWord(); // Load a new word
}
