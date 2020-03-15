import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { userActions, cabinetActions } from '../../actions'

const Cabinet = ({ cabinetLoad, alert, failedToLoad, tokensRefreshFailed, logout }) => {
	useEffect(() => {
		cabinetLoad()
	}, [])

	useEffect(() => {
		if (tokensRefreshFailed || failedToLoad) {
			logout()
		}
	}, [tokensRefreshFailed, failedToLoad])

	if (tokensRefreshFailed || failedToLoad) return <Redirect to='/login' />

	return alert.message ? alert.message : <>No alert</>
}

Cabinet.propTypes = {
	cabinetLoad: PropTypes.func,
	alert: PropTypes.shape({
		message: PropTypes.string,
		type: PropTypes.string
	}),
	failedToLoad: PropTypes.bool,
	tokensRefreshFailed: PropTypes.bool,
	logout: PropTypes.func
}

const mapStateToProps = ({
	alert,
	tokens: { tokensRefreshFailed },
	cabinet: { failedToLoad }
}) => ({
	alert,
	tokensRefreshFailed,
	failedToLoad
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			cabinetLoad: cabinetActions.cabinetLoad,
			logout: userActions.logoutWithoutRedirect
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet)
