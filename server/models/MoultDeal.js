import mongoose from "mongoose";

const MoultDealSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  senderOfferedSkill: { 
    type: String, 
    required: true 
  },
  recipientOfferedSkill: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String,
    maxlength: 300 
  },
  status: {
    type: String,
    enum: ["proposed", "accepted", "declined", "completed", "cancelled"],
    default: "proposed"
  },
  senderConfirmed: { 
    type: Boolean, 
    default: false 
  },
  recipientConfirmed: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

// Compound indexing for optimized deal search queries
MoultDealSchema.index({ sender: 1, recipient: 1 });

const MoultDeal = mongoose.model("MoultDeal", MoultDealSchema);
export default MoultDeal;
