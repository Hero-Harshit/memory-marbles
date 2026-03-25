// *******************Main Things************************ //



// Main DataBase

let allMemories = localStorage.getItem('allmemories') ? JSON.parse(localStorage.getItem('allmemories')) : [];



// All Functions Hoisted

// Index.html page

let saveMemories = function() {
    localStorage.setItem('allmemories', JSON.stringify(allMemories));
};

let buttonSelection = function(btn) {

    selectedEmotion = btn.dataset.emotion;
    emotionButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

}

let addMemory = function() {
    let emotion = selectedEmotion;
    let description = memoryDescription.value;
    let date = Date.now();

    if (!emotion || description=== '') {
        addMemoryErrorMsg.textContent = 'Please select an emotion and write a description.';
        return;
    }
        
    let memory = {
        emotion: emotion,
        description: description,
        date: date
    };

    allMemories.push(memory);

    selectedEmotion = null;
    memoryDescription.value = '';
    emotionButtons.forEach(b => b.classList.remove('selected'));
    addMemoryErrorMsg.textContent = '';
    saveMemories();
    
    
};


// Museum.html page

let getAllMemories = function() {
    for (let memory of allMemories) {
        
        let memoryElement = document.createElement('div');

        
        memoryElement.classList.add(memory.emotion);
        memoryElement.classList.add('memory-element');
        memoryElement.addEventListener('click', () => openMemoryModal(memory));
        memoryList.appendChild(memoryElement);
    }
};

let openMemoryModal = function(memory) {
    modalEmotion.textContent = memory.emotion;
    modalDescription.textContent = memory.description;
    memoryModal.classList.add('active');
}

// Settings.html page

let clearMuseum = function() {
    allMemories = [];
    saveMemories();
}

// ********************Dom elements*********************** // 

// index.html page

let emotionButtons = document.querySelectorAll('.emotion-button');
let selectedEmotion = null
let memoryDescription = document.getElementById('memory-description');
let addMemoryErrorMsg = document.getElementById('add-memory-error-msg');
let addMemoryButton = document.getElementById('add-memory-button');

// museum.html page

let memoryList = document.getElementById('memory-list');
let memoryModal = document.getElementById('memory-modal');
let modalEmotion = document.getElementById('modal-emotion');
let modalDescription = document.getElementById('modal-description');
let modalClose = document.getElementById('modal-close');

// settings.html page

let clearMuseumButton = document.getElementById('clear-museum-button');

// ********************Event Listeners********************* //

// index.html page

if (addMemoryButton) {

    addMemoryButton.addEventListener('click', addMemory);

};

if (emotionButtons.length > 0) {
    emotionButtons.forEach(btn => {
        btn.addEventListener('click', () => buttonSelection(btn));
    });
}

// museum.html page

if (memoryList) {

    getAllMemories();

};

if (modalClose) {

    modalClose.addEventListener('click', () => {
        memoryModal.classList.remove('active');
    });

};    

if (clearMuseumButton) {

    clearMuseumButton.addEventListener('click', clearMuseum);

};    