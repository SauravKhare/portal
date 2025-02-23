import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav/MobileNav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
	return (
		<nav className="flex bg-dark-500 fixed z-50 w-full justify-between px-6 py-4 lg:px-10">
			<Link href="/" className="flex items-center gap-1">
				<Image
					src="/icons/logo.svg"
					width={32}
					height={32}
					alt="Portal logo"
					className="max-sm:size-10"
				/>
				<p className="text-[26px] font-extrabold text-white max-sm:hidden">
					Portal
				</p>
			</Link>
			<div className="flex justify-between gap-5">
				{/* @ts-expect-error type error */}
				<SignedOut>
					<SignInButton />
				</SignedOut>
				{/* @ts-expect-error type error */}
				<SignedIn>
					<UserButton />
				</SignedIn>
				<MobileNav />
			</div>
		</nav>
	);
}
