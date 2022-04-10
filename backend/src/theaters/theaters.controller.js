const theaterService = require("./theater.service");
const mapProperties = require("../utils/map-properties");

async function list(req, res) {
  const data = await theaterService.list();
  res.send({ data });
}



module.exports = {
  list,
};
