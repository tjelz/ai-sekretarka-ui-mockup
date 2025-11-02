/**
 * Dashboard Root Layout
 * Wraps all dashboard pages with authentication and layout
 */

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <DashboardLayout user={session.user}>{children}</DashboardLayout>;
}
