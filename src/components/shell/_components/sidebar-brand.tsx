'use client';

import { PanelRightClose, PanelRightIcon, PanelRightOpenIcon, XIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

export function SidebarBrand() {
  const { toggleSidebar, state } = useSidebar();
  const isOpen = state === 'expanded';

  const LogoContent = (
    <>
      <span className="grid">
        <span
          className="bg-inverse-foreground animation-duration-[5s] group-data-[state=expanded]:bg-foreground col-start-1 row-start-1 size-5 animate-spin group-data-[state=collapsed]:group-hover/side-button:opacity-0"
          style={{
            maskImage: 'url(/react.svg)',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskImage: 'url(/react.svg)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
          }}
        />
        <PanelRightClose className="col-start-1 row-start-1 size-5 opacity-0 group-hover/side-button:opacity-100" />
      </span>

      <span className="group-data-[state=collapsed]:hidden">ReadQuest</span>
    </>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between gap-2">
        {isOpen ? (
          <SidebarMenuButton
            render={<Link href="/" />}
            className="text-foreground hover:text-inverse-foreground flex items-center gap-2 text-sm font-medium transition-colors"
          >
            {LogoContent}
          </SidebarMenuButton>
        ) : (
          <Button
            onClick={toggleSidebar}
            size="icon"
            variant="outline"
            className="group/side-button bg-primary! relative flex items-center justify-center"
            aria-label="Toggle Sidebar"
          >
            {LogoContent}
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="group/nav grid size-4 group-data-[state=collapsed]:hidden"
        >
          <XIcon className="col-start-1 row-start-1 md:hidden" />
          <PanelRightIcon className="col-start-1 row-start-1 hidden group-hover/nav:opacity-0 group-data-[state=expanded]:block" />
          <PanelRightOpenIcon className="col-start-1 row-start-1 hidden opacity-0 group-hover/nav:opacity-100 group-data-[state=expanded]:block" />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
