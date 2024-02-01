import { ComponentRenderFunction, renderIfExists } from "./renderElement";
import UiHandlers from "../model/UiHandlers";
import { elementAttributes, mapResponses } from "./mapResponse";
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
  Center,
  Circle,
  Square,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Switch,
  Select,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Image,
  Text,
  Code,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import {
  AddIcon,
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpDownIcon,
  AtSignIcon,
  AttachmentIcon,
  BellIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  DragHandleIcon,
  EditIcon,
  EmailIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  InfoIcon,
  InfoOutlineIcon,
  LinkIcon,
  LockIcon,
  MinusIcon,
  MoonIcon,
  NotAllowedIcon,
  PhoneIcon,
  PlusSquareIcon,
  QuestionIcon,
  QuestionOutlineIcon,
  RepeatIcon,
  RepeatClockIcon,
  SearchIcon,
  Search2Icon,
  SettingsIcon,
  SmallAddIcon,
  SmallCloseIcon,
  SpinnerIcon,
  StarIcon,
  SunIcon,
  TimeIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  UnlockIcon,
  UpDownIcon,
  ViewIcon,
  ViewOffIcon,
  WarningIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";

export function mapChakra(
  msg: any,
  uiHandlers: UiHandlers
): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "Chakra");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Text: (b: any) => <Text {...elementAttributes(b)}>{b.text}</Text>,
  Button: (b: any, uiHandlers: UiHandlers) => (
    <Button
      {...elementAttributes(b)}
      onClick={(event) => uiHandlers.onClick(b.key)}
      leftIcon={b.leftIcon ? mapResponses([b.leftIcon], uiHandlers) : null}
      rightIcon={b.rightIcon ? mapResponses([b.rightIcon], uiHandlers) : null}
    >
      {b.text}
    </Button>
  ),
  ButtonGroup: (b: any, uiHandlers: UiHandlers) => (
    <ButtonGroup {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </ButtonGroup>
  ),
  Box: (b: any, uiHandlers: UiHandlers) => (
    <Box {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Box>
  ),
  SimpleGrid: (b: any, uiHandlers: UiHandlers) => (
    <SimpleGrid {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </SimpleGrid>
  ),
  Editable: (b: any, uiHandlers: UiHandlers) => {
    delete b.value;
    return (
      <Editable
        {...elementAttributes(b)}
        onChange={(newValue) => uiHandlers.onChange(b.key, newValue)}
      >
        {mapResponses(b.children, uiHandlers)}
      </Editable>
    );
  },
  EditablePreview: (b: any) => <EditablePreview {...elementAttributes(b)} />,
  EditableInput: (b: any) => <EditableInput {...elementAttributes(b)} />,
  EditableTextarea: (b: any) => <EditableTextarea {...elementAttributes(b)} />,
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
    return (
      <Input
        {...elementAttributes(b)}
        value={value}
        onChange={(event) => {
          const v = event.target.value;
          setValue(v);
          uiHandlers.onChange(b.key, v);
        }}
      ></Input>
    );
  },
  InputGroup: (b: any, uiHandlers: UiHandlers) => {
    return (
      <InputGroup {...elementAttributes(b)}>
        {mapResponses(b.children, uiHandlers)}
      </InputGroup>
    );
  },
  InputLeftAddon: (b: any, uiHandlers: UiHandlers) => (
    <InputLeftAddon {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </InputLeftAddon>
  ),
  InputRightAddon: (b: any, uiHandlers: UiHandlers) => (
    <InputRightAddon {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </InputRightAddon>
  ),
  HStack: (b: any, uiHandlers: UiHandlers) => (
    <HStack {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </HStack>
  ),
  VStack: (b: any, uiHandlers: UiHandlers) => (
    <VStack {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </VStack>
  ),
  Checkbox: (b: any, uiHandlers: UiHandlers) => (
    <Checkbox
      {...elementAttributes(b)}
      onChange={(event) =>
        uiHandlers.onChange(b.key, event.target.checked + "")
      }
    >
      {b.text}
    </Checkbox>
  ),
  Switch: (b: any, uiHandlers: UiHandlers) => (
    <Switch
      {...elementAttributes(b)}
      onChange={(event) =>
        uiHandlers.onChange(b.key, event.target.checked + "")
      }
    >
      {b.text}
    </Switch>
  ),
  Radio: (b: any) => <Radio {...elementAttributes(b)}>{b.text}</Radio>,
  RadioGroup: (b: any, uiHandlers: UiHandlers) => {
    const [value, setValue] = React.useState(b.defaultValue);
    return (
      <RadioGroup
        {...elementAttributes(b)}
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
  Option_: (b: any) => <option {...elementAttributes(b)}>{b.text}</option>,
  Select: (b: any, uiHandlers: UiHandlers) => {
    const [value, setValue] = React.useState(b.value);
    return (
      <Select
        {...elementAttributes(b)}
        value={value}
        onChange={(event) => {
          const v = event.target.value;
          setValue(v);
          uiHandlers.onChange(b.key, v);
        }}
      >
        {mapResponses(b.children, uiHandlers)}
      </Select>
    );
  },
  Center: (b: any, uiHandlers: UiHandlers) => (
    <Center {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Center>
  ),
  Circle: (b: any, uiHandlers: UiHandlers) => (
    <Circle {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Circle>
  ),
  Square: (b: any, uiHandlers: UiHandlers) => (
    <Square {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Square>
  ),
  Textarea: (b: any, uiHandlers: UiHandlers) => {
    const [value, setValue] = React.useState(b.value);
    return (
      <Textarea
        {...elementAttributes(b)}
        value={value}
        onChange={(event) => {
          const v = event.target.value;
          setValue(v);
          uiHandlers.onChange(b.key, v);
        }}
      ></Textarea>
    );
  },
  TableContainer: (b: any, uiHandlers: UiHandlers) => (
    <TableContainer {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </TableContainer>
  ),
  Table: (b: any, uiHandlers: UiHandlers) => (
    <Table {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </Table>
  ),
  TableCaption: (b: any) => (
    <TableCaption {...elementAttributes(b)}>{b.text}</TableCaption>
  ),
  Thead: (b: any, uiHandlers: UiHandlers) => (
    <Thead {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </Thead>
  ),
  Tbody: (b: any, uiHandlers: UiHandlers) => (
    <Tbody {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </Tbody>
  ),
  Tfoot: (b: any, uiHandlers: UiHandlers) => (
    <Tfoot {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </Tfoot>
  ),
  Tr: (b: any, uiHandlers: UiHandlers) => (
    <Tr {...elementAttributes(b)}>{mapResponses(b.children, uiHandlers)}</Tr>
  ),
  Th: (b: any, uiHandlers: UiHandlers) => (
    <Th {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Th>
  ),
  Td: (b: any, uiHandlers: UiHandlers) => (
    <Td {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Td>
  ),
  Menu: (b: any, uiHandlers: UiHandlers) => (
    <Menu {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </Menu>
  ),
  MenuButton: (b: any, uiHandlers: UiHandlers) => (
    <MenuButton as={Button} {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </MenuButton>
  ),
  MenuList: (b: any, uiHandlers: UiHandlers) => (
    <MenuList {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </MenuList>
  ),
  MenuItem: (b: any, uiHandlers: UiHandlers) => (
    <MenuItem
      {...elementAttributes(b)}
      onClick={(event) => uiHandlers.onClick(b.key)}
    >
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </MenuItem>
  ),
  MenuDivider: (b: any) => <MenuDivider {...elementAttributes(b)} />,
  Badge: (b: any, uiHandlers: UiHandlers) => (
    <Badge {...elementAttributes(b)}>
      {b.text} {mapResponses(b.children, uiHandlers)}
    </Badge>
  ),
  Image: (b: any) => <Image {...elementAttributes(b)} />,
  Code: (b: any, uiHandlers: UiHandlers) => (
    <Code {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Code>
  ),
  UnorderedList: (b: any, uiHandlers: UiHandlers) => (
    <UnorderedList {...elementAttributes(b)}>
      {mapResponses(b.children, uiHandlers)}
    </UnorderedList>
  ),
  ListItem: (b: any, uiHandlers: UiHandlers) => (
    <ListItem {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </ListItem>
  ),

  // -------------- START OF ICONS ------------------------------------------------------------------------
  AddIcon: (b: any) => <AddIcon {...elementAttributes(b)} />,
  ArrowBackIcon: (b: any) => <ArrowBackIcon {...elementAttributes(b)} />,
  ArrowDownIcon: (b: any) => <ArrowDownIcon {...elementAttributes(b)} />,
  ArrowForwardIcon: (b: any) => <ArrowForwardIcon {...elementAttributes(b)} />,
  ArrowLeftIcon: (b: any) => <ArrowLeftIcon {...elementAttributes(b)} />,
  ArrowRightIcon: (b: any) => <ArrowRightIcon {...elementAttributes(b)} />,
  ArrowUpIcon: (b: any) => <ArrowUpIcon {...elementAttributes(b)} />,
  ArrowUpDownIcon: (b: any) => <ArrowUpDownIcon {...elementAttributes(b)} />,
  AtSignIcon: (b: any) => <AtSignIcon {...elementAttributes(b)} />,
  AttachmentIcon: (b: any) => <AttachmentIcon {...elementAttributes(b)} />,
  BellIcon: (b: any) => <BellIcon {...elementAttributes(b)} />,
  CalendarIcon: (b: any) => <CalendarIcon {...elementAttributes(b)} />,
  ChatIcon: (b: any) => <ChatIcon {...elementAttributes(b)} />,
  CheckIcon: (b: any) => <CheckIcon {...elementAttributes(b)} />,
  CheckCircleIcon: (b: any) => <CheckCircleIcon {...elementAttributes(b)} />,
  ChevronDownIcon: (b: any) => <ChevronDownIcon {...elementAttributes(b)} />,
  ChevronLeftIcon: (b: any) => <ChevronLeftIcon {...elementAttributes(b)} />,
  ChevronRightIcon: (b: any) => <ChevronRightIcon {...elementAttributes(b)} />,
  ChevronUpIcon: (b: any) => <ChevronUpIcon {...elementAttributes(b)} />,
  CloseIcon: (b: any) => <CloseIcon {...elementAttributes(b)} />,
  CopyIcon: (b: any) => <CopyIcon {...elementAttributes(b)} />,
  DeleteIcon: (b: any) => <DeleteIcon {...elementAttributes(b)} />,
  DownloadIcon: (b: any) => <DownloadIcon {...elementAttributes(b)} />,
  DragHandleIcon: (b: any) => <DragHandleIcon {...elementAttributes(b)} />,
  EditIcon: (b: any) => <EditIcon {...elementAttributes(b)} />,
  EmailIcon: (b: any) => <EmailIcon {...elementAttributes(b)} />,
  ExternalLinkIcon: (b: any) => <ExternalLinkIcon {...elementAttributes(b)} />,
  HamburgerIcon: (b: any) => <HamburgerIcon {...elementAttributes(b)} />,
  InfoIcon: (b: any) => <InfoIcon {...elementAttributes(b)} />,
  InfoOutlineIcon: (b: any) => <InfoOutlineIcon {...elementAttributes(b)} />,
  LinkIcon: (b: any) => <LinkIcon {...elementAttributes(b)} />,
  LockIcon: (b: any) => <LockIcon {...elementAttributes(b)} />,
  MinusIcon: (b: any) => <MinusIcon {...elementAttributes(b)} />,
  MoonIcon: (b: any) => <MoonIcon {...elementAttributes(b)} />,
  NotAllowedIcon: (b: any) => <NotAllowedIcon {...elementAttributes(b)} />,
  PhoneIcon: (b: any) => <PhoneIcon {...elementAttributes(b)} />,
  PlusSquareIcon: (b: any) => <PlusSquareIcon {...elementAttributes(b)} />,
  QuestionIcon: (b: any) => <QuestionIcon {...elementAttributes(b)} />,
  QuestionOutlineIcon: (b: any) => (
    <QuestionOutlineIcon {...elementAttributes(b)} />
  ),
  RepeatIcon: (b: any) => <RepeatIcon {...elementAttributes(b)} />,
  RepeatClockIcon: (b: any) => <RepeatClockIcon {...elementAttributes(b)} />,
  SearchIcon: (b: any) => <SearchIcon {...elementAttributes(b)} />,
  Search2Icon: (b: any) => <Search2Icon {...elementAttributes(b)} />,
  SettingsIcon: (b: any) => <SettingsIcon {...elementAttributes(b)} />,
  SmallAddIcon: (b: any) => <SmallAddIcon {...elementAttributes(b)} />,
  SmallCloseIcon: (b: any) => <SmallCloseIcon {...elementAttributes(b)} />,
  SpinnerIcon: (b: any) => <SpinnerIcon {...elementAttributes(b)} />,
  StarIcon: (b: any) => <StarIcon {...elementAttributes(b)} />,
  SunIcon: (b: any) => <SunIcon {...elementAttributes(b)} />,
  TimeIcon: (b: any) => <TimeIcon {...elementAttributes(b)} />,
  TriangleDownIcon: (b: any) => <TriangleDownIcon {...elementAttributes(b)} />,
  TriangleUpIcon: (b: any) => <TriangleUpIcon {...elementAttributes(b)} />,
  UnlockIcon: (b: any) => <UnlockIcon {...elementAttributes(b)} />,
  UpDownIcon: (b: any) => <UpDownIcon {...elementAttributes(b)} />,
  ViewIcon: (b: any) => <ViewIcon {...elementAttributes(b)} />,
  ViewOffIcon: (b: any) => <ViewOffIcon {...elementAttributes(b)} />,
  WarningIcon: (b: any) => <WarningIcon {...elementAttributes(b)} />,
  WarningTwoIcon: (b: any) => <WarningTwoIcon {...elementAttributes(b)} />,
  // -------------- END OF ICONS ----------------------------------
};
