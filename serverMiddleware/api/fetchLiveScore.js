const express = require("express"),
  moment = require("moment"),
  axios = require("axios"),
  admin = require("firebase-admin"),
  slugifyFunction = require("../../helpers/slugify"),
  env = require("dotenv").config();

const app = express();
const api_key = process.env.LIVESCORE_API_KEY;
const api_secret = process.env.LIVESCORE_API_SECRET;

// To be run every minute
module.exports = app.use(async function(req, res, next) {
  try {
    const leaguesArray = [
      "25",
      "74",
      "114",
      "73",
      "46",
      "12",
      "139",
      "86",
      "9",
      "174",
      "175",
      "176",
      "177",
      "232",
      "233",
      "234",
      "235",
      "236",
      "237",
      "238",
      "239",
      "240",
      "241",
      "242",
      "243",
      "244",
      "245",
      "246",
      "247"
    ];

    const url =
      "http://livescore-api.com/api-client/scores/live.json?key=" +
      api_key +
      "&secret=" +
      api_secret;
    const today = moment().format("YYYY-MM-DD");
    let updates = {};

    const matches = await axios.get(url);
    console.log("matches: ", matches);
    for (let match of matches.data.data.match) {
      console.log("match: ", match);
      if (leaguesArray.includes(match.league_id)) {
        const id = today + "_" + match.home_id + "_vs_" + match.away_id;

        updates["/events/" + id + "/livescore_api_id"] = match.id;
        updates["/events/" + id + "/score"] = match.score;
        updates["/events/" + id + "/ht_score"] = match.ht_score;
        updates["/events/" + id + "/ft_score"] = match.ft_score;
        updates["/events/" + id + "/et_score"] = match.et_score;
        updates["/events/" + id + "/time"] = match.time;
        updates["/events/" + id + "/status"] = match.status;
        updates["/events/" + id + "/last_changed"] = match.last_changed;
        if (match.status !== 'FINISHED') {
          updates["/events/" + id + "/notification_sent"] = false
        }
      }
    }
    // console.log("updates: ", updates);
    await admin
      .database()
      .ref()
      .update(updates);
    console.log("Step 3");

    const sendNotifications = await axios.get("/");
    console.log("sendNotifications: ", sendNotifications);
    console.log("DONE!");
    res.send("GET request succeeded!");

    // axios
    //   .get(url)
    //   .then(response => {
    //     // console.log('response: ', response)
    //     const today = moment().format("YYYY-MM-DD");
    //     const matches = response.data.data.match;
    //     // console.log('events: ', events)
    //     // console.log('today: ', today)
    //     let updates = {};

    //     for (let match of matches) {
    //       console.log("match: ", match);
    //       if (leaguesArray.includes(match.league_id)) {
    //         const id = today + "_" + match.home_id + "_vs_" + match.away_id;

    //         updates["/events_new2/" + id + "/livescore_api_id"] = match.id;
    //         updates["/events_new2/" + id + "/score"] = match.score;
    //         updates["/events_new2/" + id + "/ht_score"] = match.ht_score;
    //         updates["/events_new2/" + id + "/ft_score"] = match.ft_score;
    //         updates["/events_new2/" + id + "/et_score"] = match.et_score;
    //         updates["/events_new2/" + id + "/time"] = match.time;
    //         updates["/events_new2/" + id + "/status"] = match.status;
    //         updates["/events_new2/" + id + "/last_changed"] =
    //           match.last_changed;
    //         if (
    //           match.status === "FINISHED" &&
    //           match.notification_sent !== true
    //         ) {
    //           // Add to notification array
    //           teamsToNotify.push(match.home_team ? match.home_team.slug : "");
    //           teamsToNotify.push(match.away_team ? match.away_team.slug : "");
    //           updates["/events_new2" + id + "/notification_sent"] = true;
    //         }
    //       }
    //     }
    //     // console.log('updates: ', updates)
    //     admin
    //       .database()
    //       .ref()
    //       .update(updates)
    //       .then(snapshot => {
    //         console.log(
    //           "Successfully updated firebase database with new events"
    //         );
    //       })
    //       .catch(error => {
    //         console.log("Firebase error: ", error);
    //       });
    //   })
    //   // Send notifications
    //   .then(response => {
    //     console.log("teamsToNotify: ", teamsToNotify);
    //     axios.post("/api/send-notifications", {
    //       teamsToNotify: teamsToNotify
    //     });
    //   })
    //   .then(() => {
    //     console.log("OK, done!");
    //     res.send("GET request succeeded!");
    //   })
    //   .catch(error => {
    //     console.log("Livescore error: ", error);
    //     // res.send("GET request failed...");
    //     throw new Error(error);
    //   });
  } catch (error) {
    console.log("error2: ", error);
    res.send("GET request failed 2...");
  }
});
