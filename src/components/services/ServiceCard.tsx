import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { ServiceIcon } from "@/components/services/ServiceIcon";

type Props = {
  service: {
    name: string;
    slug: string;
    description: string;
    price: number;
  };
};

export function ServiceCard({ service }: Props) {
  return (
    <Card className="flex flex-col">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <ServiceIcon slug={service.slug} size={22} />
      </div>
      <CardTitle className="mt-4">{service.name}</CardTitle>
      <p className="mt-2 flex-1 text-sm text-navy/70">{service.description}</p>
      <p className="mt-4 text-sm font-semibold text-brand">
        Starting from {service.price.toLocaleString("en-US")} Tk
      </p>
      <div className="mt-3 flex items-center gap-4 text-sm font-medium">
        <Link
          href={`/services/${service.slug}`}
          className="text-navy hover:text-brand"
        >
          View details
        </Link>
        <Link
          href={`/order?service=${service.slug}`}
          className="text-brand hover:underline"
        >
          Order →
        </Link>
      </div>
    </Card>
  );
}