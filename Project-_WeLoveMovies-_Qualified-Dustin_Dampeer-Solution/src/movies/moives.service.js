const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function isShowing(is_showing) {
  return knex("movies as m ")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.is_showing")
    .groupBy("mt.movie_id")
    .where({ is_showing: is_showing });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}
function listOfTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .where({ movie_id: movieId })
    .select("*");
}

function listOfReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id ")
    .where({ movie_id: movieId })
    .select("*");
}

module.exports = {
  list,
  isShowing,
  read,
  listOfTheaters,
  listOfReviews,
};
