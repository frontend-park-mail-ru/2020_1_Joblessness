"use strict";

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Static server works on port " + port);
