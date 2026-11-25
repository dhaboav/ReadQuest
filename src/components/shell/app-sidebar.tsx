import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';

import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { MenuGroup } from './_components/menu-group-item';
import { SidebarBrand } from './_components/sidebar-brand';
import { ThemeToggle } from './_components/theme-toggle';
import { NAV_ITEMS } from './nav';

const items = NAV_ITEMS.filter((item) => item.role === 'workspace');

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="md:pt-4">
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <MenuGroup title="Workspace" items={items} />
      </SidebarContent>

      <SidebarFooter className="flex w-full flex-col gap-3">
        <ThemeToggle />
        <Separator className="group-data-[collapsible=icon]:hidden" />
        <div className="flex flex-col items-center group-data-[collapsible=icon]:hidden">
          <div className="mb-1 flex gap-2">
            <span className="text-foreground text-xs font-semibold tracking-wide">ReadQuest</span>
            <Badge>v2.0</Badge>
          </div>

          <p className="text-muted-foreground text-tiny">
            Crafted with <span className="text-destructive">♥</span> by{' '}
            <a
              href="https://github.com/dhaboav"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              dhaboav
            </a>
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
