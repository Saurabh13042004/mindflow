const mongoose = require("mongoose");

const flowchartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  nodes: { type: Array, required: true }, // Store node data
  edges: { type: Array, required: true }, // Store edge data
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // List of associated comments
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Flowchart", flowchartSchema);
