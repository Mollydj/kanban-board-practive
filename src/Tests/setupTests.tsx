declare const global: typeof globalThis;
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};
