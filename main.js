const students = [
  
]
const expelledStudents = [

]

const writeToDom = (selector, string)=>{
  document.querySelector(selector).innerHTML = string
}

const displaySortForm = () => {
  domString = `<div>
  <form>
  <div class="form-row justify-content-center">
    <div class="col col-6">
      <input id="studentName" type="text" class="form-control" placeholder="Name">
    </div>
  </div>
</form>
<button id="secondButton"  class="btn btn-primary">Sort to House!</button>
<button id="sortHouse"  class="btn btn-primary">Sort By House</button>
<button id="sortName"  class="btn btn-primary">Sort By Name!</button>
</div>`
  writeToDom("#sortDiv", domString)
  document.querySelector("#secondButton").addEventListener('click', secondButtonPushed);
  document.querySelector("#sortHouse").addEventListener('click', function(){ printCards(students.sort(compareHouse))});
  document.querySelector("#sortName").addEventListener('click', function(){ printCards(students.sort(compareName))});
  // document.querySelector("#studentName").addEventListener('keyup', )
}

const secondButtonPushed = () => {
  if (!document.querySelector("#studentName").value){
    alert("Please Enter a Name")
    return
  }
  let studentObject = {};
  studentObject.name = document.querySelector("#studentName").value;
  studentObject.house = randomHouse();
  students.push(studentObject);
  printCards(students);
}

const randomHouse = () =>{
  value = Math.floor(Math.random() * Math.floor(4));
  switch (value){
    case 0:
      return "Gryffindor";
    case 1:
      return "Ravenclaw";
    case 2:
      return "Slytherin";
    case 3:
      return "Hufflepuff";
  }
}


const printCards = (studentsArr) =>
{ let domString = ''
  for (let i = 0; i<studentsArr.length; i++){
    domString += `<div class="card" style="width: 18rem;">
        <img class="${studentsArr[i].house}" src="${getHouseImg(studentsArr[i].house)}" class="card-img-top" alt="${studentsArr[i].house} symbol">
        <div class="${studentsArr[i].house} card-body">
          <h5 class="card-title">${studentsArr[i].name}</h5>
          <p class="card-text">${studentsArr[i].house}</p>
          <a id="expelBtn${i}" class="btn btn-primary">Expel</a>
        </div>
      </div>`
      
    }
  writeToDom("#cardsDiv", domString);
  
  for (let i = 0; i<studentsArr.length; i++){
    createClickEventHandler("#expelBtn"+i, expelButton)
}
}

const getHouseImg = (house) => {
  switch (house){
    case "Gryffindor":
      return "https://i.imgur.com/3Zis29A.jpg";
    case "Ravenclaw":
      return "https://i.imgur.com/rqvWC51.jpg";
    case "Slytherin":
      return "https://i.imgur.com/Bc4ySF7.jpg";
    case "Hufflepuff":
      return "https://i.imgur.com/NQO7bxI.jpg";
  }
}

const expelButton = (event) =>{
  indexToRemove = event.target.id.match(/\d+/g)
  removedStudent = students.splice(indexToRemove,1)
  removedStudent.house = "DeathEaters"
  expelledStudents.push(removedStudent)
  console.log(expelledStudents)
  printCards(students)
}

const compareHouse = (a,b) => {
  if (a.house < b.house){
    return -1
  }
  if (a.house > b.house) {
    return 1
  }
  return 0
}
const compareName = (a,b) => {
  if (a.name.toUpperCase() < b.name.toUpperCase()){
    return -1
  }
  if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1
  }
  return 0
}



const createClickEventHandler = (selector, eventfunct) => {
  document.querySelector(selector).addEventListener('click', eventfunct);

}


const clickEvents = () =>{
  document.querySelector("#sortButton").addEventListener('click', displaySortForm);
  
}

const init = () => {
  clickEvents()
}

init();
