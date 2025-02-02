import StreamProvider from "@/providers/StreamProvider";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<main>
			<StreamProvider>{children}</StreamProvider>
		</main>
	);
}
