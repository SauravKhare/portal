"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
	label: string;
	route: string;
	iconUrl: string;
}

export default function SidebarLink({
	link,
	isMobile,
}: {
	link: SidebarLink;
	isMobile: boolean;
}) {
	const pathname = usePathname();
	const isActive = pathname === link.route;
	return (
		<Link
			key={link.label}
			href={link.route}
			className={cn("flex gap-4 items-center p-4 rounded-lg", {
				"bg-blue-400": isActive,
				"w-full max-w-60": isMobile,
				"justify-start": !isMobile,
			})}
		>
			<Image
				src={link.iconUrl}
				width={isMobile ? 20 : 24}
				height={isMobile ? 20 : 24}
				alt={link.label}
			/>
			<p
				className={cn("font-semibold", {
					"font-semibold max-lg:visible": isMobile,
					"text-lg max-lg:hidden": !isMobile,
				})}
			>
				{link.label}
			</p>
		</Link>
	);
}
