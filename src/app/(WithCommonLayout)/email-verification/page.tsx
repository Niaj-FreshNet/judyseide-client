import EmailVerificationForm from "@/src/components/form/EmailVerificationForm";
import { Suspense } from "react";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationForm />
    </Suspense>
  );
}
