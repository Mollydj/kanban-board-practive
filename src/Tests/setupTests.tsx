declare const global: typeof globalThis;
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

global.ResizeObserver = vi.fn().mockImplementation(function () {
  this.disconnect = vi.fn();
  this.observe = vi.fn();
  this.unobserve = vi.fn();
});
