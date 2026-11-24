'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';

const chartConfig = {
  books: {
    label: 'Books',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ReadingGoal() {
  const currentBooks = 21;
  const targetBooks = 30;
  const percentage = Math.round((currentBooks / targetBooks) * 100);
  const chartData = [
    {
      books: currentBooks,
      fill: 'var(--color-books)',
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Annual Target</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-4">
        {/* Radial Chart */}
        <div className="relative w-35 shrink-0">
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-radial-bar-background-sector]:fill-input aspect-square w-full"
          >
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={-270}
              innerRadius={52}
              outerRadius={65}
              barSize={12}
            >
              <PolarAngleAxis type="number" domain={[0, targetBooks]} dataKey="books" tick={false} />

              <RadialBar dataKey="books" background cornerRadius={10} />
            </RadialBarChart>
          </ChartContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{percentage}%</span>
            <span className="text-tiny text-muted-foreground">Completed</span>
          </div>
        </div>

        {/* Reading Statistics */}
        <div className="space-y-2">
          <div>
            <p className="text-3xl font-bold">
              {currentBooks}
              <span className="text-muted-foreground text-lg">/{targetBooks}</span>
            </p>

            <p className="text-muted-foreground text-sm">Books read this year</p>
          </div>

          <p className="text-primary text-sm font-medium">{targetBooks - currentBooks} books to go!</p>

          <Link
            href="/library"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}
          >
            View target
            <ArrowRightIcon />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
