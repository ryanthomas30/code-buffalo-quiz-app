import React from 'react'

import { FlexBox } from './FlexBox'

export const Header = ({ children, ...other }) => (
	<FlexBox
		full='horizontal'
		direction='row'
		align='center'
		{...other}
	>
		{children}
	</FlexBox>
)

