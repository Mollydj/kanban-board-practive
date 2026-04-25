declare const global: typeof globalThis;
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { test, expect, vi, type Mock } from "vitest";
import { mockData } from "../Services/mockData";
import { renderHook } from "@testing-library/react";
import { useUpdateTaskStatus } from "../Hooks/updateKanbanTasks";
import { TASK_STATUS } from "../types/task";
import { useKanbanTasks } from "../Hooks/getKanbanTasks";

vi.mock("../Hooks/getKanbanTasks", () => ({
  useKanbanTasks: vi.fn(() => ({
    data: mockData,
    isLoading: false,
    isError: false,
  })),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

const renderKanbanBoard = () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
};

test("Render Kanban Board", () => {
  renderKanbanBoard();

  expect(screen.getByText("To Do")).toBeInTheDocument();
  expect(screen.getByText("In Progress")).toBeInTheDocument();
  expect(screen.getByText("Done")).toBeInTheDocument();

  mockData.forEach((task) => {
    expect(screen.getByText(task.taskName)).toBeInTheDocument();
  });
});

test("moves task to in progress", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      id: "1",
      taskStatus: TASK_STATUS.IN_PROGRESS,
      taskName: "Walk Pablo",
    }),
  });

  const { result } = renderHook(() => useUpdateTaskStatus(), { wrapper });
  result.current.mutate({ id: "1", taskStatus: TASK_STATUS.IN_PROGRESS });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(mockFetch).toHaveBeenCalledWith(
    expect.stringContaining("/1"),
    expect.objectContaining({
      method: "PUT",
      body: JSON.stringify({ taskStatus: TASK_STATUS.IN_PROGRESS }),
    }),
  );
});

test("moves task to done", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      id: "1",
      taskStatus: TASK_STATUS.DONE,
      taskName: "Walk Pablo",
    }),
  });

  const { result } = renderHook(() => useUpdateTaskStatus(), { wrapper });
  result.current.mutate({ id: "1", taskStatus: TASK_STATUS.DONE });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(mockFetch).toHaveBeenCalledWith(
    expect.stringContaining("/1"),
    expect.objectContaining({
      method: "PUT",
      body: JSON.stringify({ taskStatus: TASK_STATUS.DONE }),
    }),
  );
});

import userEvent from "@testing-library/user-event";

test("creates a new task", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      id: "99",
      taskName: "New task",
      taskStatus: TASK_STATUS.TO_DO,
    }),
  });

  renderKanbanBoard();

  await userEvent.type(screen.getByLabelText("Task Input Field"), "New task");
  await userEvent.click(screen.getByRole("button", { name: /Create Task/i }));

  await waitFor(() =>
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("KanbanTasks"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          taskName: "New task",
          taskStatus: TASK_STATUS.TO_DO,
        }),
      }),
    ),
  );
});

test("Shows message when swimlane is empty", () => {
  mockedUseKanbanTasks.mockReturnValueOnce({
    data: [],
    isLoading: false,
    isError: false,
  });

  renderKanbanBoard();
  expect(screen.getAllByLabelText("Empty Swim Lane")).toHaveLength(3);
});

const mockedUseKanbanTasks = useKanbanTasks as Mock;

test("Shows Error state", () => {
  mockedUseKanbanTasks.mockReturnValueOnce({
    data: undefined,
    isLoading: false,
    isError: true,
  });

  renderKanbanBoard();
  expect(screen.getByText(/could not be loaded/i)).toBeInTheDocument();
});
