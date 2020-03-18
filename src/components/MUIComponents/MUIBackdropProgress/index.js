import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1
	}
}))

const MUIBackdropProgress = () => (
	<Backdrop className={useStyles().backdrop} open={true}>
		<CircularProgress color='primary' />
	</Backdrop>
)

export default MUIBackdropProgress
