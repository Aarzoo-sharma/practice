// if window reloads
document.addEventListener("DOMContentLoaded", reloadDisplay);

// saving new data to localhost
function enter() {
  var inputText = document.getElementById("text").value;

  var key = window.event.key;

  if (inputText !== "" && key === "Enter") {// If the user has pressed enter and textbox is not empty
    // saving data to local storage
    var newItem = { text: inputText, check: false };

    var todos = [];
    if (localStorage.getItem("todo-list") == null) {
      //checking todo-list variable(key) exist in localhost or not
      // if todo-list doesn't exist
      todos.push(newItem);
      localStorage.setItem("todo-list", JSON.stringify(todos));
    } else {
      // if todo-list exist it retrive data and append and overwrite it to localhost
      todos = JSON.parse(localStorage.getItem("todo-list"));
      todos.push(newItem);
      localStorage.setItem("todo-list", JSON.stringify(todos));
    }
    // here to add
    var parentElement = document.getElementById("todo-list");

    //   adding li(list item)
    var newLiElement = document.createElement("li");
    newLiElement.classList.add("todo-list-item");
    parentElement.appendChild(newLiElement);

    // adding editable input to new li (list item)
    var newEInputElement = document.createElement("input");
    newEInputElement.setAttribute("type", "text");
    newEInputElement.setAttribute("disabled", "1");
    newEInputElement.classList.add("editText");
    newEInputElement.classList.add("show");
    newEInputElement.value = inputText;
    newLiElement.appendChild(newEInputElement);

    // adding span to new li (list item)
    var newSpanElement = document.createElement("span");
    newSpanElement.classList.add("btns");
    newLiElement.appendChild(newSpanElement);

    // adding input(checkbox) to new span
    var newInputElement = document.createElement("input");
    newInputElement.setAttribute("type", "checkbox");
    newInputElement.classList.add("checkbox");
    newSpanElement.appendChild(newInputElement);

    // adding i to new span(cross mark)
    var newIPenElement = document.createElement("i");
    newIPenElement.classList.add("fa-solid");
    newIPenElement.classList.add("fa-pencil");
    newIPenElement.classList.add("editText");
    newSpanElement.appendChild(newIPenElement);

    var newIElement = document.createElement("i");
    newIElement.classList.add("fa-solid");
    newIElement.classList.add("fa-sm");
    newIElement.classList.add("fa-circle-xmark");
    newIElement.classList.add("remove");
    newSpanElement.appendChild(newIElement);

    document.getElementById("text").value="";
  }
}

// check which event occurs in todo list
const list = document.querySelector("#lt-dwn");
list.addEventListener("click", checkEvent);

function checkEvent(e) {
  if (e.target.classList.contains("checkbox")) {//to check a todo-list-item
    
    e = e.target.parentElement.parentElement; //accessing tag(input) with class(todo-list-item)
    e.children[0].classList.toggle("check");
    
    // geting index of li which is being trigered
    const index = Array.from(e.parentElement.children).indexOf(e); //tells me which element is trigerd
    // this will change to check value in local storage of element
    var todos = JSON.parse(localStorage.getItem("todo-list"));
    todos[index].check = !todos[index].check;
    localStorage.setItem("todo-list", JSON.stringify(todos));
  
  } else if (e.target.classList.contains("remove")) {//to delete a todo-list-item

    //tells me which element is trigerd (from parent to targeted element index)
    const index = Array.from(e.target.parentElement.parentElement.parentElement.children).indexOf(e.target.parentElement.parentElement);

    var todos = JSON.parse(localStorage.getItem("todo-list"));
    todos.splice(index, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    
    e=e.target.parentElement.parentElement;
    e.innerHTML=null;
    e.parentElement.removeChild(e.parentElement.children[index] );
    
  } else if (e.target.classList.contains("editText")) { //to edit todo-list-item

    var re = e.target.parentElement.parentElement;

    re.childNodes[0].removeAttribute("disabled"); //accessing childNode of todo-list-item
    re.childNodes[0].focus(); //accessing childNode of todo-list-item

    const index = Array.from(e.target.parentElement.parentElement.parentElement.children).indexOf(e.target.parentElement.parentElement);
    var todos = JSON.parse(localStorage.getItem("todo-list"));

    re.childNodes[0].classList.remove("check");//this will remove line(check class) if todo-list-item is checked
    re.childNodes[0].addEventListener("focusout", checkon);//this will add line(check class) if user doest change or save the todo-list-item
    
    var pretext=re.children[0].value;
    function checkon() {  //if user unchanges the last value and focus out then only check will be applied
      if(todos[index].check&&pretext==re.children[0].value)
      {
        re.childNodes[0].classList.add("check");
      }
      re.children[0].setAttribute("disabled","true");
    }
    
    re.childNodes[0].addEventListener("keypress", function () {
      var key = window.event.key;
      if (key === "Enter") {//tells me which element is trigerd (from parent to targeted element index)
                
        todos[index].text = re.childNodes[0].value;
        todos[index].check = false;
        localStorage.setItem("todo-list", JSON.stringify(todos));

        re.children[0].setAttribute("disabled","true");
        re.childNodes[0].classList.remove("check");//this will remove line(check class) if todo-list-item is checked
        re.children[1].children[0].checked=false;
      }
    });
  }
}

function reloadDisplay() {
  var todos;

  todos = JSON.parse(localStorage.getItem("todo-list"));
  todos.forEach(function (todo) {
    var parentElement = document.getElementById("todo-list");

    //   adding li(list item)
    var newLiElement = document.createElement("li");
    newLiElement.classList.add("todo-list-item");
    parentElement.appendChild(newLiElement);

    // adding editable input to new li (list item)
    var newEInputElement = document.createElement("input");
    newEInputElement.setAttribute("type", "text");
    newEInputElement.setAttribute("disabled", "1");
    newEInputElement.classList.add("editText");
    newEInputElement.classList.add("show");
    newEInputElement.value = todo.text;
    newLiElement.appendChild(newEInputElement);

    // adding span to new li (list item)
    var newSpanElement = document.createElement("span");
    newSpanElement.classList.add("btns");
    newLiElement.appendChild(newSpanElement);

    // adding input(checkbox) to new span
    var newInputElement = document.createElement("input");
    newInputElement.setAttribute("type", "checkbox");
    newInputElement.classList.add("checkbox");
    newSpanElement.appendChild(newInputElement);

    // adding i to new span(cross mark)
    var newIPenElement = document.createElement("i");
    newIPenElement.classList.add("fa-solid");
    newIPenElement.classList.add("fa-pencil");
    newIPenElement.classList.add("editText");
    newSpanElement.appendChild(newIPenElement);

    var newIElement = document.createElement("i");
    newIElement.classList.add("fa-solid");
    newIElement.classList.add("fa-sm");
    newIElement.classList.add("fa-circle-xmark");
    newIElement.classList.add("remove");
    newSpanElement.appendChild(newIElement);

    if (todo.check && !newEInputElement.classList.contains("check")) {
      newEInputElement.classList.add("check");
    } else {
      newEInputElement.classList.remove("check");
    }
    // clearing textarea data
    document.getElementById("text").value = "";
  });

  //to check all checkboxes which are checked by user
  document.querySelectorAll(".check").forEach(function (todo) {
    // going to input[type="checkbox"] tag from li>input[type="text"] tag(todo pointes to input[type="text"] which have `check` class in `li` tag)
    todo.nextSibling.children[0].setAttribute("checked", "true");
  });
}