import z from "zod";

export const loginSchema = z.object({
  username: z.string({ message: "Username must be a string!" }),
  password: z.string({ message: "Password must be a string!" }),
});
