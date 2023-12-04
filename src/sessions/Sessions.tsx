import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Terminal from "../terminal/Terminal";
import TerminalDemo from "../terminal/TerminalDemo";
import "./Sessions.css";
import { useEffect, useState } from "react";
import WebSocketService from "../service/WebSocketService";
import WsRequest from "../service/WsRequest";

function Sessions() {
  const [messages, setMessages] = useState<any[]>([]);
  const webSocketService = new WebSocketService(
    "sessions-ws",
    "ws://localhost:8080/ui/sessions"
  );

  webSocketService.subscribeToOnOpen( () => {
    webSocketService.sendMessage(new WsRequest("sessions", null));
  });

  useEffect(() => {
    webSocketService.connect();
    console.log("sessions websocket connected");
    webSocketService.subscribeToMessages((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

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
