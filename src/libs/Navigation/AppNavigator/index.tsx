import React, {lazy, memo, Suspense, useContext, useEffect} from 'react';
import type {LazyExoticComponent} from 'react';
import {NativeModules} from 'react-native';
import {InitialURLContext} from '@components/InitialURLContextProvider';
import Navigation from '@libs/Navigation/Navigation';
  

type ComponentImport = () => Promise<{ default: LazyExoticComponent<React.ComponentType> }>;

const lazyRetry = function (componentImport: ComponentImport): Promise<{ default: LazyExoticComponent<React.ComponentType> }> {
  return new Promise((resolve, reject) => {
    const hasRefreshed: unknown = JSON.parse(sessionStorage.getItem('retry-lazy-refreshed') ?? 'false');

    console.log('lazyRetry called');

    componentImport().then((component) => {
      sessionStorage.setItem('retry-lazy-refreshed', 'false'); // success so reset the refresh
      console.log('lazyRetry then called');
      resolve(component);
    }).catch((error) => {
      console.log('lazyRetry catch called');
      if (!hasRefreshed) { // not been refreshed yet
        sessionStorage.setItem('retry-lazy-refreshed', 'true'); // we are now going to refresh
        window.location.reload(); // refresh the page
      } else {
        reject(error); // Default error behaviour as already tried refresh
      }
    });
  });
};


// const AuthScreens = lazy(() => lazyRetry(() => import('./AuthScreens') as Promise<{ default: LazyExoticComponent<React.ComponentType> }>));
const AuthScreens = lazy(() => import('./AuthScreens'));
const PublicScreens = lazy(() => import('./PublicScreens'));
const SimulateErrorComponent = lazy(() => import('./SimulateErrorComponent'));

// // Simulate chunk load error after 60 seconds
// setTimeout(() => {
//     // // Mocking a chunk load error by overriding the webpackJsonp function
//     // const originalJsonpFunction = window.webpackJsonp || [];
//     // window.webpackJsonp = function(chunkIds, modules, runtime) {
//     //   if (chunkIds.includes('non-existent-chunk')) {
//     //     return Promise.reject(new Error('Mocked ChunkLoadError'));
//     //   }
//     //   return originalJsonpFunction.call(this, chunkIds, modules, runtime);
//     // };
  
//     // Attempt to load the mocked chunk
//     lazyRetry(() => lazy(() => import('non-existent-chunk')
//       .catch(err => {
//         console.error('ChunkLoadError simulated:', err);
//       })));
//   }, 60000);

type AppNavigatorProps = {
    /** If we have an authToken this is true */
    authenticated: boolean;
};

function AppNavigator({authenticated}: AppNavigatorProps) {
    const initUrl = useContext(InitialURLContext);

    useEffect(() => {
        if (!NativeModules.HybridAppModule || !initUrl) {
            return;
        }

        Navigation.isNavigationReady().then(() => {
            Navigation.navigate(initUrl);
        });
    }, [initUrl]);

    if (authenticated) {
        // These are the protected screens and only accessible when an authToken is present
        return (
            <Suspense fallback={null}>
                <AuthScreens />
            </Suspense>
        );
    }

    return (
        <Suspense fallback={null}>
            <PublicScreens />
        </Suspense>
    );
}

AppNavigator.displayName = 'AppNavigator';

export default memo(AppNavigator);
