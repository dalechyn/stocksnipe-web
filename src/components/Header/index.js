import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import { userActions } from '../../actions'

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

const Header = ({ authentication, logoutAction }) => {
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
					{authentication.loggedIn ? (
						<Button
							className={classes.buttons}
							variant='outlined'
							color='inherit'
							onClick={logoutAction}
						>
							Log out
						</Button>
					) : (
						<React.Fragment>
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
						</React.Fragment>
					)}
				</Hidden>
			</Toolbar>
			<Divider />
			<Hidden smUp>
				<Collapse in={collapsed}>
					<Box className={classes.dropDown}>
						{authentication.loggedIn ? (
							<Button
								className={classes.buttons}
								variant='outlined'
								color='inherit'
								onClick={() => {
									toggleCollapse()
									logoutAction()
								}}
							>
								Log out
							</Button>
						) : (
							<React.Fragment>
								<Button
									className={cn(classes.register, classes.buttons)}
									variant='contained'
									color='secondary'
									component={Link}
									to='/register'
									onClick={toggleCollapse}
								>
									Register
								</Button>
								<Button
									className={classes.buttons}
									variant='outlined'
									color='inherit'
									component={Link}
									to='/login'
									onClick={toggleCollapse}
								>
									Log in
								</Button>
							</React.Fragment>
						)}
					</Box>
				</Collapse>
			</Hidden>
		</AppBar>
	)
}

Header.propTypes = {
	authentication: PropTypes.object,
	logoutAction: PropTypes.func
}

const mapStateToProps = ({ authentication }) => ({ authentication })

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			logoutAction: userActions.logout
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
