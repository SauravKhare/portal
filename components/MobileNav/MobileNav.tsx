import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import SidebarLink from "@/components/SidebarLink/SidebarLink";

export default function MobileNav() {
	return (
		<div className="flex w-full max-w-[264px]">
			<Sheet>
				<SheetTrigger asChild>
					<Image
						src="/icons/hamburger.svg"
						width={36}
						height={36}
						alt="hamburger icon"
						className="cursor-pointer sm:hidden"
					/>
				</SheetTrigger>
				<SheetContent side="left" className="border-none bg-dark-500">
					<Link href="/" className="flex items-center gap-1">
						<Image
							src="/icons/logo.svg"
							width={32}
							height={32}
							alt="Portal logo"
							className="max-sm:size-10"
						/>
						<p className="text-[26px] font-extrabold text-white">Portal</p>
					</Link>
					<div className="flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]">
						<SheetClose asChild>
							<section className="flex flex-col h-full gap-5 pt-16 text-white">
								{sidebarLinks.map((link) => (
									<SheetClose asChild key={link.label}>
										<SidebarLink link={link} isMobile={true} />
									</SheetClose>
								))}
							</section>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
