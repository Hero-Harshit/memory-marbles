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
    
    notificationPanel.classList.add('active');
    notificationText.textContent = 'Memory added to your museum';
    setTimeout(() => {
    notificationPanel.classList.remove('active');
    }, 2000);
    
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

let exportMemories = function() {
    let data = JSON.stringify(allMemories);
    let file = new Blob([data], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    let now = new Date();
    let date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    link.download = `MyMemories ${date}.json`;
    link.click();
};

let importMemories = function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function() {
        let importedMemories = JSON.parse(reader.result);
        allMemories = importedMemories;
        saveMemories();
    };
    reader.readAsText(file);
};

// ********************Dom elements*********************** // 

// Notification Panel

let notificationPanel = document.getElementById('notification-panel');
let notificationText = document.getElementById('notification-text');

// Nav elements

let hamburgerBtn = document.getElementById('hamburger-btn');
let NavigationMenuCloseBtn = document.getElementById('navigation-menu-close-btn');
let navigationMenu = document.getElementById('navigation-menu');
let profileBtn  = document.getElementById('profile-btn');
let profileMenu = document.getElementById('profile-menu');

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
let exportButton = document.getElementById('export-button');
let importButton = document.getElementById('import-button');
let importInput = document.getElementById('import-input');

// ********************Event Listeners********************* //

// Navbar Event listeners

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        navigationMenu.classList.add('active');
    });
}

if (NavigationMenuCloseBtn) {
    NavigationMenuCloseBtn.addEventListener('click', () => {
        navigationMenu.classList.remove('active');
    });
}    

if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        profileMenu.classList.toggle('active');
    });
}

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


// settings.html page

if (clearMuseumButton) {

    clearMuseumButton.addEventListener('click', clearMuseum);

};  

if (exportButton) {
    exportButton.addEventListener('click', exportMemories);
}

if (importInput) {
    importInput.addEventListener('change', importMemories);
}

if (importButton) {
    importButton.addEventListener('click', () => {
        importInput.click();
    });
}