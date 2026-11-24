import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { MobileAppHeader } from './_components/mobile-app-header';
import { AppSidebar } from './app-sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="[--header-height:--spacing(12)] [--sidebar-width:--spacing(72)]">
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <MobileAppHeader />
        <div className="bg-surface min-h-screen px-4 lg:px-68">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
