import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-8">
      <h1 className="text-3xl font-bold">Design system test</h1>

      <Card className="space-y-4">
        <CardTitle>Contact</CardTitle>
        <Input label="Naam" name="name" placeholder="Apnar naam" />
        <Input label="Email" name="email" error="Valid email din" />
        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <Button disabled>Disabled</Button>
      </Card>
    </div>
  );
}