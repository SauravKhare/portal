import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface NewMeetingModalProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	title: string;
	image?: string;
	className?: string;
	buttonText: string;
	buttonIcon?: string;
	handleClick?: () => void;
	children?: React.ReactNode;
}

export default function NewMeetingModal({
	isOpen,
	setIsOpen,
	title,
	image,
	className,
	buttonText,
	buttonIcon,
	handleClick,
	children,
}: NewMeetingModalProps) {
	const { toast } = useToast();
	if (isOpen) {
		return (
			<div className={className}>
				{title}
				<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
					<DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-400 px-6 py-9 text-white">
						<div className="flex flex-col gap-6">
							{image && (
								<div className="flex justify-center">
									<Image src={image} width={72} height={72} alt="image" />
								</div>
							)}
							<h1
								className={cn("text-3xl font-bold leading-[42px]", className)}
							>
								{title}
							</h1>
							{children}
							<Button
								onClick={() => {
									if (handleClick) handleClick();
									toast({
										title: "Meeting created",
										description: "",
									});
								}}
								className="bg-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0"
							>
								{buttonIcon && (
									<Image
										src={buttonIcon}
										width={13}
										height={13}
										alt="button icon"
									/>
								)}{" "}
								&nbsp;
								{buttonText}
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}
