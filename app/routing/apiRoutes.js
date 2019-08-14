// The apiRoutes.js file includes two basic routes for app.get function and app.post function which used for displaying a JASON data and incoming survey results of all possible friends:
// The app.post(in the apiRoutes.js) used to handle the compatibility logic.


var friends = require('../data/friends.js');

// get and post routing functions
module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });
    // post the form when submitted
    app.post('/api/friends', function (req, res) {
        // loop through all of the possible options
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // To take the result of the user's survey POST and parse it
        let userData = req.body;
        let userScores = userData.scores;
        // To take the results of the user's name and photo, other than the survey questions, to post and parse it
        let userName = userData.name;
        let userPhoto = userData.photo;

        // The letiable used to calculate the difference b/n the user's socres and the scores of each user
        let totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        for (let i = 0; i < friends.length - 1; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            //loop through that friends score and the users score and calculate the absolute difference between the two and push that to the total difference letiable set above
            for (let j = 0; j < 10; j++) {
                // We calculate the difference between the scores and sum them into the totalDifference
                console.log("userScore[j] ", userScores[j]);
                console.log("Friends[i] ",friends[i]);
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset the bestMatch to be the new friend. 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // The push method use to save user's data to the database
        friends.push(userData);

        //The res.json method will return a JSON data with the user's match which was looped through frieds data array. 
        res.json(bestMatch);
    });
}