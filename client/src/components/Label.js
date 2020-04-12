import styled from 'styled-components'

export const Label = styled.label`
	color: ${({ color }) => color ? color : '#827F7F'};
	font-size: ${({ fontSize }) => fontSize || 'inherit'};
	font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
`
