const moviesService = require("./moives.service");

async function list(req, res, next) {
  let data;
  if (req.query.is_showing === "true") {
    data = await moviesService.isShowing(true);
  } else {
    data = await moviesService.list();
  }
  res.json({ data });
}
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}
function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}
async function listOfReviews(req, res, next) {
  const data = await moviesService
    .listOfReviews(req.params.movieId)
    .then((reviews) => {
      reviews.map((item) => {
        item.critic = {
          critic_id: item.critic_id,
          preferred_name: item.preferred_name,
          surname: item.surname,
          organization_name: item.organization_name,
          created_at: item.created_at,
          updated_at: item.updated_at,
        };
      });
      return reviews;
    });
  res.json({ data });
}

async function listOfTheaters(req, res, next) {
  const data = await moviesService.listOfTheaters(req.params.movieId);
  res.json({ data });
}
module.exports = {
  read: [movieExists, read],
  list,
  listOfTheaters: [movieExists, listOfTheaters],
  listOfReviews: [movieExists, listOfReviews],
};
