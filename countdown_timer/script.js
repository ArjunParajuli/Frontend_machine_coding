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