import React, { FC } from 'react';
import TopBar from './TopBar';
import { Col, Row } from 'react-bootstrap';
import MapView from './MapView';
const AppLayout: FC = ({ children }) => {
  return (
    <>
      <TopBar />
      <Row style={{ padding: '0' }}>
        <Col md={8} style={{ padding: '0' }}>
          <MapView />
        </Col>
        <Col style={{ padding: '0' }}>{children}</Col>
      </Row>
    </>
  );
};

export default AppLayout;
