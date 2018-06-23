import React from 'react'
import ReactDOM from 'react-dom'
import { db } from './firebase'
import './index.css'
import App from './components/App'

ReactDOM.render(<App db={db} />, document.getElementById('projects'))
