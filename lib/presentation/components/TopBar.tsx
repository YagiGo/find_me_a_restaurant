import React, { FC, useContext } from 'react';
import { Navbar, InputGroup, FormControl, NavLink } from 'react-bootstrap';
import { MapContext } from '../../context/MapContext';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const AppLayout: FC = () => {
  const {
    placeServices,
    setRestaurants,
    keyword,
    setKeyword,
    setIsSearching,
    setNoResult,
  } = useContext(MapContext);
  const handleSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      let data;
      try {
        setIsSearching(true);
        if (keyword) {
          data = await placeServices?.querySearch(keyword);
        } else {
          data = await placeServices?.getRestaurantsWithinRange(
            'restaurant',
            1000,
          );
        }
        setRestaurants(data ? data : []);
        setNoResult(false);
      } catch (e) {
        if (e === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          setNoResult(true);
        }
      } finally {
        setIsSearching(false);
      }
    }
  };
  return (
    <Navbar bg='dark' expand='lg' variant='dark' className=''>
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
