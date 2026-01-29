import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id },
  });

  if (!paste) {
    return new Response(
      JSON.stringify({ error: "Paste not found" }),
      { status: 404 }
    );
  }

  // ⏰ Expiry by time
  if (paste.expiresAt && paste.expiresAt < new Date()) {
    return new Response(
      JSON.stringify({ error: "Paste expired" }),
      { status: 410 }
    );
  }

  // 👀 Expiry by views
  if (paste.maxViews && paste.views >= paste.maxViews) {
    return new Response(
      JSON.stringify({ error: "Paste expired" }),
      { status: 410 }
    );
  }

  // Increment view count
  await prisma.paste.update({
    where: { id: paste.id },
    data: { views: { increment: 1 } },
  });

  return Response.json(paste);
}
