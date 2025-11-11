import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { MaintenancePage } from '@/components/dashboard/MaintenancePage';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <MaintenancePage />;
}
