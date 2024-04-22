import React from 'react';
import {
  SafeAreaView, Text, StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigations/AppNavigation';
import { store, persistor } from './src/redux/Store'
import { PersistGate } from 'redux-persist/integration/react';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
export default App;


const styles = StyleSheet.create({})