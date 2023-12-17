import React from "react";
import WsRequest from "./json/WsRequest";
import { EventEmitter } from "events";

type OnOpenHandler = () => void;
type MessageHandler = (message: any) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandlers: MessageHandler[] = [];
  private onOpenHandlers: OnOpenHandler[] = [];
  private outbound: WsRequest[] = [];
  private emitter = new EventEmitter();

  constructor(
    public name: string,
    private url: string,
  ) {
    console.log("WebSocketService constructed.");
    this.emitter.on("new-message", () => {
      this.sendOutbound();
    });
  }

  private sendOutbound(): void {
    if (this.socket == null)
      throw `Error, somehow sendOutbound called with null socket`;
    if (this.socket.readyState === WebSocket.OPEN) {
      console.log(`Sending ${this.outbound.length}  outbound messages`);
      for (var i = 0; i < this.outbound.length; i++) {
        const message = this.outbound[i];
        console.log(`${this.name}: Sending `, message);
        this.socket.send(message.toJSON());
      }
      this.outbound = [];
    } else {
      console.log(
        `Can't send outbound messages because websocket not open, will try to reconnect.`,
      );
      this.reconnect();
    }
  }

  private reconnect(): void {
    console.log(`${this.name}: connecting to ${this.url}`);
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      console.log(
        `${this.name}: WebSocket connection established, executing ${this.onOpenHandlers.length} on-open-handlers`,
      );
      this.onOpenHandlers.forEach((handler) => handler());
      this.sendOutbound();
    };

    this.socket.onmessage = (event) => {
      console.log(`${new Date()} ${this.name}: received:`, event.data);
      try {
        const message = JSON.parse(event.data);
        this.messageHandlers.forEach((handler) => handler(message));
      } catch (error) {
        console.log(
          "An error occurred while receiving a message. received JSON =",
          event.data,
          "Error =",
          error,
        );
      }
    };

    this.socket.onclose = () => {
      console.log(`${this.name}: WebSocket connection closed`);
      setTimeout(() => this.reconnect(), 500);
      this.socket = null;
    };

    this.socket.onerror = (error) => {
      console.error(`${this.name}: WebSocket error:`, error);
    };
  }

  public connect(): void {
    this.reconnect();
  }

  public disconnect(): void {
    console.log(`${this.name}: disconnect called.`);
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public send(message: WsRequest): void {
    this.outbound.push(message);
    this.emitter.emit("new-message");
  }

  public subscribeToMessages(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  public subscribeToOnOpen(handler: OnOpenHandler): void {
    this.onOpenHandlers.push(handler);
  }
}

export const WebSocketContext = React.createContext<WebSocketService | null>(
  null,
);
