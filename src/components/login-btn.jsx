import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}