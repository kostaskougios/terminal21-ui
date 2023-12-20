import React from "react";
import WsRequest from "./json/WsRequest";
import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";

type OnOpenHandler = () => void;
type MessageHandler = (message: any) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandlers: MessageHandler[] = [];
  private onOpenHandlers: OnOpenHandler[] = [];
  private outbound: WsRequest[] = [];
  private emitter = new EventEmitter();
  private isOpen: boolean = false;
  private isFirstOpen: boolean = true;
  private id = uuidv4();

  constructor(private url: string) {
    console.log("WebSocketService constructed.");
    this.emitter.on("new-message", () => {
      this.sendOutbound();
    });
  }

  private sendOutbound(): void {
    if (
      this.isOpen &&
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {
      console.log(
        `${this.id}: Sending ${this.outbound.length}  outbound messages`,
      );
      for (var i = 0; i < this.outbound.length; i++) {
        const message = this.outbound[i];
        console.log(`${this.id}: Sending `, message);
        this.socket.send(message.toJSON());
      }
      this.outbound = [];
    }
  }

  private reconnect(): void {
    this.isOpen = false;
    console.log(`${this.id}: connecting to ${this.url}`);
    if (this.socket) {
      this.socket.onclose = () => {};
      this.socket.close();
    }

    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      if (this.isFirstOpen) {
        this.isFirstOpen = false;
        setInterval(() => {
          this.send(new WsRequest("ping", null));
        }, 10000);
      }
      this.isOpen = true;

      console.log(
        `${this.id}: WebSocket connection established, executing ${this.onOpenHandlers.length} on-open-handlers`,
      );
      this.onOpenHandlers.forEach((handler) => handler());
      this.sendOutbound();
    };

    this.socket.onmessage = (event) => {
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
      console.log(`${this.id}: WebSocket connection closed`);
      this.socket = null;
      this.isOpen = false;
      this.reconnect();
    };

    this.socket.onerror = (error) => {
      console.error(`${this.id}: WebSocket error:`, error);
    };
  }

  public connect(): void {
    this.reconnect();
  }

  public disconnect(): void {
    console.log(`${this.id}: disconnect called.`);
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isOpen = false;
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
