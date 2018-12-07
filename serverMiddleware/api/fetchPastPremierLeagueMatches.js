const express = require("express"),
  moment = require("moment"),
  axios = require("axios"),
  admin = require("firebase-admin");
(slugifyFunction = require("../../helpers/slugify")),
  (getRoundData = require("../../helpers/api/rounds")),
  (getLeagueData = require("../../helpers/api/leagues")),
  (getTeamData = require("../../helpers/api/teams")),
  (env = require("dotenv").config());

const app = express();
const api_key = process.env.LIVESCORE_API_KEY;
const api_secret = process.env.LIVESCORE_API_SECRET;
const start_date = "2018-11-17";
const end_date = "2018-11-25";

function getPremierLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=25";
  return axios.get(url);
}

function getLaLigaMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=74";
  return axios.get(url);
}

function getBundesligaMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=114";
  return axios.get(url);
}

function getSerieAMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=73";
  return axios.get(url);
}

function getLigue1Matches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=46";
  return axios.get(url);
}

function getSuperLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=12";
  return axios.get(url);
}

function getGreekSuperLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=139";
  return axios.get(url);
}

function getIsraelianLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=86";
  return axios.get(url);
}

function getSwedishLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/scores/history.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&from=" +
    start_date +
    "&to=" +
    end_date +
    "&league=9";
  return axios.get(url);
}

// To be run once a day
module.exports = app.use(function(req, res, next) {
  try {
    axios
      .all([
        getPremierLeagueMatches(),
        getLaLigaMatches(),
        getBundesligaMatches(),
        getSerieAMatches(),
        getLigue1Matches(),
        getSuperLeagueMatches()
      ])
      .then(
        axios.spread(function(
          premierLeague,
          laLiga,
          bundesliga,
          seriea,
          ligue1,
          superLeague
        ) {
          let matches = premierLeague.data.data.match
            .concat(laLiga.data.data.match)
            .concat(bundesliga.data.data.match)
            .concat(seriea.data.data.match)
            .concat(ligue1.data.data.match)
            .concat(superLeague.data.data.match);
          console.log("matches: ", matches);
          let events = {};
          let updates = {};
          for (let match of matches) {
            const date_time = match.date + " " + match.time;
            const leagueData = getLeagueData.league(parseInt(match.league_id))
              ? getLeagueData.league(parseInt(match.league_id))
              : { id: match.league_id };
            const homeTeamData = getTeamData.team(parseInt(match.home_id))
              ? getTeamData.team(parseInt(match.home_id))
              : {
                  id: match.home_id,
                  name: match.home_name,
                  slug: slugifyFunction.slugify(match.home_name)
                };
            const visitorTeamData = getTeamData.team(parseInt(match.away_id))
              ? getTeamData.team(parseInt(match.away_id))
              : {
                  id: match.away_id,
                  name: match.away_name,
                  slug: slugifyFunction.slugify(match.away_name)
                };
            // const roundData = getRoundData.round(match.round)
            //   ? getRoundData.round(match.round)
            //   : match.round;

            const id =
              match.date + "_" + match.home_id + "_vs_" + match.away_id;

            if (match.time.length === 8) {
              updates["/events/" + id + "/timestamp"] = moment(
                date_time
              ).format("X");
            }
            updates["/events/" + id + "/id"] = id;
            updates["/events/" + id + "/livescore_api_id"] = match.id;
            updates["/events/" + id + "/date"] = match.date;
            updates["/events/" + id + "/time"] = match.time;
            updates["/events/" + id + "/competition"] = leagueData;
            updates["/events/" + id + "/competition_id"] = parseInt(
              leagueData.id
            );
            // updates["/events_new2/" + id + "/location"] = match.location;
            // updates["/events_new2/" + id + "/round"] = roundData;
            updates["/events/" + id + "/home_team"] = homeTeamData;
            updates["/events/" + id + "/visitor_team"] = visitorTeamData;
            updates["/events/" + id + "/status"] = match.status;
            updates["/events/" + id + "/score"] = match.score;
            updates["/events/" + id + "/ht_score"] = match.ht_score;
            updates["/events/" + id + "/ft_score"] = match.ft_score;
            updates["/events/" + id + "/et_score"] = match.et_score;
          }

          admin
            .database()
            .ref()
            .update(updates)
            .then(snapshot => {
              console.log(
                "Successfully updated firebase database with new events"
              );
            })
            .catch(error => {
              console.log("Firebase error: ", error);
            });
        })
      )
      .catch(error => {
        console.log("Livescore error: ", error);
      });
    res.send("GET request succeeded!");
  } catch (error) {
    console.log(error);
    res.send("GET request failed...");
  }
});
