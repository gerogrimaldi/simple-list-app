
// window.addEventListener('hashchange', () => {
//     router(window.location.hash);
// })

var taskInput=document.getElementById("new-task");//Add a new task.
console.log(taskInput);
var addButton=document.getElementById("add-btn");
console.log(addButton);
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
console.log(incompleteTaskHolder);
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

var taskCount = 0; //to set the id´s

//New task list item
var createNewTaskElement=function(task_text){
    var listItem=document.createElement("li");
    taskCount+=1;
	//checkbox
	var checkBox=document.createElement("input");
	//label
	var label=document.createElement("label");
	//edit button
	var editButton=document.createElement("button");
	//delete button
	var deleteButton=document.createElement("button");

	label.innerText=task_text;
    
	//elements attributes
	checkBox.type="checkbox";
	checkBox.className="form-check-input";
    
	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit modifier-btn pull-right";
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#edit_task");
    editButton.setAttribute("onClick", "getID(this.id)");
    editButton.id="edit-btn" + taskCount;

	deleteButton.innerText="Delete";
	deleteButton.className="delete modifier-btn pull-right";
    
    label.htmlFor="edit-btn"+taskCount;

	//appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

//add new task
var addTask=function(){
    console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value);
    
	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";
}

addButton.onclick=addTask;

///////////////////////////// Edit task ///////////////////////////////////////////
var edit_taskInput=document.getElementById("edit-task");
console.log(edit_taskInput);
var editButton=document.getElementById("save-edit-btn");
console.log(editButton);

var idValue;

var getID = function(id){
    idValue = id;
    console.log(idValue);
}

var editTask=function(){
    console.log("Edit Task...");
   
    var label=findLable();

    label.innerText=edit_taskInput.value;
}

function findLable() {
    labels = document.getElementsByTagName('label');
    for( var i = 0; i < labels.length; i++ ) {
        console.log(labels[i]);
        if (labels[i].htmlFor == idValue){
            return labels[i];
        }
    }
 }

editButton.onclick=editTask;

///////////////////////////// Delete task ///////////////////////////////////////////
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

/////////////////////////////////////////////////////////////////////////////////////
//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    listItem
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
    console.log("Incomplete Task...");
    //Mark task as incomplete.

    //Append the task list item to the #incomplete-tasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");

    //select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var deleteButton=taskListItem.querySelector("button.delete");

    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}