import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

//export const revalidate = 60;
export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    console.log(params.id);
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify("Failed to fetch users prompts"), {
      status: 500,
    });
  }
};
