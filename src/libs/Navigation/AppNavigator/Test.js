/* eslint-disable react/prefer-stateless-function */
/* eslint-disable rulesdir/no-useless-compose */
/* eslint-disable rulesdir/onyx-props-must-have-default */
import React from 'react';
import {withOnyx} from 'react-native-onyx';
import ONYXKEYS from '../../../ONYXKEYS';
import compose from '../../compose';

class Test extends React.Component {
    render() {
        console.log('Test', this.props.isSidebarLoaded);

        return null;
    }
}

export default compose(
    withOnyx({
        isSidebarLoaded: {
            key: ONYXKEYS.IS_SIDEBAR_LOADED,
        },
        isComposerFullSize: {
            key: ({route}) => `${ONYXKEYS.COLLECTION.REPORT_IS_COMPOSER_FULL_SIZE}${'PLACE_HERE_ID_OF_REPORT'}`,
        },
    }),
)(Test);
