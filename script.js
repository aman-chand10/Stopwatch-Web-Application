document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsContainer = document.getElementById('laps');
    
    // Variables
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;
    
    // Format time (hh:mm:ss.ms)
    function formatTime(time) {
        const date = new Date(time);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    // Update the display
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }
    
    // Start the stopwatch
    function start() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            
            // Update button states
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            resetBtn.disabled = false;
            lapBtn.disabled = false;
        }
    }
    
    // Pause the stopwatch
    function pause() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Update button states
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }
    
    // Reset the stopwatch
    function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lapCount = 0;
        updateDisplay();
        lapsContainer.innerHTML = '';
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        lapBtn.disabled = true;
    }
    
    // Record a lap
    function recordLap() {
        if (isRunning) {
            lapCount++;
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span class="lap-time">${formatTime(elapsedTime)}</span>
            `;
            lapsContainer.prepend(lapItem);
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', recordLap);
    
    // Initialize display
    updateDisplay();
});