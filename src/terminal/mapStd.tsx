export function mapStd(msg: any): JSX.Element | null {
  if (msg.Std) {
    return (
      <>
        {msg.Std.elements.map((element: any, index: number) => {
          if (element.Paragraph) {
            return <p>{element.Paragraph.text}</p>;
          } else   if (element.Header1) {
            return <h1>{element.Header1.text}</h1>
          }
          return null;
        })}
      </>
    );
  }
  return null;
}
