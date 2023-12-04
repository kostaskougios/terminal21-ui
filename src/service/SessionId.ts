class SessionId {
    sessionId: string;

    constructor(sessionId: string) {
        this.sessionId = sessionId;
    }

    toJSON(): any {
        return {
            SessionId: {
                id: this.sessionId
            }
        };
    }

}

export default SessionId;