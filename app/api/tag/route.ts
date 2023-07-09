import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { TagValidator } from "@/lib/validators/task";

export async function GET(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized user", { status: 401 });
        }

        const tags = await db.tag.findMany();

        if (tags.length === 0 || tags == undefined) {
            return [];
        }

        return new Response(JSON.stringify(tags));
    } catch (error) {}
}

export async function PUT(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized user", { status: 401 });
        }

        const body = await req.json();
        const { name } = TagValidator.parse(body);

        const tag = await db.tag.create({
            data: {
                name,
            },
        });

        return new Response(JSON.stringify(tag), { status: 201 });
    } catch (error) {}
}
