import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Link,
} from "@chakra-ui/react";
import Terminal from "../terminal/Terminal";
import Settings from "../terminal/Settings";
import "./Sessions.css";
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../service/WebSocketService";
import WsRequest from "../service/json/WsRequest";
import UiHandlers from "../model/UiHandlers";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import LoggerFactory from "../util/Logger";

function Sessions() {
  const logger = LoggerFactory("Sessions");
  const [sessions, setSessions] = useState<Array<any>>([]);
  const [sessionState, setSessionState] = useState<Map<string, any[]>>(
    new Map<string, any[]>()
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
        const session = response.session;
        logger.info("setting sessionState for", session.id, "to", newState);

        newState.uiHandlers = new UiHandlers(session, webSocketService);

        setSessionState((prev) =>
          new Map<string, any[]>(prev).set(response.session.id, newState)
        );
      }
    });

    return () => {
      logger.info("Sessions discarded.");
    };
  }, []);

  function closeSession(session: any) {
    const r = session.isOpen
      ? new WsRequest("close-session", { CloseSession: { id: session.id } })
      : new WsRequest("remove-session", { RemoveSession: { id: session.id } });
    webSocketService.send(r);
    setSessionState((prev) => {
      const m = new Map<string, any[]>(prev);
      m.delete(session.id);
      return m;
    });
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
              {session.name}
              &nbsp;&nbsp;
              <Link onClick={(e) => closeSession(session)}>
                <CloseIcon boxSize="0.5em" />
              </Link>
            </Tab>
          );
        })}
        <Tab>Settings</Tab>
        {/* <Tab>Playground</Tab> */}
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
                &nbsp;
                <WarningIcon />
                &nbsp; Session has terminated, please review and click the close
                button again to delete the session.
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
        {/* <TabPanel height="800px" bg="black">
          <Playground></Playground>
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
}

export default Sessions;
