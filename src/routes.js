import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Importa componentes necessários
import StatusBarStylized from "./config/StatusBarConfig";
import Main from "./pages/main";
import Product from "./pages/product";

//Cria o componente de navegação do React Navigation
const Stack = createStackNavigator();

//Armazena as opções comuns a toda estrutura de navegação,
//nesse caso controlando o cabeçalho das telas
const screenOptions =
{
  headerTitleAlign: "center",
  headerStyle:
  {
    backgroundColor: "#DA552F"
  },
  headerTintColor: "#FFF",
  headerTitleStyle:
  {
    fontWeight: 'bold',
  },
}

/*
 * Exporta a estrutura de rotas p/ navegação entre as telas
 * - NavigationContainer: componente p/ controle de navegação do React Navigation
 * - Stack.Navigator: controla a estrutura de navegação
 * - Stack.Screen: estrutura as rotas das telas
 * 
 * Refs.: https://reactnavigation.org/docs/hello-react-navigation
 */
const Routes = () => (
  <NavigationContainer>
    <StatusBarStylized />
    <Stack.Navigator initialRouteName="Main" screenOptions={screenOptions}>
      <Stack.Screen name="Main" component={Main} options={{ title: "JSHunt" }} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;