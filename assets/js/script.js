// set current day
$('#currentDay').text(moment().format('dddd, MMM Do'));

// tasks array
wdsTasks = [];

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

auditTasks();
// set timer automation to update formatting every 10 minutes
setInterval(function(){
  auditTasks();
}, (1000*60)*10);


// click task to edit code
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
    textInput.attr("id",dataHour)   /* pass the data attribute along */

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
      .addClass("m-1")
      .text(text);

    // extract the taskHour that was passed in data-hour
    var taskHour = $($(this).parents()[0]).data("hour");
    // console.log('taskHour',taskHour);
    console.log(taskHour,text);

    // replace textarea with new content
    $(this).replaceWith(taskP);

    // update task array wdsTasks
    // check for duplicates of hour to see if object needs updated or replaced
    debugger
    let index = wdsTasks.map(x =>x.hour).indexOf(taskHour);
    if (index >= 0){
      console.log('found');
      wdsTasks[index].task = text
    } else {
      console.log('not found');
      wdsTasks.push({
        hour: taskHour,
        task: text
      });
    }
  });
  // }); 


// 

// $(".saveBtn").on("click",function(){
//   console.log("save button clicked");
// });

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
