import mongoose, { Schema, model, models } from "mongoose";
import type { Model } from "mongoose";
import User from "@/models/user";
//require("@/models/user");

interface IPrompt {
  creator: mongoose.Schema.Types.ObjectId;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt: Model<IPrompt> =
  (models.Prompt as Model<IPrompt>) || model<IPrompt>("Prompt", PromptSchema);

export default Prompt;
