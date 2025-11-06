let pc = 0;
let previousPc = 0;
let ir = '';
let accumulator = 0;
let ram = [
    { address: 0, value: 'LOAD 6' },
    { address: 1, value: 'ADD 7' },
    { address: 2, value: 'STORE 6' },
    { address: 3, value: 'JUMP 1' },
    { address: 4, value: '0' },
    { address: 5, value: '0' },
    { address: 6, value: '1' },
    { address: 7, value: '1' },
];
let previousRam = ram.map(item => ({ ...item }));
let executionPhase = 'Fetch';
let currentMode = 'display';
let hasChanges = false;
let executionMode = 'manual'; // 'manual' or 'auto'
let autoInterval = null;
let isAutoRunning = false;
let currentIntervalMs = 0;
let targetIntervalMs = 0;
let accelerationSteps = 10; // Number of steps to reach target speed

const instructions = ['', 'LOAD', 'ADD', 'STORE', 'JUMP'];

function updateDisplay() {
    const pcElement = document.getElementById('pc');
    
    // Check if PC has changed and trigger electric animation
    if (pc !== previousPc) {
        pcElement.classList.remove('electric-active');
        // Force reflow to restart animation
        void pcElement.offsetWidth;
        pcElement.classList.add('electric-active');
        
        // Remove the class after animation completes
        setTimeout(() => {
            pcElement.classList.remove('electric-active');
        }, 1200);
        
        previousPc = pc;
    }
    
    pcElement.textContent = pc;
    document.getElementById('ir').textContent = ir;
    document.getElementById('accumulator').textContent = accumulator;

    const phases = document.getElementById('execution-phases').children;
    for (const element of phases) {
        element.classList.remove('active-phase');
        element.textContent = element.textContent.replace('► ', '');
    }
    const activePhase = Array.from(phases).find(phase => phase.textContent.includes(executionPhase));
    activePhase.classList.add('active-phase');
    activePhase.textContent = '► ' + activePhase.textContent;

    updateRAMTable();
}

function updateRAMTable() {
    const ramTable = document.getElementById('ram-table').getElementsByTagName('tbody')[0];
    ramTable.innerHTML = '';
    for (const item of ram) {
        const row = ramTable.insertRow();
        row.insertCell(0).textContent = item.address;
        
        if (currentMode === 'edit') {
            const cell = row.insertCell(1);
            const [instruction, operand] = item.value.split(' ');
            
            const select = document.createElement('select');
            instructions.forEach(instr => {
                const option = document.createElement('option');
                option.value = instr;
                option.textContent = instr || '(empty)';
                option.selected = instr === instruction;
                select.appendChild(option);
            });
            
            const input = document.createElement('input');
            input.type = 'text';
            input.value = operand || '';
            
            select.onchange = () => checkForChanges();
            input.oninput = () => checkForChanges();
            
            cell.appendChild(select);
            cell.appendChild(input);
        } else {
            const cell = row.insertCell(1);
            cell.textContent = item.value || '0';
            
            // Check if this RAM cell has changed and trigger electric animation
            const previousItem = previousRam.find(prev => prev.address === item.address);
            if (previousItem && previousItem.value !== item.value) {
                // Apply electric effect to both address and value cells
                row.cells[0].classList.add('electric-active');
                row.cells[1].classList.add('electric-active');
                
                // Remove the class after animation completes
                setTimeout(() => {
                    row.cells[0].classList.remove('electric-active');
                    row.cells[1].classList.remove('electric-active');
                }, 1200);
            }
        }
    }
    
    // Update previousRam after checking for changes
    previousRam = ram.map(item => ({ ...item }));
    
    // Add a single Save button for all changes
    if (currentMode === 'edit') {
        const saveButtonRow = ramTable.insertRow();
        const saveButtonCell = saveButtonRow.insertCell(0);
        saveButtonCell.colSpan = 2;
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save All Changes';
        saveButton.onclick = saveAllChanges;
        saveButton.id = 'saveAllButton';
        saveButton.style.display = hasChanges ? 'block' : 'none';
        saveButtonCell.appendChild(saveButton);
    }
}

function checkForChanges() {
    const ramTable = document.getElementById('ram-table').getElementsByTagName('tbody')[0];
    hasChanges = false;
    
    for (let i = 0; i < ram.length; i++) {
        const row = ramTable.rows[i];
        const select = row.cells[1].getElementsByTagName('select')[0];
        const input = row.cells[1].getElementsByTagName('input')[0];
        
        const newInstruction = select.value;
        const newOperand = input.value;
        const originalValue = ram[i].value;
        const [originalInstruction, originalOperand] = originalValue.split(' ');
        
        if (newInstruction !== (originalInstruction || '') || newOperand !== (originalOperand || '')) {
            hasChanges = true;
            break;
        }
    }
    
    const saveButton = document.getElementById('saveAllButton');
    if (saveButton) {
        saveButton.style.display = hasChanges ? 'block' : 'none';
    }
}

