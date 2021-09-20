import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";

export function AuthView() {
  const { data: session } = useSession({
    required: false,
  });

  return (
    <Container>
      {session ? (
        <a href="#" onClick={() => signOut()}>
          Sign out {session.user?.email}
        </a>
      ) : (
        <a href="#" onClick={() => signIn()}>
          Sign in
        </a>
      )}
    </Container>
  );
}

const Container = styled.div``;
