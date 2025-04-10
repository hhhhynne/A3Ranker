'use client';
import { Navigation } from '@/lib/types/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavigationItemProps = {
  item: Navigation;
};

const NavigationDesktopItem = ({ item }: NavigationItemProps) => {
  const pathname = usePathname();
  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        'flex w-full items-center gap-2 px-2.5 py-2.5 text-sm hover:bg-primary rounded-md',
        active && 'rounded-lg bg-primary hover:bg-primary/90 ',
      )}
    >
      {item.title}
    </Link>
  );
};

export default NavigationDesktopItem;
