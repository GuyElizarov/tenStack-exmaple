
import { Box } from "@chakra-ui/react"

export const ColorIcon = ({ color, ...props }) => (
    <Box w="12px" h="12px" bg={color} borderRadius="50%" {...props} />
  )