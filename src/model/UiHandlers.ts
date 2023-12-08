type OnClick = (key: string) => void;

class UiHandlers {
    public onClick: OnClick;

    constructor(onClick: OnClick) {
        this.onClick = onClick;
    }
}

export default UiHandlers;