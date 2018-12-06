const express = require("express"),
  moment = require("moment"),
  axios = require("axios"),
  admin = require("firebase-admin"),
  slugifyFunction = require("../../helpers/slugify"),
  getRoundData = require("../../helpers/api/rounds"),
  // getLeagueData = require("../../helpers/api/leagues"),
  // getTeamData = require("../../helpers/api/teams"),
  env = require("dotenv").config();

const app = express();
const api_key = process.env.LIVESCORE_API_KEY;
const api_secret = process.env.LIVESCORE_API_SECRET;

function getPremierLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=25";
  return axios.get(url);
}

function getLaLigaMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=74";
  return axios.get(url);
}

function getBundesligaMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=114";
  return axios.get(url);
}

function getSerieAMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=73";
  return axios.get(url);
}

function getLigue1Matches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=46";
  return axios.get(url);
}

function getSuperLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=12";
  return axios.get(url);
}

function getGreekSuperLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=139";
  return axios.get(url);
}

function getIsraelianLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=86";
  return axios.get(url);
}

function getSwedishLeagueMatches() {
  const url =
    "http://livescore-api.com/api-client/fixtures/matches.json?key=" +
    api_key +
    "&secret=" +
    api_secret +
    "&league=9";
  return axios.get(url);
}

// To be run once a day
module.exports = app.use(async function(req, res, next) {
  try {
    // 1) First, retrieve all teams
    const teamsArray = []
    const teams = await admin.database().ref('/teams').once('value')
    teams.forEach(team => {
      teamsArray.push({
        livescore_api_id: team.val().livescore_api_id, 
        name: team.val().name, 
        slug: team.val().slug
      })
    })

    // console.log('teamsArray: ', teamsArray)

    // return

    // 2) Second, retrieve all competitions
    const competitionsArray = []
    const competitions = await admin.database().ref('/competitions').once('value')
    competitions.forEach(competition => {
      competitionsArray.push({
        livescore_api_id: competition.val().livescore_api_id,
        name: competition.val().name,
        slug: competition.val().slug,
        countries: competition.val().countries
      })
    })

    // console.log('competitionsArray: ', competitionsArray)

    // return

    // 3) Then proceed to fetch matches from API
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
          let matches = premierLeague.data.data.fixtures
            .concat(laLiga.data.data.fixtures)
            .concat(bundesliga.data.data.fixtures)
            .concat(seriea.data.data.fixtures)
            .concat(ligue1.data.data.fixtures)
            .concat(superLeague.data.data.fixtures);
          // console.log("matches: ", matches);
          let events = {};
          let updates = {};
          for (let match of matches) {
            const date_time = match.date + " " + match.time;

            let leagueData = competitionsArray.find(competition => parseInt(competition.livescore_api_id) === parseInt(match.league_id))
            // console.log('leagueData: ', leagueData)
            if (!leagueData) {
              console.log('No leagueData')
              leagueData = {
                id: match.league_id
              }
            }

            let homeTeamData = teamsArray.find(team => parseInt(team.livescore_api_id) === parseInt(match.home_id))
            // console.log('homeTeamData: ', homeTeamData)
            if (!homeTeamData) {
              console.log('No homeTeamData!')
              homeTeamData = {
                id: match.home_id,
                name: match.home_name,
                slug: slugifyFunction.slugify(match.home_name)
              }
            }

            let visitorTeamData = teamsArray.find(team => parseInt(team.livescore_api_id) === parseInt(match.away_id))
            if (!visitorTeamData) {
              console.log('No visitorTeamData!')
              visitorTeamData = {
                id: match.away_id,
                name: match.away_name,
                slug: slugifyFunction.slugify(match.away_name)
              }
            } 

            const roundData = getRoundData.round(match.round)
              ? getRoundData.round(match.round)
              : match.round;

            const id = match.date + "_" + match.home_id + "_vs_" + match.away_id;

            if (match.time.length === 8) {
              updates["/events/" + id + "/timestamp"] = moment(
                date_time
              ).format("X");
            }
            // updates["/events/" + id + "/id"] = id;
            updates["/events/" + id + "/livescore_api_id"] = match.id;
            updates["/events/" + id + "/date"] = match.date;
            updates["/events/" + id + "/time"] = match.time.slice(0, 5); //20:00 instead of 20:00:00
            updates["/events/" + id + "/competition"] = leagueData;
            // updates["/events/" + id + "/competition_id"] = parseInt(
              // leagueData.id
            // );
            updates["/events/" + id + "/location"] = match.location;
            updates["/events/" + id + "/round"] = roundData;
            updates["/events/" + id + "/home_team"] = homeTeamData;
            updates["/events/" + id + "/visitor_team"] = visitorTeamData;
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
        res.status(500).send('Livescore error: ', error);
      });
    res.send(`GET request succeeded to fetch next Premier League matches`);
  } catch (error) {
    console.log(error);
    res.send("GET request failed...");
  }
});
