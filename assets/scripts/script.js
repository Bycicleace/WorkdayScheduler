var previousDescription = "";
var newDescription = "";
var currentRow = "";
var isEditing = false;
var state = {};


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
        notes.addClass("col-10 p-2 m-0 description text-black");
        notes.val(state[i]);

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

// Goes through each row and updates the background color on the p element based on the time of day.
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

// Updates the p element to be a textarea form-input when clicked
$("#calendar").on("click", "div p", function() {
    // Change global editing flag to true
    isEditing = true;

    // Saves the id of the current row
    currentRow = $(this).closest("div").attr('id')

    // Div to hold the form element
    var parentDiv = $("<div>")
        .addClass("col-10 p-0 m-0 description");

    // Set the global variable to what was in this box before editing
    previousDescription = $(this).text();

    // Create a textarea element and fill with previous description
    var textInput = $("<textarea>")
        .addClass("form-control p-2 textarea")
        .val(previousDescription);   

    // Assign same background color as previous P element
    if ($(this).hasClass("past")) {
        textInput.addClass("past");
    } else if ($(this).hasClass("present")) {
        textInput.addClass("present");
    } else if ($(this).hasClass("future")) {
        textInput.addClass("future");
    }
 
    // Add textarea to div
    parentDiv.append(textInput);

    // Replace p element with div element
    $(this).replaceWith(parentDiv);

    // focus on textarea
    textInput.trigger("focus");
});

// When leaving the element, replace it with a p element containing previous description (Save button assigns text)
$("#calendar").on("blur", "div div textarea", function() {
    // Set global variable to the value in the textarea
    newDescription = $(this).val();

    // create a new p element to replace the div/textarea. Assign previous description to it.
    var pElement = $("<p>")
        .addClass("col-10 p-2 m-0 description text-black")
        .text(previousDescription);
    
    // Clears out the previous description
    previousDescription = "";
    
    // Add the correct background color class
    if ($(this).hasClass("past")) {
        pElement.addClass("past");
    } else if ($(this).hasClass("present")) {
        pElement.addClass("present");
    } else if ($(this).hasClass("future")) {
        pElement.addClass("future");
    }
    
    // Find the parent div and replace with p element
    $(this).closest("div").replaceWith(pElement);
})

// When the save button is clicked after the textarea on the same row has been edited, update the textarea element
$("#calendar").on("click", ".saveBtn", function() {
    // Get the newDescription value and put it in the p element, then resets newDescription
    // Only works if the user edited the row's p element, and clicked on that same row's save button
    // Will store new value until the correct save button is pressed.
    if (isEditing && currentRow === $(this).parent().attr('id')) {
        var pElement = $(this).parent().find("p")
        pElement.text(newDescription);
        state[parseInt(currentRow.replace("row-",""))] = newDescription;
        newDescription = "";
        isEditing = false;
        SaveState();
    }
    
})

// Save 'state' object in the 'workDayState' key in localStorage
var SaveState = function() {
    localStorage.setItem("workDayState",JSON.stringify(state));
}

// Read in 'workDayState' from localStorage. If empty, create blank
// otherwise, populate into the corresponding p elements.
var LoadState = function() {
    // get state from local Storage
    state = JSON.parse(localStorage.getItem("workDayState"));

    // if it doesn't exist, then create a blank object. Otherwise, load into p elements
    if (!state) {
        state = {};
        for (var i = 9; i <= 17; i++) {
            var item = $("#row-" + String(i)).find("p");
            state[i] = item.text();
        }
    } else {
        for (var i = 9; i <= 17; i++) {
            $("#row-" + String(i)).find("p").text(state[i]);
        }
    }
}

// Run the initial load of the page
DisplayNow();
CreateTimeRows();
LoadState();
UpdateTimeColors();

// Check every minute and update the work schedule accordingly.
var PeriodicCheck = setInterval(function() {
    console.log("Checked");
    DisplayNow();
    LoadState();
    UpdateTimeColors();
},60000)
