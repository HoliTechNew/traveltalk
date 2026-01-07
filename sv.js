let categories = []; // Kezdetben üres, a fájlból töltjük be
let currentCat = null;
let quizTarget = null;
let isQuiz = false;
let lastSentence = "";

// ADATOK BETÖLTÉSE KÜLSŐ FÁJLBIÓL
async function loadExternalData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Hiba az adatok betöltésekor');
        categories = await response.json();
        init(); // Csak akkor indul el a menü, ha megvannak az adatok
    } catch (err) {
        console.error(err);
        document.getElementById('progress-text').innerText = "Hiba: data.json nem található!";
    }
}

function init() {
    const list = document.getElementById('pattern-list');
    list.innerHTML = "";
    categories.forEach((c, idx) => {
        const btn = document.createElement('div');
        btn.className = "pattern-btn";
        btn.onclick = () => openCat(idx);
        btn.innerHTML = `<b>${idx+1}</b> <div><strong>${c.title}</strong><br><small>${c.pattern}</small></div>`;
        list.appendChild(btn);
    });
}

// Az összes többi függvény (openCat, handleInput, startQuiz, playCurrent) változatlan marad...

// A program indítása az adatok beolvasásával kezdődik
loadExternalData();