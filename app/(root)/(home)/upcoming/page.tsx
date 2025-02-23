import CallList from "@/components/CallList";

export default function UpcomingMeetingsPage() {
	return (
		<section className="flex flex-col gap-10 size-full text-white">
			<h1 className="text-3xl font-bold">Upcoming meetings</h1>
			<CallList type="upcoming" />
		</section>
	);
}
