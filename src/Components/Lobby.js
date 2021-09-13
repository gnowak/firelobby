import React from "react"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import { Vote } from "./Vote"
import { GameCollection } from "./GameCollection"

export function Lobby() {
  const { email, displayName, uid } = useUser()

  const lobbyCollection = useFirestore().collection("lobby")
  const lobby = useFirestoreCollectionData(lobbyCollection)

  const userInLobby = lobby.find((m) => m.email === email)

  const joinLobby = async () => {
    await lobbyCollection.doc(uid).set({ email, displayName, ready: false })
  }

  const leaveLobby = async () => {
    await lobbyCollection.doc(uid).delete()
  }

  const toggleReadiness = async (newReadiness) => {
    await lobbyCollection.doc(uid).set({ ready: newReadiness }, { merge: true })
  }

  return (
    <div className="container is-fluid">
      {lobby.map((m) => {
        return (
          <article key={m.email} className="tile is-child notification">
            <p className="title">
              {m.displayName} - {m.ready ? "Ready 🎮" : "Not Ready ❌"}
            </p>
            <p>{m.suggestion ? "Suggestion: " + m.suggestion : ""}</p>
          </article>
        )
      })}
      <div className="columns is-4">
        {userInLobby && (
          <div className="column is-1 mr-4">
            <button
              className="button is-primary"
              onClick={() => toggleReadiness(!userInLobby.ready)}>
              {userInLobby.ready ? "Not Ready!" : "Ready!"}
            </button>
          </div>
        )}
        <div className="column is-1">
          {userInLobby ? (
            <button className="button is-primary" onClick={leaveLobby}>
              Leave
            </button>
          ) : (
            <button className="button is-primary" onClick={joinLobby}>
              Join
            </button>
          )}
        </div>
      </div>
      {userInLobby && <Vote />}
      {userInLobby && <GameCollection />}
    </div>
  )
}
