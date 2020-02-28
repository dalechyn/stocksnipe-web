import React, { forwardRef } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import PropTypes from 'prop-types'

const MUILabeledCheckBox = forwardRef(function MUILabeledCheckBox(
	{ className, value, color, label, ...props },
	ref
) {
	return (
		<FormControlLabel
			className={className}
			ref={ref}
			control={<Checkbox value={value} color={color} {...props} />}
			label={label}
		/>
	)
})

MUILabeledCheckBox.propTypes = {
	className: PropTypes.string,
	value: PropTypes.any,
	color: PropTypes.oneOf(['primary', 'secondary', 'default']),
	label: PropTypes.node
}

export default MUILabeledCheckBox
