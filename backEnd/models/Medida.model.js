const {Schema, model} = require ('mongoose')

const MedidaSchema = new Schema(
    {
      user: {
        ref:'User',
        type: Schema.Types.ObjectId,
        required : true,
      },
      fecha: {
        type: Date,
        default: Date.now,
      },
      medida: {
        type: Number,
        min: 1,
        max: 300,
        required:true,
      },
      parte: {
        type: String,
        enum: ["brazo", "muslo", "gemelo", "pecho", "cintura", "cadera"],
        required:true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = model("Medida", MedidaSchema);