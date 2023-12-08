class OnClickBody {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  toJSON(): any {
    return {
      key: this.key,
    };
  }
}

export default OnClickBody;
