document.addEventListener('DOMContentLoaded', (event) => {
  const words = ['amamentação', 'chupeta', 'fralda', 'berço', 'carrinho de bebê', 'brinquedos sensoriais', 'primeiras palavras', 'rotina', 'desenvolvimento motor', 'dentição', 'passeios', 'banho', 'desenvolvimento social', 'berço portátil', 'vacinação', 'canguru', 'massagem infantil', 'roupinhas', 'música', 'consultas médicas'];
  const dicas = ['Ofereça o seio regularmente para garantir a nutrição adequada e o vínculo emocional com o bebê', 'Use com moderação para acalmar o bebê, mas evite o uso excessivo para evitar problemas dentários', 'Verifique regularmente se o bebê precisa de troca para prevenir assaduras e irritações na pele', 'Mantenha o berço livre de itens soltos e posicione o bebê de costas para dormir para reduzir o risco de síndrome da morte súbita do lactente (SMSL)', 'Escolha um carrinho confortável e seguro para passeios ao ar livre, protegendo o bebê do sol e do vento', 'Introduza brinquedos com texturas diferentes para estimular os sentidos do bebê e promover o desenvolvimento cognitivo', 'Fale com o bebê regularmente para estimular a linguagem e comemore suas tentativas de falar', 'Estabeleça uma rotina consistente para alimentação, sono e atividades para ajudar o bebê a se sentir seguro e previsível', 'Proporcione tempo de barriga e brinquedos que incentivem o movimento para fortalecer os músculos do bebê e desenvolver habilidades motoras', 'Ofereça mordedores seguros para aliviar o desconforto durante o período de dentição', 'Explore o mundo ao redor com o bebê, mas evite lugares lotados ou com muitos germes', 'Use produtos suaves e evite deixar o bebê sozinho na banheira, mesmo por um momento', 'Interaja com o bebê por meio de sorrisos, carícias e brincadeiras para fortalecer o vínculo emocional', 'Ideal para viagens, certifique-se de que seja seguro e confortável para o bebê dormir', 'Mantenha o calendário de vacinação atualizado para proteger o bebê de doenças graves', 'Use para manter o bebê próximo enquanto realiza outras tarefas, promovendo segurança e apego', 'Pratique suavemente para relaxar o bebê e fortalecer o vínculo entre pais e filho', 'Escolha roupas confortáveis e adequadas à temperatura ambiente para garantir o conforto do bebê', 'Toque músicas suaves ou cante para acalmar o bebê e criar uma atmosfera relaxante', 'Mantenha as consultas médicas regulares para monitorar o crescimento e desenvolvimento do bebê e esclarecer dúvidas com o pediatra'];

  let selectedIndex = Math.floor(Math.random() * words.length);
  let selectedWord = words[selectedIndex];
  let selectedDica = dicas[selectedIndex];
  let rightGuesses = [];
  let maxWrongGuesses = 10;
  let wrongGuesses = [];
  let gameEnded = false;

  const displayWord = document.getElementById('wordDisplay');
  const wrongLetters = document.getElementById('wrongLetters');
  const canvas = document.getElementById('hangmanCanvas');
  const ctx = canvas.getContext('2d');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const lettersContainer = document.getElementById('lettersContainer');

  function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function handleGuess(selectedLetter) {
    if (gameEnded) return; // Prevent further guesses if the game has ended

    selectedLetter = normalizeText(selectedLetter);
    let normalizedSelectedWord = normalizeText(selectedWord);
    document.getElementById(`letter-${selectedLetter}`).setAttribute('disabled', true); // Disable the letter button
    if (normalizedSelectedWord.includes(selectedLetter)) {
      if (!rightGuesses.includes(selectedLetter)) {
        rightGuesses.push(selectedLetter);
        updateDisplayWord();
      }
    } else {
      if (!wrongGuesses.includes(selectedLetter)) {
        wrongGuesses.push(selectedLetter);
        updateWrongLetters();
      }
    }
    checkEndGame();
  }

  function updateDisplayWord() {
    let display = selectedWord.split('').map(letter => letter === ' ' ? '*' : (rightGuesses.includes(normalizeText(letter)) ? letter : '_')).join(' ');
    displayWord.innerHTML = display;
    checkEndGame();
  }

  function updateWrongLetters() {
    wrongLetters.innerHTML = wrongGuesses.join(', ');
    drawHangman(wrongGuesses.length);
    checkEndGame();
  }

  function drawHangman(stage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 8;

    if (stage >= 1) {
      ctx.beginPath();
      ctx.moveTo(10, 190);
      ctx.lineTo(140, 190);
      ctx.stroke();
    }
    if (stage >= 2) {
      ctx.beginPath();
      ctx.moveTo(75, 190);
      ctx.lineTo(75, 10);
      ctx.stroke();
    }
    if (stage >= 3) {
      ctx.beginPath();
      ctx.moveTo(75, 10);
      ctx.lineTo(125, 10);
      ctx.stroke();
    }
    if (stage >= 4) {
      ctx.beginPath();
      ctx.moveTo(125, 10);
      ctx.lineTo(125, 30);
      ctx.stroke();
    }
    if (stage >= 5) {
      ctx.beginPath();
      ctx.arc(125, 45, 15, 0, Math.PI * 2, true);
      ctx.stroke();
    }
    if (stage >= 6) {
      ctx.beginPath();
      ctx.moveTo(125, 60);
      ctx.lineTo(125, 130);
      ctx.stroke();
    }
    if (stage >= 7) {
      ctx.beginPath();
      ctx.moveTo(125, 70);
      ctx.lineTo(105, 90);
      ctx.stroke();
    }
    if (stage >= 8) {
      ctx.beginPath();
      ctx.moveTo(125, 70);
      ctx.lineTo(145, 90);
      ctx.stroke();
    }
    if (stage >= 9) {
      ctx.beginPath();
      ctx.moveTo(125, 130);
      ctx.lineTo(105, 150);
      ctx.stroke();
    }
    if (stage >= 10) {
      ctx.beginPath();
      ctx.moveTo(125, 130);
      ctx.lineTo(145, 150);
      ctx.stroke();
    }
  }

  function checkEndGame() {
    if (rightGuesses.length === new Set(normalizeText(selectedWord.replace(/ /g, '')).split('')).size) {
      if (!gameEnded) {
        alert('Parabéns! Você é craque no universo de JoPi: ' + selectedWord + '.\n\nDICA: ' + selectedDica);
        endGame();
      }
    } else if (wrongGuesses.length >= maxWrongGuesses) {
      if (!gameEnded) {
        alert('Oh, que pena, continue treinando! A palavra era: ' + selectedWord + '.\n\nDICA: ' + selectedDica);
        endGame();
      }
    }
  }

  function endGame() {
    gameEnded = true;
    document.querySelectorAll('.letter-button').forEach(button => button.setAttribute('disabled', true));
    document.getElementById('startGame').style.display = 'block';
  }

  function initializeGame() {
    selectedIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[selectedIndex];
    selectedDica = dicas[selectedIndex];
    rightGuesses = [];
    wrongGuesses = [];
    gameEnded = false;
    updateDisplayWord();
    updateWrongLetters();
    drawHangman(0);
    document.querySelectorAll('.letter-button').forEach(button => button.removeAttribute('disabled'));
    document.getElementById('startGame').style.display = 'none';
  }

  lettersContainer.innerHTML = '';
  alphabet.forEach(letter => {
    const letterElement = document.createElement('button');
    letterElement.innerText = letter;
    letterElement.addEventListener('click', () => handleGuess(letter));
    letterElement.setAttribute('id', `letter-${letter}`);
    letterElement.setAttribute('class', 'letter-button');
    letterElement.setAttribute('disabled', true); // Desabilitar inicialmente
    lettersContainer.appendChild(letterElement);
  });

  document.getElementById('startGame').addEventListener('click', function() {
    initializeGame();
  });
});