'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import { NavigationItem } from './types';
import Link from 'next/link';

interface NavigationLinksProps {
  items: NavigationItem[];
  className?: string;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({ items, className }) => {
  const pathname = usePathname();
  return (
    <nav className={`${className} text-foreground`}>
      {items.map((item) => (
        <Link
         prefetch
          key={item.href}
          href={item.href}
          className={pathname === item.href ? styles.activeLink : styles.link}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
