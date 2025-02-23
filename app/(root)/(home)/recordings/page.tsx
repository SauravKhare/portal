import CallList from "@/components/CallList";

export default function RecordingsPage() {
	return (
		<section className="flex flex-col gap-10 size-full text-white">
			<h1 className="text-3xl font-bold">Recordings</h1>
			<CallList type="recordings" />
		</section>
	);
}
