import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Terminal from "../terminal/Terminal";
import Settings from "../terminal/Settings";
import "./Sessions.css";
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../service/WebSocketService";
import WsRequest from "../service/json/WsRequest";
import UiHandlers from "../model/UiHandlers";

function Sessions() {
  const [sessions, setSessions] = useState<Array<any>>([]);
  const [sessionState, setSessionState] = useState<Map<string, any[]>>(
    new Map<string, any[]>(),
  );

  const webSocketService = useContext(WebSocketContext)!;

  useEffect(() => {
    webSocketService.subscribeToOnOpen(() => {
      webSocketService.send(new WsRequest("sessions", null));
    });

    webSocketService.subscribeToMessages((response) => {
      const sessions = response.sessions;
      if (sessions) setSessions(sessions);
      const newState = response.sessionState;
      if (newState) {
        const j = JSON.parse(newState);
        const session = response.session;
        console.log("setting sessionState for", session.id, "to", j.elements);

        j.uiHandlers = new UiHandlers(session, webSocketService);

        setSessionState((prev) =>
          new Map<string, any[]>(prev).set(response.session.id, j),
        );
      }
    });

    return () => {
      console.log("Sessions discarded.");
    };
  }, []);

  return (
    <Tabs className="Sessions" variant="enclosed">
      <TabList>
        {sessions.map((session) => {
          return <Tab key={session.id + "Tab"}>{session.name}</Tab>;
        })}
        <Tab>Settings</Tab>
      </TabList>

      <TabPanels>
        {sessions.map((session) => {
          const state = sessionState.get(session.id);

          return (
            <TabPanel key={session.id + "TabPanel"}>
              <Terminal
                key={session.id + "Terminal"}
                sessionId={session.id}
                params={state ? state : { elements: [] }}
              />
            </TabPanel>
          );
        })}
        <TabPanel>
          <Settings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Sessions;
