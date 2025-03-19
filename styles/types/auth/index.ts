import { z, ZodType } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z
    .string()
    .min(1, "You must enter a email")
    .email("Invalid email format"),
  password: z
    .string()
    .min(1, "You must enter a password")
    .min(8, "Password is too short. It must be at least 8 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number."),
});

export type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    username: z
      .string()
      .min(1, "You must enter a username")
      .min(3, "Username must be at least 3 characters."),
    email: z
      .string()
      .min(1, "You must enter a email")
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, "You must enter a password")
      .min(8, "Password is too short. It must be at least 8 characters.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/\d/, "Password must contain at least one number."),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
