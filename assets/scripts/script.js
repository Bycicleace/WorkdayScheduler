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

        // This is the element for the hour
        var time = $("<h2>");
        time.addClass("col-1");
        // Sets the value of this element to the hour, inclding AM or PM
        if (i <= 12) {
            time.val(String(i) + "AM");
        } else {
            time.val(String(i - 12) + "PM");
        }

        // This is the element for the data/possible appointments
        var notes = $("<p>");
        notes.addClass("col-10");

        // This is for the save button on the end.
        var save = $("<div>");
        save.addClass("btn btn-info col-1");

        // Add each element to the row
        row.appendChild(time);
        row.appendChild(notes);
        row.appendChild(save);

        // Add row to container
        $("#container").appendChild(row);
    }
    
}


// This is what adds the current day to the page.
DisplayNow();
CreateTimeRows();