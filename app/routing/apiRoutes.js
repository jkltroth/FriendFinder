// LOAD DATA
var friendsData = require("../data/friends");

// ROUTING

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {

        function indexOfMin(array) {
            let leastDifference = 0;
            for (let i = 1; i < array.length; i++) {
                if (array[i] < array[leastDifference]) {
                    leastDifference = i;
                }
            }
            return leastDifference;
        }

        //assign the user's survey data to 'NewUserData' variable
        let newUserData = req.body;
        console.log(newUserData);

        // convert user's scores array which is currently made up of strings to an array of integers
        let newUserScoreInts = newUserData.scores.map(Number);
        console.log("New User Scores: " + newUserScoreInts);

        // create an array to capture totalDifference (between new user and current friends) values
        let totalDifferenceArr = [];

        // iterate through friendsData array, converting scores array for each friend from an array of strings to an array of integers
        for (let i = 0; i < friendsData.length; i++) {

            // convert the scores array of friend[i] from an array of strings to an array of integers
            let friendsScoreInts = friendsData[i].scores.map(Number);
            console.log("Friend #" + (i + 1) + ": " + friendsScoreInts);

            // measure the totalDifference value between new user and friend [i]
            let totalDifference = 0;


            for (let questionNum = 0; questionNum < 10; questionNum++) {
                totalDifference += (Math.abs(friendsScoreInts[questionNum] - newUserScoreInts[questionNum]));
            }

            //push totalDifference between new user and friend [i] to totalDifferenceArr
            totalDifferenceArr.push(totalDifference);
        };

        console.log("Total Difference Array: " + totalDifferenceArr);

        console.log("Most Compatible: " + indexOfMin(totalDifferenceArr));

        let mostCompatibleFriend = friendsData[indexOfMin(totalDifferenceArr)];

        res.send(mostCompatibleFriend);
        
        friendsData.push(newUserData);

    });
};