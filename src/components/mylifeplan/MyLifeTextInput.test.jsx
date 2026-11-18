import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { render, screen } from "../../test-utils";
import MyLifeTextInput from "./MyLifeTextInput";

const setup = (props = {}) =>
  render(
    <MyLifeTextInput
      id="CVC"
      type="text"
      label="CVC"
      value=""
      onChange={() => {}}
      {...props}
    />,
  );

describe("<MyLifeTextInput />", () => {
  it("renders the label and an input with the given id and type", () => {
    setup({ id: "CCNumber", type: "text", label: "Credit Card No." });

    expect(screen.getByText("Credit Card No.")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "CCNumber");
    expect(input).toHaveAttribute("type", "text");
  });

  it("shows the current value and passes extra props such as placeholder", () => {
    setup({ value: "12/30", placeholder: "MM/YY" });

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("12/30");
    expect(input).toHaveAttribute("placeholder", "MM/YY");
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    setup({ onChange });

    await user.type(screen.getByRole("textbox"), "1");

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("shows error feedback and error classes when there is an error", () => {
    const { container } = setup({ error: "CVC number is required." });

    expect(screen.getByText("CVC number is required.")).toHaveClass(
      "input-feedback",
    );
    expect(container.firstChild).toHaveClass(
      "input-group",
      "animated",
      "shake",
      "error",
    );
  });

  it("shows no feedback and no error classes without an error", () => {
    const { container } = setup({ className: "custom" });

    expect(container.querySelector(".input-feedback")).toBeNull();
    expect(container.firstChild).toHaveClass("input-group", "custom");
    expect(container.firstChild).not.toHaveClass("error");
  });
});
