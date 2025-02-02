"use client";

import {
	DeviceSettings,
	useCall,
	VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function MeetingSetup() {
	const [isMicCamOn, setIsMicCamOn] = useState(false);
	const call = useCall();
	useEffect(() => {
		if (isMicCamOn) {
			call?.camera.disable();
			call?.microphone.disable();
		} else {
			call?.camera.enable();
			call?.microphone.enable();
		}
	}, [isMicCamOn, call?.camera, call?.microphone]);

	return (
		<div className="flex h-screen w-full flex-col items-center gap-3 justify-center text-white">
			<h1 className="text-2xl font-bold">Lobby</h1>
			<VideoPreview />
			<div className="flex h-16 items-center justify-center gap-3">
				<label className="flex items-center justify-center gap-2 font-medium">
					<input
						type="checkbox"
						checked={isMicCamOn}
						onChange={(e) => setIsMicCamOn(e.target.checked)}
					/>
					Disable video and microphone
				</label>
				<DeviceSettings />
				<Button className="rounded-md bg-green-500 px-4 py-2.5">
					Join meeting
				</Button>
			</div>
		</div>
	);
}
