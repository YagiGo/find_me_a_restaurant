import React, { FC, useContext } from 'react';
import { Navbar, InputGroup, FormControl, NavLink } from 'react-bootstrap';
import { MapContext } from '../../context/MapContext';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const AppLayout: FC = () => {
  const { placeServices, setRestaurants, keyword, setKeyword } =
    useContext(MapContext);
  const handleSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && keyword) {
      const data = await placeServices?.querySearch(keyword);
      setRestaurants(data ? data : []);
    }
  };
  return (
    <Navbar bg='dark' expand='lg' variant='dark' className='px-4'>
      <Navbar.Brand>
        <NavLink style={{ color: 'white' }} href='/'>
          {' '}
          Restaurant Finder{' '}
        </NavLink>
      </Navbar.Brand>
      <InputGroup className='w-50'>
        <InputGroup.Text>
          <FA icon={faMagnifyingGlass} />
        </InputGroup.Text>
        <FormControl
          onKeyPress={async (e) => await handleSubmit(e)}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Looking for restaurant? Try typing here!'
          value={keyword}
        />
      </InputGroup>
    </Navbar>
  );
};

export default AppLayout;
