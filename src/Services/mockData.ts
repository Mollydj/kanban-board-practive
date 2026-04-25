import { taskStatus, type TaskType } from "../Hooks/getKanbanTasks";


export const mockData: TaskType[] = [
    {
        taskName: "Walk Pablo",
        taskStatus: taskStatus.TO_DO,
        id: "1"
    },
    {
        taskName: "Feed Pablo",
        taskStatus: taskStatus.DONE,
        id: "2"
    },
    {
        taskName: "Give Pablo a bath",
        taskStatus: taskStatus.TO_DO,
        id: "3"
    },
    {
        taskName: "Order new Treats",
        taskStatus: taskStatus.DONE,
        id: "4"
    },
]