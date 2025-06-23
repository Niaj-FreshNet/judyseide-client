import SectionTitle from "@/src/components/UI/SectionTitle";
import CheckoutForm from "@/src/components/form/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col gap-12 mb-16">
      <SectionTitle align="center" subtitle="" title="Checkout" titleClassName="text-default-900" />

      <CheckoutForm />

    </div>
  );
}
