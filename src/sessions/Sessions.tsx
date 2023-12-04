import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Terminal from "../terminal/Terminal";
import TerminalDemo from "../terminal/TerminalDemo";
import "./Sessions.css";

function Sessions() {
  return (
    <Tabs className="Sessions" variant="enclosed">
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
          <Terminal />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
          <TerminalDemo />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Sessions;
