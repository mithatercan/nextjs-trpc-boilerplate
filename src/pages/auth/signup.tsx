import Container from '@components/auth/Container'
import { trpc } from '@utils/trpc'
import type { FormEvent } from 'react'

const signup = (): JSX.Element => {
  const { mutate } = trpc.useMutation(['auth_signup'], {
    onSuccess(data) {
      alert(data)
    },
    onError(error) {
      alert(error)
    },
  })

  const handleSignup = (e: FormEvent) => {
    e.preventDefault()

    mutate({
      username: e.target.username.value,
      password: e.target.password.value,
    })
  }

  return <Container type="signup" handleSubmit={handleSignup} />
}

export default signup
