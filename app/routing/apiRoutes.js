var friends = require("../data/friends");

module.exports = function(app) {     //Return all friends found in friends.js as JSON

app.get("/api/friends", function(req, res) {     //API GET Requests, below code handles when users visit the page/link
    console.log(friends);
    res.json(friends);
});

app.post("/api/friends", function(req, res) {    //API POST Requests, below code handles when use submit a form and thus sbmit data to the server
    console.log(req.body.scores);

    var user = req.body;     //Receive user details(name, photo, scores)

    for(var i = 0; i < user.scores.length; i++) {
        user.scores[i] = parseInt(user.scores[i]);     //parses a string and returns an integer
    }

    var bestFriendIndex = 0;     //default friend match is the first friend
    var minimumDifference = 40;  //but result will be whoever has the minimum difference in scores

    for(var i = 0; i < friends.length; i++) {
        var totalDifference = 0;     //start with zero difference
        for(var j = 0; j < friends[i].scores.length; j++) {
            var difference = Math.abs(user.scores[j] - friends[i].scores[j]);     //return absolute value of a number
            totalDifference += difference;                                        //compare user score and friends score
        }      // add the difference scores to totalDifference
    }

    friends.push(user);

    res.json(friends[bestFriendIndex]);
})

}