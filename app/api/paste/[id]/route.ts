import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/paste/[id]
 * Fetch a paste by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const paste = await prisma.paste.findUnique({
      where: { id },
    });

    if (!paste) {
      return NextResponse.json(
        { error: "Paste not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(paste, { status: 200 });
  } catch (error) {
    console.error("GET paste error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/paste/[id]
 * Delete a paste by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.paste.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Paste deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE paste error:", error);
    return NextResponse.json(
      { error: "Failed to delete paste" },
      { status: 500 }
    );
  }
}
