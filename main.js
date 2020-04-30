const students = [
  
]

const writeToDom = (selector, string)=>{
  document.querySelector(selector).innerHTML = string
}

const displaySortForm = () => {
  domString = `<input type="text" id="studentName" value="Neville Longbottom">
  <button id="secondButton">Second Button</button>`
  writeToDom("#sortDiv", domString)
  document.querySelector("#secondButton").addEventListener('click', secondButtonPushed);
}

const secondButtonPushed = () => {
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
        <img src="${getHouseImg(studentsArr[i].house)}" class="card-img-top" alt="${studentsArr[i].house} symbol">
        <div class="card-body">
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
  removed =[]
  indexToRemove = event.target.id.match(/\d+/g)
  console.log(indexToRemove)
  removedStudent = students.splice(parseInt(indexToRemove),1)
  removed.push(removedStudent)
  printCards(students)
}

const createClickEventHandler = (selector, eventfunct) => {
  console.log(selector)
  document.querySelector(selector).addEventListener('click', eventfunct);

}


const clickEvents = () =>{
  document.querySelector("#sortButton").addEventListener('click', displaySortForm);
  
}

const init = () => {
  clickEvents()
}

init();
