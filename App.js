import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
	const NavigationStack = createNativeStackNavigator();
	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaProvider>
					<KeyboardAvoidingView
						style={{ flex: 1 }}
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
					>
						<NavigationStack.Navigator>
							<NavigationStack.Screen
								name='HomeScreen'
								component={HomeScreen}
								options={{ headerShown: false }}
							/>
							<NavigationStack.Screen
								name='MapScreen'
								component={MapScreen}
								options={{ headerShown: false }}
							/>
						</NavigationStack.Navigator>
					</KeyboardAvoidingView>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}
