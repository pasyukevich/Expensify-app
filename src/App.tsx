import {PortalProvider} from '@gorhom/portal';
import React from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {PickerStateProvider} from 'react-native-picker-select';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import '../wdyr';
import ActiveElementRoleProvider from './components/ActiveElementRoleProvider';
import ActiveWorkspaceContextProvider from './components/ActiveWorkspaceProvider';
import ColorSchemeWrapper from './components/ColorSchemeWrapper';
import ComposeProviders from './components/ComposeProviders';
import CustomStatusBarAndBackground from './components/CustomStatusBarAndBackground';
import CustomStatusBarAndBackgroundContextProvider from './components/CustomStatusBarAndBackground/CustomStatusBarAndBackgroundContextProvider';
import ErrorBoundary from './components/ErrorBoundary';
import HTMLEngineProvider from './components/HTMLEngineProvider';
import InitialURLContextProvider from './components/InitialURLContextProvider';
import {LocaleContextProvider} from './components/LocaleContextProvider';
import OnyxProvider from './components/OnyxProvider';
import PopoverContextProvider from './components/PopoverProvider';
import SafeArea from './components/SafeArea';
import ScrollOffsetContextProvider from './components/ScrollOffsetContextProvider';
import {SearchContextProvider} from './components/Search/SearchContext';
import ThemeIllustrationsProvider from './components/ThemeIllustrationsProvider';
import ThemeProvider from './components/ThemeProvider';
import ThemeStylesProvider from './components/ThemeStylesProvider';
import {FullScreenContextProvider} from './components/VideoPlayerContexts/FullScreenContext';
import {PlaybackContextProvider} from './components/VideoPlayerContexts/PlaybackContext';
import {VideoPopoverMenuContextProvider} from './components/VideoPlayerContexts/VideoPopoverMenuContext';
import {VolumeContextProvider} from './components/VideoPlayerContexts/VolumeContext';
import {CurrentReportIDContextProvider} from './components/withCurrentReportID';
import {EnvironmentProvider} from './components/withEnvironment';
import {KeyboardStateProvider} from './components/withKeyboardState';
import {WindowDimensionsProvider} from './components/withWindowDimensions';
import CONFIG from './CONFIG';
import Expensify from './Expensify';
import useDefaultDragAndDrop from './hooks/useDefaultDragAndDrop';
import {ReportIDsContextProvider} from './hooks/useReportIDs';
import OnyxUpdateManager from './libs/actions/OnyxUpdateManager';
import {ReportAttachmentsProvider} from './pages/home/report/ReportAttachmentsContext';
import type {Route} from './ROUTES';

type AppProps = {
    /** URL passed to our top-level React Native component by HybridApp. Will always be undefined in "pure" NewDot builds. */
    url?: Route;
};

LogBox.ignoreLogs([
    // Basically it means that if the app goes in the background and back to foreground on Android,
    // the timer is lost. Currently Expensify is using a 30 minutes interval to refresh personal details.
    // More details here: https://git.io/JJYeb
    'Setting a timer for a long period of time',
]);

// // Function to log loaded chunks and simulate ChunkLoadError
// function logAndSimulateChunkLoadError() {
//     // eslint-disable-next-line @typescript-eslint/unbound-method
//     const originalCreateElement = document.createElement;
//     document.createElement = function(tagName, ...args) {
//       const element = originalCreateElement.call(this, tagName, ...args);
//       if (tagName === 'script') {
//         element.addEventListener('load', function() {
//           console.log('Loaded chunk:', element.src);
//           // Simulate ChunkLoadError for a specific chunk
//           if (element.src.includes('defaultScreenOptions')) { // replace 'your-chunk-name' with the actual chunk name
//             console.error('Simulating ChunkLoadError for:', element.src);
//             element.parentNode?.removeChild(element);
//             const event = new Event('ChunkLoadError');
//             element.dispatchEvent(event);
//           }
//         });
//       }
//       return element;
//     };
//   }
  
//   logAndSimulateChunkLoadError();

// Ensure webpack is globally accessible
// declare global {
//     interface Window {
//       __webpack_require__?: any;
//     }
//   }
  
//   // Log and simulate ChunkLoadError
//   function logAndSimulateChunkLoadError() {
//     if (window.__webpack_require__ && window.__webpack_require__.e) {
//       const originalChunkLoad = window.__webpack_require__.e;
//       window.__webpack_require__.e = function(chunkId: string) {
//         console.log('Loading chunk:', chunkId);
//         if (chunkId.includes('AuthScreens')) { // Replace with the actual chunk ID you want to target
//           return Promise.reject(new Error('Simulated ChunkLoadError'));
//         }
//         return originalChunkLoad.call(this, chunkId);
//       };
//     }
//   }
  
//   logAndSimulateChunkLoadError();

const fill = {flex: 1};

const StrictModeWrapper = CONFIG.USE_REACT_STRICT_MODE ? React.StrictMode : ({children}: {children: React.ReactElement}) => children;

function App({url}: AppProps) {
    useDefaultDragAndDrop();
    OnyxUpdateManager();

    return (
        <StrictModeWrapper>
            <InitialURLContextProvider url={url}>
                <GestureHandlerRootView style={fill}>
                    <ComposeProviders
                        components={[
                            OnyxProvider,
                            ThemeProvider,
                            ThemeStylesProvider,
                            ThemeIllustrationsProvider,
                            SafeAreaProvider,
                            PortalProvider,
                            SafeArea,
                            LocaleContextProvider,
                            HTMLEngineProvider,
                            WindowDimensionsProvider,
                            KeyboardStateProvider,
                            PopoverContextProvider,
                            CurrentReportIDContextProvider,
                            ScrollOffsetContextProvider,
                            ReportAttachmentsProvider,
                            PickerStateProvider,
                            EnvironmentProvider,
                            CustomStatusBarAndBackgroundContextProvider,
                            ActiveElementRoleProvider,
                            ActiveWorkspaceContextProvider,
                            ReportIDsContextProvider,
                            PlaybackContextProvider,
                            FullScreenContextProvider,
                            VolumeContextProvider,
                            VideoPopoverMenuContextProvider,
                            KeyboardProvider,
                            SearchContextProvider,
                        ]}
                    >
                        <CustomStatusBarAndBackground />
                        <ErrorBoundary errorMessage="NewExpensify crash caught by error boundary">
                            <ColorSchemeWrapper>
                                <Expensify />
                            </ColorSchemeWrapper>
                        </ErrorBoundary>
                    </ComposeProviders>
                </GestureHandlerRootView>
            </InitialURLContextProvider>
        </StrictModeWrapper>
    );
}

App.displayName = 'App';

export default App;
