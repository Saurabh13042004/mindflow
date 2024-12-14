const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flowchart: { type: mongoose.Schema.Types.ObjectId, ref: "Flowchart", required: true },
  role: { type: String, enum: ["owner", "editor", "viewer"], default: "owner" },
});

module.exports = mongoose.model("Association", associationSchema);
