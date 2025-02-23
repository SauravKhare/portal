"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

interface MeetingPageProps {
	params: {
		id: string;
	};
}

export default function Meeting({
	params: { id: meetingID },
}: MeetingPageProps) {
	const [isReady, setIsReady] = useState(false);
	const { user, isLoaded } = useUser();
	const { call, isCallLoading } = useGetCallById(meetingID);

	if (!isLoaded || isCallLoading) return <Loader />;
	return (
		<main className="h-screen w-full">
			<StreamCall call={call}>
				<StreamTheme>
					{!isReady ? (
						<MeetingSetup setIsReady={setIsReady} />
					) : (
						<MeetingRoom />
					)}
				</StreamTheme>
			</StreamCall>
		</main>
	);
}
