import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

function chackraComponentsTab(test: () => any): () => Promise<void> {
  return async () => {
    render(<App />);
    await waitFor(() => {
      const linkElement = screen.getByText(/Chakra Components/i);
      expect(linkElement).toBeInTheDocument();
      test()
    });
  }
}
test("Chakra Components tab is available", chackraComponentsTab(() => { }));

test("Box renders", chackraComponentsTab(() => {
  expect(screen.getByText("Menus")).toBeInTheDocument();
}));

test("Action Menu exists", chackraComponentsTab(() => {
  expect(screen.getByText("Actions menu0001")).toBeInTheDocument();
}));
