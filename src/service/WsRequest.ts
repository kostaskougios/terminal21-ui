class WsRequest {
  operation: string;
  body: any;

  constructor(operation: string, body: any) {
    this.operation = operation;
    this.body = body;
  }

  toJSON(): string {
    return JSON.stringify({
      operation: this.operation,
      body: this.body,
    });
  }
}

export default WsRequest;
