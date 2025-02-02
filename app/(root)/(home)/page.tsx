import MeetingBox from "@/components/MeetingBox";

export default function Home() {
	const time = new Date().toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});
	const date = new Date().toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<section className="flex flex-col gap-10 size-full text-white">
			<div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
				<div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
					<h2 className="glass max-w-[270px] rounded py-2 text-center text-base font-normal">
						{/* TODO: get this from API */}
						Upcoming Meeting at: 12:30 PM
					</h2>
					<div className="flex flex-col gap-2">
						<h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
						<p className="text-lg font-medium text-blue-300 lg:text-2xl">
							{date}
						</p>
					</div>
				</div>
			</div>
			<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
				<MeetingBox
					title="New Meeting"
					subtitle="Start a new meeting"
					iconUrl="/icons/add-meeting.svg"
					iconAltText="new meeting"
					meetingTypeString="isNewMeeting"
					className="bg-orange-400"
				/>
				<MeetingBox
					title="Join Meeting"
					subtitle="Join a meeting with code"
					iconUrl="/icons/join-meeting.svg"
					iconAltText="new meeting"
					meetingTypeString="isJoiningMeeting"
					className="bg-blue-400"
				/>
				<MeetingBox
					title="Schedule Meeting"
					subtitle="Plan a meeting for later"
					iconUrl="/icons/schedule.svg"
					iconAltText="new meeting"
					meetingTypeString="isScheduleMeeting"
					className="bg-purple-400"
				/>
				<MeetingBox
					title="View Recordings"
					subtitle="View all meeting recordings"
					iconUrl="/icons/recordings.svg"
					iconAltText="new meeting"
					meetingTypeString="isViewRecordings"
					className="bg-yellow-400"
				/>
			</section>
		</section>
	);
}
