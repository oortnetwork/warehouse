import styled from "styled-components";

export const StyledMenu = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: white;
	transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
	height: 100vh;
	text-align: left;
	padding: 2rem;
	position: fixed;
	top: 0;
	left: 0;
	transition: transform 0.3s ease-in-out;
	@media (max-width: 900px) {
		width: 100%;
	}
	a {
		font-size: 2rem;
		text-transform: uppercase;
		padding: 1rem 0;
		letter-spacing: 0.5rem;
		color: black;
		text-decoration: none;
		transition: color 0.3s linear;
		@media (max-width: 900px) {
			font-size: 1.5rem;
			text-align: center;
		}
		&:hover {
			color: black;
		}
	}
`;
