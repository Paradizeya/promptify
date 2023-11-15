import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

//export const revalidate = 60;
//export const dynamic = 'force-dynamic';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found"), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify("Failed to fetch a prompt"), {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response(JSON.stringify("Prompt not found"), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    //Revalidate all posts and posts of this user if new prompt has been updated
    revalidateTag("allPosts");
    revalidateTag(`${existingPrompt.creator}_posts`);

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to update a prompt"), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const tempPrompt = await Prompt.findById(params.id);
    await Prompt.findByIdAndDelete(params.id);
    //Revalidate all posts and posts of this user if new prompt has been updated
    revalidateTag("allPosts");
    tempPrompt && revalidateTag(`${tempPrompt.creator}_posts`);
    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to deleted prompt", {
      status: 500,
    });
  }
};
