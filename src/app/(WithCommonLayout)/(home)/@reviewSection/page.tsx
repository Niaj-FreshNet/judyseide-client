import ReviewSectionClient from "@/src/components/client/ReviewSectionClient";
import { getReviews } from "@/src/services/Reviews";
import { UserIcon } from "lucide-react";

export default async function ReviewsPage() {
  const res = await getReviews();
  const enrichedReviews = res.data.data.map((r: any) => ({
    title: r.title,
    comment: r.comment,
    rating: r.rating,
    name: r.user?.name || "Anonymous",
    image: r.user?.image || <UserIcon />,
    date: new Date(r.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  return <ReviewSectionClient reviews={enrichedReviews} />;
}