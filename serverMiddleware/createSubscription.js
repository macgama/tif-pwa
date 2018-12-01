const express = require("express"),
  admin = require("firebase-admin"),
  cookieParser = require("cookie-parser")(),
  webpush = require("web-push"),
  bodyParser = require("body-parser");

const app = express();
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app.use(function(req, res, next) {
  try {
    console.log(req.body);
    const teams = req.body.teams;
    const newSub = req.body.newSub;
    // console.log("teams: ", teams);
    // console.log("newSub: ", newSub);
    const userId = "WRus1acAvkdGPmnxqLOukl9mKM23";
    let updates = {};

    const dataObject = {
      endpoint: newSub.endpoint,
      keys: newSub.keys,
      user_id: userId
    };

    // First get rid of previous registered subscriptions:
    // admin
    //   .database()
    //   .ref("/subscriptions/xamax")
    //   .orderByChild("endpoint")
    //   .equalTo(
    //     "https://fcm.googleapis.com/fcm/send/cQylt1ikRqA:APA91bEOFs8rLPmL06kPy0u6afeIgVyyJKM0F3YhcqAjicFoWbL8HQt9Ynq9ZIjy57WryK0tfLPkTL9lJdIq6Ko0qDiGrLhQ74eM_izFImUDjuhdcfsMtUJjJ1l-VwFU1sctyKmNTbUF"
    //   )
    //   .once("value", function(snapshot) {
    //     console.log("snapshot: ", snapshot.val());
    //   });

    // updates["/subscriptions/xamax/" + "/" + newSubscriptionKey] = dataObject;

    // Then add new subscriptions

    for (let team of teams) {
      const newSubscriptionKey = admin
        .database()
        .ref()
        .child("/subscriptions/" + team)
        .push().key;
      updates["/subscriptions/" + team + "/" + newSubscriptionKey] = dataObject;
    }
    // console.log("updates: ", updates);
    admin
      .database()
      .ref()
      .update(updates)
      .then(snapshot => {
        console.log(
          "Successfully updated firebase database with new subscriptions"
        );
      })
      .catch(error => {
        console.log("Firebase error", error);
      });

    res.send("GET request succeeded!");
  } catch (error) {
    console.log(error);
    res.send("GET request failed...");
  }
});
