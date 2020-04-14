import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { FlexBox, Header, Button, Link } from './components'

/* Pages */
import Home from './pages/Home'
import CreateQuiz from './pages/CreateQuiz'
import TakeQuiz from './pages/TakeQuiz'

const MainHeader = styled(Header)`
	background-color: #875FC0;
	color: white;
`

const CreateQuizButton = styled(Button)`
	height: 44px;
	font-size: 14px;
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
				justify='between'
			>
				<Link to='/' >
					<h1 style={{ fontWeight: 800, margin: '0px' }} >Quiz App</h1>
				</Link>
				<CreateQuizButton
					label='Create Quiz'
					color='secondary'
					icon='plus'
					path='/quiz/new'
				/>
			</MainHeader>
			<div className='page' >
				<Switch>
					<Route
						exact
						path='/'
						component={Home}
					/>
					<Route
						path='/quiz/new'
						component={CreateQuiz}
					/>
					<Route
						path='/quiz/:quizId'
						component={TakeQuiz}
					/>
				</Switch>
			</div>
		</FlexBox>
	)
}

export default App
