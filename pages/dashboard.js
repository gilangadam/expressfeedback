import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import Fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, Fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
