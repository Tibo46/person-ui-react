import React from 'react';
import { getPerson } from '../../../services/persons';
import Typography from '@material-ui/core/Typography';
import Loader from '../../../components/Loader';
import { useAsync } from 'react-async';

const DetailsEmployee: React.FC<{ id: string }> = ({ id }) => {
  // @ts-ignore
  const personResult = useAsync({
    promiseFn: getPerson,
    query: {
      id,
    },
    watch: id,
  });

  return (
    <>
      {personResult.isLoading ? (
        <Loader />
      ) : personResult.data ? (
        <>
          <Typography variant="h1">{personResult.data.name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {personResult.data.group?.name}
          </Typography>
        </>
      ) : (
        <Typography className={`no-data`}>This employee does not exists</Typography>
      )}
    </>
  );
};

export default DetailsEmployee;
