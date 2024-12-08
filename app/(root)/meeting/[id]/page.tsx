interface MeetingPageProps {
	params: {
		id: string;
	};
}

export default function Meeting({
	params: { id: meetingID },
}: MeetingPageProps) {
	return <div>Meeting page: meeting id is: {meetingID}</div>;
}
