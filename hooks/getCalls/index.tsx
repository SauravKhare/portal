import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function useGetCalls() {
	const [calls, setCalls] = useState<Call[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const client = useStreamVideoClient();
	const user = useUser();

	const now = new Date();

	const enededCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
		return (startsAt && new Date(startsAt) < now) || !!endedAt;
	});
	const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
		return startsAt && new Date(startsAt) > now;
	});

	useEffect(() => {
		async function loadCalls() {
			if (!client || !user?.user?.id) return;
			setIsLoading(true);
			try {
				const { calls } = await client.queryCalls({
					sort: [{ field: "starts_at", direction: -1 }],
					filter_conditions: {
						starts_at: { $exists: true },
						$or: [
							{ created_by_user_id: user?.user?.id },
							{ members: { $in: [user?.user?.id] } },
						],
					},
				});
				setCalls(calls);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		loadCalls();
	}, [client, user?.user?.id]);

	return { callRecordings: calls, isLoading, enededCalls, upcomingCalls };
}
