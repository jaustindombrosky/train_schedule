$(document).ready(function(){
    var trainData = new Firebase("https://trainproject-38083.firebaseio.com/");
        $("#addTrain").on("click", function(){
            var tName = $("#tNameInput").val().trim();
            var lName = $("#lNameInput").val().trim();
            var destination = $("#destinationInput").val().trim();
            var tTime = moment($("#tTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
            var frequency = $("#frequencyInput").val().trim();
        })
