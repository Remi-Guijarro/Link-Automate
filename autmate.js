var executePrompt = () => {
    return new Promise((resolve, reject) => {
        var txt;
        var person = prompt("Please enter the number of person that you want to connect:", "20");
        if (person == null || person == "" || person == undefined) {
            person = prompt("Please enter the number of person that you want to connect:", "20");
        } else {
            var time = prompt("Please enter the time in milisecond (1s = 1000 ms) each connection reqest will be executed every 'time' millisecond so we recommande you to put a high number to not be ban by linkedin :", "5000");
            if(time == null || time == undefined || time == ""){
               time = prompt("Please enter the time in milisecond (1s = 1000 ms) each connection reqest will be executed every 'time' millisecond so we recommande you to put a high number to not be ban by linkedin :", "5000");
            }else if(time <= 0 || time < 3500){
                alert('the requested interval of time is not corrrect');
                time = prompt("Please enter the time in milisecond (1s = 1000 ms) each connection reqest will be executed every 'time' millisecond so we recommande you to put a high number to not be ban by linkedin :", "5000");
            }else{
                result = {};
                result.time = time;
                result.person = person
                resolve(result);
            }
        }
    })
}



var invite = (NbPerson,time) => {
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
        if(connectArr.length <= 0){
            window.scrollTo(0, document.body.scrollHeight);
        }        
    }, 500);
}