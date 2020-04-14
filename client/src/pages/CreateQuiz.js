import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { FlexBox, Card, TextInput, Button, Header, Icon } from '../components'

const FormCard = styled(Card)`
	width: 400px;
`

const QuestionCard = styled(Card)`
	width: 400px;
`

const ChoiceSelector = styled(FlexBox)`
	height: 44px;
	width: 44px;
	border-radius: 50%;
	font-weight: bold;
	background-color: ${({ choice, activeChoice }) => choice === activeChoice ? '#61B872' : '#f4f4f4'};
	color: ${({ choice, activeChoice }) => choice === activeChoice ? 'white' : '#827F7F'};
	user-select: none;
`

const EMPTY_QUESTION = {
	question_text: '',
	correct_answer: -1,
	answer_one: '',
	answer_two: '',
	answer_three: '',
	answer_four: '',
}

const CreateQuiz = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [questions, setQuestions] = useState([{ ...EMPTY_QUESTION }])
	const history = useHistory()

	const addQuestion = () => {
		setQuestions([...questions, { ...EMPTY_QUESTION }])
	}

	const deleteQuestion = (questionIndex) => {
		const updatedQuestions = [...questions]
		updatedQuestions.splice(questionIndex, 1)
		setQuestions(updatedQuestions)
	}

	const setQuestionState = (questionIndex, key, value ) => {
		const updatedQuestions = [...questions]
		updatedQuestions[questionIndex][key] = value
		setQuestions(updatedQuestions)
	}

	const submitQuiz = async () => {
		const quiz = {
			title,
			author,
			questions,
		}
		await axios.post(`${process.env.REACT_APP_BASE_URI}/quiz`, {
			...quiz
		})
		setTitle('')
		setAuthor('')
		setQuestions([{ ...EMPTY_QUESTION }])

		history.push('/')
	}

	const renderQuestions = () => questions.map((q, i) =>
		<QuestionCard
			key={i}
			marginBetween='medium'
			margin='medium'
			padding='large'
		>
			<Header justify='between' >
				<h3>{`Question ${i + 1}`}</h3>
				<Icon
					icon='trash'
					size='sm'
					onClick={() => deleteQuestion(i)}
				/>
			</Header>
			<TextInput
				label='Question'
				value={q.question_text}
				onChange={(e) => setQuestionState(i, 'question_text', e.target.value)}
			/>
			<TextInput
				label='Choice A'
				value={q.answer_one}
				onChange={(e) => setQuestionState(i, 'answer_one', e.target.value)}
			/>
			<TextInput
				label='Choice B'
				value={q.answer_two}
				onChange={(e) => setQuestionState(i, 'answer_two', e.target.value)}
			/>
			<TextInput
				label='Choice C'
				value={q.answer_three}
				onChange={(e) => setQuestionState(i, 'answer_three', e.target.value)}
			/>
			<TextInput
				label='Choice D'
				value={q.answer_four}
				onChange={(e) => setQuestionState(i, 'answer_four', e.target.value)}
			/>
			<h4>Select the correct answer</h4>
			<Header justify='between' >
				<ChoiceSelector
					choice={1}
					activeChoice={q.correct_answer}
					justify='center'
					align='center'
					onClick={() => setQuestionState(i, 'correct_answer', 1)}
				>
					A
				</ChoiceSelector>
				<ChoiceSelector
					choice={2}
					activeChoice={q.correct_answer}
					justify='center'
					align='center'
					onClick={() => setQuestionState(i, 'correct_answer', 2)}
				>
					B
				</ChoiceSelector>
				<ChoiceSelector
					choice={3}
					activeChoice={q.correct_answer}
					justify='center'
					align='center'
					onClick={() => setQuestionState(i, 'correct_answer', 3)}
				>
					C
				</ChoiceSelector>
				<ChoiceSelector
					choice={4}
					activeChoice={q.correct_answer}
					justify='center'
					align='center'
					onClick={() => setQuestionState(i, 'correct_answer', 4)}
				>
					D
				</ChoiceSelector>
			</Header>
		</QuestionCard>
	)

	const QUESTION_FIELDS = ['question_text', 'answer_one', 'answer_two', 'answer_three', 'answer_four']

	const correctAnswersSelected = () => questions.every((q) => q.correct_answer > 0)
	const questionFieldsNotEmpty = () => questions.every(q =>
		QUESTION_FIELDS.every(field => !!q[field])
	)

	const submitDisabled = !title || !author || questions.length < 1 || !correctAnswersSelected() || !questionFieldsNotEmpty()

	return (
		<FlexBox
			align='center'
			justify='center'
			padding='large'
			marginBetween='medium'
		>
			<FormCard
				padding={36}
				marginBetween='medium'
			>
				<h2>Create a New Quiz</h2>
				<TextInput
					label='Quiz Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextInput
					label='Author'
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>

				<Header
					justify='end'
					marginBetween='small'
				>
					<Button
						label='Add Question'
						color='secondary'
						onClick={addQuestion}
					/>
					<Button
						label='Submit'
						disabled={submitDisabled}
						onClick={submitQuiz}
					/>
				</Header>
			</FormCard>
			<FlexBox
				full='horizontal'
				direction='row'
				align='center'
				justify='center'
				marginBetween='medium'
			>
				{renderQuestions()}
			</FlexBox>
		</FlexBox>
	)
}

export default CreateQuiz
