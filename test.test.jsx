import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./src/App";

describe("App component", () => {
  it("renders correct heading", () => {
    render(<App />);
    // using regex with the i flag allows simpler case-insensitive comparison
    expect(screen.getByRole("heading").textContent).toMatch(/Glad to Shop/i);
  });

  it("renders radical rhinos after button click", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "Products" });

    expect(button).toBeInTheDocument();
  });
});