function saveAllChanges() {
    const ramTable = document.getElementById('ram-table').getElementsByTagName('tbody')[0];
    
    for (let i = 0; i < ram.length; i++) {
        const row = ramTable.rows[i];
        const select = row.cells[1].getElementsByTagName('select')[0];
        const input = row.cells[1].getElementsByTagName('input')[0];
        
        const newInstruction = select.value;
        const newOperand = input.value;
        
        if (newInstruction) {
            ram[i].value = `${newInstruction} ${newOperand}`.trim();
        } else {
            ram[i].value = newOperand.trim() || '0';
        }
    }
    
    hasChanges = false;
    updateDisplay();
}

function executeInstruction() {
    switch (executionPhase) {
        case 'Fetch':
            ir = ram[pc].value;
            executionPhase = 'Decode';
            break;
        case 'Decode':
            executionPhase = 'Execute';
            break;
        case 'Execute':
            const [operation, operand] = ir.split(' ');
            switch (operation) {
                case 'LOAD':
                    accumulator = parseInt(ram[parseInt(operand)].value) || 0;
                    break;
                case 'ADD':
                    accumulator += parseInt(ram[parseInt(operand)].value) || 0;
                    break;
                case 'STORE':
                    ram[parseInt(operand)].value = accumulator.toString();
                    break;
                case 'JUMP':
                    pc = (parseInt(operand) - 1 + ram.length) % ram.length;
                    break;
            }
            pc = (pc + 1) % ram.length;
            executionPhase = 'Fetch';
            break;
    }
    updateDisplay();
}

function clockTick() {
    if (currentMode === 'edit') {
        toggleMode();
    }
    executeInstruction();
}

function toggleMode() {
    currentMode = currentMode === 'display' ? 'edit' : 'display';
    const editColumns = document.getElementsByClassName('edit-column');
    for (let col of editColumns) {
        col.classList.toggle('hidden', currentMode === 'display');
    }
    document.getElementById('editIcon').classList.toggle('hidden', currentMode === 'edit');
    document.getElementById('viewIcon').classList.toggle('hidden', currentMode === 'display');
    hasChanges = false;
    updateDisplay();
}

function toggleExplanation() {
    const explanation = document.getElementById('explanation');
    const button = document.getElementById('explanationToggle');
    if (explanation.classList.contains('visible')) {
        explanation.classList.remove('visible');
        button.textContent = 'Show Explanation';
    } else {
        explanation.classList.add('visible');
        button.textContent = 'Hide Explanation';
    }
}

function toggleExecutionMode() {
    // Stop auto mode if switching away from it
    if (executionMode === 'auto' && isAutoRunning) {
        stopAuto();
    }
    
    // Toggle between manual and auto
    executionMode = executionMode === 'manual' ? 'auto' : 'manual';
    
    // Update toggle button label
    const modeLabel = document.getElementById('modeLabel');
    modeLabel.textContent = executionMode === 'manual' ? 'Manual' : 'Auto';
    
    // Update toggle button style
    const toggleBtn = document.getElementById('modeToggleBtn');
    toggleBtn.classList.toggle('auto-active', executionMode === 'auto');
    
    // Show/hide appropriate controls
    document.getElementById('manualControls').classList.toggle('hidden', executionMode !== 'manual');
    document.getElementById('autoControls').classList.toggle('hidden', executionMode !== 'auto');
}

function startAuto() {
    if (currentMode === 'edit') {
        toggleMode();
    }
    
    const intervalMs = parseFloat(document.getElementById('intervalInput').value);
    if (isNaN(intervalMs) || intervalMs <= 0) {
        alert('Please enter a valid interval greater than 0');
        return;
    }
    
    isAutoRunning = true;
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('stopBtn').classList.remove('hidden');
    document.getElementById('intervalInput').disabled = true;
    
    // Set target interval and start with 3x slower speed
    targetIntervalMs = intervalMs;
    currentIntervalMs = intervalMs * 3;
    let stepCount = 0;
    
    // Execute first tick immediately
    executeInstruction();
    
    // Function to gradually speed up
    const scheduleNextTick = () => {
        if (!isAutoRunning) return;
        
        autoInterval = setTimeout(() => {
            executeInstruction();
            
            // Gradually decrease interval (speed up) over accelerationSteps
            if (stepCount < accelerationSteps) {
                stepCount++;
                const progress = stepCount / accelerationSteps;
                // Ease-in curve for smooth acceleration
                const easedProgress = progress * progress;
                currentIntervalMs = intervalMs * 3 - (intervalMs * 2 * easedProgress);
            } else {
                currentIntervalMs = targetIntervalMs;
            }
            
            scheduleNextTick();
        }, currentIntervalMs);
    };
    
    scheduleNextTick();
}

function stopAuto() {
    isAutoRunning = false;
    if (autoInterval) {
        clearTimeout(autoInterval);
        autoInterval = null;
    }
    
    document.getElementById('startBtn').classList.remove('hidden');
    document.getElementById('stopBtn').classList.add('hidden');
    document.getElementById('intervalInput').disabled = false;
}

// Initialize the display
updateDisplay();