import React from 'react'
import styled from 'styled-components'

import { FlexBox } from './FlexBox'
import { Header } from './Header'
import { Label } from './Label'

const Input = styled.input`
	width: -webkit-fill-available;
	padding: 12px 20px;
	border: 1px solid #d9d9d9;
	border-color: #f0f0f0;
	border-radius: 10px;
	background-color: #f4f4f4;
	transition: all 200ms ease-in-out;
	&:focus {
		outline: none;
		background-color: #f6f6f6;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	}
`

export const TextInput = ({ onChange, value, placeHolder, label, error, ...other }) => {
	return (
		<FlexBox
			full='horizontal'
			{...other}
		>
			<Header
				justify='between'
				paddingHorizontal={4}
			>
				<Label
					fontSize='11px'
					fontWeight='600'
				>
					{label}
				</Label>
				<Label
					fontSize='11px'
					fontWeight='600'
					color='#F4272C'
				>
					{error}
				</Label>
			</Header>
			<Input
				type='text'
				placeholder={placeHolder}
				value={value}
				onChange={onChange}
			/>
		</FlexBox>
	)
}

