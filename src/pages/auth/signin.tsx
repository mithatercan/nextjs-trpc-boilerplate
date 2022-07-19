import Container from '@components/auth/Container'
import { trpc } from '@utils/trpc'
import type { FormEvent } from 'react'

const signin = (): JSX.Element => {
  const { mutate } = trpc.useMutation(['auth_signin'], {
    onSuccess(data) {
      alert(data)
    },
    onError(error) {
      alert(error)
    },
  })

  const handleSignin = (e: FormEvent) => {
    e.preventDefault()

    mutate({
      username: e.target.username.value,
      password: e.target.password.value,
    })
  }
  return <Container type="signin" handleSubmit={handleSignin} />
}

export default signin
