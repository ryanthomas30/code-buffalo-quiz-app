import React from 'react'
import styled from 'styled-components'

import { Card } from './Card'
import { Header } from './Header'
import { FlexBox } from './FlexBox'
import { Label } from './Label'

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
	const { className, title = 'Quiz 1', author = 'Joe' } = props
	return (
		<Card
			direction='row'
			className={className}
		>
			<Image src='https://picsum.photos/500/300' />
			<FlexBox
				padding='medium'
				grow
				full='vertical'
				justify='between'
			>
				<FlexBox>
					<h1>{title}</h1>
					<Label>
						Created by
						{' '}
						<b>{author}</b>
					</Label>
				</FlexBox>
				<Header
					justify='end'
				>
					<Label>
						11/22/2019
					</Label>
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

