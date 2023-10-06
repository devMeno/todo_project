import { useState } from 'react'
import './App.css'
import Bloc from './components/bloc'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Bloc />
        </>
    )
}

export default App
