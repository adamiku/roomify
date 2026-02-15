import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import {
	PROGRESS_INTERVAL_MS,
	PROGRESS_STEP,
	REDIRECT_DELAY_MS,
} from "@lib/constants";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
interface UploadProps {
	onComplete: (base64Data: string) => void;
}

export const Upload = ({ onComplete }: UploadProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [error, setError] = useState<string>("");
	const base64Ref = useRef<string>("");

	const { isSignedIn } = useOutletContext<AuthContext>();

	const processFile = (selectedFile: File) => {
		if (!isSignedIn) return;

		if (selectedFile.size > MAX_FILE_SIZE) {
			setError("File size exceeds 10 MB limit");
			return;
		}

		setError("");
		setFile(selectedFile);
		setProgress(0);
		setIsReady(false);
		base64Ref.current = "";

		const reader = new FileReader();

		reader.onload = (e) => {
			const base64Data = e.target?.result as string;
			base64Ref.current = base64Data;
			setIsReady(true);
		};

		reader.onerror = () => {
			setError("Failed to read file. Please try again.");
			setFile(null);
			setProgress(0);
			setIsReady(false);
			base64Ref.current = "";
		};

		reader.readAsDataURL(selectedFile);
	};

	useEffect(() => {
		if (!isReady) return;

		const interval = setInterval(() => {
			setProgress((prev) => Math.min(prev + PROGRESS_STEP, 100));
		}, PROGRESS_INTERVAL_MS);

		return () => {
			clearInterval(interval);
		};
	}, [isReady]);

	useEffect(() => {
		if (progress >= 100 && isReady && base64Ref.current) {
			const timeout = setTimeout(() => {
				onComplete(base64Ref.current);
			}, REDIRECT_DELAY_MS);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [progress, isReady, onComplete]);

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (isSignedIn) setIsDragging(true);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (!isSignedIn) return;

		const file = e.dataTransfer.files[0];

		if (file && ALLOWED_FILE_TYPES.includes(file.type)) {
			processFile(file);
		}
		return;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isSignedIn) return;

		const files = e.target.files;
		if (files && files.length > 0) {
			processFile(files[0]);
		}
	};

	return (
		<div className="upload">
			{!file ? (
				<div
					className={`dropzone ${isDragging ? "is-dragging" : ""}`}
					onDragEnter={handleDragEnter}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<input
						type="file"
						className="drop-input"
						accept=".jpg,.jpeg,.png"
						disabled={!isSignedIn}
						onChange={handleChange}
					/>
					<div className="drop-content">
						<div className="drop-icon">
							<UploadIcon size={20} />
						</div>
						<p>
							{isSignedIn
								? "Click to upload or just drag and drop"
								: "Sign in or sign up with Puter to upload"}
						</p>
						{error ? (
							<p className="help" style={{ color: "#ef4444" }}>
								{error}
							</p>
						) : (
							<p className="help">Maxium file size 10 MB.</p>
						)}
					</div>
				</div>
			) : (
				<div className="upload-status">
					<div className="status-content">
						<div className="status-icon">
							{progress === 100 ? (
								<CheckCircle2 className="check" />
							) : (
								<ImageIcon className="image" />
							)}
						</div>
						<h3>
							{file.name}
							<div className="progress">
								<div className="bar" style={{ width: `${progress}%` }} />
								<p className="status-text">
									{progress < 100
										? "Analyzing Floor Plan ..."
										: "Redirecting ..."}
								</p>
							</div>
						</h3>
					</div>
				</div>
			)}
		</div>
	);
};
