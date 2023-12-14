import WebSocketService from "../service/WebSocketService";
import WsRequest from "../service/json/WsRequest";

type OnClick = (key: string) => void;
type OnChange = (key: string, value: string) => void;

class UiHandlers {
  public onClick: OnClick;
  public onChange: OnChange;

  constructor(session: any, webSocketService: WebSocketService) {
    this.onChange = (key: string, value: string) => {
      console.log(
        "onChange event for ",
        session.id,
        " and ",
        key,
        " with new value ",
        value,
      );
      webSocketService.send(
        new WsRequest("onchange", {
          OnChange: { sessionId: session.id, key: key, value: value },
        }),
      );
    };
    this.onClick = (key: string) => {
      console.log("onClick event for ", session.id, " and ", key);
      webSocketService.send(
        new WsRequest("onclick", {
          OnClick: { sessionId: session.id, key: key },
        }),
      );
    };
  }
}

export default UiHandlers;
