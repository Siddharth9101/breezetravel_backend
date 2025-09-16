import { z } from "zod";
const registerSchema = z.object({
  username: z
    .string({ message: "Username must be a string!" })
    .min(3, "Username must atleast 3 chars long!"),
  email: z.email({ message: "Email must be a valid email address!" }),
  password: z
    .string({ message: "Password must be a string!" })
    .min(6, "Password must be atleast 6 chars!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@_])[A-Za-z0-9@_]{6,}$/,
      "Password must contain 1 uppercase, 1 lowercase, 1 _ or @ and 1 number"
    ),
  number: z
    .string({ message: "Number must be of type number!" })
    .length(10, "Number must be of 10 digits!"),
});

export { registerSchema };
