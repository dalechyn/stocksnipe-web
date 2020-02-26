import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarToggler, Nav, Collapse, NavItem, Button } from 'reactstrap'
import './styles.scss'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	return (
		<section className='SSHeader'>
			<Navbar color='light' light expand='md'>
				<Link
					to='/'
					className='position-absolute align-self-start align-self-md-center SSLogo'
				>
					{/* TEMPORARY TEXT SHOULD BE REPLACED BY LOGO */}
					<h2>StockSnipe</h2>
				</Link>
				<NavbarToggler className='ml-auto' onClick={toggle} />
				<Collapse className='flex-row-reverse' isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<Link to='/login'>
								<Button color='primary' className='w-100'>
									Log in
								</Button>
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</section>
	)
}

export default Header
