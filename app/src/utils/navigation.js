import { NavigationActions } from 'react-navigation';
const config = {
  lastRoute: {
    routeName: 'AuthenScreen',
  },
};

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(routeName, params, enable = true) {
    if (config.navigator && routeName) {
        let action = NavigationActions.navigate({ routeName, params });
        config.navigator.dispatch(action);
    }
}

export function goBack() {
  if (config.navigator) {
    routeName = config.lastRoute.routeName;
    params = config.lastRoute.params;
    let action = NavigationActions.navigate({routeName, params});
    config.navigator.dispatch(action)
  }
}