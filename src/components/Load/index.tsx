import React, {useState, useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';

export default function Load() {
    const animation = useRef(null)

    return(
        <LottieView
        ref={animation}
        style={{
          width: 50,
          height: 50,
          alignSelf: 'center'
        }}
        autoPlay
        source={require('../../../assets/load.json')}
      />
    )
}