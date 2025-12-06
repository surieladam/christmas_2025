# 🎄 Családi Karácsonyi Meghívó 2025 🎁

Ez a projekt egy interaktív karácsonyi meghívó weboldal, amit a családi ünnepségre készítettem.

---

## 🚀 Fejlesztési Ötletek

Az alábbiakban összegyűjtöttem néhány ötletet, amivel tovább lehet fejleszteni az oldalt. Minden ötlet mellett van egy nehézségi szint (⭐ = könnyű, ⭐⭐ = közepes, ⭐⭐⭐ = kihívás) és tippek a megvalósításhoz.

---

### 1. 🎵 QR Kód karácsonyi dalhoz ⭐

**Mit csinál:** Egy QR kód, amit ha valaki beolvas a telefonjával, megnyílik egy karácsonyi dal (pl. YouTube-on).

**Hogyan csináld:**
1. Menj a https://www.qrcode-monkey.com/ oldalra
2. Másold be egy karácsonyi dal YouTube linkjét (pl. Mariah Carey - All I Want for Christmas)
3. Generáld le a QR kódot és töltsd le képként
4. Add hozzá az oldalhoz:

```html
<section>
    <h3>🎵 Hallgass karácsonyi zenét!</h3>
    <p>Olvasd be a QR kódot a telefonoddal:</p>
    <img src="qr-code.png" alt="QR kód karácsonyi dalhoz" width="150">
</section>
```

---

### 2. ❄️ Hulló hópelyhek animáció ⭐⭐

**Mit csinál:** Hópelyhek hullanak az oldal tetejéről az aljáig.

**Hogyan csináld:**

**CSS (style.css):**
```css
.snowflake {
    position: fixed;
    top: -10px;
    color: white;
    font-size: 20px;
    animation: fall 5s linear infinite;
}

@keyframes fall {
    0% {
        top: -10px;
        opacity: 1;
    }
    100% {
        top: 100vh;
        opacity: 0;
    }
}
```

**JavaScript (script.js):**
```javascript
// Hópelyhek létrehozása
function createSnowflake() {
    var snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(snowflake);
    
    // Töröljük a hópelyheket 5 másodperc után
    setTimeout(function() {
        snowflake.remove();
    }, 5000);
}

// Minden 300ms-ban új hópehely
setInterval(createSnowflake, 300);
```

---

### 3. 📝 Visszajelzés űrlap (Ki jön biztosan?) ⭐⭐

**Mit csinál:** A családtagok beírhatják a nevüket, és az oldal megjegyzi, ki jön.

**HTML (index.html):**
```html
<section>
    <h3>📝 Jelezd vissza, hogy jössz!</h3>
    <form id="rsvpForm">
        <input type="text" id="nameInput" placeholder="Írd be a neved" required>
        <button type="submit">Igen, ott leszek! ✅</button>
    </form>
    <h4>Eddig ezek jeleztek vissza:</h4>
    <ul id="guestList"></ul>
</section>
```

**JavaScript (script.js):**
```javascript
// Vendéglista betöltése
function loadGuests() {
    var guests = localStorage.getItem('guests');
    if (guests) {
        return JSON.parse(guests);
    }
    return [];
}

// Vendéglista mentése
function saveGuests(guests) {
    localStorage.setItem('guests', JSON.stringify(guests));
}

// Lista megjelenítése
function displayGuests() {
    var guestList = document.getElementById('guestList');
    var guests = loadGuests();
    guestList.innerHTML = '';
    
    for (var i = 0; i < guests.length; i++) {
        var li = document.createElement('li');
        li.textContent = guests[i];
        guestList.appendChild(li);
    }
}

// Űrlap kezelése
var form = document.getElementById('rsvpForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('nameInput').value;
        var guests = loadGuests();
        guests.push(name);
        saveGuests(guests);
        displayGuests();
        document.getElementById('nameInput').value = '';
        alert('Köszönjük, ' + name + '! Várunk szeretettel! 🎄');
    });
}

// Oldal betöltésekor jelenítsd meg a listát
displayGuests();
```

---

### 4. ⏰ Visszaszámláló karácsonyig ⭐⭐

**Mit csinál:** Mutatja, hány nap/óra/perc van még karácsonyig.

**HTML:**
```html
<section>
    <h3>⏰ Visszaszámláló</h3>
    <p id="countdown">Betöltés...</p>
</section>
```

**JavaScript:**
```javascript
function updateCountdown() {
    var christmas = new Date('2025-12-24T18:00:00');
    var now = new Date();
    var diff = christmas - now;
    
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').textContent = 
        days + ' nap, ' + hours + ' óra, ' + minutes + ' perc, ' + seconds + ' másodperc';
}

// Frissítsd minden másodpercben
setInterval(updateCountdown, 1000);
updateCountdown();
```

