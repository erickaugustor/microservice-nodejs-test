import Link from 'next/link';

export default ({ currentUser }) => {
	const links = [
		!currentUser && { labe: 'Sign Up', href: '/auth/signup' },
		!currentUser && { labe: 'Sign In', href: '/auth/signin' },
		currentUser && { labe: 'Sign Out', href: '/auth/signout' },
	].filter(linkConfig => linkConfig)
	 .map(({ label, href }) => {
		 return <li key={href} className="nav=item">
			 	<Link href={href}>
			 		{label}
			 	</Link>
			 </li>;
	 });

	return (
		<nav className="navbar navbar-light bg-light">
			<Link href="/">
				<a className="nabvar-brand">GitTix</a>
			</Link>

			<div className="d-flex justify-content-end">
				<ul className="nav d-flex align-items-center">
					{links}
				</ul>
			</div>
		</nav>
	)
};