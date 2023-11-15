import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

//export const revalidate = 60;
export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const user = await User.find({ _id: params.id });
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify("Failed to fetch user"), {
      status: 500,
    });
  }
};
