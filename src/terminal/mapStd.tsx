export function mapStd(msg: any): JSX.Element | null {
    if (msg.Std) {
        return (
            <>
                {msg.Std.elements.map((element: any, index: number) => {
                    if (element.Paragraph) {
                        return <p key={index}>{element.Paragraph.text}</p>;
                    }
                })}
            </>
        );
    }
    return null;
}
