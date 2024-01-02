import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

const Timeout = {
  timeout: 2000
};

function chackraComponentsTabIsInTheDocument(): () => Promise<void> {
  return async () => {
    expect(await screen.findByText(/Chakra Components/i, {}, Timeout)).toBeInTheDocument();
  }
}
test("Chakra Components tab is available", async () => {
  chackraComponentsTabIsInTheDocument();
});

test("Box renders", async () => {
  render(<App />);
  await chackraComponentsTabIsInTheDocument();
    expect(await screen.findByText(/Menus box0001/)).toBeInTheDocument();
});

test("Action Menu exists", async () => {
  render(<App />);
  await chackraComponentsTabIsInTheDocument();
  expect(await screen.findByText("Actions menu0001")).toBeInTheDocument();

});

test("Action Menu clicked", async () => {
  render(<App />);
  await chackraComponentsTabIsInTheDocument();

  const menu = await screen.findByText("Actions menu0001", {}, Timeout);
  fireEvent.click(menu);
  const dlMenu = await screen.findByText("Download menu-download");
  fireEvent.click(dlMenu);
  expect(await screen.findByText("'Download' clicked")).toBeInTheDocument();
});
