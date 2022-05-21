const express = require("express");

const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bucketListItemRoutes = require("./routes/api/bucketListItems");
const path = require("path");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

// connect mongoose
mongoose
  .connect(mongoUri, {
    // useNewUriParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDb database Connected..."))
  .catch((err) => console.log(err));

app.use("/api/bucketListItems", bucketListItemRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
