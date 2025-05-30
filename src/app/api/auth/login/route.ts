import { NextResponse } from "next/server";

// Mock user data - replace with database query later
const users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "admin123", // In production, use hashed passwords
    role: "admin",
  },
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });

    // Set session cookie
    response.cookies.set("session", JSON.stringify({ userId: user.id, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
