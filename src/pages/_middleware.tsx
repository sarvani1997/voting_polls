import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
	console.log("request", req.cookies);
	if (req.cookies["userCookie"]) return;

	const random = Math.random().toString();

	const res = NextResponse.next();

	res.cookie("userCookie", random, { sameSite: "strict" });

	return res;
}
