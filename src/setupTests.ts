import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './setupMuiMocks';

enzyme.configure({ adapter: new Adapter() });
