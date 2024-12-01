const express = require("express");
const cors = require("cors");
require("dotenv").config();
const customerRouter = require("./routes/customers/routes");
const userRouter = require("./routes/users/routes");
const adminRouter = require("./routes/admin/routes");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const { userVerification } = require("./middlewares/AuthMiddleware");

const app = express();
const port = process.env.PORT || 5000;

// Database connection
db.connect();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes configurations
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.post("/", userVerification);

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
