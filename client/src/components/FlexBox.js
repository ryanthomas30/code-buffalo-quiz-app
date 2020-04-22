import React from 'react'
import styled from 'styled-components'

const mapping = {
	start: 'flex-start',
	end: 'flex-end',
	between: 'space-between',
	small: '12px',
	medium: '24px',
	large: '48px',
}

const wrapMap = (b) => b ? 'wrap' : 'nowrap'

const map = (input) => {
	if (!input) return ''
	if (input in mapping) {
		return mapping[input]
	}
	return input
}

const UnstyledFlexBox = (props) => {
	const {
		children,
		justify = '',
		align = 'start',
		wrap = true,
		grow = false,
		/* Margin */
		margin,
		marginLeft,
		marginRight,
		marginTop,
		marginBottom,
		marginVertical,
		marginHorizontal,
		/* Padding */
		padding,
		paddingLeft,
		paddingRight,
		paddingTop,
		paddingBottom,
		paddingVertical,
		paddingHorizontal,
		full,
		width,
		onClick,
		onBlur,
		title,
		type,
		tag = 'div',
		className,
		style,
	} = props

	const sizeObj = {}
	if (width) {
		sizeObj.width = typeof width === 'number' ? `${width}px` : width
	}
	if (full === true) {
		sizeObj.width = '100%'
		sizeObj.height = '100%'
	} else if (full === 'vertical') {
		sizeObj.height = '100%'
	} else if (full === 'horizontal') {
		sizeObj.width = '100%'
	}

	/* FLEX */
	const justifyContent = map(justify)
	const alignItems = map(align)
	const flexWrap = wrapMap(wrap)
	const flexGrow = grow ? '1' : '0'

	/* PADDING */
	const paddingObj = { padding, paddingLeft, paddingRight, paddingTop, paddingBottom }
	if (paddingVertical) {
		paddingObj.paddingTop = paddingVertical
		paddingObj.paddingBottom = paddingVertical
	}
	if (paddingHorizontal) {
		paddingObj.paddingLeft = paddingHorizontal
		paddingObj.paddingRight = paddingHorizontal
	}
	Object.keys(paddingObj).forEach((k) => {
		paddingObj[k] = typeof paddingObj[k] === 'number' ? `${paddingObj[k]}px` : map(paddingObj[k])
	})

	/* MARGIN */
	const marginObj = { margin, marginLeft, marginRight, marginTop, marginBottom }
	if (marginVertical) {
		marginObj.marginTop = marginVertical
		marginObj.marginBottom = marginVertical
	}
	if (marginHorizontal) {
		marginObj.marginLeft = marginHorizontal
		marginObj.marginRight = marginHorizontal
	}
	Object.keys(marginObj).forEach(k => {
		marginObj[k] = typeof marginObj[k] === 'number' ? `${marginObj[k]}px` : map(marginObj[k])
	})

	/* Merges props with style object */
	const finalStyling = {
		display: 'flex',
		boxSizing: 'border-box',
		justifyContent,
		alignItems,
		flexWrap,
		flexGrow,
		...paddingObj,
		...marginObj,
		...sizeObj,
		...style,
	}

	/* Delete undefined fields */
	Object.keys(finalStyling).forEach(key => {
		if (finalStyling[key] === undefined || finalStyling[key] === '') delete finalStyling[key]
	})

	const Element = tag
	return (
		<Element
			style={finalStyling}
			className={className}
			title={title}
			onClick={onClick}
			onBlur={onBlur}
			type={type}
		>
			{children}
		</Element>
	)
}

const betweenMapping = {
	small: '12px',
	medium: '24px',
	large: '48px',
}

const mapBetween = (input) => {
	if (!input) return undefined
	if (input in betweenMapping) {
		return betweenMapping[input]
	}
	return typeof input === 'number' ? `${input}px` : input
}

export const FlexBox = styled(UnstyledFlexBox)`
	cursor: ${({ onClick }) => !!onClick && 'pointer'};
	flex-direction: ${props => props.direction || 'column'};
	> *:not(:last-child) {
		margin-bottom: ${props => props.direction === 'column' || !props.direction ? mapBetween(props.marginBetween) : undefined};
		margin-right: ${props => props.direction === 'row' ? mapBetween(props.marginBetween) : undefined};

		padding-bottom: ${props => props.direction === 'column' || !props.direction ? mapBetween(props.paddingBetween) : undefined};
		padding-right: ${props => props.direction === 'row' ? mapBetween(props.paddingBetween) : undefined};
	}
`
