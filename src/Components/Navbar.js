import React from "react"
import { AuthenticationButtons } from "./AuthenticationButtons"

export function Navbar() {
  return (
    <nav className="navbar is-flex-touch is-flex-desktop is-justify-content-space-between	">
      <div className="navbar-brand is-flex-shrink-1">
        Fire Lobby
        <span role="img" aria-label="Fire Emoji">
          🔥
        </span>
      </div>
      <div className="navbar-menu is-flex-shrink-1 is-active">
        <div className="navbar-start"></div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <AuthenticationButtons />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
