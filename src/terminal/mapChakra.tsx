import { Button , Box} from "@chakra-ui/react";

export function mapChakra(msg: any): JSX.Element | null {
  if (msg.Chakra) {
    const element = msg.Chakra.element;
    return <>
        { renderElement(element) }
      </>
  }
  return null;
}

type ComponentRenderFunction = (props: any) => JSX.Element;
const m : Record<string,ComponentRenderFunction>= {
  "Button": (b: any) => <Button key={b.key}>{b.text}</Button>,
  "Box": (b: any) => <Box key={b.key}>{b.text}</Box>
}

function renderElement(element:any) {
  Object.keys(element).map((key) => {
    if(m[key]) return m[key](element[key])
  })
  const p = element.Button;
  if (p) {
    return <Button key={p.key}>{p.text}</Button>;
  }

  return null;
}