var executePrompt = () => {
    return new Promise((resolve, reject) => {
        var txt;
        var person = prompt("Please enter the number of person that you want to connect:", "20");
        if (person == null || person == "" || person == undefined) {
            person = prompt("Please enter the number of person that you want to connect:", "20");
        } else {
            var time = prompt("Please enter the time in milisecond (1s = 1000 ms) each connection reqest will be executed every 'time' millisecond so we recommande you to put a high number to not be ban by linkedin :", "5000");
            if (time == null || time == undefined || time == "") {
                time = prompt("Please enter the time in milisecond (1s = 1000 ms) each connection reqest will be executed every 'time' millisecond so we recommande you to put a high number to not be ban by linkedin :", "5000");
            } else if (time <= 0 || time < 3500) {
                alert('the requested interval of time is not corrrect');
                time = prompt("Please enter the time in milisecond (1s = 1000 ms) each connection reqest will be executed every 'time' millisecond so we recommande you to put a high number to not be ban by linkedin :", "5000");
            } else {
                result = {};
                result.time = time;
                result.person = person
                resolve(result);
            }
        }
    })
}



var invite = (NbPerson, time) => {
    var scrollLoop = setInterval(function () {
        var connectArr = document.querySelectorAll("button[data-control-name='invite'");
        if (connectArr.length >= NbPerson) {
            clearInterval(scrollLoop);
            var index = 0;
            var connectLoop = setInterval(function () {
                connectArr[index].click();
                console.log(index);
                index++;
                if (index >= NbPerson) {
                    clearInterval(connectLoop);
                    alert("Done Connecting!");
                }
            }, time);
        }
        window.scrollTo(0, document.body.scrollHeight);
    }, 500);
}


var main = () => {
    var dte = new Date();
    let todayDate = dte.getDate();
    if (localStorage.getItem("ladate") == undefined || localStorage.getItem("ladate") == null || localStorage.getItem("ladate") == "") {
        localStorage.setItem("ladate", dte.getDate());
    }
    if (localStorage.getItem('ladate') < dte.getDate()) {
        localStorage.setItem('nbrequete', 0);
    }

    if (localStorage.getItem('ladate') == "31") {
        if (todayDate == 1) {
            alert('numbers of request have been re-set to 0 for today');
            localStorage.setItem('nbrequete', 0);
        }
    }
    if (localStorage.getItem("nbrequete") == undefined || localStorage.getItem("nbrequete") == null || localStorage.getItem("nbrequete") == "") {
        localStorage.setItem("nbrequete", 0);
    }
    executePrompt().then((result) => {
        console.log(result);
        if (localStorage.getItem("nbrequete") >= 10) {
            alert('you have executed' + localStorage.getItem("nbrequete") + 'today, if you don\'t want to be ban by linkedin you may stop for today')
        } else {
            let actualNbRequest = localStorage.getItem('nbrequete');
            localStorage.setItem('nbrequete', actualNbRequest + result.person);
            invite(result.person, result.time);
        }
    })
}

main(); 