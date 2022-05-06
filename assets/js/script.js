// set current day
$('#currentDay').text(moment().format('dddd, MMM Do'));

// tasks array
tasks = {};

// function to update teh formatting of the tasks based on time
var auditTasks = function(tstHour) {
// get current hour

// tstHour is for testing hte auditTasks function
var currentHour;
if(tstHour){
  currentHour = tstHour;
} else {
  currentHour = moment().format("H");
}


// loop through each time block
var taskEl = $(".taskDiv");

taskEl.each(function(i){
  var taskHour = $(taskEl[i]).data("hour");
  // remove all classes: "past" "present" and "future"
  $(taskEl[i]).removeClass("past")
  $(taskEl[i]).removeClass("present")
  $(taskEl[i]).removeClass("future")

  if (currentHour == taskHour ){        /* if task hour is now */
    $(taskEl[i]).addClass("present")  
  } else if (currentHour > taskHour){   /* if task hour is before now*/
    $(taskEl[i]).addClass("past")
  } else {                              /* task hour imust be after now */
    $(taskEl[i]).addClass("future")
  }
});



// set timer automation
setInterval(function(){
    auditTask();
}, (1000*60)*10);

};

$(".saveBtn").on("click",function(){
  console.log("save button clicked");
});


// $(".task").on("click","textarea", function(){
$(".taskDiv").on("click", "p", function(){
  // get current text of p element
  var text = $(this)
    .text()
    .trim();

  // replace p element with a new textarea
  var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});

  // editable field was un-focused
  $(".taskDiv").on("blur", "textarea", function() {
    //get the textareas; current value/text
      var text = $(this)
        .val()
        .trim();
  
      //recreate p element
      var taskP = $("<p>")
        .addClass("m-1")
        .text(text);
  
      // replace textarea with new content
      $(this).replaceWith(taskP);
    }); 



var loadTasks = function(){
  // load from local storage
  tasks = JSON.parse(localStorage.getItem("tasks"));

    // if nothing in localStorage, create a new object to track task toDo items
    if (!tasks) {
      tasks = {
        toDo: [],
      };
    }

    // loop over object properties
    $.each(tasks, function(list, arr) {
      arr.forEach(function(task) {
        createTask(task.text, task.date, list);
    });
  });
}


var saveTasks = function(){
// save to local storage
}

auditTasks();