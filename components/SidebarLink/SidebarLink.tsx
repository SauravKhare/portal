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

export default function SidebarLink({ link }: { link: SidebarLink }) {
	const pathname = usePathname();
	const isActive = pathname === link.route || pathname.startsWith(link.route);
	return (
		<Link
			key={link.label}
			href={link.route}
			className={cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
				"bg-blue-400": isActive,
			})}
		>
			<Image src={link.iconUrl} width={24} height={24} alt={link.label} />
			<p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
		</Link>
	);
}
