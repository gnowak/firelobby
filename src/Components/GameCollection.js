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
      <h1 className="">Game Collection</h1>
      <div className="container my-3">
        <div className="columns is-multiline">
          {games.map((game) => (
            <GameCard key={game.name} game={game} />
          ))}
          <AddGame />
        </div>
      </div>
    </section>
  )
}
