# Next Level Week - 5º edição
Projeto desenvolvido em ReactJS durante a quinta edição Next Level Week da Rocketseat. Aqui apresento um resumão de boa parte do que foi aprensentado durante a semana, separado por dia de evento. 

# Descrição
Durante a semana do NLW foi desenvolvido um aplicativo onde era possivel listar, ouvir e controlar os podcasts - o Podcastr. A aplicação foi implementada utilizando NextJs em conjunto com as bibliotecas

# Primeiro Dia
Instalação do nextJS e apresentação dos principais conceitos relacionados ao react:
- Single Page Aplication (SPA)
- Componentes e estados no react
- Static Site Generation (SSG)
- Server Side Rendering (SSR)

# Segundo dia
Desenvolvimento dos dois primeiros componentes da aplicação: header e da parte visual do player. Instalação dos pacotes para desenvolvimento (typescript, sass e date-fns) e instalação e configuração do JSON-server. No final do dia foi apresentado como gerar com SSG e SSR utilizando o next.

# Terceiro Dia
Finalização da home da aplicação (design) e inicio do desenvolvimento da página de episódios. Dica: sempre deixar os dados já formatados, na forma como seram utilizados. Fazer isso antes do consumo desses dados pelo componente. Outro elemento visto prevemente foi a geração de págias estaticas dinâmicas 

# Pacotes utilizadons no NLW e sua instalação
- build do projeto em NEXT

### typescript: 
- yarn typescript @types/react @types/node -D
- só roda em desenvolvimento, já que tudo é compilado para js puro, quando a aplicação é publicada
- Por que utilizar typescript: quando a gente não usa uma liguagem tipada, não temos certeza de qual o formato dos dados que estamos recebendo. A juda na escrita das funções, nas chamadas e no recebimentode dados, pois indica quais dados a função deve receber.

### SASS
- yarn add sass

### date-fns
- biblioteca que ajuda a trabalhar com datas dentro do JS
- yarn add date-fns
- https://date-fns.org/v2.21.1/docs/format

### json-server
-  cria uma API fake
-  pega uma arquivo JSON e converte em uma API: com listagem, filtro, relacionamento, paginação, criação update, delete... 
-  https://github.com/typicode/json-server
-  consfiguração do JSON-server no package-json em scripts: '"server": "json-server server.json -w"
-  "server.json" = nome do arquivo carregado pela API fake
-  parâmetros: -w (whatch mode); -d 750 (delay de 750 milisegundos - demora de resposta); -p 3333 (porta 3333)

### Axios: 
uma biblioteca para fazer requizições HTTP que traz umas funcionalidades qua a biblioteca nativa do javascrit:  fetch
- yarn add axios
