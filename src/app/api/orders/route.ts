import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orderSchema } from "@/lib/validations";

function generateOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORD-${date}-${rand}`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Price database theke ashe, client theke na
  const ids = [...new Set(data.items.map((i) => i.serviceId))];
  const services = await db.service.findMany({
    where: { id: { in: ids }, isActive: true },
  });

  if (services.length !== ids.length) {
    return NextResponse.json(
      { error: "Ekta ba beshi service paoa jay nai" },
      { status: 400 }
    );
  }

  const priceMap = new Map(services.map((s) => [s.id, s.price]));

  const itemsData = data.items.map((i) => ({
    serviceId: i.serviceId,
    quantity: i.quantity,
    price: priceMap.get(i.serviceId)!,
  }));

  const totalAmount = itemsData.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  try {
    const order = await db.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        businessName: data.businessName,
        brief: data.brief,
        preferredDate: data.preferredDate,
        totalAmount,
        items: { create: itemsData },
      },
      include: { items: true },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}