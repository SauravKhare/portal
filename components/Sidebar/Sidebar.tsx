import { sidebarLinks } from "@/constants";
import SidebarLink from "../SidebarLink/SidebarLink";

export default function Sidebar() {
	return (
		<aside className="bg-dark-500 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] sticky flex flex-col justify-between left-0 top-0 h-screen w-fit">
			<div className="flex flex-col gap-6">
				{sidebarLinks.map((link) => (
					<SidebarLink key={link.label} link={link} />
				))}
			</div>
		</aside>
	);
}
