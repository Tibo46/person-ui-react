import React from 'react';
import { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { SearchResponse } from '../../services/persons';
import Search from '.';

window.ENV_DATA = {
  personApiOrigin: 'https://mock-api.com',
} as any;

describe('Search component', () => {
  let allPersonsResult: SearchResponse;

  beforeEach(() => {
    allPersonsResult = [
      {
        id: 'employee-1',
        name: 'Walter White',
        groupId: 1,
        group: {
          id: 1,
          name: 'Chemist',
        },
      },
    ];

    fetchMock.get(
      `${window.ENV_DATA.personApiOrigin}/persons/search?searchTerms=Walter`,
      allPersonsResult
    );
    fetchMock.get(
      `${window.ENV_DATA.personApiOrigin}/persons/search?searchTerms=This%20one%20does%20not%20exists`,
      []
    );
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('renders the search button', async () => {
    const component = renderer.create(<Search />);

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('opens the modal once search button clicked', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(<Search />);
    });
    component!.update();

    expect(component!.find('mui-dialog').length).toBe(0);

    act(() => {
      component.find('mui-icon-button').at(0).simulate('click');
    });
    component!.update();

    expect(component!.find('mui-dialog').length).toBe(1);
  });

  it('closes the modal on close button click', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(<Search />);
      component.find('mui-icon-button').at(0).simulate('click');
    });
    component!.update();

    expect(component!.find('mui-dialog').length).toBe(1);

    act(() => {
      component.find('#dialog-search-close').at(0).simulate('click');
    });
    component!.update();

    expect(component!.find('mui-dialog').length).toBe(0);
  });

  it('triggers the search when the search input value changes', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(
        <Router>
          <Search />
        </Router>
      );
      component.find('mui-icon-button').at(0).simulate('click');
    });
    component!.update();

    await act(async () => {
      component.find('input[name="filter"]').simulate('change', { target: { value: 'Walter' } });
    });
    component!.update();

    expect(fetchMock.calls()).toHaveLength(1);
    expect(fetchMock.calls()[0][0]).toContain('Walter');
  });

  it('displays no data if no employee match the search terms', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(<Search />);
      component.find('mui-icon-button').at(0).simulate('click');
    });
    component!.update();

    await act(async () => {
      component
        .find('input[name="filter"]')
        .simulate('change', { target: { value: 'This one does not exists' } });
    });
    component!.update();

    expect(fetchMock.calls()).toHaveLength(1);
    await act(async () => {
      expect(component.find('p#no-data')).toHaveLength(1);
    });
  });
});
