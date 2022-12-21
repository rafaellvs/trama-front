import { ReactNode } from 'react'

import { Flex, Box } from '@chakra-ui/react'
import Navbar from 'components/Navbar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Flex
      direction='column'
      bg='black'
      minH='100vh'
    >
      <Navbar />

      <Box
        as='main'
        mt='navbarHeight'
        p='8'
        flex='1'
      >
        {children}
      </Box>
    </Flex>
  )
}

export default Layout