import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "../App";

const Timeout = {
  timeout: 2000,
};

async function stdComponentsTabIsInTheDocument() {
  const tab = await screen.findByText(/Std Components/i, {}, Timeout);
  expect(tab).toBeInTheDocument();
  fireEvent.click(tab);
}

async function renderApp() {
  render(<App />);
  await stdComponentsTabIsInTheDocument();
}

test("Std Components tab is available", async () => {
  await renderApp();
});

test("Paragraph renders", async () => {
  await renderApp();
  expect(await screen.findByText(/Hello World!/)).toBeInTheDocument();
});

test("Span renders", async () => {
  await renderApp();
  expect(await screen.findByText(/Some more text/)).toBeInTheDocument();
});

test("em renders", async () => {
  await renderApp();
  expect(await screen.findByText(/emphasized!/)).toBeInTheDocument();
});

test("h1 renders", async () => {
  await renderApp();
  expect(
    await screen.findByRole("heading", {
      name: /header1 test/,
    })
  ).toBeInTheDocument();
});
