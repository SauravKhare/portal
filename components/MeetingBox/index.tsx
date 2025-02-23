"use client";

import Image from "next/image";
import Link from "next/link";
import NewMeetingModal from "../NewMeetingModal";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "../ui/input";

export type MeetingType =
	| "isNewMeeting"
	| "isJoiningMeeting"
	| "isScheduleMeeting"
	| "isViewRecordings"
	| undefined;

interface MeetingBoxProps {
	title: string;
	subtitle: string;
	iconUrl: string;
	iconAltText: string;
	meetingTypeString: MeetingType;
	className?: string;
}

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
	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
			{meetingTypeString !== "isNewMeeting" &&
			meetingTypeString !== "isScheduleMeeting" &&
			meetingTypeString !== "isJoiningMeeting" ? (
				<Link
					href={`/${
						meetingTypeString === "isViewRecordings" ? "recordings" : ""
					}`}
					passHref
				>
					<div
						onClick={() => console.log(meetingTypeString)}
						className={`${className} px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-[15px] cursor-pointer`}
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
					onClick={() => setIsModalOpen(true)}
					className={`${className} px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-[15px] cursor-pointer`}
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
					{meetingTypeString === "isJoiningMeeting" && (
						<NewMeetingModal
							isOpen={isModalOpen}
							setIsOpen={setIsModalOpen}
							title="Enter meeting link"
							handleClick={() => {
								router.push(`${values.link}`);
							}}
							image=""
							buttonIcon=""
							buttonText="Join meeting"
							meetingTypeString="isScheduleMeeting"
							className="text-center"
						>
							<Input
								className="border-none bg-dark-600 focus-visible:ring-0 focus-visible:ring-offset-0"
								placeholder="Meeting link"
								onChange={(event) => {
									setValues({ ...values, link: event.target.value });
								}}
							/>
						</NewMeetingModal>
					)}
					{!callDetails && meetingTypeString === "isScheduleMeeting" ? (
						<NewMeetingModal
							isOpen={isModalOpen}
							setIsOpen={setIsModalOpen}
							title="Create meeting"
							handleClick={handleNewMeeting}
							buttonText="Schedule meeting"
							className="text-center"
						>
							<div className="flex flex-col gap-2.5">
								<label className="text-base text-normal leading-[22px] text-light-500">
									Add a description
								</label>
								<Textarea
									onChange={(event) => {
										setValues({ ...values, description: event.target.value });
									}}
									className="border-none bg-dark-500 focus-visible:ring-0 focus-visible-ring-offset-0"
								/>
							</div>
							<div className="flex w-full flex-col gap-2.5">
								<label className="text-base text-normal leading-[22px] text-light-500">
									Select date and time
								</label>
								<ReactDatePicker
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={15}
									timeCaption="time"
									dateFormat="MMMM d, yyyy h mm aa"
									selected={values.dateTime}
									onChange={(date) => setValues({ ...values, dateTime: date! })}
									className="w-full rounded bg-dark-500 p-2 focus:outline-none"
								/>
							</div>
						</NewMeetingModal>
					) : null}
					{callDetails && meetingTypeString === "isScheduleMeeting" ? (
						<NewMeetingModal
							isOpen={isModalOpen}
							setIsOpen={setIsModalOpen}
							title="Meeting created"
							handleClick={() => {
								navigator.clipboard.writeText(meetingLink);
								toast({ title: "Link copied" });
							}}
							image="/icons/checked.svg"
							buttonIcon="/icons/copy.svg"
							buttonText="Copy meeting link"
							meetingTypeString="isScheduleMeeting"
							className="text-center"
						/>
					) : null}
				</div>
			)}
		</>
	);
}
