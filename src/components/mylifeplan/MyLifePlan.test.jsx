import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "../../test-utils";
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

  it("renders the plan benefit descriptions", () => {
    render(<MyLifePlan user={{}} />);

    expect(
      screen.getByText(/lock sections of your reputation profile/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/manage & protect your personal information/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/receive alerts when your reputation profile is viewed/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/more than 300 million searches/i)).toBeInTheDocument();
  });

  it("shows sublabels only for the best value and trial plans", () => {
    render(<MyLifePlan user={{}} />);

    expect(screen.getByText("BEST VALUE SAVE 18%")).toBeInTheDocument();
    expect(screen.getByText("(Limited Time Offer)")).toBeInTheDocument();
  });

  it("lets the user pick a plan", async () => {
    const user = userEvent.setup();
    render(<MyLifePlan user={{}} />);

    const sixMonths = screen.getByLabelText(/6 months/i);
    expect(sixMonths).not.toBeChecked();

    await user.click(sixMonths);

    expect(sixMonths).toBeChecked();
    expect(screen.getByLabelText(/12 months/i)).not.toBeChecked();
  });

  it("links to the terms and privacy policy", () => {
    render(<MyLifePlan user={{}} />);

    expect(
      screen.getByRole("link", { name: /terms & conditions/i }),
    ).toHaveAttribute("href", "http://www.mylife.com/user-agreement/");
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
      "href",
      "http://www.mylife.com/privacy-policy/",
    );
    expect(screen.getByAltText("Trust Logos")).toBeInTheDocument();
  });

  it("enables Reset only once the form is dirty and clears it on click", async () => {
    const user = userEvent.setup();
    render(<MyLifePlan user={{}} />);

    const reset = screen.getByRole("button", { name: /reset/i });
    expect(reset).toBeDisabled();

    const [cardInput] = screen.getAllByRole("textbox");
    await user.type(cardInput, "4111");
    expect(cardInput).toHaveValue("4111");
    expect(reset).toBeEnabled();

    await user.click(reset);
    expect(cardInput).toHaveValue("");
  });

  it("submits without errors when the details are valid", async () => {
    const user = userEvent.setup();
    render(
      <MyLifePlan
        user={{ CCNumber: "4111111111111111", expDate: "2030-01-01", CVC: "123" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled(),
    );
    expect(screen.queryByText(/is required/i)).toBeNull();
  });
});
