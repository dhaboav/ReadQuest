import {
  BookOpenTextIcon,
  ChartNoAxesCombinedIcon,
  CircleCheckBigIcon,
  LucideIcon,
  SquareLibraryIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReadingStatCardProps {
  label: string;
  icon: LucideIcon;
  data: string;
  description: string;
}

function ReadingStatCard({ icon: Icon, ...props }: ReadingStatCardProps) {
  return (
    <Card className="flex w-full p-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          {props.label}
          <Icon />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold">{props.data}</span>
        <span className="text-muted-foreground text-sm">{props.description}</span>
      </CardContent>
    </Card>
  );
}

const cardInfo = [
  { label: 'Total Book', icon: SquareLibraryIcon, content: '42', desc: 'title cataloged' },
  { label: 'Reading', icon: BookOpenTextIcon, content: '1', desc: 'active session' },
  { label: 'Completed', icon: CircleCheckBigIcon, content: '2', desc: 'read in full' },
  { label: 'IDK man', icon: ChartNoAxesCombinedIcon, content: '42', desc: 'book read' },
] as const;

export function ReadingStats() {
  return (
    <>
      {cardInfo.map((item, index) => (
        <ReadingStatCard
          key={index}
          label={item.label}
          icon={item.icon}
          data={item.content}
          description={item.desc}
        />
      ))}
    </>
  );
}
