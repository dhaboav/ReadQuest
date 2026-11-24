import { MobileMenuButton } from './mobile-menu-button';

export function MobileAppHeader() {
  return (
    <header className="bg-surface border-ring flex items-center border-b px-2 py-3 md:hidden">
      <MobileMenuButton />
      <p>ReadQuest</p>
    </header>
  );
}
