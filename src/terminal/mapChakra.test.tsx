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
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(await screen.findByText(/email input new value = test@example.com, verify email.value = test@example.com/)).toBeInTheDocument();
});

test("textarea", async () => {
  await renderApp();
  const input = await screen.findByLabelText(/Description/)
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'hello world' } });
  expect(await screen.findByText(/description input new value = hello world, verify description.value = hello world/)).toBeInTheDocument();
});

test("input date of birth", async () => {
  await renderApp();
  const input = await screen.findByLabelText(/Date of birth/)
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: '2001-12-21T01:02' } });
  expect(await screen.findByText(/dob = 2001-12-21T01:02 , verify dob.value = 2001-12-21T01:02/)).toBeInTheDocument();
});

test("checkbox", async () => {
  await renderApp();
  const checkbox = await screen.findByLabelText(/Check 1/);
  fireEvent.click(checkbox);
  expect(await screen.findByText(/checkbox1 checked is true , verify checkbox1.checked = true/))
});

test("switch", async () => {
  await renderApp();
  const switch1 = await screen.findByLabelText(/Switch 1/);
  fireEvent.click(switch1);
  expect(await screen.findByText(/switch1 checked is true , verify switch1.checked = true/))
});

test("radio", async () => {
  await renderApp();
  const radio3 = await screen.findByLabelText(/third/);
  fireEvent.click(radio3);
  expect(await screen.findByText(/radioGroup newValue=3 , verify radioGroup.value=3/))
});

test("editable", async () => {
  await renderApp();
  const editable = await screen.findByDisplayValue(/Please type here/)
  fireEvent.change(editable, { target: { value: 'edited it' } });
  expect(await screen.findByText(/editable1 newValue = edited it, verify editable1.value = edited it/)).toBeInTheDocument();
});

test("Done, reset session", async () => {
  await renderApp();
  const button = await screen.findByText(/Keep Running/);
  fireEvent.click(button);
  expect(await screen.findByText(/Terminated/)).toBeInTheDocument();
});
