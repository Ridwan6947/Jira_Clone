import KanBanBoard from "./KanBanBoard.jsx"
import "./index.css";
import {Toaster} from "react-hot-toast"

function App() {


  return (
    <div className="App">
      <h1>Jira Clone</h1>
      <KanBanBoard />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App
