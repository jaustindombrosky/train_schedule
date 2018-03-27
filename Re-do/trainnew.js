$(document).ready(function(){
    var trainData = new Firebase("https://trainproject-38083.firebaseio.com/");
        $("#addTrain").on("click", function(){
            var tName = $("#tNameInput").val().trim();
            var lName = $("#lNameInput").val().trim();
            var destination = $("#destinationInput").val().trim();
            var tTime = moment($("#tTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
            var frequency = $("#frequencyInput").val().trim();
            var addNewTrain = {
                name: tName,
                line: lName,
                destination: destination,
                tTime: tTimeInput,
                frequency: frequency,
            }
            trainData.push(addNewTrain);
            $("#tNameInput").val("")
            $("#lNameInput").val("")
            $("#destinationInput").val("")
            $("#tTimeInput").val("")
            $("#frequencyInput").val("")
            return false;
    });
    trainData.on("child_added", function(childSnapshot, prevChildKey){
        var fbName = childSnapshot.val().name;
        var fbLine = childSnapshot.val().line;
        var fbDestination = childSnapshot.val().destination;
        var fbtTime = childSnapshot.val().tTime;
        var fbFrequency = childSnapshot.val().frequency;
        var altTime = moment().diff(moment.unix(fbtTime), "minutes");
        var tMinus = moment().diff(moment.unix(fbtTime), "minutes") % fbFrequency;
        var minutes = fbFrequency - timeRemainder;
        var nextTrain = moment().add(minutes, "m").format("hh:mm A");
    $("#tTable > tbody").append("<tr><td>" + fbName + "</td><td>" + fbLine + "</td><td>"+ fbDestination + "</td><td>" + fbFrequency + " mins" + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td></tr>");
    });
});
