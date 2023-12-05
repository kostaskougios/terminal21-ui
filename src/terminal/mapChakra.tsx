import { Button, Box } from "@chakra-ui/react";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapChakra(msg: any): JSX.Element | null {
  return renderIfExists(ElementMap,msg.Chakra);
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Button: (b: any) => <Button key={b.key}>{b.text}</Button>,
  Box: (b: any) => <Box key={b.key}>{b.text}</Box>,
};
