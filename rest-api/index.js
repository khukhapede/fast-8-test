const express = require("express");

const router = require("./src/routes/routes");

const cors = require("cors");

const app = express();

const port = 6000;

app.use(express.json());
app.use(cors());

app.use("/api/", router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
