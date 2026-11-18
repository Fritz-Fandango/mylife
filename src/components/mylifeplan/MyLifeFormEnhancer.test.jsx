import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "../../test-utils";
import MyLifeFormEnhancer from "./MyLifeFormEnhancer";

// Minimal form that exposes the Formik props the enhancer provides.
const Probe = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <input aria-label="CCNumber" name="CCNumber" value={values.CCNumber} onChange={handleChange} onBlur={handleBlur} />
    <input aria-label="expDate" name="expDate" value={values.expDate} onChange={handleChange} onBlur={handleBlur} />
    <input aria-label="CVC" name="CVC" value={values.CVC} onChange={handleChange} onBlur={handleBlur} />
    {touched.CCNumber && errors.CCNumber && <p>{errors.CCNumber}</p>}
    {errors.expDate && <p>{errors.expDate}</p>}
    {errors.CVC && <p>{errors.CVC}</p>}
    <p data-testid="submitting">{String(isSubmitting)}</p>
    <button type="submit">Submit</button>
  </form>
);

const Enhanced = MyLifeFormEnhancer(Probe);

describe("MyLifeFormEnhancer", () => {
  it("defaults all values to empty strings", () => {
    render(<Enhanced />);

    expect(screen.getByLabelText("CCNumber")).toHaveValue("");
    expect(screen.getByLabelText("expDate")).toHaveValue("");
    expect(screen.getByLabelText("CVC")).toHaveValue("");
  });

  it("seeds values from the user prop", () => {
    render(<Enhanced user={{ CCNumber: "4111111111111111", CVC: "123" }} />);

    expect(screen.getByLabelText("CCNumber")).toHaveValue("4111111111111111");
    expect(screen.getByLabelText("expDate")).toHaveValue("");
    expect(screen.getByLabelText("CVC")).toHaveValue("123");
  });

  it("reports required errors for empty fields on submit", async () => {
    const user = userEvent.setup();
    render(<Enhanced />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("CC number is required.")).toBeInTheDocument();
    expect(await screen.findByText("Expiration date is required.")).toBeInTheDocument();
    expect(await screen.findByText("CVC number is required.")).toBeInTheDocument();
  });

  it("rejects a CC number or CVC below the minimum", async () => {
    const user = userEvent.setup();
    render(<Enhanced user={{ CCNumber: "5", expDate: "12/99", CVC: "1" }} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Invalid CC number entered. Please recheck.")).toBeInTheDocument();
    expect(await screen.findByText("Invalid CVC number entered. Please recheck.")).toBeInTheDocument();
  });

  it("submits valid values and clears the submitting flag", async () => {
    const user = userEvent.setup();
    render(
      <Enhanced user={{ CCNumber: "4111111111111111", expDate: "12/99", CVC: "123" }} />,
    );

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByTestId("submitting")).toHaveTextContent("false"),
    );
    expect(screen.queryByText(/is required/i)).toBeNull();
    expect(screen.queryByText(/invalid/i)).toBeNull();
  });

  const submitWith = async (values) => {
    const user = userEvent.setup();
    render(<Enhanced user={values} />);
    await user.click(screen.getByRole("button", { name: /submit/i }));
  };
  const valid = { CCNumber: "4111111111111111", expDate: "12/99", CVC: "123" };

  it("rejects a card number with letters or the wrong length", async () => {
    await submitWith({ ...valid, CCNumber: "4111abcd11111111" });
    expect(await screen.findByText("Invalid CC number entered. Please recheck.")).toBeInTheDocument();
  });

  it("accepts a card number with spaces or dashes", async () => {
    await submitWith({ ...valid, CCNumber: "4111 1111-1111 1111" });
    await waitFor(() =>
      expect(screen.getByTestId("submitting")).toHaveTextContent("false"),
    );
    expect(screen.queryByText(/invalid/i)).toBeNull();
  });

  it("accepts a 4-digit CVC but rejects letters", async () => {
    await submitWith({ ...valid, CVC: "12a4" });
    expect(await screen.findByText("Invalid CVC number entered. Please recheck.")).toBeInTheDocument();
  });

  it("rejects an expiration date that is not MM/YY", async () => {
    await submitWith({ ...valid, expDate: "2030-01-01" });
    expect(await screen.findByText("Valid expiration date is needed")).toBeInTheDocument();
  });

  it("rejects an invalid month", async () => {
    await submitWith({ ...valid, expDate: "13/30" });
    expect(await screen.findByText("Valid expiration date is needed")).toBeInTheDocument();
  });

  it("rejects an expired card", async () => {
    await submitWith({ ...valid, expDate: "01/20" });
    expect(await screen.findByText("Card has expired.")).toBeInTheDocument();
  });

  it("accepts a card expiring this month", async () => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yy = String(now.getFullYear()).slice(-2);
    await submitWith({ ...valid, expDate: `${mm}/${yy}` });
    await waitFor(() =>
      expect(screen.getByTestId("submitting")).toHaveTextContent("false"),
    );
    expect(screen.queryByText(/expired|valid expiration/i)).toBeNull();
  });

  it("rejects a well-formed card number that fails the Luhn check", async () => {
    await submitWith({ ...valid, CCNumber: "4111111111111112" });
    expect(await screen.findByText("Invalid CC number entered. Please recheck.")).toBeInTheDocument();
  });

  it("rejects a swapped pair of adjacent digits", async () => {
    await submitWith({ ...valid, CCNumber: "4111111111111181" });
    expect(await screen.findByText("Invalid CC number entered. Please recheck.")).toBeInTheDocument();
  });

  it.each(["4111111111111111", "5500005555555559", "378282246310005"])(
    "accepts the valid test card number %s",
    async (CCNumber) => {
      await submitWith({ ...valid, CCNumber });
      await waitFor(() =>
        expect(screen.getByTestId("submitting")).toHaveTextContent("false"),
      );
      expect(screen.queryByText(/invalid/i)).toBeNull();
    },
  );
});
