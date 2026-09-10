import { render, screen } from "../../test-utils";
import MyLifeBody from "./MyLifeBody";

describe("<MyLifeBody />", () => {
  it("renders the reputation warning banner", () => {
    render(<MyLifeBody />);

    expect(
      screen.getByRole("heading", {
        name: /items on your reputation profile are affecting your reputation/i,
      }),
    ).toBeInTheDocument();
  });

  it("lists every profile stat benefit", () => {
    render(<MyLifeBody />);

    expect(
      screen.getByText(/improve your public reputation score/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/be alerted when people search for you/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/remove your info from negative sites/i),
    ).toBeInTheDocument();
  });

  it("embeds the plan form", () => {
    render(<MyLifeBody />);

    expect(
      screen.getByRole("heading", { name: /select your plan/i }),
    ).toBeInTheDocument();
  });
});
