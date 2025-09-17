import z from "zod";

export const wishlistSchema = z.object({
  userId: z
    .string({ message: "User Id must be a string!" })
    .nonempty("User Id is required!"),
  hotelId: z
    .string({ message: "Hotel Id must be a string!" })
    .nonempty("Hotel Id is required!"),
});
