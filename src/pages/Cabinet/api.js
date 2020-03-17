import { cabinetActions } from '../../actions'
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
			const {
				react: { status, suspender, result }
			} = getState()
			switch (status) {
				case reactConstants.FETCH_PENDING:
					throw suspender
				case reactConstants.FETCH_SUCCESS:
					return result
				case reactConstants.FETCH_FAILURE:
					throw error
			}
		}
	}
}

export const api = {
	loadCabinet: wrapAsyncAction(cabinetActions.cabinetLoad)
}
