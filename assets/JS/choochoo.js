console.log("Your src is sauce!");
var time = moment().format('h:mm');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAHXThonIRXQJRsKC5_OE_R1QxYp4yjwuY",
    authDomain: "test-gridnak.firebaseapp.com",
    databaseURL: "https://test-gridnak.firebaseio.com",
    projectId: "test-gridnak",
    storageBucket: "test-gridnak.appspot.com",
    messagingSenderId: "494978311473"
  };

firebase.initializeApp(config);

var db = firebase.database();

db.ref("Awesome Sauce!");

var trainTime = [
        {
            name: "Greg",
            destination: "Ceres",
            firstTime: "10:00",
            frequency: "30" //in minutes.
        }
]

function dataAdd(){
  db.ref("Awesome Sauce!").set(trainTime); //adds object to database.
  console.log('ADDED TO FIREBASE: ',trainTime);
};

dataAdd();
retrieve();
$("#add").on("click",function(){
    $("#table").empty();
    var fname = $("#inputName").val();
    var fdest = $("#inputDestination").val();
    var ffirst = $("#inputFirst").val();
    var ffreq = $("#inputFrequency").val();
    var newTrain = {
        name: fname,
        destination: fdest,
        firstTime: ffirst,
        frequency: ffreq,
    }

    trainTime.push(newTrain);
    
    dataAdd();
    retrieve();
    
   
});
function retrieve(){
db.ref().on("child_added",function(snapshot){
    console.log("child_added works!");
    for (var i = 0; i < trainTime.length; i++){
        var tName = snapshot.val()[i].name;
        var tDest = snapshot.val()[i].destination;
        var tTime = snapshot.val()[i].firstTime;
        var tFreq = snapshot.val()[i].frequency;
        var tDepart = timeDepart(tFreq);

        $("#table").append(`<tr><td>${tName}</td><td>${tDest}
            </td><td>${tTime}</td><td>${tFreq} minutes</td><td>${tDepart}</td></tr>`);
    };
});

function timeDepart(freq){
    var time = moment().format('H:mm');
    var hours = moment().format('H');
    console.log('HOURS: ', hours);
    var minutes = moment().format('mm');
    var hToSec = (hours*60)*60;
    console.log('HOURS TO SECONDS: ',hToSec);
    var mToSec = minutes*60;
    var TotalSec = hToSec + mToSec;
    var freqToSec = freq*60;
    var dSec = (TotalSec + freqToSec);
    var duration = moment.duration(dSec, 'seconds');
    var formatted = duration.format("hh:mm:ss");
    console.log('DEPARTURE TIME: ',formatted);
    return formatted;
}
};

