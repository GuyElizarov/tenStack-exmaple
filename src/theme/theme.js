import { extendTheme } from "@chakra-ui/react"
import {styles} from "./styles"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

export const theme = extendTheme({
  styles,
  config,
})

