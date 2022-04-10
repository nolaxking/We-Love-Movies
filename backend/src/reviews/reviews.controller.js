const reviewService = require("./reviews.service");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const foundReview = await reviewService.read(reviewId);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  return next({ status: 404, message: "Review cannot be found." });
}

async function destroy(req, res) {
  await reviewService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res) {
  const updatedReview = { ...res.locals.review, ...req.body.data };
  await reviewService.update(updatedReview);
  const returnData = await reviewService.getCritic(res.locals.review.review_id);
  res.json({ data: returnData });
}

module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
