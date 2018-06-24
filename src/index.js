import React from 'react'
import ReactDOM from 'react-dom'
import { auth, db } from './firebase'
import './index.css'
import App from './components/App'

ReactDOM.render(
  <App auth={auth} db={db} />,
  document.getElementById('projects')
)
