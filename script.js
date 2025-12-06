

// Visszaszámláló
function updateCountdown() {
    var countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    var christmas = new Date('2025-12-24T18:00:00');
    var now = new Date();
    var diff = christmas - now;

    if (diff <= 0) {
        countdownEl.textContent = 'Boldog Karácsonyt! 🎄';
        return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent =
        days + ' nap, ' + hours + ' óra, ' + minutes + ' perc, ' + seconds + ' másodperc';
}

// RSVP (localStorage alapú vendéglista)
function loadGuests() {
    try {
        var guests = localStorage.getItem('guests');
        return guests ? JSON.parse(guests) : [];
    } catch (e) {
        return [];
    }
}

function saveGuests(guests) {
    localStorage.setItem('guests', JSON.stringify(guests));
}

function displayGuests() {
    var guestList = document.getElementById('guestList');
    if (!guestList) return;
    var guests = loadGuests();
    guestList.innerHTML = '';

    guests.forEach(function(g, i) {
        var li = document.createElement('li');
        li.textContent = g + ' ';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Törlés';
        btn.className = 'remove-guest';
        btn.addEventListener('click', function() {
            removeGuest(i);
        });

        li.appendChild(btn);
        guestList.appendChild(li);
    });
}

function removeGuest(index) {
    var guests = loadGuests();
    if (index < 0 || index >= guests.length) return;
    if (!confirm('Biztosan törlöd ezt a nevet: ' + guests[index] + ' ?')) return;
    guests.splice(index, 1);
    saveGuests(guests);
    displayGuests();
}

function clearGuests() {
    if (!confirm('Biztosan törlöd az összes vendégnevet?')) return;
    localStorage.removeItem('guests');
    displayGuests();
}

// Hópelyhek létrehozása (README-hoz kompatibilis)
function createSnowflake() {
    var snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(snowflake);

    setTimeout(function() {
        snowflake.remove();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Visszaszámláló indul
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // RSVP űrlap kezelése
    var form = document.getElementById('rsvpForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var nameInput = document.getElementById('nameInput');
            if (!nameInput) return;
            var name = nameInput.value.trim();
            if (!name) return;
            var guests = loadGuests();
            guests.push(name);
            saveGuests(guests);
            displayGuests();
            nameInput.value = '';
            alert('Köszönjük, ' + name + '! Várunk szeretettel! 🎄');
        });
    }

    // Vendéglista törlés gomb, ha van
    var clearBtn = document.getElementById('clearGuestsBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearGuests);
    }

    // Hópelyhek indítása (README példa szerinti viselkedés)
    setInterval(createSnowflake, 300);

    // Megjelenítjük a mentett vendégeket
    displayGuests();
});


function postMessage() {
    var message = document.getElementById('messageInput').value;
    var author = document.getElementById('messageAuthor').value || 'Névtelen';
    
    if (message) {
        var messages = JSON.parse(localStorage.getItem('familyMessages') || '[]');
        var newMessage = {
            text: message,
            author: author,
            time: new Date().toLocaleString('hu-HU')
        };
        messages.push(newMessage);
        localStorage.setItem('familyMessages', JSON.stringify(messages));
        
        document.getElementById('messageInput').value = '';
        document.getElementById('messageAuthor').value = '';
        displayMessages();
    }
}



function postMessage() {
    var messageEl = document.getElementById('messageInput');
    var authorEl = document.getElementById('messageAuthor');
    if (!messageEl) return;
    var message = messageEl.value.trim();
    var author = (authorEl && authorEl.value.trim()) || 'Névtelen';
    
    if (message) {
        var messages = JSON.parse(localStorage.getItem('familyMessages') || '[]');
        var newMessage = {
            text: message,
            author: author,
            time: new Date().toLocaleString('hu-HU')
        };
        messages.push(newMessage);
        localStorage.setItem('familyMessages', JSON.stringify(messages));
        
        messageEl.value = '';
        if (authorEl) authorEl.value = '';
        displayMessages(); // frissítjük az üzenőfalat azonnal
    }
}



// Új: törlés egyetlen üzenetnél
function removeMessage(index) {
    var messages = JSON.parse(localStorage.getItem('familyMessages') || '[]');
    if (index < 0 || index >= messages.length) return;
    if (!confirm('Biztosan törlöd ezt az üzenetet?\\n\\n"' + messages[index].text + '" — ' + messages[index].author)) return;
    messages.splice(index, 1);
    localStorage.setItem('familyMessages', JSON.stringify(messages));
    displayMessages();
}

// Segédfüggvény XSS ellen (egyszerű escape)
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}



