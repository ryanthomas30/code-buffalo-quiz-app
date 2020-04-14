import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { FlexBox, Card, Label, Header, Button } from '../components'

const QuestionCard = styled(Card)`
	width: 600px;
`

const AnswerBox = styled(Header)`
	user-select: none;
	background-color: #E5E5E5;
	padding: 12px;
	border-radius: 10px;
	width: 100%;
`

const ChoiceSelector = styled(FlexBox)`
	height: 44px;
	width: 44px;
	border-radius: 50%;
	font-weight: bold;
	background-color: ${({ active, correct }) => !active ? '#f4f4f4' : correct ? '#61B872' : '#F4272C' };
	color: ${({ active }) => active ? 'white' : '#827F7F'};
	user-select: none;
`

const TakeQuiz = () => {
	const { quizId } = useParams({})
	const [quiz, setQuiz] = useState()
	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState(-1)
	const [loading, setLoading] = useState(false)
	const getQuiz = async () => {
		setLoading(true)
		const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/quiz/${quizId}`)
		const quiz = {
			...response.data,
			/* questions: [
				{
					question_text: 'How many Joes does it take to have Ligma?',
					correct_answer: 3,
					answer_one: '3',
					answer_two: '4',
					answer_three: '24',
					answer_four: '69',
				}
			] */
		}
		setQuiz(quiz)
		setLoading(false)
	}

	useEffect(() => {
		getQuiz()
	}, [getQuiz])

	if (loading || !quiz) {
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

	const activeQuestion = quiz.questions[activeQuestionIndex]
	const onFirstQuestion = activeQuestionIndex === 0
	const onLastQuestion = activeQuestionIndex === quiz.questions.length - 1

	const nextQuestion = () => {
		setActiveQuestionIndex((activeQuestionIndex) => !onLastQuestion ? activeQuestionIndex + 1 : activeQuestionIndex)
		setSelectedAnswer(-1)
	}

	const previousQuestion = () => {
		setActiveQuestionIndex((activeQuestionIndex) =>!onFirstQuestion ? activeQuestionIndex - 1 : activeQuestionIndex)
		setSelectedAnswer(-1)
	}

	return (
		<FlexBox
			align='center'
			justify='center'
			padding='large'
		>
			<QuestionCard
				marginBetween='medium'
				padding={36}
			>
				<FlexBox>
					<h1>{quiz.title}</h1>
					<Label>{`Created by ${quiz.author}`}</Label>
				</FlexBox>
				<FlexBox
					marginBetween='medium'
					full='horizontal'
				>
					<h2>{`Question ${activeQuestionIndex + 1}`}</h2>
					<h3>{activeQuestion.question_text}</h3>
					<FlexBox
						marginBetween='small'
						full='horizontal'
					>
						<AnswerBox
							marginBetween='small'
							onClick={() => setSelectedAnswer(1)}
						>
							<ChoiceSelector
								align='center'
								justify='center'
								active={selectedAnswer === 1}
								correct={activeQuestion.correct_answer === 1}
							>
								A
							</ChoiceSelector>
							<Label>{activeQuestion.answer_one}</Label>
						</AnswerBox>
						<AnswerBox
							marginBetween='small'
							onClick={() => setSelectedAnswer(2)}
						>
							<ChoiceSelector
								align='center'
								justify='center'
								active={selectedAnswer === 2}
								correct={activeQuestion.correct_answer === 2}
							>
								B
							</ChoiceSelector>
							<Label>{activeQuestion.answer_two}</Label>
						</AnswerBox>
						<AnswerBox
							marginBetween='small'
							onClick={() => setSelectedAnswer(3)}
						>
							<ChoiceSelector
								align='center'
								justify='center'
								active={selectedAnswer === 3}
								correct={activeQuestion.correct_answer === 3}
							>
								C
							</ChoiceSelector>
							<Label>{activeQuestion.answer_three}</Label>
						</AnswerBox>
						<AnswerBox
							marginBetween='small'
							onClick={() => setSelectedAnswer(4)}
						>
							<ChoiceSelector
								align='center'
								justify='center'
								active={selectedAnswer === 4}
								correct={activeQuestion.correct_answer === 4}
							>
								D
							</ChoiceSelector>
							<Label>{activeQuestion.answer_four}</Label>
						</AnswerBox>
					</FlexBox>
				</FlexBox>
				<Header justify={onFirstQuestion ? 'end' : 'between'} >
					{!onFirstQuestion &&
						<Button
							label='Previous Question'
							color='secondary'
							onClick={previousQuestion}
						/>
					}
					<Button
						label={onLastQuestion ? 'Finish Quiz' : 'Next Question'}
						color={onLastQuestion ? 'primary' : 'secondary'}
						onClick={!onLastQuestion && nextQuestion}
						path={onLastQuestion && '/'}
					/>
				</Header>
			</QuestionCard>
		</FlexBox>
	)
}

export default TakeQuiz
