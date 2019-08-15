const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log(`[MongoDB]: Connection to mongodb established`))
  .catch(err =>
    console.log(`[MongoError]: Failed to connect to database: ${err}`)
  );
