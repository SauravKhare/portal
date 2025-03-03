import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Portal",
	description: "Video calls which just work!",
	icons: {
		icon: "/icons/logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// @ts-expect-error ClerkProvider
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className} bg-dark-400 antialiased`}>
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
