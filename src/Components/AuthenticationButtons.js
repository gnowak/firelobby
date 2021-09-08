import firebase from "firebase/app"
import React from "react"
import { AuthCheck, useAuth } from "reactfire"

export function AuthenticationButtons() {
  const auth = useAuth()
  const signIn = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
  const signOut = async () => {
    await auth.signOut()
  }
  // When authenticated, show the Sign out button, else Sign in
  return (
    <AuthCheck
      fallback={
        <button className="button is-primary" onClick={signIn}>
          Sign In
        </button>
      }>
      <button className="button is-info" onClick={signOut}>
        Sign Out
      </button>
    </AuthCheck>
  )
}
