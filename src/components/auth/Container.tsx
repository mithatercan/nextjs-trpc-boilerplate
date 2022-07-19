import { Box, Button, Input, Stack } from '@chakra-ui/react'
import type { FC, FormEventHandler } from 'react'
import React from 'react'

const login: FC<{
  type: 'signup' | 'signin'
  handleSubmit: FormEventHandler
}> = ({ type, handleSubmit }): JSX.Element => {
  return (
    <Box className="flex items-center justify-center w-screen h-screen">
      <form className="w-[70%]" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input name="username" type="text" placeholder="Enter username" />
          <Input name="password" type="password" placeholder="Enter password" />
          <Button colorScheme="blue" type="submit">
            {type === 'signup' ? 'Sign Up' : 'Sign In'}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default login
