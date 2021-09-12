import React from "react"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { FiPlusCircle } from "react-icons/fi"

export function AddGame() {
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
    document.getElementById("add-game").reset()
  }

  return (
    <div className="column card is-one-quarter-desktop is-half-mobile is-onethird-tablet">
      <div className="columns  is-mobile is-centered is-vcentered is-multiline is-flex-direction-column mt-6">
        <div className="card-image">
          <figure className="image ">
            <FiPlusCircle size="5em" className="" />
          </figure>
        </div>
        <div className="columns is-mobile card-content is-vcentered is-centered is-multiline">
          <div className="media">
            <div className="media-content">
              <form id="add-game" onSubmit={handleSubmit} className="box">
                <p className="title is-4">
                  <input type="text" name="name" placeholder="Game Name" />
                </p>
                <p className="subtitle is-6">
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="Thumbnail URL"
                  />
                </p>
                <div className="columns block is-mobile is-centered is-vcentered ">
                  <button className="button is-primary" type="submit">
                    Add Game
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
