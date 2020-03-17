import { cabinetActions, tokensActions } from '../../actions'
import { reactConstants } from '../../constants/react.constants'

const wrapAsyncAction = asyncAction => actionArgs => (dispatch, getState) => {
	const pending = suspender => ({ type: reactConstants.FETCH_PENDING, suspender })
	const success = result => ({ type: reactConstants.FETCH_SUCCESS, result })
	const error = error => ({ type: reactConstants.FETCH_FAILURE, error })

	dispatch(
		pending(
			dispatch(asyncAction(actionArgs)).then(
				r => {
					console.log(r)
					dispatch(success(r))
				},
				e => dispatch(error(e))
			)
		)
	)

	return {
		read() {
			const { react: state } = getState()
			switch (state.status) {
				case reactConstants.FETCH_PENDING:
					throw state.suspender
				case reactConstants.FETCH_SUCCESS:
					return state.result
				case reactConstants.FETCH_FAILURE:
					throw error
				default:
					return state
			}
		}
	}
}

export const api = {
	loadCabinet: wrapAsyncAction(cabinetActions.load)
}
