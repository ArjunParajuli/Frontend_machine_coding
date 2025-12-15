
class Timer{
    /**
     * Constructor receives all required DOM elements.
     * This makes the class reusable and testable.
     */
    constructor({ hrEl, minEl, secEl, contBtn, resetBtn }) {
        /* ---------- DOM REFERENCES ---------- */
        this.hrEl = hrEl;       // Hours input element
        this.minEl = minEl;     // Minutes input element
        this.secEl = secEl;     // Seconds input element
        this.contBtn = contBtn; // Continue / Pause button
        this.resetBtn = resetBtn; // Reset button

        this.intervalId = null; // Stores setInterval ID
        this.running = false;   // Tracks if timer is running

        // event listeners
        this.contBtn.addEventListener("click", () => this.toggle());
        this.resetBtn.addEventListener("click", () => this.reset());
    }

    /**
     * Pads a number to 2 digits (e.g., 5 → "05")
     */
    pad(num) {
        return num < 10 ? "0" + num : String(num);
    }

    /**
     * Reads time values from input fields
     * and converts them to numbers
     */
    getTime() {
        return {
            h: Number(this.hrEl.value),
            m: Number(this.minEl.value),
            s: Number(this.secEl.value),
        };
    }

    /**
     * Updates input fields with formatted values
     */
    setTime(h, m, s) {
        this.hrEl.value = this.pad(h);
        this.minEl.value = this.pad(m);
        this.secEl.value = this.pad(s);
    }

    /**
     * Normalizes time values
     * Converts excess seconds → minutes
     * Converts excess minutes → hours
     */
    normalizeTime() {
        let { h, m, s } = this.getTime();

        if (s >= 60) {
            m += Math.floor(s / 60);
            s = s % 60;
        }

        if (m >= 60) {
            h += Math.floor(m / 60);
            m = m % 60;
        }

        this.setTime(h, m, s);
    }

    // --- Timer Logic ---
     /**
     * Executes every second when timer is running
     * Handles countdown logic
     */
    tick() {
        let { h, m, s } = this.getTime();

        // Decrease time by 1 second
        if (s > 0) {
            s--;
        } 
        // Borrow from minutes
        else if (m > 0) {
            m--;
            s = 59;
        } 
        // Borrow from hours
        else if (h > 0) {
            h--;
            m = 59;
            s = 59;
        } 
        // Timer finished
        else {
            this.pause();
            this.setTime(0, 0, 0);
            return;
        }

        this.setTime(h, m, s);
    }

    /**
     * Starts the timer
     */
    start() {
        // Prevent multiple intervals
        if (this.running) return;

        this.normalizeTime();
        this.running = true;
        this.contBtn.textContent = "Pause";

        // Call tick every 1 second
        this.intervalId = setInterval(() => this.tick(), 1000);
    }

    /**
     * Pauses the timer
     */
    pause() {
        this.running = false;
        clearInterval(this.intervalId);
        this.contBtn.textContent = "Continue";
    }

    /**
     * Toggles between start and pause
     */
    toggle() {
        this.running ? this.pause() : this.start();
    }

    /**
     * Resets the timer to 00:00:00
     */
    reset() {
        this.pause();
        this.setTime(0, 0, 0);
    }

}

// * TIMER INITIALIZATION
// * Creates a Timer instance with DOM elements
const timer = new Timer({
    hrEl: document.querySelector(".hr"),
    minEl: document.querySelector(".min"),
    secEl: document.querySelector(".sec"),
    contBtn: document.querySelector(".cont"),
    resetBtn: document.querySelector(".reset"),
});