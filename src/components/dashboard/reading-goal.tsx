'use client';

import { useQuery } from '@tanstack/react-query';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import { getBookRead } from '@/db/crud/book';

const chartConfig = {
  books: {
    label: 'Books',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ReadingGoal() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['book-read'],
    queryFn: getBookRead,
  });

  const currentBooks = data?.currentBooks ?? 0;
  const targetBooks = data?.targetBooks ?? 0;

  const percentage = Math.min(Math.round((currentBooks / targetBooks) * 100), 100);

  const remainingBooks = Math.max(targetBooks - currentBooks, 0);

  const chartData = [
    {
      books: Math.min(currentBooks, targetBooks),
      fill: 'var(--color-books)',
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Annual Target</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-4">
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

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{isLoading ? '...' : isError ? '—' : `${percentage}%`}</span>
            <span className="text-tiny text-muted-foreground">Completed</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-3xl font-bold">
              {isLoading ? '...' : isError ? '—' : currentBooks}
              <span className="text-muted-foreground text-lg">/{targetBooks}</span>
            </p>

            <p className="text-muted-foreground text-sm">Books read this year</p>
          </div>

          <p className="text-primary text-sm font-medium">
            {isError
              ? 'Failed to load reading progress.'
              : remainingBooks > 0
                ? `${remainingBooks} books to go!`
                : 'Reading goal achieved! 🎉'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
