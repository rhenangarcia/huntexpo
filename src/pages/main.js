import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import api from "../services/api";

//Exporta componente com estado
export default class Main extends Component
{
  //Objeto que armazena estado do componente, os itens representam 
  //"propriedades do estado" do componente do arquivo
  state =
  {
    products: [],
    productInfo: {},
    page: 1
  };

  //Executa assim que o componente for montado em tela
  componentDidMount()
  {
    this.loadProducts();
  }

  //Métodos proprietário -> Usa-se arrow functions p/ que o método
  //esteja no mesmo escopo que os outros da classe (this)

  //Carrega a lista de registros da API configurada
  loadProducts = async (page = 1) =>
  {
    const response = await api.get(`/products?page=${page}`);

    //Desestrutura a resposta da API, usando o operador "rest"
    //p/ separar o docs de todo o restante da resposta
    const { docs, ...productInfo } = response.data;

    /*
     * Modifica o estado do componente, passando um objeto com
     * os itens a serem alterados
     * 
     * - products faz uso do operador "spread" p/ criar um novo array 
     * unindo os elementos do "products" antigo com os novos elementos 
     * contidos no array "docs"
     *   - operador "spread" é responsável por expor todos os elementos
     *   de um array ou propriedades de um objeto
     */
    this.setState(
      {
        products: [...this.state.products, ...docs],
        productInfo,
        page
      });
  }

  //Carrega a próxima página de registros
  loadMore = () =>
  {
    //Desestrutura o estado do componente
    const { productInfo, page } = this.state;

    //Se o número da página for o último, não faz nada
    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }

  /*
   * Renderiza os itens do componente FlatList, usando desestruturação
   * para obter cada item da fonte de dados da lista
   * 
   * - Text: qualquer tipo de texto a ser exibido, sem exceção
   * - TouchableOpacity: habilita clicar em componentes, reduzindo a 
   * opacidade dos mesmos quando são clicados
   */
  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
    
      <TouchableOpacity 
        style={styles.productButton}
        onPress={() => 
        {
          /*
           * - props: objeto onde ficam armazenados as propriedades definidas na estrutura
           * do componente do arquivo em cada instância
           *   - navigation: propriedade que é passada ao componente do arquivo na criação 
           *   do mesmo pelo Stack.Screen do React Navigation
           *     - navigate: função para mover tela p/ qualquer rota definida no Stack.Navigator,
           *     sendo possível passar parâmetros através de um objeto
           * 
           * Refs.: https://reactnavigation.org/docs/params
           */
          this.props.navigation.navigate("Product", { product: item });
        }}
      >
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  /*
   * Renderiza o componente usando JSX, utilizando os itens armazenados
   * no estado do componente através do this.state
   * 
   * Este método monitora as alterações do estado, atualizando a tela
   * ao identificar qualquer modificação
   * 
   * Em JSX, {} permite a execução de códigos JS
   * 
   * - View: caixa semelhante ao <div> em HTML
   * - FlatList: qualquer tipo de representação em lista
   *   - contentContainerStyle: estilização geral da lista
   *   - data: fonte de dados da lista
   *   - keyExtractor: função retornando ID único de cada item da lista
   *   - renderItem: função retornando a renderização aplicada em cada item da lista
   *   - onEndReached: função executada ao atingir o fim da lista
   *   - onEndReachedThreshold: quão próximo do final da lista deve estar, para 
   *   executar a função passada em onEndReached (em decimal)
   */
  render()
  {
    //Desestrutura o estado do componente
    const { products } = this.state;

    return (
      <View style={styles.container}>
        <FlatList 
          contentContainerStyle={styles.list}
          data={products}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

/*
 * Cria os estilos a serem usados nos componentes do arquivo em uma
 * sintaxe semelhante ao CSS, porém renderizando nativamente
 * 
 * Os objetos de estilização funcionam como classes do CSS, suas 
 * propriedades seguem o padrão camelCase
 * 
 * Flexbox vem habilitado por padrão
 */
const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      backgroundColor: "#fafafa"
    },
    list:
    {
      padding: 20
    },
    productContainer:
    {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 5,
      padding: 20,
      marginBottom: 20
    },
    productTitle:
    {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333"
    },
    productDescription:
    {
      fontSize: 16,
      color: "#999",
      marginTop: 5,
      lineHeight: 24
    },
    productButton:
    {
      height: 42,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#da552f",
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    productButtonText:
    {
      fontSize: 16,
      fontWeight: "bold",
      color: "#da552f"
    }
  });