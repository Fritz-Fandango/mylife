import { render, screen } from "../../test-utils";
import MyLifeFooter from "./MyLifeFooter";

describe("<MyLifeFooter />", () => {
  it("renders as a contentinfo landmark", () => {
    render(<MyLifeFooter />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the company description and both office addresses", () => {
    render(<MyLifeFooter />);

    expect(
      screen.getByText(/premiere people finder service/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/los angeles, ca 90024/i)).toBeInTheDocument();
    expect(screen.getByText(/haslemere, surrey/i)).toBeInTheDocument();
  });

  it("links to the terms and privacy pages", () => {
    render(<MyLifeFooter />);

    expect(
      screen.getByRole("link", { name: /terms & conditions/i }),
    ).toHaveAttribute("href", "https://mylife.com/user-agreement");
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toHaveAttribute("href", "https://mylife.com/privacy-policy/");
  });
});
