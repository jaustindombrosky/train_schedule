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
            var nextTrain = moment.duration(firstDeparture.diff(currentTime));
            var nextTrain = Math.round(nextTrain.asMinutes());
        }
        else {
            var nextTrain = moment.duration(currentTime.diff(firstDeparture));
            var nextTrain = Math.round(nextTrain.asMinutes());
            var nextTrain = frequency - (nextTrain%frequency);
            var arrivalTime = moment().add(nextTrain, 'minutes').format('HH:mm');
        }
        // update train status and remaining time until next train //
        var status ="On Time";
        if (nextTrain > 2 && nextTrain < 10) {
            status = "Now Boarding";
        }
        else if (nextTrain > 1 && nextTrain < 3) {
            status = "Last Boarding";
        }
        else if (nextTrain < 2){
            status = "Train Departing"
        }
        // update table with train data //
        $("#trainTable > tbody").append("<tr><td>" + train + "</td><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" + nextTrain + " </td><td>" + status + "</td></tr>");
    });
    // start the clock with updated time //
    function StartClockNow(){
        clockInterval = setInterval(function(){
            // clock display //
            $('#currentTime').html(moment().format('H:mm'));
            // refresh page intervals of 10 minutes //
            $('#trains').empty();
                database.once("value", function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        var key = childSnapshot.key();
                        var childData = childSnapshot.val();
                            //stores as a variable //
                            
                    })
                })
        })
    }
        
    }

})


    }
})

$('#currentTime').html(moment().format('H:mm'));
StartClockNow()