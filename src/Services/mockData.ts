import { TASK_STATUS, type Task } from "../types/task";


export const mockData: Task[] = [
    {
        taskName: "Walk Pablo",
        taskStatus: TASK_STATUS.TO_DO,
        id: "1"
    },
    {
        taskName: "Feed Pablo",
        taskStatus: TASK_STATUS.DONE,
        id: "2"
    },
    {
        taskName: "Give Pablo a bath",
        taskStatus: TASK_STATUS.TO_DO,
        id: "3"
    },
    {
        taskName: "Order new Treats",
        taskStatus: TASK_STATUS.DONE,
        id: "4"
    },
]