import { MobileMenuButton } from './mobile-menu-button';

export function MobileAppHeader() {
  return (
    <header className="bg-surface flex items-center px-4 md:hidden">
      <MobileMenuButton />
      <p>ReadQuest</p>
    </header>
  );
}
