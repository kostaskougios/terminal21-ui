import WsRequest from "./WsRequest";

type MessageHandler = (message: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private responses: any[] = [];
  private messageHandlers: MessageHandler[] = [];

  constructor(private url: string) {}

  public connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
      this.sendMessage(new WsRequest("init", null));
    };

    this.socket.onmessage = (event) => {
        console.log("received:", event.data);
        const message = JSON.parse(event.data);
      this.responses.push(message);
      this.messageHandlers.forEach((handler) => handler(message));
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  public disconnect(): void {
    console.log("disconnect called.")
    if (this.socket) {
      this.socket.close();
    }
  }

  public sendMessage(message: WsRequest): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("Sending ", message);
      this.socket.send(message.toJSON());
      console.log("Msg was send.");
    } else
      console.log(
        "Message " +
          message +
          " not send. readyState = " +
          this.socket?.readyState,
      );
  }

  public subscribeToMessages(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  public getResponses(): any[] {
    return this.responses;
  }
}

export default WebSocketService;
