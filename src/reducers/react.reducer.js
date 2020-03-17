import { reactConstants } from '../constants/react.constants'

export const react = (state = {}, action) => {
	switch (action.type) {
		case reactConstants.FETCH_PENDING:
			return { status: action.type, suspender: action.suspender }
		case reactConstants.FETCH_SUCCESS:
			return { status: action.type, result: action.result }
		case reactConstants.FETCH_FAILURE:
			return { status: action.type, error: action.error }
		default:
			return state
	}
}
