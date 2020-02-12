import React, { useState } from 'react'
import {
	Navbar,
	NavbarToggler,
	Nav,
	Collapse,
	NavItem,
	Button,
	NavLink
} from 'reactstrap'
import './styles.scss'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	return (
		<section className='SSHeader'>
			<Navbar color='light' light expand='md'>
				<a
					href='/'
					className='position-absolute align-self-start align-self-md-center SSLogo'
				>
					{/* TEMPORARY TEXT SHOULD BE REPLACED BY LOGO */}
					<h2>StockSnipe</h2>
				</a>
				<NavbarToggler className='ml-auto' onClick={toggle} />
				<Collapse className='flex-row-reverse' isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink href='/signin'>
								<Button color='primary' className='w-100'>
									Sign In
								</Button>
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</section>
	)
}

export default Header
