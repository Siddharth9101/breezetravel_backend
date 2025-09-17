import z from "zod";

export const loginSchema = z.object({
  username: z
    .string({ message: "Username must be a string!" })
    .nonempty("Username is required!"),
  password: z
    .string({ message: "Password must be a string!" })
    .nonempty("Password is required!"),
});
