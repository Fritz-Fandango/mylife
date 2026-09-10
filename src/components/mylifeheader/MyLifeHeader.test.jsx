import { render, screen } from "../../test-utils";
import MyLifeHeader from "./MyLifeHeader";

describe("<MyLifeHeader />", () => {
  it("renders both brand logos", () => {
    render(<MyLifeHeader />);

    expect(screen.getByAltText(/my life logo/i)).toBeInTheDocument();
    expect(
      screen.getByAltText(/100% satisfaction guarantee/i),
    ).toBeInTheDocument();
  });

  it("links back to the free profile page", () => {
    render(<MyLifeHeader />);

    const link = screen.getByRole("link", { name: /go back to free profile/i });
    expect(link).toHaveAttribute(
      "href",
      "https://www.mylife.com/site/user-profile.view/",
    );
  });
});
