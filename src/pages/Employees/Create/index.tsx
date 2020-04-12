import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { useHistory } from 'react-router';
import { getGroups } from '../../../services/groups';
import { Person, addPerson } from '../../../services/persons';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Loader from '../../../components/Loader';

const CreateEmployee = () => {
  const history = useHistory();
  const [employeeGroup, setEmployeeGroup] = useState(1);
  const [employeeName, setEmployeeName] = useState('');

  const groupsResult = useAsync({
    promiseFn: getGroups,
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const person: Person = {
        name: employeeName,
        groupId: employeeGroup,
      };

      let newPerson: Person;
      try {
        newPerson = await addPerson(person);
        history.push(`/employees/details/${newPerson.id}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <Typography variant="h1">Add a new employee</Typography>
      {groupsResult.isLoading ? (
        <Loader />
      ) : groupsResult.data && groupsResult.data.length > 0 ? (
        <form autoComplete="off" className={`container`} onSubmit={onSubmit}>
          <Grid container={true} spacing={2} direction="column">
            <Grid container={true} item={true} spacing={2}>
              <Grid item={true} sm={6}>
                <TextField
                  autoComplete="off"
                  fullWidth={true}
                  required
                  variant="outlined"
                  name="employee-name"
                  label="Employee name"
                  value={employeeName}
                  onChange={(e) => {
                    setEmployeeName(e.target.value);
                  }}
                />
              </Grid>

              <Grid item={true} sm={6}>
                <TextField
                  select
                  fullWidth={true}
                  variant="outlined"
                  name="employee-group"
                  label="Employee group"
                  required
                  value={employeeGroup}
                  onChange={(e) => setEmployeeGroup(parseInt(e.target.value))}
                >
                  {groupsResult.data ? (
                    groupsResult.data?.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem key={1} value={0}>
                      Loading...
                    </MenuItem>
                  )}
                </TextField>
              </Grid>
            </Grid>
            <Grid item={true}>
              <Button
                disableRipple={true}
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Typography className={`no-data`}>
          An error occured and we could not get the Groups. Please try again by refreshing the page.
        </Typography>
      )}
    </>
  );
};

export default CreateEmployee;
