// set current day
$('#currentDay').text(moment().format('dddd, MMM Do'));

// tasks array
tasks = {};

$(".saveBtn").on("click",function(){
  console.log("save button clicked");
});


// $(".task").on("click","textarea", function(){
$(".taskDiv").on("click", "p", function(){
    console.log(this,"save button clicked");
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
  $(".task").on("blur", "textarea", function() {
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