import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme/theme";

// Every component in this app pulls values off the MUI theme (spacing, palette),
// so tests render through the real app theme rather than the bare default.
const renderWithTheme = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { renderWithTheme as render };
