import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const pastes = await prisma.paste.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(pastes);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body;

  if (!content) {
    return new Response(
      JSON.stringify({ error: "Content is required" }),
      { status: 400 }
    );
  }

  const paste = await prisma.paste.create({
    data: { title, content },
  });

  return Response.json(paste, { status: 201 });
}
