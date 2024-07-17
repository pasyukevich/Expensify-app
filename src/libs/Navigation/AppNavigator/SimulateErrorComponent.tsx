/* eslint-disable react/function-component-definition */
// SimulateErrorComponent.js
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';

function SimulateErrorComponent() {
    const styles = useThemeStyles();
    const [error, setError] = useState<Error | undefined>(); 
    useEffect(() => {
        console.log('Simulating chunk load error useEffect');
      const timer = setTimeout(() => {
        // Simulate a chunk load error
        const newError = new Error('ChunkLoadError: Loading chunk failed.');
        newError.name = 'ChunkLoadError';
        setError(newError);
      }, 60000); // 60 seconds delay

 

      return () => clearTimeout(timer);
    }, []);

    if (error) {
        throw error;
      }

    console.log('Simulating chunk load error after 60 seconds');

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (<View style={[styles.flexRow, styles.mb4, styles.justifyContentBetween]}>
        <View style={styles.flex4}>
            <Text>Simulating chunk load error after 60 seconds</Text>
        </View>
    </View>);
}

export default SimulateErrorComponent;
