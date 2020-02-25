import React, { useMemo, forwardRef } from 'react'
import { Link as MUILink } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const MUIRouterLink = ({ className, children, to, ...otherProps }) => {
	return (
		<MUILink
			className={className}
			component={useMemo(
				// eslint-disable-next-line react/display-name
				() => forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
				[to]
			)}
			{...otherProps}
		>
			{children}
		</MUILink>
	)
}

MUIRouterLink.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	to: PropTypes.string.isRequired
}

export default MUIRouterLink
