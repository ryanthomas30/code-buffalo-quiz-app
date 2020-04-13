import React from 'react'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UnstyledIcon = ({ color = '#827F7F', className, ...other }) => (
	<FontAwesomeIcon
		color={color}
		className={className}
		{...other}
	/>
)

export const Icon = styled(UnstyledIcon)`
	cursor: pointer;
`
