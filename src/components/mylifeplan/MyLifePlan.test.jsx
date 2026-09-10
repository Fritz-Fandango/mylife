import userEvent from "@testing-library/user-event";

import { render, screen } from "../../test-utils";
import MyLifePlan from "./MyLifePlan";

describe("<MyLifePlan />", () => {
  it("renders all four billing options with their rates", () => {
    render(<MyLifePlan user={{}} />);

    expect(screen.getByLabelText(/12 months/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/6 months/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/3 months/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/3 day trial/i)).toBeInTheDocument();

    expect(screen.getByText("$13.95/mo.")).toBeInTheDocument();
    expect(screen.getByText("$1.00")).toBeInTheDocument();
  });

  it("renders the payment information fields", () => {
    render(<MyLifePlan user={{}} />);

    expect(
      screen.getByRole("heading", { name: /payment information/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Credit Card No.")).toBeInTheDocument();
    expect(screen.getByText("Exp Date")).toBeInTheDocument();
    expect(screen.getByText("CVC")).toBeInTheDocument();
  });

  it("shows required-field errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<MyLifePlan user={{}} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/cc number is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/expiration date is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/cvc number is required/i),
    ).toBeInTheDocument();
  });
});
