import 'react-native-gesture-handler'
import { Provider } from 'react-native-paper'
import { theme } from './src/theme/theme'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStackScreens } from './src/routes/AuthScreens'
import RecipeTypesProvider from './src/contexts/RecipeTypesContext'

import axiosConfig from './src/config/axios'

axiosConfig()

export default function App() {
	return (
		<Provider theme={theme}>
			<RecipeTypesProvider>
				<NavigationContainer>
					<AuthStackScreens/>
				</NavigationContainer>
			</RecipeTypesProvider>
		</Provider>
	)
}