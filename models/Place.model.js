const { Schema, model } = require("mongoose");

const PlaceSchema = new Schema({
  name: { type: String },
  type: { type: String, enum: ["coffee shop", "bookstore"] },
  location: { type: { type: String }, coordinates: [Number] }

}, {
  timestamps: true,
  versionKey: false

})

PlaceSchema.index({ location: '2dsphere' });

const PlaceModel = model("places", PlaceSchema);
module.exports = PlaceModel;
