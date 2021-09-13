import React from "react"

import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export function Vote() {
  const { uid } = useUser()
  const gamesCollection = useFirestore().collection("games")
  const lobbyCollection = useFirestore().collection("lobby")
  const voteCollection = useFirestore().collection("vote")
  const lobby = useFirestoreCollectionData(lobbyCollection)

  const games = useFirestoreCollectionData(gamesCollection)

  const deleteSuggestions = useFirestore.FieldValue.delete()

  //returns array of unique game suggestions and filter out falsy values
  const suggestedGames = lobby.map((m) => m.suggestion).filter(Boolean)

  const uniqueVotingList = suggestedGames.filter(
    (v, i, a) => a.indexOf(v) === i
  )

  const countedVotes = suggestedGames.reduce((allGames, game) => {
    if (game in allGames) {
      allGames[game]++
    } else {
      allGames[game] = 1
    }
    return allGames
  }, {})

  const resetVotes = async () => {
    return lobbyCollection.get().then((snapshot) => {
      return Promise.all(
        snapshot.docs.map((doc) => {
          return doc.ref.update({ suggestion: "" })
        })
      )
    })
  }

  return (
    <div className="container is-fluid box">
      <div className="tile is-ancestor ">
        <div className="tile is-parent has-background-info notification is-vertical is-text-centered columns is-centered">
          <h3 className="title has-text-white mx-auto">Suggested Games</h3>
          <div className="columns is-centered is-3 is-multiline">
            {uniqueVotingList.map((game) => (
              <div className="column is-one-quarter " key={game}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        alt={game}
                        src={
                          games.find((g) => g.name === game).thumbnail +
                          "?random=" +
                          Math.floor(Math.random() * 100)
                        }
                        onError={(event) => {
                          //clear error caused by broken link and replace with placeholder
                          event.target.onError = null
                          event.target.src =
                            "https://picsum.photos/165/150?random=" +
                            Math.floor(Math.random() * 100)
                        }}
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      <p>
                        <strong>
                          {game} currently has {countedVotes[game]} votes
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="tile ">
            <button className="button" onClick={resetVotes}>
              Reset All Votes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
