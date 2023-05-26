import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#ededed", //for the background color
        color: "black", //for the text color
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },

      //styles for menu
      ".chakra-menu__menuitem": {
        color: "black",
        _hover: {
          bg: "teal.50",

          color: "teal.500",
        },
      },
    },
  },

  components: {
    //set a default color for all buttons
    Button: {
      variants: {
        solid: {
          bg: "teal.500",
          color: "white",
          _hover: {
            bg: "teal.600",
          },
          _active: {
            bg: "teal.700",
          },

          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              bgColor: "teal.50",
              borderColor: "teal.500",
              boxShadow: "none",
            },
          },
        },
      },
    },
  },

  colors: {
    teal: {
      50: "#e6f7f7",
      100: "#c3ebea",

      200: "#81cdc6",
      300: "#4fb9af",
      400: "#28a99e",
      500: "#05998c", // bg
      600: "#048c7f", // hover
      700: "#037c6e", // click
    },
  },
});

export default theme;
