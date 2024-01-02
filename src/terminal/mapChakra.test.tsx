import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

const Timeout = {
  timeout: 2000
};

async function chackraComponentsTabIsInTheDocument() {
  const tab = await screen.findByText(/Chakra Components/i, {}, Timeout);
  expect(tab).toBeInTheDocument();
  fireEvent.click(tab);
}

async function renderApp(){
  render(<App />);
  await chackraComponentsTabIsInTheDocument();
}

test("Chakra Components tab is available", async () => {
  await renderApp();
});

test("Box renders", async () => {
  await renderApp();
  expect(await screen.findByText(/Menus box0001/)).toBeInTheDocument();
});

test("Action Menu exists", async () => {
  await renderApp();
  expect(await screen.findByText("Actions menu0001")).toBeInTheDocument();

});

test("Action Menu clicked", async () => {
  await renderApp();

  const menu = await screen.findByText("Actions menu0001", {}, Timeout);
  fireEvent.click(menu);
  const dlMenu = await screen.findByText("Download menu-download");
  fireEvent.click(dlMenu);
  expect(await screen.findByText("'Download' clicked")).toBeInTheDocument();
});

test("input text", async () => {
  await renderApp();
  const input = await screen.findByLabelText(/Email address/)
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: '' } });
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(await screen.findByText(/email input new value = test@example.com, verify email.value = test@example.com/)).toBeInTheDocument();
});

test("input date of birth", async () => {
  await renderApp();
  const input = await screen.findByLabelText(/Date of birth/)
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: '' } });
  fireEvent.change(input, { target: { value: '2001-12-21T01:02' } });
  expect(await screen.findByText(/dob = 2001-12-21T01:02 , verify dob.value = 2001-12-21T01:02/)).toBeInTheDocument();
});
