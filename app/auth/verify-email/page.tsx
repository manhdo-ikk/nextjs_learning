import { Button } from "@heroui/button";

export default function VerifyEmail() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="mb-4">
        Please check your email to activate your account. If you haven’t
        received an email, you can request a new one.
      </p>
      <Button color="primary">Resend Email</Button>
    </div>
  );
}
