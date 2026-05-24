import mongoose from "mongoose";

const RejectionSchema = new mongoose.Schema({
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String,
    default: "Unknown Entity"
  },
  attachmentUrl: { 
    type: String 
  },
  attachmentType: { 
    type: String,
    enum: ["image", "pdf"]
  },
  hypocrisyScore: { 
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  scannerHighlights: [{
    text: { type: String },
    x: { type: Number },
    y: { type: Number },
    w: { type: Number },
    h: { type: Number }
  }],
  upvotes: { 
    type: Number, 
    default: 0 
  },
  upvotedBy: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }]
}, { 
  timestamps: true 
});

const Rejection = mongoose.model("Rejection", RejectionSchema);
export default Rejection;
