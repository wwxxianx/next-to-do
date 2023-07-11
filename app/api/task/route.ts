import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { TaskValidator } from "@/lib/validators/task";
import { z } from "zod";

export async function GET(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized user", { status: 401 });
        }

        const tasks = await db.task.findMany({
            orderBy: [
                {
                    title: "asc",
                },
                {
                    createdAt: "desc",
                },
            ],
            include: {
                tags: true,
            },
        });

        return new Response(JSON.stringify(tasks), { status: 200 });
    } catch (error) {
        return new Response("Something went wrong, please try again later.", { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized user", { status: 401 });
        }

        const body = await req.json();
        const { title, description, tagsId } = TaskValidator.parse(body);

        const task = await db.task.create({
            data: {
                title,
                description,
                tags: {
                    connect: tagsId.map((tagId) => {
                        return { id: tagId };
                    }),
                },
            },
            include: {
                tags: true,
            },
        });

        return new Response(`Task created: ${task.title}`, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 });
        }

        return new Response("Could not crerate task, please try again later.", { status: 500 })
    }
}
