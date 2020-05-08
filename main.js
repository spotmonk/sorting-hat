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
<button id="sortName"  class="btn btn-primary">Sort By Name</button>
<button id="army"  class="voldemort btn btn-primary">Voldemort's Army</button>
</div>`
  writeToDom("#sortDiv", domString)
  document.querySelector("#secondButton").addEventListener('click', secondButtonPushed);
  document.querySelector("#sortHouse").addEventListener('click', function(){ printCards(students.sort(compareHouse))});
  document.querySelector("#sortName").addEventListener('click', function(){ printCards(students.sort(compareName))});
  document.querySelector("#army").addEventListener('click', armyToggle);
  document.querySelector("#studentName").addEventListener('keyup', function(e){ if (e.keyCode === 13) {secondButtonPushed()}});
}
const secondButtonPushed = () => {
  
  if (!document.querySelector("#studentName").value){
    alert("Please Enter a Name")
    return
  }
  
  let studentObject = {};
  studentObject.name = document.querySelector("#studentName").value;
  studentObject.house = randomHouse();
  studentObject.unique = students.length
  students.push(studentObject);
  document.querySelector("#studentName").value = ""
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
{ console.log("printcards called")
  let domString = ''
  for (let i = 0; i<studentsArr.length; i++){
    let expelString = (studentsArr[i].house != "DeathEaters") ?  `<a id="student${studentsArr[i].unique}" class="btn btn-primary">Expel</a>` :  `<a id="student${studentsArr[i].unique}" class="btn btn-primary">Redeem</a>`
    domString += `<div class="card" style="width: 18rem;">
        <img class="${studentsArr[i].house}" src="${getHouseImg(studentsArr[i].house)}" class="card-img-top" alt="${studentsArr[i].house} symbol">
        <div class="${studentsArr[i].house} card-body">
          <h5 class="card-title">${studentsArr[i].name}</h5>
          <p class="card-text">${studentsArr[i].house}</p>
          ${expelString}
        </div>
      </div>`
      
    }
  writeToDom("#cardsDiv", domString);
  
  for (let i = 0; i<studentsArr.length; i++){
    createClickEventHandler("#student"+studentsArr[i].unique, (studentsArr[i].house != "DeathEaters") ? expelButton : redeemButton)
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
    case "DeathEaters":
      return "https://podfanz.com/wp-content/uploads/2019/02/harry_potter_dark_mark_watercolor_postcard-r28af1d66688343fc81eafac0483427da_vgbaq_8byvr_699.jpg"
  }
}

const expelButton = (event) =>{
  indexToRemove = Number(event.target.id.match(/\d+/g))
  console.log(indexToRemove,expelledStudents,students)
  for (let i = 0; i<students.length; i++){
    console.log(i,indexToRemove,expelledStudents,students)
    if(students[i].unique == indexToRemove){
    removedStudent = students.splice([i],1)
    break
    }
  }
  removedStudent[0].previousHouse = removedStudent[0].house
  removedStudent[0].house = "DeathEaters"
  expelledStudents.push(removedStudent[0])
  console.log(expelledStudents)
  printCards(students)
}

const redeemButton = (event) =>{
  indexToRemove = event.target.id.match(/\d+/g)
  for (let i = 0; i<expelledStudents.length; i++){
    if(expelledStudents[i].unique == indexToRemove){
    removedStudent = expelledStudents.splice([i],1)
    break
  }
}
  removedStudent[0].house = removedStudent[0].previousHouse
  students.push(removedStudent[0])
  console.log(expelledStudents)
  printCards(expelledStudents)
}


const armyToggle = () =>{
  button = document.querySelector("#army")
  if (document.querySelector("#army").classList.contains("voldemort")){
  console.log("voldemort")
  printCards(expelledStudents)
  button.innerHTML="Dumbledore's Army";
  button.classList.remove('voldemort');
}
  else{
    button.innerHTML="Voldemort's Army";
    button.classList.add('voldemort')
    printCards(students)
  } 
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
