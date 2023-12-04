import React from "react";
import "./Terminal.css";
import { Box, Button } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ChatApp from "./ChatApp";

function TerminalDemo() {
  const toast = useToast();
  return (
    <div className="Terminal">
      {/* <-- https://chakra-ui.com/docs/components */}
      <p>The main terminal area</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        bibendum justo at odio imperdiet convallis. Pellentesque ut commodo
        augue. Donec convallis, velit eget elementum euismod, purus metus
        interdum metus, vel faucibus enim ipsum id metus. Sed a enim ut nisl
        pellentesque blandit. Nam vitae nisl nec quam commodo rhoncus in ac
        orci. Nullam lorem elit, laoreet eget tortor vel, finibus sodales
        mauris. Nunc dignissim erat in pulvinar ullamcorper. Nulla venenatis
        nulla mi, nec sagittis sapien ultrices non. Aliquam erat volutpat.
        Integer at risus eu enim pharetra vestibulum sit amet id sapien.
      </p>

      <Box>A box</Box>

      <Alert status="info">
        <AlertIcon />
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Informative msg.</AlertDescription>
      </Alert>

      <CircularProgress value={80} />

      <Button
        onClick={() =>
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>

      <ChatIcon />

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem id="menu1" onClick={(m) => alert(m.currentTarget.id)}>
            Download
          </MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
      <p>
        Phasellus pharetra, tellus in mollis pulvinar, nunc odio varius lorem,
        ut dignissim diam tortor vitae purus. Sed eleifend scelerisque felis
        pulvinar scelerisque. Donec iaculis venenatis nisl id mollis. Donec sed
        ornare urna, sit amet dignissim est. Mauris vitae elit eget elit
        interdum tincidunt. Donec eget tempor nisl. Vivamus pulvinar quam sed
        quam pharetra, id blandit ante fermentum. Nulla nec dui sed tortor
        varius posuere id sit amet elit. Maecenas varius, justo sit amet semper
        imperdiet, leo ipsum varius sapien, eu dignissim leo dolor quis diam.
      </p>
      <ChatApp />
      <p>
        Nulla tempor nisi risus, vel pharetra nibh sagittis facilisis. Interdum
        et malesuada fames ac ante ipsum primis in faucibus. Duis lacus sapien,
        sagittis et finibus ut, imperdiet non nisl. Aenean pretium orci quis
        gravida vehicula. Mauris id vulputate ex, vitae euismod lectus. Nam
        elementum auctor nunc a placerat. Vivamus aliquet libero vel ipsum
        rhoncus feugiat. Suspendisse iaculis rhoncus imperdiet.
      </p>

      <p>
        Nunc dictum fringilla scelerisque. Ut posuere, libero vitae pellentesque
        pellentesque, massa lectus varius est, non semper diam tortor in magna.
        Duis nunc nisi, gravida a placerat et, egestas consectetur lorem. Sed
        suscipit dui sit amet iaculis ornare. Duis venenatis sodales odio, eget
        hendrerit erat posuere in. Vivamus purus augue, accumsan eget purus eu,
        volutpat ultricies est. Aenean commodo vel enim eget tristique.
      </p>
    </div>
  );
}

export default TerminalDemo;
