import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { test, expect, vi } from "vitest";
import { mockData } from "../Services/mockData";

test("renders kanban board columns", async () => {
  vi.mock("../Hooks/getKanbanTasks", () => ({
    useKanbanTasks: () => ({
      data: mockData,
      isLoading: false,
      isError: false,
    }),
  }));

  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );

  expect(screen.getByText("To Do")).toBeInTheDocument();
  expect(screen.getByText("In Progress")).toBeInTheDocument();
  expect(screen.getByText("Done")).toBeInTheDocument();
});
