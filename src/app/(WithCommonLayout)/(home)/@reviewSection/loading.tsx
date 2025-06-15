import Container from "@/src/components/UI/Container";
import SectionTitle from "@/src/components/UI/SectionTitle";

export default function Loading() {
  const skeletons = new Array(4).fill(0); // You can increase this if needed

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <SectionTitle
          align="left"
          subtitle=""
          title="Customer Reviews"
          titleClassName="text-default-900"
        />

        <div className="flex gap-4 overflow-hidden">
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="min-w-[250px] flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_33%] lg:flex-[0_0_25%] space-y-3"
            >
              <div className="w-full h-40 bg-gray-200 rounded-none animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded-none" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded-none" />
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-none" />
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
                <div className="h-3 w-1/3 bg-gray-300 rounded-none animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}