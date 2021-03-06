import React from 'react'
import styled from 'styled-components'

import { Card } from './Card'
import { Header } from './Header'
import { FlexBox } from './FlexBox'
import { Label } from './Label'
import { Button } from './Button'
import { Icon } from './Icon'

// Height of the card
const HEIGHT = 150
// Width of the card
const WIDTH = 600

const Image = styled.img`
	width: ${HEIGHT}px;
	height: 100%;
	object-fit: cover;
`

export const UnstyledQuizCard = (props) => {
	const { quizId, title, author, className, onDelete, ...other } = props

	return (
		<Card
			direction='row'
			className={className}
			{...other}
		>
			<Image src={`https://picsum.photos/200/200?random=${quizId}`} />
			<FlexBox
				paddingHorizontal='medium'
				paddingVertical='small'
				grow
				full='vertical'
				justify='between'
			>
				<FlexBox full='horizontal' >
					<Header
						justify='between'
					>
						<h1>{title}</h1>
						<Icon
							icon='trash'
							size='sm'
							onClick={onDelete}
						/>
					</Header>
					<Label>
						Created by
						{' '}
						<b>{author}</b>
					</Label>
				</FlexBox>
				<Header
					justify='between'
				>
					<FlexBox
						direction='row'
						marginBetween='small'
					>
						<Button
							label='Take Quiz'
							path={`quiz/${quizId}`}
						/>
						<Button
							label='Edit Quiz'
							color='secondary'
						/>
					</FlexBox>
				</Header>
			</FlexBox>
		</Card>
	)
}

export const QuizCard = styled(UnstyledQuizCard)`
	width: ${WIDTH}px;
	height: ${HEIGHT}px;
	overflow: hidden;
`

