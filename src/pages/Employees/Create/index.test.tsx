import React from 'react';
import { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';

import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import CreateEmployee from '.';
import { GroupResponse } from '../../../services/groups';

let mockHistory: any;
jest.mock('react-router', () => ({ useHistory: () => mockHistory }));

const delay = (time = 0) => new Promise((res) => setTimeout(res, time));

window.ENV_DATA = {
  personApiOrigin: 'https://mock-api.com',
} as any;

describe('Create Employee page', () => {
  let allGroupsResult: GroupResponse;

  beforeEach(() => {
    mockHistory = { push: jest.fn() };
    allGroupsResult = [
      {
        id: 1,
        name: 'Chemist',
      },
      {
        id: 2,
        name: 'Commercial',
      },
    ];
    fetchMock.get(`${window.ENV_DATA.personApiOrigin}/groups`, allGroupsResult);
    fetchMock.post(`${window.ENV_DATA.personApiOrigin}/persons`, {});
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('renders the page', async () => {
    const component = renderer.create(<CreateEmployee />);

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should render a loader while fetching data and then display the data', async () => {
    let component: renderer.ReactTestRenderer;
    renderer.act(() => {
      component = renderer.create(<CreateEmployee />);
    });

    expect(component!.toJSON()).toMatchSnapshot();

    await renderer.act(async () => {
      await delay();
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should display a loader and then an error message if the api is down', async () => {
    fetchMock.get(`${window.ENV_DATA.personApiOrigin}/groups`, 500, { overwriteRoutes: true });

    let component: renderer.ReactTestRenderer;
    renderer.act(() => {
      component = renderer.create(<CreateEmployee />);
    });

    expect(component!.toJSON()).toMatchSnapshot();

    await renderer.act(async () => {
      await delay();
    });

    expect(component!.toJSON()).toMatchSnapshot();
  });

  it('should not post to the API when submitting the form if name is empty', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(<CreateEmployee />);
    });

    expect(fetchMock.calls()).toHaveLength(1);

    await act(async () => {
      await delay();
    });
    component!.update();

    await act(async () => {
      component.find('form').simulate('submit');
    });

    expect(fetchMock.calls()).toHaveLength(1);
  });

  it('should post to the API when submitting the form', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(<CreateEmployee />);
    });

    expect(fetchMock.calls()).toHaveLength(1);

    await act(async () => {
      await delay();
    });
    component!.update();

    await act(async () => {
      component
        .find('input[name="employee-name"]')
        .simulate('change', { target: { value: 'Gustavo Fring' } });
      component
        .find('input[name="employee-photo"]')
        .simulate('change', { target: { value: 'https://mock-img/grumpycat.jpg' } });
    });
    component!.update();
    await act(async () => {
      component.find('form').simulate('submit');
    });

    expect(fetchMock.calls()).toHaveLength(2);
    expect(fetchMock.calls()[1][0]).toBe('https://mock-api.com/persons');
    expect(fetchMock.calls()[1][1]?.body).toBe(
      JSON.stringify({ name: 'Gustavo Fring', groupId: 1, photo: 'https://mock-img/grumpycat.jpg' })
    );
  });

  it('should redirect the user af', async () => {
    let component: ReactWrapper;
    await act(async () => {
      component = mount(<CreateEmployee />);
    });

    await act(async () => {
      await delay();
    });
    component!.update();

    expect(mockHistory.push).not.toHaveBeenCalled();

    await act(async () => {
      component
        .find('input[name="employee-name"]')
        .simulate('change', { target: { value: 'Gustavo Fring' } });
    });
    component!.update();
    await act(async () => {
      component.find('form').simulate('submit');
    });

    expect(mockHistory.push).toHaveBeenCalled();
  });
});
