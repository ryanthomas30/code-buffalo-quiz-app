import React from 'react'
import useFetch from 'use-http'

import { FlexBox, QuizCard } from '../components'

const Home = () => {
	const { data: quizzes, loading } = useFetch(`${process.env.REACT_APP_BASE_URI}/quizzes`, {}, [])
	if (loading) return null
	return (
		<FlexBox
			direction='row'
			align='center'
			justify='center'
			padding='large'
		>
			{
				quizzes.map(({ author, title, id }) => (
					<QuizCard
						margin='medium'
						key={id}
						author={author}
						title={title}
						quizId={id}
					/>
				))
			}
		</FlexBox>
	)
}

export default Home
