/* eslint-disable react/function-component-definition */
// SimulateErrorComponent.js
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';

function SimulateErrorComponent() {
    const styles = useThemeStyles();
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     // Simulate a chunk load error
    //     const error = new Error('ChunkLoadError: Loading chunk failed.');
    //     error.name = 'ChunkLoadError';
    //     throw error;
    //   }, 60000); // 60 seconds delay

    //   return () => clearTimeout(timer);
    // }, []);

    console.log('Simulating chunk load error after 60 seconds');

    console.log('Simulating chunk load error after 60 seconds 2');
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (<View style={[styles.flexRow, styles.mb4, styles.justifyContentBetween]}>
        <View style={styles.flex4}>
            <Text>Simulating chunk load error after 60 seconds</Text>
        </View>
    </View>);
}

export default SimulateErrorComponent;
