import { NextResponse } from "next/server";

const contentItems = [
  {
    id: 1,
    title: "Welcome Message",
    type: "Text",
    status: "Published",
    lastUpdated: "2024-03-15",
  },
  {
    id: 2,
    title: "Feature Announcement",
    type: "Announcement",
    status: "Draft",
    lastUpdated: "2024-03-14",
  },
  {
    id: 3,
    title: "User Guide",
    type: "Document",
    status: "Published",
    lastUpdated: "2024-03-13",
  },
];

export async function GET() {
  return NextResponse.json(contentItems);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newContent = {
    id: contentItems.length + 1,
    ...body,
    status: "Draft",
    lastUpdated: new Date().toISOString().split("T")[0],
  };
  contentItems.push(newContent);
  return NextResponse.json(newContent);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const index = contentItems.findIndex((item) => item.id === body.id);
  if (index !== -1) {
    contentItems[index] = {
      ...contentItems[index],
      ...body,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    return NextResponse.json(contentItems[index]);
  }
  return NextResponse.json({ error: "Content not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const index = contentItems.findIndex((item) => item.id === Number(id));
  if (index !== -1) {
    contentItems.splice(index, 1);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Content not found" }, { status: 404 });
}
