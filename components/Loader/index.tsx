import Image from "next/image";

const Loader = () => {
	return (
		<div className="flex flex-center h-screen w-full items-center justify-center">
			<Image
				src="/icons/loading-circle.svg"
				alt="Loading..."
				width={50}
				height={50}
			/>
		</div>
	);
};

export default Loader;
