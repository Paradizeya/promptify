import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextApiRequest } from "next";

type DataType = {
  userId: string;
  prompt: string;
  tag: string;
};

type CustomRequest = {
  json: () => Promise<DataType>;
} & NextApiRequest;

export const POST = async (req: CustomRequest) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to create a prompt"), {
      status: 500,
    });
  }
};
