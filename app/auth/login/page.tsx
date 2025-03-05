"use client";
import { Button, Form } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

import FormField from "@/components/form-filed";
import { LoginFormData, LoginSchema } from "@/types/auth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-80">
        <div className="mb-6 text-2xl">Login</div>
        <Form
          className="w-full max-w-xs flex flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            className="mb-4"
            error={errors.email}
            label="Email"
            labelPlacement="outside"
            name="email"
            register={register}
            type="text"
          />
          <FormField
            error={errors.password}
            label="Password"
            labelPlacement="outside"
            name="password"
            register={register}
            type="password"
          />

          <Button className="w-full mt-4" color="primary" type="submit">
            Login
          </Button>

          <div className="w-full flex justify-center mt-2">
            <Link href="/auth/register">Register</Link>
          </div>

          <div className="w-full flex gap-4 items-center mt-6">
            <Button
              className="w-full"
              color="primary"
              size="lg"
              startContent={<FcGoogle />}
              variant="bordered"
            >
              Google
            </Button>
            <Button
              className="w-full"
              color="primary"
              size="lg"
              startContent={<ImGithub />}
              variant="bordered"
            >
              Github
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
