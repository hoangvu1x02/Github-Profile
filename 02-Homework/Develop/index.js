const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

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
            name: "work",
            message: "Where do you work?"
        },
        {
            type: "input",
            name: "location",
            message: "Where are you from?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        },
        {
            type: "input",
            name: "blog",
            message: "Enter your Blog Username"
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
        const queryUrl = `https://api.github.com/users/${answers.github}/repos?per_page=100`;
        axios.get(queryUrl).then(function (res) {
            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });
            console.log(repoNames.length);
        });



        const queryFollowerUrl = `https://api.github.com/users/${answers.github}/followers?per_page=100`;
        axios.get(queryFollowerUrl).then(function (res) {
            const followers = res.data;
            console.log(followers.length);
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
