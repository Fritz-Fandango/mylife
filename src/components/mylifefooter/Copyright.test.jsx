import { render, screen } from "../../test-utils";
import Copyright from "./Copyright";

const boilerPlates = {
  boilerPlateFore: "Copyright © 2024 ",
  boilerPlateAft: "® Inc.",
};

describe("<Copyright />", () => {
  it("renders the surrounding boilerplate text", () => {
    render(<Copyright boilerPlates={boilerPlates} />);

    expect(screen.getByText(/copyright © 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/® inc\./i)).toBeInTheDocument();
  });

  it("links to mylife.com", () => {
    render(<Copyright boilerPlates={boilerPlates} />);

    expect(
      screen.getByRole("link", { name: /mylife\.com/i }),
    ).toHaveAttribute("href", "https://www.mylife.com/");
  });
});
