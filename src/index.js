import "bulma/css/bulma.css"

import { firebaseConfig } from "./config/firebaseConfig"

import React from "react"
import { unstable_createRoot } from "react-dom"
import { AuthCheck, FirebaseAppProvider, SuspenseWithPerf } from "reactfire"

import { Navbar } from "./Components/Navbar"
import { Lobby } from "./Components/Lobby"

function App() {
  return (
    <FirebaseAppProvider
      firebaseConfig={firebaseConfig}
      traceId={"loading-app-status"}>
      <SuspenseWithPerf fallback={<p>Loading...</p>}>
        <Navbar />
        <AuthCheck fallback={<p>Not Logged In...</p>}>
          <Lobby></Lobby>
        </AuthCheck>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  )
}

unstable_createRoot(document.getElementById("root")).render(<App />)
