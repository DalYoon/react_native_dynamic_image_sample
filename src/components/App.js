import React from 'react';
import styled from 'styled-components/native';
import DynamicImage from './DynamicImage';

const IMAGE_URL =
  'https://cdn.mos.cms.futurecdn.net/XWRZCcWsDjdG29nQYJuDpb.png';
const IMAGE_REQUIRE = require('../assets/images/rickAndMorty.png');

export default () => (
  <Container>
    <SafeArea>
      <Content>
        <Description>From Network</Description>
        <DynamicImage source={{uri: IMAGE_URL}} />

        <Description>From Local Assets</Description>
        <DynamicImage source={IMAGE_REQUIRE} />
      </Content>
    </SafeArea>
  </Container>
);

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

const Description = styled.Text`
  margin-top: 15px;
  font-size: 15px;
`;
