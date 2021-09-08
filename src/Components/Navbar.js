import React from "react"
import { AuthenticationButtons } from "./AuthenticationButtons"

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Fire Lobby 🔥</div>
      <div className="navbar-menu">
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
