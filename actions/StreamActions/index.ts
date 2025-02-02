import { currentUser } from "@clerk/nextjs/server";
import { StreamClient, UserRequest } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET;

export const tokenProvider = async () => {
        const user = await currentUser();
        if (!user) {
          throw new Error("User not found");
        }
        if (!apiKey) {
          throw new Error("Stream API key is not provided");
        }
        if (!secret) {
          throw new Error("Stream secret is not provided");
        }

        const streamClient = new StreamClient(apiKey,secret);

        // const userId = user.id;
        const newUser: UserRequest = {
          id: user.id,
          role: "",
          custom: {
            color: "red",
          },
          name: user?.fullName || user?.id,
          image: user?.imageUrl || "",
        };
        await streamClient.upsertUsers([newUser]);
        // validity is optional (by default the token is valid for an hour)
        const vailidity = 60 * 60;
        const token = streamClient.generateUserToken({
          user_id: user?.id,
          validity_in_seconds: vailidity,
        });
        return token;
};