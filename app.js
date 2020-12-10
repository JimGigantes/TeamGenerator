const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "team.html");
let teamMembers = []
var id=0
const render = require("./lib/htmlRenderer");
let member = {}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function kickItOff() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "What is the first role you would like to add?",
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'Role',
        },
      
])
    .then((response) => {
        switch(response.Role){
            case "Engineer":
                EngineerGH()
                break;
            case "Intern":
                InternSN()
                break;
            case "Manager":
                ManagerON()
                break;
        }
     })    
}

function addanother(){
        inquirer
        .prompt([
          {
            type: 'list',
                message: "Would you like to add another team member?",
                choices: ['Yes', 'No'],
                name: 'addanother'
          }   
    ])
        .then((response) => {
            if (response.addanother=== "Yes"){
                generateTheTeam()
            }else {
               
              // createTeamMemberObjects()
              getFileName()
            }
        })    
 }

 //function createTeamMemberObjects(){
        
/*     for (var i = 0; i<teamMembers.length; i++){

        if (teamMembers[i].role === "Manager"){
            console.log ("success")
            member = new Manager(
                teamMembers.name,
                teamMembers.id,
                teamMembers.email,
                teamMembers.officeNumber
              );
              console.log ("success")
        }
        if (teamMembers[i].role === "Engineer"){
            member = new Engineer(
                teamMembers.name,
                teamMembers.id,
                teamMembers.email,
                teamMembers.officeNumber
              );
        }
        if (teamMembers[i].role === "Intern"){
            member = new Intern(
                teamMembers.name,
                teamMembers.id,
                teamMembers.email,
                teamMembers.officeNumber
              );
        }
    }

    generateFile()

 } */

function generateTheTeam() {
        inquirer
    .prompt([
        {
            type: 'list',
            message: `What is the next team member's Role?`,
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'Role'
        },
])
    .then((response) => {
        switch(response.Role){
            case "Engineer":
                EngineerGH()
                break;
            case "Intern":
                InternSN()
                break;
            case "Manager":
                ManagerON()
                break;
        }       
    })
}
    
//if the next member is a manager collect and push office number
function ManagerON (i){
    inquirer
    .prompt([
      {
        type: 'input',
        message: `What is the team-member's Office Number?`,
        name: 'OfficeNumber',
      },
      {
        type: 'input',
        message: `What is the team member's name?`,
        name: 'Name',
      },
      {
        type: 'input',
        message: `What is the team member's email?`,
        name: 'Email',
      },
      {
        type: 'input',
        message: `What is the team member's ID#?`,
        name: 'id',
      }
])
    .then((response) => {
        member = new Manager(
            response.Name,
            response.id,
            response.Email,
            response.OfficeNumber
          ); console.log(member)
        
        let nextMember =  {name:  response.Name,role:  "Manager",email: response.Email,number: response.OfficeNumber}
        teamMembers.push(nextMember)
        addanother()
    })
}  
//if the next member is an engineer collect and push Github
function EngineerGH (i){
    inquirer
    .prompt([
      {
        type: 'input',
        message: `What is the team-member's github account name?`,
        name: 'github',  
      },
      {
        type: 'input',
        message: `What is the team member's name?`,
        name: 'Name',
      },
      {
        type: 'input',
        message: `What is the team member's email?`,
        name: 'Email',
      },
      {
        type: 'input',
        message: `What is the team member's ID#?`,
        name: 'id',
      }
])
    .then((response) => {
        member = new Engineer(
            response.Name,
            response.id,
            response.Email,
            response.github
          );
        let nextMember =  {name:  response.Name,role:  "Engineer",email: response.Email,number: response.github}
        teamMembers.push(nextMember)
        addanother()
    })
}  
//if the next member is an Intern collect and push school name
function InternSN (i){
    inquirer
    .prompt([
      {
        type: 'input',
        message: `What is the team-member's School name?`,
        name: 'Schoolname',
      },
      {
        type: 'input',
        message: `What is the team member's name?`,
        name: 'Name',
      },
      {
        type: 'input',
        message: `What is the team member's email?`,
        name: 'Email',
      },
      {
        type: 'input',
        message: `What is the team member's ID#?`,
        name: 'id',
      }
])
    .then((response) => {
        member = new Intern(
            response.Name,
            response.id,
            response.Email,
            response.Schoolname
          ); 
        let nextMember =  {name:  response.Name,role:"Intern",email: response.Email,number: response.Schoolname}
        teamMembers.push(nextMember)
        addanother()
    })
}

function  getFileName(){
    inquirer
    .prompt([
      {
        type: 'input',
        message: `What would you like to name this file?`,
        name: 'FileName',
      },
    
])
.then((response) => {
    if (response.FileName) {
        generateFile(response.FileName);
      } else {
        getFileName();
      }
 });


}
 function generateFile(fileName) {
    const outputPath = path.join(OUTPUT_DIR, fileName + ".html");
  
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
  
    fs.writeFileSync(outputPath, render(teamMembers), (err) => {
      if (err) {
        console.log(err);
        getFileName();
      }
    });
  };

kickItOff()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``