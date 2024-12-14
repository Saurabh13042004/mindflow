const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// // Routes
app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/flowcharts", require("./routes/flowchartRoutes"));
// app.use("/api/associations", require("./routes/associationRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
