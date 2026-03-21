// *******************Main Things************************ //


// Main DataBase

let allMemories = localStorage.getItem('allmemories') ? JSON.parse(localStorage.getItem('allmemories')) : [];


// All Functions

let saveMemories = function() {
    localStorage.setItem('allmemories', JSON.stringify(allMemories));
};

let addMemory = function() {
    let emotion = selectedEmotion.value;
    let description = memoryDescription.value;
    let date = Date.now();

    if (emotion === 'none' || description=== '') {
        alert('Please select an emotion and write a description for your memory.');
        return;
    }
        
    let memory = {
        emotion: emotion,
        description: description,
        date: date
    };

    allMemories.push(memory);

    selectedEmotion.value = 'none';
    memoryDescription.value = '';
    saveMemories();
    
    
};

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

let clearMuseum = function() {
    allMemories = [];
    saveMemories();
    location.reload();
}

// ********************Dom elements*********************** // 

// index.html page

let selectedEmotion = document.getElementById('selected-emotion');
let memoryDescription = document.getElementById('memory-description');
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