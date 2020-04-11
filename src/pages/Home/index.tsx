import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to your Hotel admin panel</h1>
      <h2>Manage your employees easily</h2>
      <p>
        You can use the search bar on the header to look for any specific employee or group of
        employee.
        <br />
        To see all of them, use the Employee page.
        <br />
        If you have a new hire, don't forget to add him into the system via the Employee Create
        page!
      </p>
    </div>
  );
};

export default Home;
