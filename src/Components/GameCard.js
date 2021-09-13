import React from "react"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export function GameCard({ game }) {
  const { email, uid } = useUser()

  const gamesCollection = useFirestore().collection("games")
  const lobbyCollection = useFirestore().collection("lobby")

  const suggestGame = async () => {
    await lobbyCollection
      .doc(uid)
      .set({ suggestion: game.name }, { merge: true })
  }

  const deleteGame = (event) => {
    event.preventDefault()
    const cardClassList = document.querySelector(
      "#" + game.name.replace(/\s+/g, "-").toLowerCase() + " #delete-overlay"
    ).classList
    if (cardClassList.contains("is-hidden")) {
      cardClassList.remove("is-hidden")
      event.target.innerHTML = "Cancel"
    } else {
      cardClassList.add("is-hidden")
      event.target.innerHTML = "Delete"
    }
  }
  const confirmDelete = async () => {
    await gamesCollection.doc(game.name).delete()
  }

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile is-clipped">
      <div id={game.name.replace(/\s+/g, "-").toLowerCase()} className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={
                game.thumbnail + "?random=" + Math.floor(Math.random() * 100)
              }
              alt={game.name + " thumbnail"}
              onError={(event) => {
                //clear error caused by broken link and replace with placeholder
                event.target.onError = null
                event.target.src =
                  "https://picsum.photos/165/150?random=" +
                  Math.floor(Math.random() * 100)
              }}
            />
            <div
              id="delete-overlay"
              className="columns is-mobile is-vcentered is-hidden is-overlay is-centered">
              <div className="column is-narrow">
                <button className="button" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4 is-size-5-mobile">{game.name}</p>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <button className="button card-footer-item" onClick={suggestGame}>
            Suggest
          </button>
          <button className="button card-footer-item" onClick={deleteGame}>
            Delete
          </button>
        </footer>
      </div>
    </div>
  )
}
