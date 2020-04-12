import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { FlexBox, Header } from './components'

/* Pages */
import Home from './pages/Home'

const MainHeader = styled(Header)`
	background-color: #875FC0;
	color: white;
`

const App = () => {
	return (
		<FlexBox
			className='app'
			align='center'
			wrap={false}
		>
			<MainHeader
				paddingVertical='medium'
				paddingHorizontal='large'
			>
				<h1 style={{ fontWeight: 800, margin: '0px' }} >Quiz App</h1>
			</MainHeader>
			<div className='page' >
				<Switch>
					<Route
						exact
						path='/'
						component={Home}
					/>
				</Switch>
			</div>

		</FlexBox>
	)
}

export default App
