// start firebase //
var database = new Firebase("https://trainscheduler-34824.firebaseio.com");
// add train form and added on click //
$("#displayAddTrainBtn").on("click", function(){
    if ($("#addTrain").hasClass("hide")){
        $("#addTrain").removeClass("hide");
        $("#displayAddTrainBtn").html("Cancel Add Train");
    }
    else {
        $("#addTrain").addClass("hide");
        $("#displayAddTrainBtn").html("Add Train");
    }
});
$("addTrainBtn").on("click", function(){
    // add input area //
    var train = $("#trainInput").val().trim();
    var trainName = $("trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstDeparture = $("#firstDepartureInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var update = '';
    // "temp" object to hold empty employee //
    var newTrain = {
        train: train,
        trainName: trainName,
        destination: destination,
        firstDeparture: firstDeparture,
        frequency: frequency,
    }
    //train to firebase//
    database.push(newTrain);
    //clear text in boxes//
    $("#trainInput").val("");
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstDepartureInput").val("");
    $("#frequencyInput").val("");
    //hide train after adding to database//
    $("addTrain").addClass ("hide");
    return false;
    });
    //firebase event...add new train row//
    database.on("child_addes"), function(childSnapshot, prevChildKey){
        // store into variable //
        var train = childSnapshot.val().train;
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstDeparture = childSnapshot.val().firstDeparture;
        var frequency = childSnapshot.val().frequency;
        // minutes away train //
        var currentTime = moment();
        firstDeparture = moment(firstDeparture, 'HH mm');
        if(currentTime < firstDeparture) {
            var arrivalTime = moment(firstDeparture).format ('HH:mm');
            
        }
    }

})


    }
})

$('#currentTime').html(moment().format('H:mm'));
StartClockNow()