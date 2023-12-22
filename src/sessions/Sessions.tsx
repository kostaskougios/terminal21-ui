import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import Terminal from "../terminal/Terminal";
import Settings from "../terminal/Settings";
import "./Sessions.css";
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../service/WebSocketService";
import WsRequest from "../service/json/WsRequest";
import UiHandlers from "../model/UiHandlers";
import { WarningIcon } from "@chakra-ui/icons";

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

  function closeSession(session: any) {
    const r = session.isOpen
      ? new WsRequest("close-session", { CloseSession: { id: session.id } })
      : new WsRequest("remove-session", { RemoveSession: { id: session.id } });
    webSocketService.send(r);
  }

  return (
    <Tabs className="Sessions" variant="enclosed">
      <TabList>
        {sessions.map((session) => {
          return (
            <Tab
              key={session.id + "Tab"}
              style={{
                textDecoration: session.isOpen ? "none" : "line-through",
              }}
            >
              <CloseButton onClick={(e) => closeSession(session)} />
              {session.name}
            </Tab>
          );
        })}
        <Tab>Settings</Tab>
      </TabList>

      <TabPanels>
        {sessions.map((session) => {
          const state = sessionState.get(session.id);

          return (
            <TabPanel key={session.id + "TabPanel"}>
              <Box
                borderRadius="md"
                bg="tomato"
                color="black"
                h={8}
                style={session.isOpen ? { display: "none" } : {}}
              >
                &nbsp;<WarningIcon/>&nbsp;
                Session has terminated, please review and click the close button
                again to delete the session.
              </Box>
              <div style={session.isOpen ? {} : { filter: "grayscale(100%)" }}>
                <Terminal
                  key={session.id + "Terminal"}
                  sessionId={session.id}
                  params={state ? state : { elements: [] }}
                />
              </div>
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
