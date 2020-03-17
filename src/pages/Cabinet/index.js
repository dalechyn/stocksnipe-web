import React, { Suspense } from 'react'
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
			cabinetLoad: cabinetActions.load,
			logout: userActions.logoutWithoutRedirect,
			loadCabinet: api.loadCabinet
		},
		dispatch
	)

const Cabinet = ({ resource }) => {
	resource.read()
	return <h1>cabinet</h1>
}

Cabinet.propTypes = {
	resource: PropTypes.shape({
		read: PropTypes.func
	})
}

const CabinetPage = ({ failedToLoad, tokensRefreshFailed, logout, loadCabinet }) => {
	if (tokensRefreshFailed || failedToLoad) {
		logout()
		return <Redirect to='/login' />
	}

	return (
		<Suspense fallback={<CircularProgress />}>
			<Cabinet resource={loadCabinet()} />
		</Suspense>
	)
}

CabinetPage.propTypes = {
	loadCabinet: PropTypes.func,
	failedToLoad: PropTypes.bool,
	tokensRefreshFailed: PropTypes.bool,
	logout: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetPage)
