import { describe, it, expect, vi } from "vitest";
import { getByRole, render, screen } from "@testing-library/react";
import App from "./src/App";
import CartItem from "./src/CartItem";

describe("App component", () => {
  it("Renders the ProductItem with the passed data", () => {
    const productData = {
      id: 1,
      title: "Name of Clothe",
      amount: 3,
      price: 2.22,
      imageURL: "picture.com"
    };
    const mockChangeAmount = vi.fn();


    render(<CartItem productData={productData} changeAmount={mockChangeAmount} />);
    expect(screen.getByText(productData.title)).toBeInTheDocument();
    expect(screen.getByText("Amount", { exact: false }).textContent).toMatch(`Amount: ${productData.amount}`);
    expect(screen.getByText(/Price/i).textContent).toMatch(`Price: $${productData.price}`);
    expect(screen.getByText(/Total/i).textContent).toMatch(`Total: $${productData.price * productData.amount}`);
    expect(screen.getByAltText("Cart Item Picture").src).toContain(productData.imageURL);
  });

  it("renders radical rhinos after button click", async () => {

  });
});
