import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { TaskValidator, UpdateTaskValidator } from "@/lib/validators/task";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized user", { status: 401 });
        }

        const taskId = params.id;

        const task = await db.task.findFirst({
            where: {
                id: taskId,
            },
            include: {
                tags: true,
            },
        });

        return new Response(JSON.stringify(task), { status: 200 });
    } catch (error) {}
}

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized user", { status: 401 });
        }

        const taskId = params.id;

        const body = await req.json();
        const { title, description, tagsId } = UpdateTaskValidator.parse(body);

        await db.task.update({
            where: {
                id: taskId,
            },
            data: {
                title,
                description,
                tags: {
                    connect: tagsId.map((tagId) => {
                        return { id: tagId };
                    }),
                },
            },
        });

        return new Response("Task updated successfully", { status: 200 });
    } catch (error) {}
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const taskId = params.id;

        if (!taskId) return new Response("Failed to delete", { status: 400 });

        const deleteTask = await db.task.delete({
            where: {
                id: taskId,
            },
        });

        return new Response(JSON.stringify(deleteTask), { status: 200 });
    } catch (error) {}
}
