import React from 'react'
import { Link } from 'react-router-dom'
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	Hidden,
	Typography,
	IconButton,
	Divider,
	Collapse,
	makeStyles
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import cn from 'classnames'

const useStyles = makeStyles(theme => ({
	leftContent: {
		flexGrow: 1
	},
	register: {
		[theme.breakpoints.up('sm')]: {
			marginRight: theme.spacing(2)
		}
	},
	dropDown: {
		display: 'flex',
		flexFlow: 'column',
		padding: theme.spacing(2)
	},
	buttons: {
		[theme.breakpoints.down('xs')]: {
			margin: theme.spacing(1)
		}
	}
}))

const Header = () => {
	const classes = useStyles()
	const [collapsed, setCollapsed] = React.useState(false)

	const toggleCollapse = () => setCollapsed(!collapsed)

	return (
		<AppBar position='static'>
			<Toolbar>
				{/* This should be replaced by logo */}
				<Box className={classes.leftContent}>
					<Typography className={classes.logo} variant='h6'>
						StockSnipe
					</Typography>
				</Box>
				<Hidden smUp>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='end'
						onClick={toggleCollapse}
					>
						<MenuIcon />
					</IconButton>
				</Hidden>
				<Hidden xsDown>
					<Button
						className={cn(classes.register, classes.buttons)}
						variant='contained'
						color='secondary'
						component={Link}
						to='/register'
					>
						Register
					</Button>
					<Button
						className={classes.buttons}
						variant='outlined'
						color='inherit'
						component={Link}
						to='/login'
					>
						Log in
					</Button>
				</Hidden>
			</Toolbar>
			<Divider />
			<Hidden smUp>
				<Collapse in={collapsed}>
					<Box className={classes.dropDown}>
						<Button
							className={cn(classes.register, classes.buttons)}
							variant='contained'
							color='secondary'
							component={Link}
							to='/register'
						>
							Register
						</Button>
						<Button
							className={classes.buttons}
							variant='outlined'
							color='inherit'
							component={Link}
							to='/login'
						>
							Log in
						</Button>
					</Box>
				</Collapse>
			</Hidden>
		</AppBar>
	)
}

export default Header
