import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Terminal from "../terminal/Terminal";
import TerminalDemo from "../terminal/TerminalDemo";
import "./Sessions.css";
import { useEffect, useState } from "react";
import WebSocketService from "../service/WebSocketService";
import WsRequest from "../service/json/WsRequest";

function Sessions() {
  const [sessions, setSessions] = useState<Array<any>>([]);
  const webSocketService = new WebSocketService(
    "sessions-ws",
    "ws://localhost:8080/ui/sessions",
  );

  webSocketService.subscribeToOnOpen(() => {
    webSocketService.sendMessage(new WsRequest("sessions", null));
  });

  useEffect(() => {
    webSocketService.connect();
    console.log("sessions websocket connected");
    webSocketService.subscribeToMessages((sessions) => {
      setSessions((prev) => sessions);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <Tabs className="Sessions" variant="enclosed">
      <TabList>
        {sessions.map((session) => {
          console.log("tab for session", session);
          return <Tab key={session.id}>{session.name}</Tab>;
        })}
        <Tab>Demo</Tab>
      </TabList>

      <TabPanels>
        {sessions.map((session) => {
          console.log(session);
          return (
            <TabPanel>
              <Terminal key={session.id} sessionId={session.id} />
            </TabPanel>
          );
        })}
        <TabPanel>
          <p>Demo</p>
          <TerminalDemo />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Sessions;
