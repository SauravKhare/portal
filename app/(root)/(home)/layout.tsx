import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<main className="relative">
			<Navbar />
			<div className="flex">
				<Sidebar />
				<section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-14 sm:px-14">
					{children}
				</section>
			</div>
		</main>
	);
}
