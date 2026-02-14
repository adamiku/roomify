import { Box } from "lucide-react";
import { Button } from "./ui/Button";
import { useOutletContext } from "react-router";

export function Navbar() {
	const { isSignedIn, userName, signIn, signOut } =
		useOutletContext<AuthContext>();

	const handleAuthClick = async () => {
		if (isSignedIn) {
			try {
				await signOut();
			} catch (error) {
				console.error(`Puter sign out failed: ${error}`);
			}
			return;
		}
		try {
			await signIn();
		} catch (error) {
			console.error(`Puter sign in failed: ${error}`);
		}
		return;
	};
	return (
		<header className="navbar">
			<nav className="inner">
				<div className="left">
					<div className="brand">
						<Box className="logo" />
						<span className="name">Roomify</span>
					</div>
					<ul className="links">
						<li>
							<a href="#">Product</a>
						</li>
						<li>
							<a href="#">Pricing</a>
						</li>
						<li>
							<a href="#">Community</a>
						</li>
						<li>
							<a href="#">Enterprise</a>
						</li>
					</ul>
				</div>
				<div className="actions">
					{isSignedIn ? (
						<>
							<span className="greeting">
								{userName ? `Hello, ${userName}` : "Signed in"}
							</span>
							<Button
								size="sm"
								onClick={handleAuthClick}
								className="btn"
								type="button"
							>
								Log Out
							</Button>
						</>
					) : (
						<>
							<Button
								onClick={handleAuthClick}
								size="sm"
								variant="ghost"
								type="button"
							>
								Log In
							</Button>
							<a href="#upload" className="cta">
								Get Started
							</a>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
