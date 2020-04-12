import React from 'react';
import { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';

import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import Employees from '.';
import { Person } from '../../../services/persons';
import DetailsEmployee from '.';

const delay = (time = 0) => new Promise((res) => setTimeout(res, time));

window.ENV_DATA = {
  personApiOrigin: 'https://mock-api.com',
} as any;

describe('Employees Details', () => {
  let personResult: Person;

  beforeEach(() => {
    personResult = {
      id: 'employee-1',
      name: 'Walter White',
      groupId: 1,
      group: {
        id: 1,
        name: 'Chemist',
      },
    };
    fetchMock.get(`${window.ENV_DATA.personApiOrigin}/persons/employee-1`, personResult);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('renders the page', async () => {
    const component = renderer.create(<DetailsEmployee id="employee-1" />);

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should render a loader while fetching data and then display the data', async () => {
    let component: renderer.ReactTestRenderer;
    renderer.act(() => {
      component = renderer.create(<DetailsEmployee id="employee-1" />);
    });

    expect(component!.toJSON()).toMatchSnapshot();

    await renderer.act(async () => {
      await delay();
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should display a loader and then a message saying there is no data, if no data found', async () => {
    fetchMock.get(`${window.ENV_DATA.personApiOrigin}/persons/search`, [], {
      overwriteRoutes: true,
    });

    let component: renderer.ReactTestRenderer;
    renderer.act(() => {
      component = renderer.create(<DetailsEmployee id="employee-not-existing" />);
    });

    expect(component!.toJSON()).toMatchSnapshot();

    await renderer.act(async () => {
      await delay();
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should get the employee data by employee id', async () => {
    await act(async () => {
      const component = mount(<DetailsEmployee id="employee-1" />);
    });

    expect(fetchMock.calls()).toHaveLength(1);
    expect(fetchMock.calls()[0]['identifier']).toBe('https://mock-api.com/persons/employee-1');
  });
});
