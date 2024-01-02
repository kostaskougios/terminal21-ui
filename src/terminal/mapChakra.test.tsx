import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

test("Chakra Components tab is available", async () => {
  render(<App />);
  await waitFor(() => {
    const linkElement = screen.getByText(/Chakra Components/i);
    expect(linkElement).toBeInTheDocument();
  });
});
