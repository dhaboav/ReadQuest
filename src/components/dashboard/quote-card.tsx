import { Card, CardContent } from '@/components/ui/card';

export function QuoteCard() {
  return (
    <Card className="md:max-lg:w-80">
      <CardContent className="space-y-3 px-3">
        <p className="text-muted-foreground text-sm font-semibold">Quote</p>

        <blockquote className="text-sm leading-relaxed">
          "This world is too big, but we are all minor characters… I will work hard! I will definitely do my
          best!"
        </blockquote>

        <p className="text-muted-foreground text-xs">— Fang Yuan</p>
      </CardContent>
    </Card>
  );
}
