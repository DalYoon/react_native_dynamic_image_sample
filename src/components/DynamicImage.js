import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

const DynamicImage = ({source}) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [ratio, setRatio] = useState(0);
  const imageHeight = imageWidth * ratio;

  const handleLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    setImageWidth(layout.width);
  };

  const calculateRatioFromAsset = () => {
    const {width, height} = Image.resolveAssetSource(source);
    const heightRatio = height / width;
    setRatio(heightRatio);
  };

  const calculateRatioFromNetwork = () => {
    Image.getSize(source, (width, height) => {
      const heightRatio = height / width;
      setRatio(heightRatio);
    });
  };

  const switchMeasureMethod = () => {
    switch (typeof source) {
      case 'number':
        calculateRatioFromAsset();
        break;
      case 'object':
        if (source.uri) calculateRatioFromNetwork();
        break;
    }
  };

  useEffect(() => {
    switchMeasureMethod();
  });

  return (
    <Container onLayout={handleLayout}>
      <FlexableImage
        source={source}
        width={imageWidth}
        height={imageHeight}
        resizeMode={'contain'}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const FlexableImage = styled.Image`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

export default DynamicImage;
