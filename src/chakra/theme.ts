import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FBFBFF", // Ghost White
      200: "#FF331F", // Scarlet
      300: "#657ED4", // Glaucous
      400: "#3626A7", // Zaffre
      500: "#0D0106", // Licorice
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#EFEFEF",
        bgImage: "url(/images/cat-bg.png)",
        bgSize: "102.5%",
        bgAttachment: "fixed",
      },
    }),
  },
  components: {
    Button,
  },
});