function displayMessages() {
    var messages = JSON.parse(localStorage.getItem('familyMessages') || '[]');
    var board = document.getElementById('messageBoard');
    if (!board) return;
    board.innerHTML = '';
    
    // Fordított sorrendben (legújabb elől). Index i megfelel az eredeti tömb indexének.
    for (var i = messages.length - 1; i >= 0; i--) {
        var m = messages[i];
        var container = document.createElement('div');
        container.className = 'message';
        
        var header = document.createElement('div');
        header.className = 'message-header';
        header.innerHTML = '<strong>' + escapeHtml(m.author) + '</strong> <span class="time"> ' + escapeHtml(m.time) + '</span>';
        
        var text = document.createElement('p');
        text.className = 'message-text';
        text.innerHTML = escapeHtml(m.text);
        
        var delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.textContent = 'Törlés';
        delBtn.className = 'remove-message';
        // bezárásos callback az eredeti indexre
        (function(idx){
            delBtn.addEventListener('click', function(){ removeMessage(idx); });
        })(i);
        
        container.appendChild(header);
        container.appendChild(text);
        container.appendChild(delBtn);
        board.appendChild(container);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    // Megjelenítjük a mentett vendégeket
    displayGuests();
    // Megjelenítjük a mentett üzeneteket
    displayMessages();
});

var quizQuestions = [
    {
        question: "Melyik országból származik a karácsonyfa hagyománya?",
        options: ["Anglia", "Németország", "Franciaország", "Olaszország"],
        correct: 1
    },
    {
        question: "Hány rénszarvasa van a Mikulásnak a hagyomány szerint?",
        options: ["6", "8", "9", "12"],
        correct: 2
    },
    {
        question: "Melyik színű NEM karácsonyi szín hagyományosan?",
        options: ["Piros", "Zöld", "Kék", "Arany"],
        correct: 2
    },
    {
        question: "Mi a Jézus születésének helye?",
        options: ["Jeruzsálem", "Betlehem", "Názáret", "Kapernaum"],
        correct: 1
    },
    {
        question: "Melyik napon van Szenteste Magyarországon?",
        options: ["December 23", "December 24", "December 25", "December 26"],
        correct: 1
    }
];

var currentQuestion = 0;
var quizScore = 0;

function showQuestion() {
    var q = quizQuestions[currentQuestion];
    document.getElementById('quizQuestion').innerHTML = '<h4>' + (currentQuestion + 1) + '. ' + q.question + '</h4>';
    
    var optionsHtml = '';
    for (var i = 0; i < q.options.length; i++) {
        optionsHtml += '<button onclick="checkAnswer(' + i + ')" style="margin: 5px;">' + q.options[i] + '</button>';
    }
    document.getElementById('quizOptions').innerHTML = optionsHtml;
}

function checkAnswer(selected) {
    var q = quizQuestions[currentQuestion];
    if (selected === q.correct) {
        quizScore++;
        alert('✅ Helyes!');
    } else {
        alert('❌ Sajnos nem. A helyes válasz: ' + q.options[q.correct]);
    }
    document.getElementById('quizScore').textContent = 'Pontszám: ' + quizScore + '/' + quizQuestions.length;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= quizQuestions.length) {
        document.getElementById('quizQuestion').innerHTML = '<h4>🎉 Vége a kvíznek!</h4>';
        document.getElementById('quizOptions').innerHTML = '<p>Végső pontszám: ' + quizScore + '/' + quizQuestions.length + '</p>';
    } else {
        showQuestion();
    }
}

showQuestion();

var secretNumber = Math.floor(Math.random() * 100) + 1;
var attempts = 0;

function checkGuess() {
    var guess = parseInt(document.getElementById('guessInput').value);
    attempts++;
    document.getElementById('guessCount').textContent = 'Próbálkozások: ' + attempts;
    
    if (guess === secretNumber) {
        document.getElementById('guessResult').textContent = 
            '🎉 NYERTÉL! A szám ' + secretNumber + ' volt! (' + attempts + ' próbálkozás)';
        document.getElementById('guessResult').style.color = 'green';
    } else if (guess < secretNumber) {
        document.getElementById('guessResult').textContent = '⬆️ Nagyobb!';
        document.getElementById('guessResult').style.color = '#b30000';
    } else {
        document.getElementById('guessResult').textContent = '⬇️ Kisebb!';
        document.getElementById('guessResult').style.color = '#b30000';
    }
    
    document.getElementById('guessInput').value = '';
}

function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessCount').textContent = 'Próbálkozások: 0';
    document.getElementById('guessResult').textContent = '';
    document.getElementById('guessInput').value = '';
}
