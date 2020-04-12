import React from 'react'

import { FlexBox, QuizCard, } from '../components'

/* const CreateQuizButton = styled(Button)`
	position: fixed;
	bottom: 20px;
	right: 32px;
	height: 60px;
	width: 60px;
	min-width: unset;
	padding: 0px;
	border-radius: 50%;
	background-color: #FD3C99;
	color: white;
` */

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
