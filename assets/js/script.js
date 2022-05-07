// set current day
$('#currentDay').text(moment().format('dddd, MMM Do'));

// // tasks array
// tasks = [];

// function to update the formatting of the tasks based on time
var auditTasks = function(tstHour) {
  // get current hour
  // tstHour is for testing hte auditTasks function
  var currentHour;
  if(tstHour){
    currentHour = tstHour;
  } else {
    currentHour = moment().format("H");
  }

  // select all time blocks and loop through each
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
};

// timer to update the formatting
auditTasks();
// set timer automation to update formatting every 10 minutes
setInterval(function(){
  auditTasks();
}, (1000*60)*10);


// EDIT: click task to edit code
$(".taskDiv").on("click", "p", function(){
  // get current text of p element
  var text = $(this)
    .text()
    .trim()
  
  // save the data attribute 
  // var dataHour = num.toString($(this).parents().data("hour"));
  var dataHour = (($(this).parents().data("hour").toString()));


  // replace p element with a new textarea
  var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});

// save edits when focus changes from editable field
$(".taskDiv").on("blur", "textarea", function() {
  //get the textareas; current value/text
    var text = $(this)
      .val()
      .trim();

    //recreate p element
    var taskP = $("<p>")
      .text(text);

    // replace textarea with new content
    $(this).replaceWith(taskP);
  });

// 

$(".saveBtn").on("click",function(){
  var index = $(".saveBtn").index(this);
  tasks[index] = $(this).parent().find("p").text()
  localStorage.setItem("tasks",JSON.stringify(tasks));
});

var loadTasks = function(){
  // load from local storage
  tasks = JSON.parse(localStorage.getItem("tasks"));

    // if nothing in localStorage, create a new object to track task toDo items
    if (!tasks) {
      tasks = []
    } else {
      $.each(tasks, function(list, arr){
        $("#task-index-"+list).text(arr)
      });
    }
}

loadTasks();
auditTasks();