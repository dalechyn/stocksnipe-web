import React, { useState } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core'
import PropTypes from 'prop-types'

const AlertDialog = ({ title, text, onClose = () => {} }) => {
	const [open, setOpen] = useState(true)
	const handleClose = () => {
		setOpen(false)
		onClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary' autoFocus>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

AlertDialog.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onClose: PropTypes.func
}

export default AlertDialog
