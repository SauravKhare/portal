"use client";

import Image from "next/image";
import Link from "next/link";
import NewMeetingModal from "../NewMeetingModal";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

interface MeetingBoxProps {
	title: string;
	subtitle: string;
	iconUrl: string;
	iconAltText: string;
	meetingTypeString: MeetingType;
	className?: string;
}

type MeetingType =
	| "isNewMeeting"
	| "isJoiningMeeting"
	| "isScheduleMeeting"
	| "isViewRecordings"
	| undefined;

export default function MeetingBox({
	title,
	subtitle,
	iconUrl,
	iconAltText,
	meetingTypeString,
	className,
}: MeetingBoxProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});
	const [callDetails, setCallDetails] = useState<Call>();
	const router = useRouter();
	const { user } = useUser();
	const client = useStreamVideoClient();

	async function handleNewMeeting() {
		if (!user || !client) return;
		try {
			const callType = "development"; // Change this later
			const callId = crypto.randomUUID();
			const call = client.call(callType, callId);
			if (!call) throw new Error("Call not created");
			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || "Instant meeting";
			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
						link: values.link,
					},
				},
			});
			setCallDetails(call);
			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			{meetingTypeString !== "isNewMeeting" ? (
				<Link href={`/${meetingTypeString}`} passHref>
					<div
						onClick={() => console.log(meetingTypeString)}
						className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[15px] cursor-pointer`}
					>
						<div className="flex justify-center items-center glass size-12 rounded-[10px]">
							<Image src={iconUrl} width={27} height={27} alt={iconAltText} />
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="text-2xl font-bold">{title}</h1>
							<p className="text-lg font-normal">{subtitle}</p>
						</div>
					</div>
				</Link>
			) : (
				<div
					onClick={() => setIsModalOpen(!isModalOpen)}
					className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[15px] cursor-pointer`}
				>
					<div className="flex justify-center items-center glass size-12 rounded-[10px]">
						<Image src={iconUrl} width={27} height={27} alt={iconAltText} />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">{title}</h1>
						<p className="text-lg font-normal">{subtitle}</p>
					</div>
					{meetingTypeString === "isNewMeeting" && (
						<NewMeetingModal
							isOpen={isModalOpen}
							setIsOpen={setIsModalOpen}
							title="Start a new meeting"
							buttonText="Start Meeting"
							handleClick={handleNewMeeting}
						/>
					)}
				</div>
			)}
		</>
	);
}
