import React, { Suspense } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { wrapAsyncAction } from 'react-redux-fetcher'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import { userActions, cabinetActions, tokensActions, alertActions } from '../../actions'
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
	push,
	loadCabinet,
	clearTokens,
	clearCabinet,
	clearAlert
}) => (
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
                    push('/login')
				}}
			/>
		) : (
			<Cabinet resource={loadCabinet()} />
		)}
	</Suspense>
)

CabinetPage.propTypes = {
	alert: PropTypes.shape({
		message: PropTypes.string,
		type: PropTypes.string
	}),
	loadCabinet: PropTypes.func,
	failedToLoad: PropTypes.bool,
	tokensRefreshFailed: PropTypes.bool,
	logout: PropTypes.func,
	push: PropTypes.func,
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
			logout: userActions.logoutWithoutRedirect,
			loadCabinet: wrapAsyncAction(cabinetActions.load),
			clearCabinet: cabinetActions.clear,
			clearTokens: tokensActions.clear,
			clearAlert: alertActions.clear,
			push
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(CabinetPage)
