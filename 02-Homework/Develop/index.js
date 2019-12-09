const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateHTML = require('./generateHTML');
const generateMap = require('./generateMap');

const writeFileAsync = util.promisify(fs.writeFile);

// Asking user for inputs to generate html files
function promptUser() {
    return inquirer.prompt([
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
        // get user basic info
        const queryUrl = `https://api.github.com/users/${answers.github}`;
        axios.get(queryUrl).then(function (res) {

            const userInfo = res.data;
            const colorChoice = answers.colors;
            const { login, avatar_url, html_url, name, company, blog, location, bio, public_repos, followers, following } = userInfo
            const gitHubStarUrl = `https://api.github.com/users/${answers.github}/starred`

            // get user's number of star
            axios.get(gitHubStarUrl).then(function (res) {
                const star = res.data.map(function (repoStared) {
                    return repoStared.name;
                });
                const starCounted = star.length;
                const html = generateHTML(userInfo, colorChoice, starCounted);

                //write user basic info on a html file and display
                return writeFileAsync("index.html", html);
            });

            // get user's location by using google map
            const googleMapQuery = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${userInfo.location}&key=AIzaSyBo0ZfFj1umWDURDypJtkiLA4cVinSFnrk`
            axios.get(googleMapQuery).then(function (res) {
                // get latitude and longtitude
                const latitude = res.data.results[0].geometry.location.lat;
                const longtitude = res.data.results[0].geometry.location.lng;

                const map = generateMap(latitude, longtitude); 

                //write user's location on a html file and display
                return writeFileAsync("map.html", map);
            }).then(function () {
                console.log("Successfully wrote to map.html");
            });

        }).then(function () {
            console.log("Successfully wrote to index.html");
        });

    }).catch(function (err) {
        console.log(err);
    });


