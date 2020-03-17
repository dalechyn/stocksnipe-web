import React, { useEffect, Suspense } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { userActions, cabinetActions } from '../../actions'
import { CircularProgress } from '@material-ui/core'
import { api } from './api'

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
			logout: userActions.logoutWithoutRedirect,
			loadCabinet: api.loadCabinet
		},
		dispatch
	)

function Cabinet({ resource }) {
	resource.read()
	return <h1>cabinet</h1>
}

const CabinetPage = ({
	alert,
	failedToLoad,
	tokensRefreshFailed,
	logout,
	loadCabinet
}) => {
	/* useEffect(() => {
		if (tokensRefreshFailed || failedToLoad) {
			logout()
		}
	}, [tokensRefreshFailed, failedToLoad]) */

	if (tokensRefreshFailed || failedToLoad) {
		logout()
		return <Redirect to='/login' />
	}

	return (
		/* alert.message ? alert.message : */ <Suspense fallback={<CircularProgress />}>
			<Cabinet resource={loadCabinet()} />
		</Suspense>
	)
}

CabinetPage.propTypes = {
	cabinetLoad: PropTypes.func,
	alert: PropTypes.shape({
		message: PropTypes.string,
		type: PropTypes.string
	}),
	failedToLoad: PropTypes.bool,
	tokensRefreshFailed: PropTypes.bool,
	logout: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetPage)
