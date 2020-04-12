import React from 'react'
import styled from 'styled-components'

import { FlexBox, Card, TextInput, Button, Header } from '../components'

const FormCard = styled(Card)`
	width: 350px;
`

const CreateQuiz = () => {
	return (
		<FlexBox
			align='center'
			justify='center'
			padding='large'
			marginBetween='large'
		>
			<FormCard
				padding={36}
				marginBetween='medium'
			>
				<h2>Create a New Quiz</h2>
				<TextInput label='Quiz Title' />
				<TextInput label='Author' />
				<Header
					justify='end'
					marginBetween='small'
				>
					<Button
						label='Add Question'
						color='secondary'
					/>
					<Button
						label='Submit'
						disabled
					/>
				</Header>
			</FormCard>
		</FlexBox>
	)
}

export default CreateQuiz
