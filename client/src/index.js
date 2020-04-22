/* React */
import React from 'react'
import ReactDOM from 'react-dom'

/* Font Awesome Icons */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

/* React-Router */
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

/* Stylesheet */
import './styles/index.scss'

/* Root Component */
import App from './App'

/* Don't worry about this */
import * as serviceWorker from './serviceWorker'
const history = createBrowserHistory()

library.add(faTrash, faPlus)

ReactDOM.render(
	<React.StrictMode>
		<Router history={history} >
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
