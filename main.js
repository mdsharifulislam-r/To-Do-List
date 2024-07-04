const inputTask = document.getElementById("task")
const form = document.getElementById("form")
const pendingtaskBox = document.getElementById("pending-task")
const successtaskBox = document.getElementById("success-tasks");
/**
 * 
 * @param {Array} arr 
 */
const ArrayToString = (arr) => {
    let stringData = ""
   arr.map((data, index) => {
    stringData += `<div class="pen-task">
                <div class="data">
                    <div class="index">${index + 1}</div>
              <div class="text">${data?.task}</div>
                </div>
              
              <div class="btn">
          
                <button class="delete" onclick="DeletePendingTask(${
                  data?.id
                })">Delete</button
                ><button class="success" onclick="SuccessPendingTask(${data?.id})">Success</button>
              </div>
            </div>`;
   });
    return stringData
}
const SuccessArrayToString = (arr) => {
  let stringData = "";
  arr.map((data, index) => {
    stringData += `<div class="pen-task">
                <div class="data">
                    <div class="index">${index + 1}</div>
              <div class="text">${data.task}</div>
                </div>
              
              <div class="btn">
                
                <button class="delete" onclick="DeleteSuccessTask(${data.id})">Delete</button>
              </div>
            </div>`;
  });
  return stringData;
};
const localPendingData = JSON.parse(localStorage.getItem("pending-task"))
const localSuccessData = JSON.parse(localStorage.getItem("success-task"));
let pendingTask = localPendingData ? [...localPendingData] : []
let SuccessTask = localSuccessData? [...localSuccessData]:[]
function prevShow() {
  pendingtaskBox.innerHTML = localPendingData ? ArrayToString(localPendingData) : ArrayToString([])
  successtaskBox.innerHTML = localSuccessData ? SuccessArrayToString(localSuccessData):SuccessArrayToString([])
}
prevShow()
form.onsubmit = (e) => {
  e.preventDefault()
  if (inputTask.value !== "") {
    const obj = {
      id: generateRandomId(),
      task: inputTask.value,
    }
    pendingTask.push(obj)
    inputTask.value = ""
    localStorage.setItem("pending-task", JSON.stringify(pendingTask))
    pendingtaskBox.innerHTML = ArrayToString(pendingTask)
  }
  else {
    alert("Please Fill the data")
  }
}


const generateRandomId = () => {
  const id = Math.floor(Math.random() * 100000000);
  return id;
};

function DeletePendingTask(id) {
    pendingTask = pendingTask.filter(data => data.id != id)
    localStorage.setItem("pending-task", JSON.stringify(pendingTask));
    pendingtaskBox.innerHTML = ArrayToString(pendingTask);
    
}

function SuccessPendingTask(id) {
  const obj = pendingTask.filter(data => data.id == id)
  SuccessTask.unshift(obj[0])
  DeletePendingTask(id)
  successtaskBox.innerHTML = SuccessArrayToString(SuccessTask)
  localStorage.setItem("success-task", JSON.stringify(SuccessTask));
}
function DeleteSuccessTask(id) {
  SuccessTask = SuccessTask.filter((data) => data.id != id);
  localStorage.setItem("success-task", JSON.stringify(SuccessTask));
  successtaskBox.innerHTML = SuccessArrayToString(SuccessTask);
}
