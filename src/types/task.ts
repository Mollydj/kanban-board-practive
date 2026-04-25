export enum TASK_STATUS {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type Task = {
  id: string;
  taskStatus: TASK_STATUS;
  taskName: string;
};