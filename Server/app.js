const express = require("express");
// const fs = require('fs');
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const taskRoutes = require("./routes/task-routes");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  // content-type and authorizations headers are set manually
  next();
});



app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(
    `mongodb+srv://mayank123:Mayank123@cluster0.hc1su.mongodb.net/mern-todo?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connection established");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
