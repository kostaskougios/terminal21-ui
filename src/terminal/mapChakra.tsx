import { ComponentRenderFunction, renderIfExists } from "./renderElement";
import UiHandlers from "../model/UiHandlers";
import { mapResponses } from "./mapResponse";
import {
  Button,
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Editable,
  EditableInput,
  EditablePreview,
  FormHelperText,
  Input,
  HStack,
  VStack,
  ButtonGroup,
  Checkbox,
  Radio,
  RadioGroup,
  EditableTextarea,
  Center
} from "@chakra-ui/react";
import React from "react";

export function mapChakra(
  msg: any,
  uiHandlers: UiHandlers,
): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "Chakra");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Button: (b: any, uiHandlers: UiHandlers) => (
    <Button {...b} onClick={(event) => uiHandlers.onClick(b.key)}>
      {b.text}
    </Button>
  ),
  ButtonGroup: (b: any, uiHandlers: UiHandlers) => (
    <ButtonGroup {...b}>{mapResponses(b.children, uiHandlers)}</ButtonGroup>
  ),
  Box: (b: any, uiHandlers: UiHandlers) => (
    <Box key={b.key} {...b.props}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Box>
  ),
  SimpleGrid: (b: any, uiHandlers: UiHandlers) => (
    <SimpleGrid {...b}>{mapResponses(b.children, uiHandlers)}</SimpleGrid>
  ),
  Editable: (b: any, uiHandlers: UiHandlers) => {
    delete b.value;
    return (
      <Editable
        {...b}
        onChange={(newValue) => uiHandlers.onChange(b.key, newValue)}
      >
        {mapResponses(b.children, uiHandlers)}
      </Editable>
    )
  },
  EditablePreview: (b:any) => (<EditablePreview {...b}/>),
  EditableInput: (b:any) => (<EditableInput {...b}/>),
  EditableTextarea: (b:any) => (<EditableTextarea {...b}/>),
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
  Input: (b: any, uiHandlers: UiHandlers) => {
    const [value, setValue] = React.useState(b.value);
    delete b.children;
    return (
      <Input
        {...b} value={value}
        onChange={(event) => { const v = event.target.value; setValue(v); uiHandlers.onChange(b.key, v); }}
      ></Input>
    )
  },
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
  Checkbox: (b: any, uiHandlers: UiHandlers) => (
    <Checkbox
      {...b}
      onChange={(event) =>
        uiHandlers.onChange(b.key, event.target.checked + "")
      }
    >
      {b.text}
    </Checkbox>
  ),
  Radio: (b: any) => <Radio {...b}>{b.text}</Radio>,
  RadioGroup: (b: any, uiHandlers: UiHandlers) => {
    const [value, setValue] = React.useState(b.value);
    return (
      <RadioGroup
        {...b}
        value={value}
        onChange={(value) => {
          setValue(value);
          uiHandlers.onChange(b.key, value);
        }}
      >
        {mapResponses(b.children, uiHandlers)}
      </RadioGroup>
    );
  },
  Center: (b: any, uiHandlers: UiHandlers) => (
    <Center {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Center>
  ),
};
