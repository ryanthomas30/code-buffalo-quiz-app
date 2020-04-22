import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { FlexBox, QuizCard } from '../components'

const Home = () => {
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(false)
	const getQuizzes = async () => {
		setLoading(true)
		const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/quizzes`)
		setQuizzes(response.data)
		setLoading(false)
	}

	const deleteQuiz = async (quizId) => {
		await axios.delete(`${process.env.REACT_APP_BASE_URI}/quiz/${quizId}`)
		getQuizzes()
	}

	useEffect(() => {
		getQuizzes()
	}, [])

	if (loading) {
		return (
			<FlexBox
				direction='row'
				align='center'
				justify='center'
				padding='large'
			>
				Loading...
			</FlexBox>
		)
	}
	if (quizzes.length === 0) {
		return (
			<FlexBox
				direction='row'
				align='center'
				justify='center'
				padding='large'
			>
				No quizzes available.
			</FlexBox>
		)
	}
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
						onDelete={() =>deleteQuiz(id)}
					/>
				))
			}
		</FlexBox>
	)
}

export default Home
