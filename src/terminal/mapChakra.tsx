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
    <Box {...b}>
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
    );
  },
  EditablePreview: (b: any) => <EditablePreview {...b} />,
  EditableInput: (b: any) => <EditableInput {...b} />,
  EditableTextarea: (b: any) => <EditableTextarea {...b} />,
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
        {...b}
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
      <InputGroup {...b}>{mapResponses(b.children, uiHandlers)}</InputGroup>
    );
  },
  InputLeftAddon: (b: any, uiHandlers: UiHandlers) => (
    <InputLeftAddon {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </InputLeftAddon>
  ),
  InputRightAddon: (b: any, uiHandlers: UiHandlers) => (
    <InputRightAddon {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </InputRightAddon>
  ),
  HStack: (b: any, uiHandlers: UiHandlers) => (
    <HStack {...b}>
      {mapResponses(b.children, uiHandlers)}
    </HStack>
  ),
  VStack: (b: any, uiHandlers: UiHandlers) => (
    <VStack {...b}>
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
  Switch: (b: any, uiHandlers: UiHandlers) => (
    <Switch
      {...b}
      onChange={(event) =>
        uiHandlers.onChange(b.key, event.target.checked + "")
      }
    >
      {b.text}
    </Switch>
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
  Option_: (b: any) => <option {...b}>{b.text}</option>,
  Select: (b: any, uiHandlers: UiHandlers) => {
    const [value, setValue] = React.useState(b.value);
    return (
      <Select
        {...b}
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
    <Center {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Center>
  ),
  Circle: (b: any, uiHandlers: UiHandlers) => (
    <Circle {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Circle>
  ),
  Square: (b: any, uiHandlers: UiHandlers) => (
    <Square {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Square>
  ),
  Textarea: (b: any, uiHandlers: UiHandlers) => {
    const [value, setValue] = React.useState(b.value);
    return (
      <Textarea
        {...b}
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
    <TableContainer {...b}>
      {mapResponses(b.children, uiHandlers)}
    </TableContainer>
  ),
  Table: (b: any, uiHandlers: UiHandlers) => (
    <Table {...b}>{mapResponses(b.children, uiHandlers)}</Table>
  ),
  TableCaption: (b: any) => <TableCaption {...b}>{b.text}</TableCaption>,
  Thead: (b: any, uiHandlers: UiHandlers) => (
    <Thead {...b}>{mapResponses(b.children, uiHandlers)}</Thead>
  ),
  Tbody: (b: any, uiHandlers: UiHandlers) => (
    <Tbody {...b}>{mapResponses(b.children, uiHandlers)}</Tbody>
  ),
  Tfoot: (b: any, uiHandlers: UiHandlers) => (
    <Tfoot {...b}>{mapResponses(b.children, uiHandlers)}</Tfoot>
  ),
  Tr: (b: any, uiHandlers: UiHandlers) => (
    <Tr {...b}>{mapResponses(b.children, uiHandlers)}</Tr>
  ),
  Th: (b: any, uiHandlers: UiHandlers) => (
    <Th {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Th>
  ),
  Td: (b: any, uiHandlers: UiHandlers) => (
    <Td {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </Td>
  ),
  Menu: (b: any, uiHandlers: UiHandlers) => (
    <Menu {...b}>{mapResponses(b.children, uiHandlers)}</Menu>
  ),
  MenuButton: (b: any, uiHandlers: UiHandlers) => (
    <MenuButton as={Button} {...b}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </MenuButton>
  ),
  MenuList: (b: any, uiHandlers: UiHandlers) => (
    <MenuList {...b}>{mapResponses(b.children, uiHandlers)}</MenuList>
  ),
  MenuItem: (b: any, uiHandlers: UiHandlers) => (
    <MenuItem {...b} onClick={(event) => uiHandlers.onClick(b.key)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </MenuItem>
  ),
  MenuDivider: (b: any) => <MenuDivider {...b} />,
  Badge: (b: any, uiHandlers: UiHandlers) => (
    <Badge {...b}>
      {b.text} {mapResponses(b.children, uiHandlers)}
    </Badge>
  ),
  Image: (b: any) => <Image {...b} />,
  // -------------- START OF ICONS ------------------------------------------------------------------------
  AddIcon: (b: any) => <AddIcon {...b} />,
  ArrowBackIcon: (b: any) => <ArrowBackIcon {...b} />,
  ArrowDownIcon: (b: any) => <ArrowDownIcon {...b} />,
  ArrowForwardIcon: (b: any) => <ArrowForwardIcon {...b} />,
  ArrowLeftIcon: (b: any) => <ArrowLeftIcon {...b} />,
  ArrowRightIcon: (b: any) => <ArrowRightIcon {...b} />,
  ArrowUpIcon: (b: any) => <ArrowUpIcon {...b} />,
  ArrowUpDownIcon: (b: any) => <ArrowUpDownIcon {...b} />,
  AtSignIcon: (b: any) => <AtSignIcon {...b} />,
  AttachmentIcon: (b: any) => <AttachmentIcon {...b} />,
  BellIcon: (b: any) => <BellIcon {...b} />,
  CalendarIcon: (b: any) => <CalendarIcon {...b} />,
  ChatIcon: (b: any) => <ChatIcon {...b} />,
  CheckIcon: (b: any) => <CheckIcon {...b} />,
  CheckCircleIcon: (b: any) => <CheckCircleIcon {...b} />,
  ChevronDownIcon: (b: any) => <ChevronDownIcon {...b} />,
  ChevronLeftIcon: (b: any) => <ChevronLeftIcon {...b} />,
  ChevronRightIcon: (b: any) => <ChevronRightIcon {...b} />,
  ChevronUpIcon: (b: any) => <ChevronUpIcon {...b} />,
  CloseIcon: (b: any) => <CloseIcon {...b} />,
  CopyIcon: (b: any) => <CopyIcon {...b} />,
  DeleteIcon: (b: any) => <DeleteIcon {...b} />,
  DownloadIcon: (b: any) => <DownloadIcon {...b} />,
  DragHandleIcon: (b: any) => <DragHandleIcon {...b} />,
  EditIcon: (b: any) => <EditIcon {...b} />,
  EmailIcon: (b: any) => <EmailIcon {...b} />,
  ExternalLinkIcon: (b: any) => <ExternalLinkIcon {...b} />,
  HamburgerIcon: (b: any) => <HamburgerIcon {...b} />,
  InfoIcon: (b: any) => <InfoIcon {...b} />,
  InfoOutlineIcon: (b: any) => <InfoOutlineIcon {...b} />,
  LinkIcon: (b: any) => <LinkIcon {...b} />,
  LockIcon: (b: any) => <LockIcon {...b} />,
  MinusIcon: (b: any) => <MinusIcon {...b} />,
  MoonIcon: (b: any) => <MoonIcon {...b} />,
  NotAllowedIcon: (b: any) => <NotAllowedIcon {...b} />,
  PhoneIcon: (b: any) => <PhoneIcon {...b} />,
  PlusSquareIcon: (b: any) => <PlusSquareIcon {...b} />,
  QuestionIcon: (b: any) => <QuestionIcon {...b} />,
  QuestionOutlineIcon: (b: any) => <QuestionOutlineIcon {...b} />,
  RepeatIcon: (b: any) => <RepeatIcon {...b} />,
  RepeatClockIcon: (b: any) => <RepeatClockIcon {...b} />,
  SearchIcon: (b: any) => <SearchIcon {...b} />,
  Search2Icon: (b: any) => <Search2Icon {...b} />,
  SettingsIcon: (b: any) => <SettingsIcon {...b} />,
  SmallAddIcon: (b: any) => <SmallAddIcon {...b} />,
  SmallCloseIcon: (b: any) => <SmallCloseIcon {...b} />,
  SpinnerIcon: (b: any) => <SpinnerIcon {...b} />,
  StarIcon: (b: any) => <StarIcon {...b} />,
  SunIcon: (b: any) => <SunIcon {...b} />,
  TimeIcon: (b: any) => <TimeIcon {...b} />,
  TriangleDownIcon: (b: any) => <TriangleDownIcon {...b} />,
  TriangleUpIcon: (b: any) => <TriangleUpIcon {...b} />,
  UnlockIcon: (b: any) => <UnlockIcon {...b} />,
  UpDownIcon: (b: any) => <UpDownIcon {...b} />,
  ViewIcon: (b: any) => <ViewIcon {...b} />,
  ViewOffIcon: (b: any) => <ViewOffIcon {...b} />,
  WarningIcon: (b: any) => <WarningIcon {...b} />,
  WarningTwoIcon: (b: any) => <WarningTwoIcon {...b} />,
  // -------------- END OF ICONS ----------------------------------
};
