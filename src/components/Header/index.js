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
	Menu,
	MenuItem,
	makeStyles
} from '@material-ui/core'
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons'
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'
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

const Header = ({ auth, logoutAction }) => {
	const classes = useStyles()
	const [collapsed, setCollapsed] = React.useState(false)
	const popUpState = usePopupState({ variant: 'popover' })

	const toggleCollapse = () => setCollapsed(!collapsed)

	return (
		<AppBar position='static'>
			<Toolbar>
				{/* This should be replaced by logo */}
				<Box className={classes.leftContent}>
					<Typography component={Link} to='/' className={classes.logo} variant='h6'>
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
					{auth.loggedIn ? (
						<div>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								{...bindTrigger(popUpState)}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
							<Menu
								{...bindMenu(popUpState)}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								onClose={popUpState.close}
							>
								<MenuItem component={Link} to='/cabinet' onClick={popUpState.close}>
									Profile
								</MenuItem>
								<MenuItem onClick={popUpState.close}>My account</MenuItem>
								<MenuItem
									onClick={() => {
										logoutAction()
										popUpState.close()
									}}
								>
									Logout
								</MenuItem>
							</Menu>
						</div>
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
						{auth.loggedIn ? (
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
	auth: PropTypes.object,
	logoutAction: PropTypes.func
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			logoutAction: userActions.logout
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
