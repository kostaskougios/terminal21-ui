import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Terminal from "../terminal/Terminal";
import TerminalDemo from "../terminal/TerminalDemo";
import "./Sessions.css";
import { useEffect, useState } from "react";
import WebSocketService from "../service/WebSocketService";
import WsRequest from "../service/json/WsRequest";

function Sessions() {
  const [sessions, setSessions] = useState<Array<any>>([]);
  const [sessionState, setSessionState] = useState<Map<string, any[]>>(
    new Map<string, any[]>(),
  );
  const webSocketService = new WebSocketService(
    "sessions-ws",
    "ws://localhost:8080/ui/sessions",
  );

  webSocketService.subscribeToOnOpen(() => {
    webSocketService.send(new WsRequest("sessions", null));
  });

  useEffect(() => {
    webSocketService.connect();
    //console.log("sessions websocket connected");
    webSocketService.subscribeToMessages((response) => {
      //console.log("Received ws-response :", response);
      const sessions = response.sessions;
      if (sessions)
        setSessions(sessions);
      const newState = response.sessionState;
      if (newState) {
        const j = JSON.parse(newState);
        console.log(
          "setting sessionState for",
          response.session.id,
          "to",
          j.elements,
        );
        setSessionState((prev) => new Map<string, any[]>(prev).set(response.session.id, j.elements));
      }
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <Tabs className="Sessions" variant="enclosed">
      <TabList>
        {sessions.map((session) => {
          return <Tab key={session.id + "Tab"}>{session.name}</Tab>;
        })}
        <Tab>Demo</Tab>
      </TabList>

      <TabPanels>
        {
          sessions.map((session) => {
            const state = sessionState.get(session.id);
            return (
              <TabPanel key={session.id + "TabPanel"}>
                <Terminal
                  key={session.id + "Terminal"}
                  sessionId={session.id}
                  messages={state ? state : []}
                />
              </TabPanel>
            );
          })
        }
        <TabPanel>
          <p>Demo</p>
          <TerminalDemo />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Sessions;
