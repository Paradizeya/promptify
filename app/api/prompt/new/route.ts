import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextApiRequest } from "next";

export const POST = async (req: any) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    //Revalidate all posts and posts of this user if new prompt has been created
    revalidateTag("allPosts");
    revalidateTag(`${userId}_posts`);
    revalidatePath("/");

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to create a prompt"), {
      status: 500,
    });
  }
};
