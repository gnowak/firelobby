import React from "react"

import { useFirestore, useFirestoreCollectionData } from "reactfire"
import "./GameCollection.css"
import { GameCard } from "./GameCard"
import { AddGame } from "./AddGame"

export function GameCollection() {
  const gamesCollection = useFirestore().collection("games")
  const games = useFirestoreCollectionData(gamesCollection)

  return (
    <section className="container my-3">
      <h3 className="block is-size-3 is-underlined">Game Collection</h3>
      <div className="container my-3">
        <div className="columns is-multiline is-mobile is-variable is-1-mobile">
          {games.map((game) => (
            <GameCard key={game.name} game={game} />
          ))}
          <AddGame />
        </div>
      </div>
    </section>
  )
}