---

### 5. 🖼️ Karácsonyi háttérkép ⭐

**Mit csinál:** Egy szép karácsonyi háttérkép az oldalon.

**CSS:**
```css
body {
    background-image: url('christmas.avif');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
```

**Tipp:** A `christmas.avif` fájl már megvan a mappában! 😊

---

### 6. 🎁 Hover effekt a gombokra ⭐

**Mit csinál:** A gombok megváltoznak, ha föléjük viszed az egeret.

**CSS:**
```css
button {
    background-color: #b30000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
}

button:hover {
    background-color: #006400;
    transform: scale(1.1);
}
```

---

### 7. 🔔 Hangeffekt kattintásra ⭐⭐⭐

**Mit csinál:** Ha rákattintasz egy gombra, karácsonyi csengő hang szólal meg.

**HTML:**
```html
<audio id="bellSound" src="bell.mp3"></audio>
```

**JavaScript:**
```javascript
document.querySelector('button').addEventListener('click', function() {
    document.getElementById('bellSound').play();
});
```

**Tipp:** Keress egy ingyenes csengő hangot itt: https://freesound.org/

---

## 🎉 Ötletek az ünnepség napjára

Ezek a funkciók akkor lesznek igazán hasznosak, amikor már együtt van a család december 24-én!

---

### 8. 🎅 Titkos Mikulás sorsoló ⭐⭐

**Mit csinál:** Beírjátok a családtagok neveit, és az oldal véletlenszerűen kioszt mindenkit valakinek (ajándékozás céljából). Mindenki csak a saját "célpontját" látja!

**HTML:**
```html
<section id="secretSanta">
    <h3>🎅 Titkos Mikulás sorsoló</h3>
    <p>Add hozzá a családtagokat, majd húzz!</p>
    
    <input type="text" id="personName" placeholder="Családtag neve">
    <button onclick="addPerson()">Hozzáad</button>
    
    <h4>Résztvevők:</h4>
    <ul id="personList"></ul>
    
    <button onclick="drawNames()">🎁 Sorsolás!</button>
    
    <div id="drawSection" style="display:none;">
        <h4>Ki vagy te?</h4>
        <select id="whoAmI"></select>
        <button onclick="showMyPerson()">Mutasd kinek veszek ajándékot!</button>
        <p id="myResult"></p>
    </div>
</section>
```

**JavaScript:**
```javascript
var people = [];
var assignments = {};

function addPerson() {
    var name = document.getElementById('personName').value;
    if (name) {
        people.push(name);
        document.getElementById('personName').value = '';
        updatePersonList();
    }
}

function updatePersonList() {
    var list = document.getElementById('personList');
    list.innerHTML = '';
    for (var i = 0; i < people.length; i++) {
        var li = document.createElement('li');
        li.textContent = people[i];
        list.appendChild(li);
    }
}

function drawNames() {
    if (people.length < 2) {
        alert('Legalább 2 ember kell a sorsoláshoz!');
        return;
    }
    
    // Keverjük össze a neveket
    var shuffled = people.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    
    // Mindenki a következő személynek vesz ajándékot (kör)
    assignments = {};
    for (var i = 0; i < people.length; i++) {
        var nextIndex = (i + 1) % people.length;
        assignments[shuffled[i]] = shuffled[nextIndex];
    }
    
    // Dropdown feltöltése
    var select = document.getElementById('whoAmI');
    select.innerHTML = '<option value="">Válassz...</option>';
    for (var i = 0; i < people.length; i++) {
        var option = document.createElement('option');
        option.value = people[i];
        option.textContent = people[i];
        select.appendChild(option);
    }
    
    document.getElementById('drawSection').style.display = 'block';
    alert('Sorsolás kész! Mindenki nézze meg külön-külön, kinek vesz ajándékot!');
}

function showMyPerson() {
    var me = document.getElementById('whoAmI').value;
    if (me && assignments[me]) {
        document.getElementById('myResult').textContent = 
            '🎁 Te ' + assignments[me] + ' -nak/nek veszel ajándékot!';
    }
}
```

---

### 9. 📸 Családi fotófal ⭐⭐

**Mit csinál:** A családtagok feltölthetnek képeket az ünnepségről, és egy galériában megjelennek.

**HTML:**
```html
<section>
    <h3>📸 Családi fotófal</h3>
    <input type="file" id="photoInput" accept="image/*">
    <button onclick="addPhoto()">Kép hozzáadása</button>
    <div id="photoGallery" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px;"></div>
</section>
```

