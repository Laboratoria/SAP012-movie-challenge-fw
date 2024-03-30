
4.1 Implementar método para obtenção de gêneros de filmes

Descrição:
Implementar um método chamado getMovieGenres no serviço APIService para obter uma lista de gêneros de filmes a partir do endpoint /genre/movie/list. O método getMovieGenres não deve receber nenhum parâmetro e deve retornar um Observable que retorne um array de objetos como [{id: number, name: string}].

Critérios de aceitação:
 Implementar um método chamado getMovieGenres dentro do serviço APIService.

 O método não deve receber nenhum parâmetro.

 O método deve fazer uma solicitação API para recuperar os gêneros de filmes do endpoint /genre/movie/list.

 O método deve retornar um Observable que retorne um array de objetos como [{id: number, name: string}].

 Escrever testes unitários para o método getMovieGenres, incluindo casos de teste para uma solicitação API bem-sucedida e tratamento de erros.

Definição de Pronto:
 O método getMovieGenres está implementado e reside dentro do arquivo de serviço apropriado.

 O método realiza uma solicitação API para recuperar dados do endpoint /genre/movie/list.

 As respostas da API são tratadas adequadamente, incluindo cenários de erro.

 4.2 Implementar a função de transformação de gênero de filme utilizando Map #17
Closed
14 tasks done
elizabetefabri opened this issue 2 weeks ago · 0 comments
Closed
14 tasks done
4.2 Implementar a função de transformação de gênero de filme utilizando Map
#17
elizabetefabri opened this issue 2 weeks ago · 0 comments
Comments
@elizabetefabri
Owner
elizabetefabri commented 2 weeks ago • 
Descrição:
Criar uma função chamada formatGenresToMap no arquivo src/utils/transformers.ts para transformar uma matriz de modelos de dados de gênero da API em um Map do JavaScript. O Map deve ter chaves que representam os identificadores de gênero e valores que representam os nomes dos gêneros.

Essa transformação melhora a usabilidade dos dados de gênero ao fornecer um mapeamento de chaves e valores para buscas rápidas.

Critérios de aceitação:
 Assinatura da função:

 Criar uma função chamada formatGenresToMap em src/utils/transformers.ts.
 Parâmetros:

 A função deve aceitar um array de modelos de dados de gênero da API como entrada.
 Tipo de retorno:

 A função deve retornar um Map do JavaScript.

 As chaves do Map devem ser os IDs dos gêneros.

 Os valores do Map devem ser os nomes dos gêneros.

Por exemplo, dado o seguinte array de modelos de dados de gênero da API:

   ```js
   [
       { id: 28, name: 'Ação' },
       { id: 35, name: 'Comédia' },
       { id: 18, name: 'Drama' },
   ]
   ```
A função deveria retornar um Map:

   ```js
   new Map([
       [28, 'Ação'],
       [35, 'Comédia'],
       [18, 'Drama'],
   ]);
   ```
 Tratamento de entradas vazias:

 Garantir que a função lide corretamente com o caso em que o array de entrada está vazio, retornando um Map vazio.
Definição de Pronto:
 A função formatGenresToMap foi criada em src/utils/transformers.ts

 A função aceita como entrada um array de modelos de dados de gênero da API.

 A função retorna um Map do JavaScript com as chaves sendo os IDs dos gêneros e os valores sendo os nomes dos gêneros.

 A função trata o caso em que o array de entrada está vazio, retornando um Map vazio.
