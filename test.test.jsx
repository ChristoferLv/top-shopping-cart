import { describe, it, expect, vi } from "vitest";
import { getByRole, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./src/App";
import CartItem from "./src/CartItem";
import ProductCard from "./src/ProductCard";
import HomePage from "./src/HomePage";
import CartPage from "./src/CartPage";
import ProductsPage from "./src/ProductsPage";
import * as router from 'react-router';
import { MemoryRouter } from "react-router";
import { keyboard } from "@testing-library/user-event/dist/cjs/keyboard/index.js";

describe("Test App", () => {
  it("Renders the App with the header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);

    expect(screen.getByText(/glad/i)).toBeInTheDocument();
  });
});

describe("Test HomePage", () => {
  it("Renders the HomePage correctly", () => {
    const { container } = render(<HomePage />);

    expect(screen.getByText(/The BEST products for your house/i)).toBeInTheDocument();
    expect(screen.getByText("BUY NOW")).toBeInTheDocument();
    expect(screen.getByText(/Super/i)).toBeInTheDocument();
    expect(screen.getByText(/Sale/i)).toBeInTheDocument();
    expect(screen.getByAltText("Clothes").src).toContain("clothes.avif");
    expect(screen.getByAltText("Computer").src).toContain("computer.jpeg");
    expect(screen.getByAltText("Jewellery").src).toContain("jewellery.avif");

    expect(container).toMatchSnapshot();
  });
});

describe("Test CartPage", () => {
  it("Renders the CartPage when there is no items in the cart", async () => {
    const setCart = vi.fn();
    const mockContext = [{}, setCart];
    vi.spyOn(router, 'useOutletContext').mockReturnValue(mockContext);

    render(<CartPage />);
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  it("Renders the CartPage when there are items in the cart", async () => {
    let cart = { 1: { id: 1, amount: 1 } };
    const setCart = vi.fn((newCart) => cart = newCart);
    const mockContext = [cart, setCart];
    vi.spyOn(router, 'useOutletContext').mockReturnValue(mockContext);

    const itemOnList = await fetch(`https://fakestoreapi.com/products/1`).then(res => res.json()).then((data) => data);
    render(<CartPage />);

    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
    expect(await screen.findByText(`Cart Total: $${itemOnList.price}`)).toBeInTheDocument();
  });

  it("Should clear the cart when the checkout button is pressed", async () => {
    window.alert = () => { };
    let cart = { 1: { id: 1, amount: 1 } };
    const setCart = vi.fn((newCart) => cart = newCart);
    const mockContext = [cart, setCart];
    vi.spyOn(router, 'useOutletContext').mockReturnValue(mockContext);

    render(<CartPage />);

    const checkout = screen.getByRole("button", { name: "Checkout" });

    await checkout.click();

    expect(setCart).toHaveBeenCalled();
    expect(Object.keys(cart).length).toBe(0);
  })
});


describe("Test the CartItem component", () => {
  it("Renders the CartItem with the passed data", () => {
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

  it("Should change the product amount when clickin the plus and minus buttons", async () => {
    const productData = {
      id: 1,
      title: "Name of Clothe",
      amount: 3,
      price: 2.22,
      imageURL: "picture.com"
    };
    const mockChangeAmount = vi.fn();

    render(<CartItem productData={productData} changeAmount={mockChangeAmount} />);

    const plusBtn = screen.getByRole("button", { name: "+" });
    const minusBtn = screen.getByRole("button", { name: "-" });
    
    await plusBtn.click();
    await minusBtn.click();

    expect(mockChangeAmount.mock.calls[0][0]).toBe(productData.id);
    expect(mockChangeAmount.mock.calls[0][1]).toBe(productData.amount + 1);
    expect(mockChangeAmount.mock.calls[1][0]).toBe(productData.id);
    expect(mockChangeAmount.mock.calls[1][1]).toBe(productData.amount - 1);
  })
});

describe("Test ProductsPage", () => {
  it("Renders the ProductsPage with the list of items", async () => {
    const setCart = vi.fn();

    const products = await fetch(`https://fakestoreapi.com/products`).then(res => res.json()).then((data) => data);

    render(<ProductsPage />);

    expect((await screen.findAllByTestId("product-card")).length).toBe(products.length)
  });
});

describe("Test the ProductCard component", () => {
  const mockAddProduct = vi.fn();

  it("Renders the ProductCard with the passed data", async () => {
    const productData = {
      id: 1,
      title: "Name of Clothe",
      amount: 3,
      price: 2.22,
      imageURL: "picture.com"
    };

    render(<ProductCard productData={productData} addProductHandler={mockAddProduct} />);

    expect(screen.getByText(productData.title)).toBeInTheDocument();
    expect(screen.getByText(/Price/i).textContent).toMatch(`Price: $${productData.price}`);
    expect(screen.getByAltText("Product Item Picture").src).toContain(productData.imageURL);
    expect(screen.getByTitle("amount").value).toBe(productData.amount + "");
  });

  it("Should send the correct amount when clicking on add button", async () => {
    const user = userEvent.setup();
    const productData = {
      id: 1,
      title: "Name of Clothe",
      amount: 0,
      price: 2.22,
      imageURL: "picture.com"
    };
    const productAmount = "2";

    render(<ProductCard productData={productData} addProductHandler={mockAddProduct} />);

    const input = screen.getByTitle("amount");
    const addBtn = screen.getByRole("button");
    input.focus();

    await user.keyboard(productAmount);
    expect(input.value).toBe(productAmount);
    await addBtn.click();

    expect(mockAddProduct).toHaveBeenCalled();
    expect(mockAddProduct.mock.calls[0][0]).toBe(productData.id);
    expect(mockAddProduct.mock.calls[0][1]).toBe(+productAmount);
  })

  it("Should show nothing on amount input when amount 0 is provided", async () => {
    const productData = {
      id: 1,
      title: "Name of Clothe",
      amount: 0,
      price: 2.22,
      imageURL: "picture.com"
    };

    render(<ProductCard productData={productData} addProductHandler={mockAddProduct} />);

    expect(screen.getByTitle("amount").value).toBe('');
  });
})
