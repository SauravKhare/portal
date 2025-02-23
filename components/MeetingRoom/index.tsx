"use client";

import { cn } from "@/lib/utils";
import {
	CallControls,
	CallingState,
	CallParticipantsList,
	CallStatsButton,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "../ui/EndCallButton";
import Loader from "../Loader";

export type CallScreenLayout = "speaker left" | "speaker right" | "grid";

function CallLayout({ layout }: { layout: CallScreenLayout }) {
	switch (layout) {
		case "grid":
			return <PaginatedGridLayout />;
		case "speaker right":
			return <SpeakerLayout participantsBarPosition={"left"} />;
		default:
			return <SpeakerLayout participantsBarPosition={"right"} />;
	}
}

export default function MeetingRoom() {
	const [layout, setLayout] = useState<CallScreenLayout>("speaker left");
	const [showParticipants, setShowParticipants] = useState(false);
	const searchParams = useSearchParams();
	const isPersonalRoom = !!searchParams.get("personal");
	const { useCallCallingState } = useCallStateHooks();
	const callCallingState = useCallCallingState();
	const router = useRouter();

	if (callCallingState !== CallingState.JOINED) return <Loader />;

	return (
		<section className="relative h-screen w-full overflow-hidden pt-4 text-white">
			<div className="relative flex size-full items-center justify-center">
				<div className="flex size-full max-w-[1000px] items-center max-md:pl-4 max-md:pr-4">
					<CallLayout layout={layout} />
				</div>
				<div
					className={cn(`h-[calc(100vh-86px)] hidden ml-2`, {
						block: showParticipants,
					})}
				>
					<CallParticipantsList onClose={() => setShowParticipants(false)} />
				</div>
			</div>
			<div className="fixed bottom-0 flex w-full items-center justify-center flex-wrap mb-4">
				<CallControls onLeave={() => router.push("/")} />
				<DropdownMenu>
					<div className="flex items-center ml-4 mr-4">
						<DropdownMenuTrigger className="rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#323b44]">
							<LayoutList size={20} className="text-white" />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className="bg-dark-400 text-white border-dark-400">
						{[`Grid`, `Speaker left`, `Speaker right`].map((layout, index) => (
							<div className="cusrsor-pointer" key={index}>
								<DropdownMenuItem
									onClick={() =>
										setLayout(layout.toLowerCase() as CallScreenLayout)
									}
								>
									{layout}
								</DropdownMenuItem>
							</div>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<CallStatsButton />
				<button onClick={() => setShowParticipants((prev) => !prev)}>
					<div className="cusrsor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#323b44] ml-4 mr-4">
						<User size={20} className="text-white" />
					</div>
				</button>
				{!isPersonalRoom && <EndCallButton />}
			</div>
		</section>
	);
}
