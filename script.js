// *******************Main Things************************ //



// Main DataBase

let allMemories = localStorage.getItem('allmemories') ? JSON.parse(localStorage.getItem('allmemories')) : [];
let otherData = localStorage.getItem('otherdata') ? JSON.parse(localStorage.getItem('otherdata')) : {userName: 'User',};


// All Functions Hoisted

// Universal functions


let navigationMenuDisplay = function() {
    if (navigationMenu) {
        navigationMenu.classList.toggle('active');
    }
};

let profileMenuDisplay = function() {
    if (profileMenu) {
        profileMenu.classList.toggle('active');
    }   
};    

let upadateUserProfile = function() {
    let userName = otherData.userName || 'User';
    userNameDisplay.textContent = userName;

    let totalMemories = allMemories.length;
    totalMemoriesCount.textContent = totalMemories; 

    let lastMemory = allMemories[allMemories.length - 1];
    lastMemoryCreated.textContent = lastMemory ? new Date(lastMemory.date).toLocaleString() : 'None';

};


// Index.html page

let saveMemories = function() {
    localStorage.setItem('allmemories', JSON.stringify(allMemories));
    localStorage.setItem('otherdata', JSON.stringify(otherData));
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

    if (notificationPanel) {    
        notificationPanel.classList.add('active');
        notificationText.textContent = 'Museum cleared successfully';
        setTimeout(() => {
        notificationPanel.classList.remove('active');
        }, 2000);
    }    
}

let exportMemories = function() {
    let exportData = {
        memories: allMemories,
        otherData: otherData
    };
    let file = new Blob([JSON.stringify(exportData)], { type: "application/json" });
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
        allMemories = importedMemories.memories || [];
        otherData = importedMemories.otherData || {};
        saveMemories();
        notificationPanel.classList.add('active');
        notificationText.textContent = 'Memories imported successfully';
        setTimeout(() => {
        notificationPanel.classList.remove('active');
        }, 2000);
    };
    reader.readAsText(file);
};

// ********************Dom elements*********************** // 

// Notification Panel

let notificationPanel = document.getElementById('notification-panel');
let notificationText = document.getElementById('notification-text');

// Nav elements

let hamburgerBtn = document.getElementById('hamburger-btn');
let navigationMenu = document.getElementById('navigation-menu');
let profileBtn  = document.getElementById('profile-btn');
let profileMenu = document.getElementById('profile-menu');
let userNameDisplay = document.getElementById('user-name');
let totalMemoriesCount = document.getElementById('total-memories-count');
let lastMemoryCreated = document.getElementById('last-memory-created');

// index.html page

let emotionButtons = document.querySelectorAll('.emotion-button');
let selectedEmotion = null
let memoryDescription = document.getElementById('memory-description');
let addMemoryErrorMsg = document.getElementById('add-memory-error-msg');
let addMemoryButton = document.getElementById('add-memory-button');
let tabIO1 = document.getElementById('tab-io1');
let tabIO2 = document.getElementById('tab-io2');
let io1Emotions = document.getElementById('io1-emotions');
let io2Emotions = document.getElementById('io2-emotions');

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
    hamburgerBtn.addEventListener('click', navigationMenuDisplay);
} 

if (profileBtn) {
    profileBtn.addEventListener('click', profileMenuDisplay);
    profileBtn.addEventListener('click', upadateUserProfile);
}

document.addEventListener('click', (event) => {
    if (navigationMenu && navigationMenu.classList.contains('active')) {
        if (!navigationMenu.contains(event.target) && event.target !== hamburgerBtn) {
            navigationMenu.classList.remove('active');
        }
    }
});

document.addEventListener('click', (event) => {
    if (profileMenu && profileMenu.classList.contains('active')) {
        if (!profileMenu.contains(event.target) && event.target !== profileBtn) {
            profileMenu.classList.remove('active');
        }
    }
});


// index.html page

if (addMemoryButton) {

    addMemoryButton.addEventListener('click', addMemory);

};

if (emotionButtons.length > 0) {
    emotionButtons.forEach(btn => {
        btn.addEventListener('click', () => buttonSelection(btn));
    });
}

if (tabIO1) {
    tabIO1.addEventListener('click', () => {
        io1Emotions.classList.remove('hidden');
        io2Emotions.classList.add('hidden');
        tabIO1.classList.add('active-tab');
        tabIO2.classList.remove('active-tab');
        selectedEmotion = null;
        emotionButtons.forEach(b => b.classList.remove('selected'));
    });
}

if (tabIO2) {
    tabIO2.addEventListener('click', () => {
        io2Emotions.classList.remove('hidden');
        io1Emotions.classList.add('hidden');
        tabIO2.classList.add('active-tab');
        tabIO1.classList.remove('active-tab');
        selectedEmotion = null;
        emotionButtons.forEach(b => b.classList.remove('selected'));
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