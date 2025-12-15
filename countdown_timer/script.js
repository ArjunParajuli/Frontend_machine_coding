let contBtn=document.querySelector(".cont")
let resetBtn=document.querySelector(".reset")

let hr=document.querySelector(".hr")
let min=document.querySelector(".min")
let sec=document.querySelector(".sec")

contBtn.addEventListener("click", handleStartStop)
resetBtn.addEventListener("click", handleReset)

function pad(num) {
    num = Number(num);
    if (num < 10) return "0" + num;
    return String(num);
}

let tid=null;
let running = false;


function handleStartStop(e){
    running = !running;
    contBtn.textContent = running ? "Pause" : "Continue";

    // stop when paused
    if(!running){
        clearInterval(tid);
        return;
    }

    hr.value = pad(Math.max(0, Number(hr.value)));
    min.value = pad(Math.max(0, Number(min.value)));
    sec.value = pad(Math.max(0, Number(sec.value)));


    tid = setInterval(()=>{
        // Convert to numbers so your comparisons work
        let h = Number(hr.value);   
        let m = Number(min.value);
        let s = Number(sec.value);


        if(s >= 60){
            m += Math.floor(s / 60)
            s = s % 60
        }

        if(m >= 60){
            h += Math.floor(m / 60)
            m = m % 60
        }

        // Decrease 1 second
        if(s > 0) {
            s--;
        }else {
            // sec hit 0
            if(m > 0) {
                s = 59;
                m--;
            }else if (h > 0) {
                m = 59;
                h--;
                s = 59;
            }else {
                // timer finished
                hr.value = "00";
                min.value = "00";
                sec.value = "00";
                contBtn.textContent = "Continue";
                running = false;
                clearInterval(tid);
                return;
            }
        }

        hr.value = pad(h);
        min.value = pad(m);
        sec.value = pad(s);
    }, 1000)

}

function handleReset(){
    console.log("Reset")
    
    hr.value = "00";
    min.value = "00";
    sec.value = "00";

    running = false;

    contBtn.textContent = "Continue";
}

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

}