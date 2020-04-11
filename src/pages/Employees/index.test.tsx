import React from 'react';
import { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';

import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import Employees from '.';
import { SearchResponse } from '../../services/persons';

const delay = (time = 0) => new Promise((res) => setTimeout(res, time));

window.ENV_DATA = {
  personApiOrigin: 'https://mock-api.com',
} as any;

describe('Employees page', () => {
  let allPersonsResult: SearchResponse;

  beforeEach(() => {
    allPersonsResult = [
      {
        id: 'employee-1',
        name: 'Walter White',
      },
      {
        id: 'employee-2',
        name: 'Jessie Pinkman',
      },
    ];
    const filteredPersons = allPersonsResult.filter((x) => x.name.indexOf('Walter') >= 0);

    fetchMock.get(
      (url) => url === `${window.ENV_DATA.personApiOrigin}/persons/search`,
      () => allPersonsResult
    );
    fetchMock.get(
      (url) => url === `${window.ENV_DATA.personApiOrigin}/persons/search?searchTerms=Walter`,
      () => filteredPersons
    );
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('renders the page', async () => {
    const component = renderer.create(<Employees />);

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should render a loader while fetching data and then display the data', async () => {
    let component: renderer.ReactTestRenderer;
    renderer.act(() => {
      component = renderer.create(<Employees />);
    });

    expect(component!.toJSON()).toMatchSnapshot();

    await renderer.act(async () => {
      await delay();
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should get filtered employees if the search terms change', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(<Employees />);
      await delay();
    });

    expect(fetchMock.calls()).toHaveLength(1);

    await act(async () => {
      component.find('input[name="filter"]').simulate('change', { target: { value: 'Walter' } });
      await delay();
    });

    expect(fetchMock.calls()).toHaveLength(2);
    expect(fetchMock.calls()[1][0]).toContain('Walter');
  });
});
