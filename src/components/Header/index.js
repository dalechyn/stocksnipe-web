import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar, Button, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	leftContent: {
		flexGrow: 1
	},
	register: {
		marginRight: theme.spacing(2)
	}
}))

const Header = () => {
	const classes = useStyles()

	return (
		<AppBar position='static'>
			<Toolbar>
				{/* This should be replaced by logo */}
				<Box className={classes.leftContent}>
					<Typography className={classes.logo} variant='h6'>
						StockSnipe
					</Typography>
				</Box>
				<Button
					className={classes.register}
					variant='contained'
					color='secondary'
					component={Link}
					to='/register'
				>
					Register
				</Button>
				<Button variant='contained' color='primary' component={Link} to='/login'>
					Log in
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Header
