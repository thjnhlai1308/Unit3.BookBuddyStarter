import { useState } from "react"

function App() {
  const [token, setToken] = useState(null)

  return (
    <div>
      <h1><img id='logo-image'/>Library App</h1>

      <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

      <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

      <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p>
    </div>
  )
}

export default App
