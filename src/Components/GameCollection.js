import React from "react"
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import "./GameCollection.css"

export function GameCollection() {
  const { email, displayName, uid } = useUser()
  const gamesCollection = useFirestore().collection("games")
  const games = useFirestoreCollectionData(gamesCollection)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("You have submitted the form.")

    const game = {
      name: event.target.name.value,
      thumbnail: event.target.thumbnail.value,
    }
    if (games.find((m) => m.name === game.name)) {
      alert("Game already exists")
    } else {
      await gamesCollection
        .doc(game.name)
        .set({ name: game.name, thumbnail: game.thumbnail })
    }
  }
  const handleDelete = async (event) => {
    event.preventDefault()
    console.log("You have deleted the game.")
    await gamesCollection.doc(event.target.name.value).delete()
  }

  return (
    <section className="container my-3">
      <h1 className="">Game Collection</h1>
      <form action="add-game" onSubmit={handleSubmit}>
        <ul className="container my-5">
          <li className="columns is-centered is-vcentered has-text-centered	has-background-grey">
            <div className="column is-one-quarter">
              <label className="label">Name</label>
            </div>
            <div className="column is-one-quarter">
              <label className="label">Thumbnail</label>
            </div>
          </li>
          <li className="columns is-centered is-vcentered has-text-centered has-background-white">
            <div className="column is-one-quarter">
              <input
                type="text"
                name="name"
                id=""
                placeholder="Name of Boardgame"
              />
            </div>
            <div className="column is-one-quarter">
              <input
                type="text"
                name="thumbnail"
                id=""
                placeholder="URL of thumbnail"
              />
            </div>
            <div>
              <button className="button" type="submit">
                Add Game
              </button>
            </div>
          </li>
          {games.map((game, index) => {
            console.log(game, index)
            const isOdd = index % 2 !== 0
            return (
              <li
                className={`columns is-centered is-vcentered has-text-centered ${
                  isOdd ? "odd-row" : "even-row"
                }`}
                key={game.name}>
                <div className="column is-one-quarter">{game.name}</div>
                <div className="column is-one-quarter">
                  {<img src={game.thumbnail} />}
                </div>
                <div className="column is-one-quarter">
                  <span className=" icon is-medium">
                    <i className="fas fa-trash"></i>
                  </span>
                  <span>Delete Game</span>
                </div>
              </li>
            )
          })}
        </ul>
      </form>
    </section>
  )
}
