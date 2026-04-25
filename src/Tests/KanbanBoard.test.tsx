import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { vi, test, expect } from "vitest";

vi.mock("../Components/Loading/Loading", () => ({
  default: () => <p>loading</p>,
}));

vi.mock("../Components/Header/Header", () => ({
  default: () => <div>Header</div>,
}));

vi.mock("../Components/NewTask/NewTask", () => ({
  default: () => <div>NewTask</div>,
}));

vi.mock("../Components/KanbanBoard/SwimLane", () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

vi.mock("../Hooks/getKanbanTasks", () => ({
  taskStatus: {
    TO_DO: "TO_DO",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
  },
  useKanbanTasks: () => ({
    data: [],
    isLoading: false,
    isError: false,
  }),
}));

test("renders swimlanes", () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
});
