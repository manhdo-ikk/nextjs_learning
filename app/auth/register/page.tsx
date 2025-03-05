"use client";
import { Button, Form } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

import FormField from "@/components/form-filed";
import { RegisterFormData, RegisterSchema } from "@/types/auth";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (
    data: RegisterFormData,
  ) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-80">
        <div className="mb-6 text-2xl">Register</div>
        <Form
          className="w-full max-w-xs flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            className="mb-2"
            error={errors.username}
            label="Username"
            labelPlacement="outside"
            name="username"
            register={register}
          />
          <FormField
            className="mb-2"
            error={errors.email}
            label="Email"
            labelPlacement="outside"
            name="email"
            register={register}
          />
          <FormField
            className="mb-2"
            error={errors.password}
            label="Password"
            labelPlacement="outside"
            name="password"
            register={register}
            type="password"
          />
          <FormField
            className="mb-2"
            error={errors.password_confirmation}
            label="Password confirm"
            labelPlacement="outside"
            name="password_confirmation"
            register={register}
            type="password"
          />

          <Button className="w-full mt-4" color="primary" type="submit">
            Register
          </Button>

          <div className="w-full flex justify-center">
            <Link href="/auth/login">Login</Link>
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
