let watch = () => {
    const stopwatch = document.querySelector("#sudoku-stopwatch");
    const timestamp = document.querySelector("#sudoku-timestamp");
    const startstop = document.querySelectorAll("#sudoku-dropdown-basic");
    const stopstart = document.querySelectorAll("#sudokusubmitbutton , #sudokuautosolvebutton , #clearbttn");
    let currentTime = 0;
    let timer;
    function startTimer() {
        handleReset();
        stopwatch.classList.add("running");
        timer = setInterval(() => {
            currentTime++;
            let hours = Math.floor(currentTime/3600);
            let minutes = Math.floor((currentTime-3600*hours)/60);
            let seconds = currentTime - 3600*hours - 60*minutes;
            let finalTime = `${hours}h:${minutes}m:${seconds}s`;
            timestamp.innerText = finalTime;
        }, 1000);
    }
    function stopTimer() {
        stopwatch.classList.remove("running");
        clearInterval(timer);
    }
    function resetTimer() {
        currentTime = 0;
        currentTime = currentTime.toFixed(1);
        timestamp.innerText = currentTime;
    }
    function handleReset() {
        stopTimer();
        resetTimer();
    }
    for(let i=0;i<startstop.length;i++)
    {
        startstop[i].addEventListener("change", startTimer);
    }
    for(let i=0;i<stopstart.length;i++)
    {
        stopstart[i].addEventListener("click", stopTimer);
    }
}

export {watch};