**JavaScript:**
```javascript
function addPhoto() {
    var input = document.getElementById('photoInput');
    var file = input.files[0];
    
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '10px';
            img.style.border = '3px solid #b30000';
            document.getElementById('photoGallery').appendChild(img);
            
            // Mentés localStorage-ba
            var photos = JSON.parse(localStorage.getItem('photos') || '[]');
            photos.push(e.target.result);
            localStorage.setItem('photos', JSON.stringify(photos));
        };
        reader.readAsDataURL(file);
    }
}

// Képek betöltése oldal megnyitásakor
function loadPhotos() {
    var photos = JSON.parse(localStorage.getItem('photos') || '[]');
    var gallery = document.getElementById('photoGallery');
    for (var i = 0; i < photos.length; i++) {
        var img = document.createElement('img');
        img.src = photos[i];
        img.style.width = '150px';
        img.style.height = '150px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';
        img.style.border = '3px solid #b30000';
        gallery.appendChild(img);
    }
}

loadPhotos();
```

---

### 10. 🎲 Karácsonyi játék - Találd ki a számot! ⭐

**Mit csinál:** Egy egyszerű számkitalálós játék, amit együtt játszhattok.

**HTML:**
```html
<section>
    <h3>🎲 Találd ki a számot!</h3>
    <p>Gondoltam egy számra 1 és 100 között...</p>
    <input type="number" id="guessInput" min="1" max="100" placeholder="Tipped">
    <button onclick="checkGuess()">Tippelj!</button>
    <p id="guessResult"></p>
    <p id="guessCount">Próbálkozások: 0</p>
    <button onclick="newGame()">Új játék</button>
</section>
```

**JavaScript:**
```javascript
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
```

---

### 11. 💬 Családi üzenőfal ⭐⭐

**Mit csinál:** Mindenki írhat üzeneteket/jókívánságokat a családnak, ami megmarad az oldalon.

**HTML:**
```html
<section>
    <h3>💬 Családi üzenőfal</h3>
    <textarea id="messageInput" placeholder="Írj egy üzenetet a családnak..." rows="3" style="width: 80%;"></textarea>
    <br>
    <input type="text" id="messageAuthor" placeholder="A neved">
    <button onclick="postMessage()">Üzenet küldése 💌</button>
    
    <div id="messageBoard" style="margin-top: 20px;"></div>
</section>
```

**JavaScript:**
```javascript
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

function displayMessages() {
    var messages = JSON.parse(localStorage.getItem('familyMessages') || '[]');
    var board = document.getElementById('messageBoard');
    board.innerHTML = '';
    
    // Fordított sorrendben (legújabb elől)
    for (var i = messages.length - 1; i >= 0; i--) {
        var msg = messages[i];
        var div = document.createElement('div');
        div.style.background = '#ffe4e4';
        div.style.padding = '10px';
        div.style.margin = '10px 0';
        div.style.borderRadius = '10px';
        div.style.borderLeft = '4px solid #b30000';
        div.innerHTML = '<strong>' + msg.author + '</strong> <small>(' + msg.time + ')</small><br>' + msg.text;
        board.appendChild(div);
    }
}

displayMessages();
```

---

### 12. 🎄 Karácsonyi kvíz ⭐⭐

**Mit csinál:** Karácsonyi kvízkérdések, amit együtt játszhattok!

**HTML:**
```html
<section>
    <h3>🎄 Karácsonyi kvíz</h3>
    <div id="quizQuestion"></div>
    <div id="quizOptions"></div>
    <p id="quizScore">Pontszám: 0</p>
    <button onclick="nextQuestion()">Következő kérdés</button>
</section>
```

**JavaScript:**
```javascript
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
```

---

## 📋 Megvalósítási sorrend javaslat

### Ünnepség előtt:
1. ⭐ Karácsonyi háttérkép (már van kép!)
2. ⭐ QR kód hozzáadása
3. ⭐ Gombok szépítése hover effekttel
4. ⭐⭐ Visszaszámláló
5. ⭐⭐ Visszajelzés űrlap
6. ⭐⭐ Hópelyhek animáció
7. ⭐⭐⭐ Hangeffektek

### Ünnepség napjára:
8. ⭐ Számkitalálós játék (egyszerű, de jó móka!)
9. ⭐⭐ Családi üzenőfal
10. ⭐⭐ Karácsonyi kvíz
11. ⭐⭐ Családi fotófal
12. ⭐⭐ Titkos Mikulás sorsoló

---

## 💡 Hasznos linkek

- [W3Schools CSS Tutorial](https://www.w3schools.com/css/)
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)
- [Google Fonts - szép betűtípusok](https://fonts.google.com/)
- [QR kód generátor](https://www.qrcode-monkey.com/)

---

**Sok sikert a fejlesztéshez! 🎄🎅**