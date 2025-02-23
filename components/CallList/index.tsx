"use client";

import useGetCalls from "@/hooks/getCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "../MeetingCard";
import Loader from "../Loader";
import { toast } from "@/hooks/use-toast";

export interface CallListProps {
	type: "upcoming" | "history" | "recordings";
}

export default function CallList({ type }: CallListProps) {
	const [recordedCalls, setRecordedCalls] = useState<CallRecording[]>([]);
	const { isLoading, enededCalls, upcomingCalls, callRecordings } =
		useGetCalls();
	const router = useRouter();

	function getCalls() {
		switch (type) {
			case "upcoming":
				return upcomingCalls;
			case "history":
				return enededCalls;
			case "recordings":
				return recordedCalls;
			default:
				return [];
		}
	}

	useEffect(() => {
		const fetchRecordings = async () => {
			try {
				const callData = await Promise.all(
					callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
				);

				const recordings = callData
					.filter((call) => call.recordings.length > 0)
					.flatMap((call) => call.recordings);

				setRecordedCalls(recordings);
			} catch (error) {
				toast({ title: "Try again later" });
				console.error(error);
			}
		};

		if (type === "recordings") {
			fetchRecordings();
		}
	}, [type, callRecordings]);

	const calls = getCalls();

	if (isLoading) return <Loader />;

	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
			{calls && calls.length > 0 ? (
				calls.map((call: Call | CallRecording, index: number) => (
					<MeetingCard
						key={(call as Call)?.id || index}
						icon={
							type === "history"
								? "/icons/previous.svg"
								: type === "upcoming"
								? "/icons/upcoming.svg"
								: "/icons/recordings.svg"
						}
						title={
							(call as Call).state?.custom?.description ||
							(call as CallRecording).filename?.substring(0, 20) ||
							"No Description"
						}
						date={
							(call as Call).state?.startsAt?.toLocaleString() ||
							(call as CallRecording).start_time?.toLocaleString()
						}
						isPreviousMeeting={type === "history"}
						link={
							type === "recordings"
								? (call as CallRecording).url
								: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
										(call as Call).id
								  }`
						}
						buttonIcon={type === "recordings" ? "/icons/play.svg" : undefined}
						buttonText={type === "recordings" ? "Play" : "Start"}
						handleClick={
							type === "recordings"
								? () => router.push(`${(call as CallRecording).url}`)
								: () => router.push(`/meeting/${(call as Call).id}`)
						}
					/>
				))
			) : (
				<div>No calls found</div>
			)}
		</div>
	);
}
