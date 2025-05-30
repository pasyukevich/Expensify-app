import * as Browser from '@libs/Browser';
import CONST from '@src/CONST';
import type Platform from './types';

export default function getPlatform(shouldMobileWebBeDistinctFromWeb = false): Platform {
    if (shouldMobileWebBeDistinctFromWeb && Browser.isMobile()) {
        return CONST.PLATFORM.MOBILE_WEB;
    }
    return CONST.PLATFORM.WEB;
}
