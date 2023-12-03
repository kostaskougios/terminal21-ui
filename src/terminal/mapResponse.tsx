import React from 'react';

export function mapResponse(msg: any): JSX.Element {
    // Check for the presence of different keys and handle accordingly
    if (msg.Std) {
        // Handling "Std" key
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
    return <div>Unknown message format</div>;
}

function mapStd(msg: any): JSX.Element {
    if (msg.Std) {
        // Handling "Std" key
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