// Importar funcionalidades que precisamos para fazer requisições HTTP e lidar com observáveis
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Importar as configurações do ambiente, onde podemos guardar informações sensíveis como o token de autenticação da API
import { environment } from 'src/environments/environment';

// Importar o modelo de filme que usaremos para representar os dados que vamos receber da API
import { Movie } from 'src/models/Movie';

// Importar a função que vai nos ajudar a formatar os dados dos filmes recebidos da API
import { formatMovie } from 'src/utils/transformers';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {

    // Criar cabeçalhos para incluir o token de autenticação da API nas nossas requisições
    private readonly headers = new HttpHeaders().set('Authorization', `Bearer ${environment.TOKEN_API}`);

    // O construtor é chamado quando uma instância desse serviço é criada
    constructor(private readonly http: HttpClient) { }

    // Este é o método que usaremos para obter filmes da API
    getMovies(): Observable<Movie[]> {
      // Realizar uma requisição GET para a API do The Movie DB para obter filmes
      return this.http.get<Movie[]>(`${environment.URL_API}/discover/movie`, { headers: this.headers }).pipe(
        // Usar o operador map para transformar os resultados da requisição em um formato que podemos usar na nossa aplicação
        map((response:any) => 
          // Mapear cada resultado para o modelo de filme usando a função formatMovie
          response.results.map((result: any) => formatMovie(result)))
      );
    }
}


// Injectable (Injetável):

// Injectable, ou "injetável" em português, é um decorador especial fornecido pelo Angular que é usado para marcar uma classe como um serviço.
// É como colocar uma etiqueta especial em uma caixa de ferramentas para dizer que ela está disponível para ser usada em outros lugares.
// Quando você marca uma classe com @Injectable(), o Angular pode injetá-la em outros componentes, serviços ou diretivas onde ela é necessária.
// Isso promove a reutilização de código e a modularidade, porque você pode escrever uma funcionalidade uma vez e usá-la em vários lugares da sua aplicação sem precisar reescrevê-la. 

// Constructor (Construtor):

// O constructor, ou construtor em português, é um método especial que é chamado automaticamente quando você cria uma nova instância de uma classe.
// Ele é usado para inicializar os objetos da classe, configurar propriedades e executar qualquer outra lógica necessária quando o objeto é criado.
// É como as instruções que você daria para montar uma peça de Lego assim que a tirasse da caixa. O constructor configura o objeto para que esteja pronto para ser usado.

// Observable (Observável):

// Um observável é uma "caixa" que pode conter um valor agora, no futuro ou nunca.
// É como se fosse uma encomenda que você fez online. Você não sabe quando exatamente ela vai chegar, mas você espera que chegue em algum momento.
// No contexto do Angular (e de outras bibliotecas como o RxJS), os observáveis são usados para lidar com dados assíncronos, como as respostas de uma requisição HTTP.
// Eles permitem que você se inscreva para ser notificado quando os dados estiverem prontos e, quando estiverem, você pode fazer algo com esses dados.


// observable no angular é similar a promisse no javaScript?
  
// Sim, em certos aspectos, os Observables no Angular são semelhantes às Promises no JavaScript, mas há diferenças importantes entre eles.

// Aqui estão algumas semelhanças e diferenças:

// Semelhanças:
// Assincronismo: Ambos são usados para lidar com operações assíncronas em JavaScript e no Angular.
// Tratamento de Resultados: Tanto os Observables quanto as Promises permitem que você trate o resultado de uma operação assíncrona quando ela é concluída.
// Diferenças:
// Múltiplos Valores: Os Observables podem emitir zero, um ou vários valores ao longo do tempo, enquanto as Promises só podem resolver um único valor ou serem rejeitadas uma única vez.
// Cancelamento: Os Observables podem ser cancelados, enquanto as Promises não podem.
// Composição: Os Observables oferecem poderosas operações de composição, como map, filter, mergeMap, switchMap, etc., através de bibliotecas como o RxJS, o que torna mais fácil trabalhar com fluxos de dados complexos. Promises não oferecem essas operações de composição de forma nativa.
// "Lazy" vs. "Eager": Promises são "eager", o que significa que elas são executadas assim que são criadas, independentemente de terem um manipulador .then() ou não. Observables, por outro lado, são "lazy", o que significa que eles não começam a emitir valores até que você se inscreva neles com um observador.
// Cancelamento de Assinatura: Os Observables permitem que você cancele uma assinatura (unsubscribe) quando não precisa mais dos dados, evitando vazamentos de memória. Promises não têm essa capacidade embutida.
// Em resumo, enquanto as Promises são adequadas para operações assíncronas únicas, os Observables oferecem uma maneira mais poderosa e flexível de lidar com fluxos de dados assíncronos e são mais adequados para operações complexas e contínuas, como eventos de usuário, streams de dados em tempo real, entre outros.