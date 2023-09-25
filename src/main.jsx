import axios from 'axios'

import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)

// let counter = 1

// const Refresh = () => {
//     ReactDOM.createRoot(document.getElementById('root')).render(
//         <App counter={counter} />
//     )
// }

// setInterval(() => {
//     Refresh()
//     counter += 1
// }, 1000)