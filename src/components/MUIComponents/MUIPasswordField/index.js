import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import {
	FormControl,
	FormHelperText,
	Input,
	OutlinedInput,
	FilledInput,
	InputLabel,
	InputAdornment,
	IconButton
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const variantsInput = {
	standard: Input,
	filled: FilledInput,
	outlined: OutlinedInput
}

const MUIPasswordField = forwardRef(function MUIPasswordField(
	{
		helperText,
		variant = 'standard',
		label = 'Password',
		InputProps,
		inputProps,
		...props
	},
	ref
) {
	const [showPassword, setShow] = useState(false)

	const StyledInput = variantsInput[variant]
	return (
		<FormControl ref={ref} variant={variant} {...props}>
			<InputLabel>{label}</InputLabel>
			<StyledInput
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='toggle password visibility'
							onClick={() => setShow(!showPassword)}
							onMouseDown={event => event.preventDefault()}
							edge='end'
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
				inputProps={inputProps}
				{...InputProps}
			/>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	)
})

MUIPasswordField.propTypes = {
	fullWidth: PropTypes.bool,
	helperText: PropTypes.string,
	variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
	label: PropTypes.string,
	InputProps: PropTypes.object,
	inputProps: PropTypes.object
}

export default MUIPasswordField
