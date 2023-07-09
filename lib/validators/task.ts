import { z } from "zod";

export const TagValidator = z.object({
    name: z.string(),
});

export const TaskValidator = z.object({
    title: z.string().min(1),
    tagsId: z.array(z.string()),
    description: z.string().min(1),
})

export const UpdateTaskValidator = TaskValidator.extend({
    id: z.string()
})

export type TagPayload = z.infer<typeof TagValidator>;
export type TaskPayload = z.infer<typeof TaskValidator>;
export type UpdateTaskPayload = z.infer<typeof UpdateTaskValidator>;
