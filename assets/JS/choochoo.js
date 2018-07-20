console.log("Your src is sauce!");

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

dataAdd();


function dataAdd(){
  var dbref=db.ref("Awesome Sauce!").set(trainTime); //adds object to database.
};

$("#add").on("click",function(){
    var fname = $("#inputName").val();
    var fdest = $("#inputDestination").val();
    var ffirst = $("#inputFirst").val();
    var ffreq = $("#inputFrequency").val();

    const newTrain = {
        name: fname,
        destination: fdest,
        firstTime: ffirst,
        frequency: ffreq
    }

    trainTime.push(newTrain);
    console.log (trainTime);
    dataAdd()
})

db.ref().on("child_added",function(snapshot){
    $("#table").empty();
    for (var i = 0; i < trainTime.length; i++){
        let tName = snapshot.val()[i].name;
        let tDest = snapshot.val()[i].destination;
        let tTime = snapshot.val()[i].firstTime;
        let tFreq = snapshot.val()[i].frequency;
        
        $("#cTable > tbody").append("<tr><td>"+ tName + "</td><td>"+tDest+"</td><td>"+tTime+"</td><td>"+tFreq+" minutes"+"</td>");
    };
});
 
