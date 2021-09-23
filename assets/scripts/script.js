// Get the Current Day and Time and return the moment object for it.
var GetNow = function() {
    return moment();
};

// Get's the Current Day and formats it, then puts in the "currentDay" p element
var DisplayNow = function() {
    $("#currentDay").text(GetNow().format("dddd, MMMM Do"));
};

// Creates one instance of a time slot.
var CreateTimeRows = function() {
    for (var i = 9; i <= 17; i++) {
        // This is the container for the rest
        var row = $("<div>");
        row.attr("id", "row-" + String(i));
        row.addClass("row m-0 p-0");

        // This is the element for the hour
        var time = $("<h4>");
        time.addClass("col-1 text-end align-middle p-0 pt-2 m-0 hour");
        // Sets the value of this element to the hour, inclding AM or PM
        if (i <= 12) {
            time.text(String(i) + "AM");
        } else {
            time.text(String(i - 12) + "PM");
        }

        // This is the element for the data/possible appointments
        var notes = $("<p>");
        notes.addClass("col-10 p-0 m-0 description");

        // This is for the save button on the end.
        var save = $("<div>");
        save.addClass("bg-info d-flex justify-content-center align-items-center col-1 text-center text-white saveBtn");
        save.html("<i class='fas fa-save'></i>")

        // Add each element to the row
        row.append(time);
        row.append(notes);
        row.append(save);

        // Add row to container
        $(".container").append(row);
    }
    
}

var UpdateTimeColors = function() {
    var currentHour = moment().hour();
    for (var i = 9; i <= 17; i++) {
        var currentDescription = $("#row-" + String(i) + " p")
        if (i === currentHour) {
            currentDescription.removeClass("past");
            currentDescription.removeClass("future");
            currentDescription.addClass("present");
        } else if (i < currentHour) {
            currentDescription.removeClass("present");
            currentDescription.removeClass("future");
            currentDescription.addClass("past");
        } else if (i > currentHour) {
            currentDescription.removeClass("past");
            currentDescription.removeClass("present");
            currentDescription.addClass("future");
        }
    }
}


// This is what adds the current day to the page.
DisplayNow();
CreateTimeRows();
UpdateTimeColors();