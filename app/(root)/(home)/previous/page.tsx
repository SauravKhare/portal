import CallList from "@/components/CallList";

export default function PreviousMeetingsPage() {
	return (
		<section className="flex flex-col gap-10 size-full text-white">
			<h1 className="text-3xl font-bold">Previous</h1>
			<CallList type="history" />
		</section>
	);
}
