import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "md",
	fullWidth = false,
	className = "",
	children,
	...props
}) => {
	const baseClass = "btn";
	const variantClass = `btn--${variant}`;
	const sizeClass = `btn--${size}`;
	const fullWidthClass = fullWidth ? "btn--full" : "";

	const combinedClasses = [
		baseClass,
		variantClass,
		sizeClass,
		fullWidthClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button className={combinedClasses} {...props}>
			{children}
		</button>
	);
};
