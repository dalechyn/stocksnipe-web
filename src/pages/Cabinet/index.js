import React, { Suspense, useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { userActions, cabinetActions, tokensActions, alertActions } from '../../actions'
import { api } from './api'
import { MUIAlertDialog, MUIBackdropProgress } from '../../components/MUIComponents'

const Cabinet = ({ resource }) => {
	resource.read()
	return <h1>cabinet</h1>
}

Cabinet.propTypes = {
	resource: PropTypes.shape({
		read: PropTypes.func
	})
}

const errorText = `Looks like you haven't been here for a while. Please re-login.`

const CabinetPage = ({
	alert,
	failedToLoad,
	tokensRefreshFailed,
	logout,
	loadCabinet,
	clearTokens,
	clearCabinet,
	clearAlert
}) => {
	return (
		<Suspense fallback={<MUIBackdropProgress />}>
			{alert.message && (failedToLoad || tokensRefreshFailed) ? (
				<MUIAlertDialog
					title={alert.message}
					text={errorText}
					onClose={() => {
						clearAlert()
						clearCabinet()
						clearTokens()
						logout()
					}}
				/>
			) : (
				<Cabinet resource={loadCabinet()} />
			)}
		</Suspense>
	)
}

CabinetPage.propTypes = {
	alert: PropTypes.shape({
		message: PropTypes.string,
		type: PropTypes.string
	}),
	loadCabinet: PropTypes.func,
	failedToLoad: PropTypes.bool,
	tokensRefreshFailed: PropTypes.bool,
	logout: PropTypes.func,
	clearTokens: PropTypes.func,
	clearCabinet: PropTypes.func,
	clearAlert: PropTypes.func
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
			cabinetLoad: cabinetActions.load,
			logout: userActions.logout,
			loadCabinet: api.loadCabinet,
			clearCabinet: cabinetActions.clear,
			clearTokens: tokensActions.clear,
			clearAlert: alertActions.clear
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(CabinetPage)
