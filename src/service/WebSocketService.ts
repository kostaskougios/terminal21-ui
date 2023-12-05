import WsRequest from "./WsRequest";

type OnOpenHandler = () => void;
type MessageHandler = (message: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private responses: any[] = [];
  private messageHandlers: MessageHandler[] = [];
  private onOpenHandlers: OnOpenHandler[] = [];

  constructor(
    public name: string,
    private url: string,
  ) {}

  public connect(): void {
    this.reconnect();

    this.socket!.onopen = () => {
      console.log(`${this.name}: WebSocket connection established`);
      this.onOpenHandlers.forEach((handler) => handler());
    };

    this.socket!.onmessage = (event) => {
      console.log(`${new Date()} ${this.name}: received:`, event.data);
      const message = JSON.parse(event.data);
      this.responses.push(message);
      this.messageHandlers.forEach((handler) => handler(message));
    };

    this.socket!.onclose = () => {
      console.log(`${this.name}: WebSocket connection closed`);
    };

    this.socket!.onerror = (error) => {
      console.error(`${this.name}: WebSocket error:`, error);
    };
  }
  private reconnect(): void {
    console.log(`${this.name}: connecting to ${this.url}`);
    this.socket = new WebSocket(this.url);
  }

  public disconnect(): void {
    console.log(`${this.name}: disconnect called.`);
    if (this.socket) {
      this.socket.close();
    }
  }

  public sendMessage(message: WsRequest): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log(`${this.name}: Sending `, message);
      this.socket.send(message.toJSON());
      console.log("Msg was send.");
    } else
      console.log(
        `${this.name}: Message ${message} not send. readyState = ${this.socket?.readyState}`,
      );
  }

  public subscribeToMessages(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  public subscribeToOnOpen(handler: OnOpenHandler): void {
    this.onOpenHandlers.push(handler);
  }

  public getResponses(): any[] {
    return this.responses;
  }
}

export default WebSocketService;
