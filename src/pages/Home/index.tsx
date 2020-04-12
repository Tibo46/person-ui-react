import React from 'react';
import Link from '../../components/Link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Employee Manager</h1>
      <h2>Manage your employees easily</h2>
      <p>
        You can use the search bar on the header to look for any specific employee or group of
        employee.
        <br />
        To see all of them, use the <Link href="/employees">Employee page</Link>.
        <br />
        If you have a new hire, don't forget to add him/her into the system via the{' '}
        <Link href="/employees/add">Employee Create page</Link>!
      </p>
    </div>
  );
};

export default Home;
