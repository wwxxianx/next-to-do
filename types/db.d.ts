import { Tag, Task } from "@prisma/client";

export type ExtendedTask = Task & {
    tags?: Tag[]
}