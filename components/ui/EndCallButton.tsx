"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function EndCallButton() {
	const call = useCall();
	const { useLocalParticipant } = useCallStateHooks();
	const localParticipant = useLocalParticipant();
	const router = useRouter();

	const isOwner =
		localParticipant &&
		call?.state?.createdBy &&
		localParticipant?.userId === call?.state?.createdBy?.id;

	if (!isOwner) return null;

	return (
		<Button
			onClick={async () => {
				call?.endCall();
				router.push("/");
			}}
			className="bg-red-500"
		>
			End call for all
		</Button>
	);
}
