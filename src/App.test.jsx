import { render, screen } from "./test-utils";
import App from "./App";

describe("<App />", () => {
  it("renders the header, body and footer regions", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /go back to free profile/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /see your reputation profile/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the plan selection form", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /select your plan/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit/i }),
    ).toBeInTheDocument();
  });
});
