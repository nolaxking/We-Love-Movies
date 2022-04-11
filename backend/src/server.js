//const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("./db/connection");
const port = process.env.PORT || 5000
knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(port, () => {
      console.log(`Listening on Port !`);
    });
  })
  .catch(console.error);
