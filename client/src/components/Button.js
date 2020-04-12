import React from 'react'
import styled from 'styled-components'

import { FlexBox } from './FlexBox'
import { Icon } from './Icon'
import { Link } from './Link'

const UnstyledButton = (props) => {
	const { children, label, path, onClick, full, disabled, icon, type = 'button', style, className } = props
	const labelNode = (!!children || !!label) && <FlexBox>{children || label}</FlexBox>
	const iconNode = !!icon && (
		<FlexBox>
			<Icon
				icon={icon}
				color='white'
			/>
		</FlexBox>
	)

	const buttonInner = (
		<FlexBox
			className={className}
			justify='center'
			align='center'
			marginBetween='small'
			direction='row'
			wrap={false}
			full={full && 'horizontal'}
			onClick={onClick && !disabled ? () => onClick() : undefined }
			tag='button'
			type={type}
			style={style}
		>
			{iconNode}
			{labelNode}
		</FlexBox>
	)

	if (path && !disabled) {
		return (
			<Link
				to={path}
				style={{ width: full ? '100%' : '' }}
			>
				{buttonInner}
			</Link>
		)
	}
	return buttonInner
}

const colorMap = {
	primary: '#875FC0',
	secondary: '#FBAF00',
}

const getColor = (color) => {
	return color in colorMap ? colorMap[color] : color
}

export const Button = styled(UnstyledButton)`
	user-select: none;
	border-style: none;
	cursor: pointer;
	padding: 0px 20px;
	border-radius: 8px;
	min-width: 74px;
	height: 34px;
	background-color: ${({ color = 'primary' }) => getColor(color)};
	transition: all ease-in-out 200ms;
	opacity: ${({ disabled }) => disabled ? 0.6 : 'inherit'};
	&:hover {
		filter: brightness(110%)
	}
	&:focus {
		outline: none;
	}
	/* Button Text */
	color: white;
	font-size: 12px;
	font-weight: 600;
	white-space: nowrap;
`
