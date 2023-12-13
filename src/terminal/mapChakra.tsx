import { Button, Box, SimpleGrid } from "@chakra-ui/react";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";
import UiHandlers from "../model/UiHandlers";
import { mapResponses } from "./mapResponse";

export function mapChakra(
  msg: any,
  uiHandlers: UiHandlers,
): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type == "Chakra");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Button: (b: any, uiHandlers: UiHandlers) => (
    <Button key={b.key} onClick={(event) => uiHandlers.onClick(b.key)}>
      {b.text}
    </Button>
  ),
  Box: (b: any, uiHandlers: UiHandlers) => (
    <Box key={b.key} {...b.props}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Box>
  ),
  SimpleGrid: (b: any, uiHandlers: UiHandlers) => (
    <SimpleGrid
      key={b.key}
      spacing={b.spacing}
      spacingX={b.spacingX}
      spacingY={b.spacingY}
      columns={b.columns}
    >
      {mapResponses(b.children, uiHandlers)}
    </SimpleGrid>
  ),
};
