import { WebSocketService } from "../service/WebSocketService";
import WsRequest from "../service/json/WsRequest";
import LoggerFactory from "../util/Logger";

type OnClick = (key: string) => void;
type OnChange = (key: string, value: string | null) => void;

class UiHandlers {
  public onClick: OnClick;
  public onChange: OnChange;
  private logger = LoggerFactory(this);

  constructor(session: any, webSocketService: WebSocketService) {
    this.onChange = (key: string, value: string | null) => {
      this.logger.info(
        "onChange event for ",
        session.id,
        " and ",
        key,
        " with new value ",
        value
      );
      webSocketService.send(
        new WsRequest("onchange", {
          OnChange: { sessionId: session.id, key: key, value: value },
        })
      );
    };
    this.onClick = (key: string) => {
      this.logger.info("onClick event for ", session.id, " and ", key);
      webSocketService.send(
        new WsRequest("onclick", {
          OnClick: { sessionId: session.id, key: key },
        })
      );
    };
  }
}

export default UiHandlers;
