
// window.addEventListener('hashchange', () => {
//     router(window.location.hash);
// })

// var namex = new String("checkbox");
// var checkBox=taskListItem.querySelector("input[type=checkbox]");
// var checkboxes = document.getElementsByName(namex);
// console.log(checkboxes.length);

// for (let index = 0; index < checkboxes.length; index++) {

//     if(checkboxes[index].checked = true){
//         checkboxes[index].disabled = true;
//     }
// }

var taskInput=document.getElementById("new-task");//Add a new task.
console.log(taskInput);
var addButton=document.getElementById("add-btn");
console.log(addButton);
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
console.log(incompleteTaskHolder);
var taskCount = 2;

//New task list item
var createNewTaskElement=function(task_text){
    var listItem=document.createElement("li");
    taskCount+=1;
	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//button.edit
	var editButton=document.createElement("button");//edit button
	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=task_text;
    
	//Each elements, needs appending
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

	//and appending.
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
    // var ul=listItem.parentNode;

    //Remove the parent list item from the ul.
    incompleteTaskHolder.removeChild(listItem);
}


