
let contBtn=document.querySelector(".cont")
let resetBtn=document.querySelector(".reset")

contBtn.addEventListener("click", handleStartStop)

function handleStartStop(e){
    let hr=document.querySelector(".hr")
    let min=document.querySelector(".min")
    let sec=document.querySelector(".sec")

    contBtn.innerHTML = (contBtn.innerHTML === "Continue") ? "Pause" : "Continue"

    

    let tid = setInterval(()=>{
        sec.value = (sec.value > 0) ? sec.value-1 : 0;
        if(sec.value == 0){
            if(min.value >= 1){
                sec.value = 3;
                min.value -= 1;
            }
        }

        if(min.value == 0){
            if(hr.value >= 1){
                min.value = 3;
                hr.value -= 1;
            }
        }

        if(sec.value <= 0 && min.value <= 0 && hr.value <= 0){
            console.log("Finished")
            min.value = 0
            hr.value = 0
            sec.value = 0

            clearInterval(tid)
        }
    }, 1000)



}