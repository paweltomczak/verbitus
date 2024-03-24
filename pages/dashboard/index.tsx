import { useRequireAuth } from '../../hooks/useRequireAuth';

const Dashboard = () => {
  const { user } = useRequireAuth();

  return user && <div>Welcome to the protected page!</div>;
};

export default Dashboard;
