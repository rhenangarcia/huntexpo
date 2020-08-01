import React, { Component } from "react";
import { WebView } from "react-native-webview";

//Cria um componente com estado
class Product extends Component
{
  //Executa assim que o componente for montado em tela
  componentDidMount()
  {
    /*
     * Desestrutura as propriedades do componente do arquivo
     *
     * - props: objeto onde ficam armazenados as propriedades definidas na estrutura
     * do componente do arquivo em cada instância
     *   - navigation: propriedade que é passada ao componente do arquivo na criação 
     *   do mesmo pelo Stack.Screen do React Navigation
     *     - setOptions: função para atualizar a prop "options" do componente Stack.Screen
     *     com objeto contendo a opção a ser alterada
     *   - route: propriedade que é passada ao componente do arquivo na criação do mesmo 
     *   pelo Stack.Screen do React Navigation
     *     - params: contém parâmetros definidos através da chamada da rota pelo 
     *     navigation.navigate
     * 
     * Refs. 
     * - https://reactnavigation.org/docs/headers
     * - https://reactnavigation.org/docs/params
     */
    const { navigation, route } = this.props;
    navigation.setOptions({ title: route.params.product.title });
  }

  /*
   * Renderiza o componente usando JSX
   *
   * Em JSX, {} permite a execução de códigos JS
   * 
   * - WebView: qualquer visualização de página web integrada ao componente
   * 
   * - props: objeto onde ficam armazenados as propriedades definidas 
   * na estrutura do componente do arquivo em cada instância
   *   - route: propriedade que é passada ao componente do arquivo 
   *   na criação do mesmo pelo Stack.Screen do React Navigation
   *     - params: contém parâmetros definidos através da chamada 
   *     da rota pelo navigation.navigate
   * 
   * Refs.: https://reactnavigation.org/docs/params
   */
  render()
  {
    return <WebView source={{ uri: this.props.route.params.product.url }} />;
  }
}

export default Product;