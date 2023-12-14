import { ComponentRenderFunction, renderIfExists } from "./renderElement";
import UiHandlers from "../model/UiHandlers";
import { mapResponses } from "./mapResponse";
import { Button, Box, SimpleGrid, FormControl, FormLabel, Editable, EditableInput, EditablePreview, FormHelperText, Input, HStack,VStack } from "@chakra-ui/react";

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
  Editable: (b: any, uiHandlers: UiHandlers) => (
    <Editable
      key={b.key}
      defaultValue={b.defaultValue}
      onChange={(newValue) => uiHandlers.onChange(b.key, newValue)}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  ),
  FormControl: (b: any, uiHandlers: UiHandlers) => (
    <FormControl key={b.key} as={b.as}>
      {mapResponses(b.children, uiHandlers)}
    </FormControl>
  ),
  FormLabel: (b: any, uiHandlers: UiHandlers) => (
    <FormLabel key={b.key}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </FormLabel>
  ),
  FormHelperText: (b: any, uiHandlers: UiHandlers) => (
    <FormHelperText key={b.key}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </FormHelperText>
  ),
  Input: (b: any, uiHandlers: UiHandlers) => (
    <Input key={b.key} type={b.type} placeholder={b.placeholder} size={b.size} variant={b.variant} onChange={(event) => uiHandlers.onChange(b.key, event.target.value) }>
    </Input>
  ),
  HStack: (b: any, uiHandlers: UiHandlers) => (
    <HStack key={b.key} spacing={b.spacing}>
      {mapResponses(b.children, uiHandlers)}
    </HStack>
  ),
  VStack: (b: any, uiHandlers: UiHandlers) => (
    <VStack key={b.key} spacing={b.spacing}>
      {mapResponses(b.children, uiHandlers)}
    </VStack>
  ),

};
