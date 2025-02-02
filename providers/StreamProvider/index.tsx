"use client";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamProvider = ({ children }: { children: ReactNode }) => {
	const { user, isLoaded } = useUser();
	const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
		null
	);
	useEffect(() => {
		if (!isLoaded || !user) return;
		if (!apiKey) throw new Error("Stream API key missing");

		const fetchToken = async () => {
			try {
				const response = await fetch("/api/token");
				const { token } = await response.json();

				const client = new StreamVideoClient({
					apiKey,
					user: {
						id: user.id,
						name: user.fullName || user.id,
						image: user.imageUrl,
					},
					tokenProvider: () => token, // Use the fetched token
				});

				setVideoClient(client);
			} catch (error) {
				console.error("Error fetching token:", error);
			}
		};

		fetchToken();
	}, [user, isLoaded]);

	if (!videoClient) return <Loader />;
	return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamProvider;
