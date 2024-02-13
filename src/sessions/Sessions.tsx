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
  const [sessionState, setSessionState] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const webSocketService = useContext(WebSocketContext)!;

  useEffect(() => {
    webSocketService.subscribeToOnOpen(() => {
      webSocketService.send(new WsRequest("sessions", null));
    });

    webSocketService.subscribeToMessages((response) => {
      const newSessions = response.sessions as any[];
      if (newSessions) {
        setSessions((prevSessions) => {
          const newSessionIds = findNewSessions(prevSessions, newSessions);
          if (newSessionIds.size > 0) {
            const [newSessionId] = newSessionIds;
            const idx = newSessions.findIndex((j) => j.id == newSessionId);
            setTimeout(() => {
              setTabIndex(idx);
            }, 100);
          }
          return newSessions;
        });
      }
      const newState = response.sessionState;
      if (newState) {
        const session = response.session;
        logger.info("setting sessionState for", session.id, "to", newState);

        newState.uiHandlers = new UiHandlers(session, webSocketService);

        setSessionState((prev) =>
          new Map<string, any>(prev).set(response.session.id, newState)
        );
      }
      const sessionStateChange = response.sessionStateChange;
      if (sessionStateChange) {
        logger.info("received change", sessionStateChange);
        setSessionState((prev) => {
          const m = new Map<string, any>(prev);
          const sessionId = response.session.id;
          const pj = m.get(sessionId);
          if (!pj) {
            logger.warn(
              `got an update for a session that doesn't exist yet: ${sessionId}. Will request for the full session's ui state.`
            );
            webSocketService.send(
              new WsRequest("session-full-refresh", {
                SessionFullRefresh: {
                  sessionId: sessionId,
                },
              })
            );
            return prev;
          } else {
            const merged = {
              ...pj,
              elements: {
                ...pj!.elements,
                ...sessionStateChange.elements,
              },
              keyTree: {
                ...pj!.keyTree,
                ...sessionStateChange.keyTree,
              },
            };
            m.set(sessionId, merged);
            return m;
          }
        });
      }
    });

    return () => {
      logger.info("Sessions discarded.");
    };
  }, []);

  function closeSession(session: any) {
    const o = session.isOpen;
    const r = o
      ? new WsRequest("close-session", { CloseSession: { id: session.id } })
      : new WsRequest("remove-session", { RemoveSession: { id: session.id } });
    webSocketService.send(r);
  }

  return (
    <Tabs
      className="Sessions"
      variant="enclosed"
      index={tabIndex}
      onChange={handleTabsChange}
    >
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
              {!session.options.alwaysOpen && (
                <Link
                  style={{ marginLeft: "12px" }}
                  onClick={(e) => closeSession(session)}
                >
                  <CloseIcon boxSize="0.5em" />
                </Link>
              )}
            </Tab>
          );
        })}
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
        {/* <TabPanel height="800px" bg="black">
          <Playground></Playground>
        </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
}

export default Sessions;

function findNewSessions(prevSessions: any[], newSessions: any[]): Set<string> {
  const oldIds = idsOf(prevSessions);
  const newIds = idsOf(newSessions);

  oldIds.forEach((id) => newIds.delete(id));
  return newIds;
}

function idsOf(sessions: any[]): Set<string> {
  const ids = sessions.map((s) => s.id);
  const s = new Set<string>(ids);
  return s;
}
