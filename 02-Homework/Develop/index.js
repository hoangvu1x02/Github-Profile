const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);



function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        },

        {
            type: "list",
            message: "What is your favourite color?",
            name: "colors",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
    ]);
}

promptUser()
    .then(function (answers) {
        const queryUrl = `https://api.github.com/users/${answers.github}`;
        axios.get(queryUrl).then(function (res) {

            const userInfo = res.data;

            const workPlace = userInfo.company;
            const location = userInfo.location;
            const githubLink = userInfo.url;
            const repos = userInfo.public_repos;
            const followers = userInfo.followers;
            const following = userInfo.following;
            const blog = userInfo.blog;


            const html = generateHTML.generateHTML(userInfo);



            console.log(workPlace, location, githubLink, repos, followers, following, blog);
            return writeFileAsync("index.html", html);
        }).then(function () {
            console.log("Successfully wrote to index.html");
        });

    }).catch(function (err) {
        console.log(err);
    });


// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {
// }
// init();
