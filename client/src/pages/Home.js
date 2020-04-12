import React from 'react'

import { FlexBox, QuizCard } from '../components'

const Home = () => {
	return (
		<FlexBox
			align='center'
			padding='large'
			marginBetween='large'
		>
			<QuizCard />
			<QuizCard />
			<QuizCard />
			<QuizCard />
			<QuizCard />
			<QuizCard />
			<QuizCard />
		</FlexBox>
	)
}

export default Home
