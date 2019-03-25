       //LINK UP WITH DATABASE
       var config = {
        apiKey: "AIzaSyDBFrcwq5aFHQr2UBpX3iIcULgwMR9aIrQ",
        authDomain: "train-schedule-287c1.firebaseapp.com",
        databaseURL: "https://train-schedule-287c1.firebaseio.com",
        projectId: "train-schedule-287c1",
        storageBucket: "train-schedule-287c1.appspot.com",
        messagingSenderId: "550841223317"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    //PULL DATA FROM DATABASE
    //create a variable with the data from the database
    database.ref().on("child_added", function (snapshot) {
        var newtrainname = snapshot.val().dbtrname;
        var newdestination = snapshot.val().dbtrdestination;
        var newfirsttrain = snapshot.val().dbtrfirsttrain;
        var newfrequency = snapshot.val().dbtrfrequency;

        //Console log the new variables 
        console.log(newtrainname)
        console.log(newdestination)
        console.log(newfirsttrain)
        console.log(newfrequency)

        //Calculate minutes until next train
        //Convert the time to a year ago to ensure that it come
        var traintime = moment(newfirsttrain, "HH:mm")
        console.log(traintime)

        // Difference between the times
        var diffTime = moment().diff(moment(traintime), "minutes");
        console.log(diffTime)

        // Remaining time
        var tRemainder = diffTime % newfrequency;
        console.log(tRemainder);

        // Minutes left till the next train
        var tMinutesTillTrain = newfrequency - tRemainder;

        // Store next train's time in next train variable
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        // Format nexttrain
        var nextTrainformated = moment(nextTrain).format("hh:mm")

        //Create a new row and store it in a variable
        var row = $("<tr></tr>")

        //Create new table datas and store them in variables
        var tdata1 = $("<td>" + newtrainname + "</td>");
        var tdata2 = $("<td>" + newdestination + "</td>");
        var tdata3 = $("<td class='text-center'>" + newfrequency + "</td>");
        var tdata4 = $("<td class='text-center'>" + nextTrainformated + "</td>")
        var tdata5 = $("<td class='text-center'>" + tMinutesTillTrain + "</td>")


        //Append data boxes to row
        row.append(tdata1, tdata2, tdata3, tdata4, tdata5);

        //Append row to HTML
        $("#tablebody").append(row);

    })

    //SUBMIT BUTTON
    $("#submit-button").on("click", (event) => {
        event.preventDefault();
        // Create Variables with all the form information
        var trainname = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firsttrain = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();

        console.log(trainname)
        console.log(destination)
        console.log(firsttrain)
        console.log(frequency)

        //push this info to the db
        database.ref().push({
            dbtrname: trainname,
            dbtrdestination: destination,
            dbtrfirsttrain: firsttrain,
            dbtrfrequency: frequency,
        });
    })

