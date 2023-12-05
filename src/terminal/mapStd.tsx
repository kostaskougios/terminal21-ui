export function mapStd(msg: any): JSX.Element | null {
  if (msg.Std) {
    const element = msg.Std.element;
    return <>
        { renderElement(element) }
      </>
  }
  return null;
}

function renderElement(element:any) {
  const p = element.Paragraph;
  if (p) {
    return <p key={p.key}>{p.text}</p>;
  }

  const h1 = element.Header1;
  if (h1) {
    return <h1 key={h1.key}>{h1.text}</h1>;
  }

  return null;
}