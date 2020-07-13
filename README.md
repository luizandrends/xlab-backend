# XLAB BACKEND
<p>Api de de backend desenvolvida com <strong>NodeJS</strong>, <strong>Express</strong> e <strong>Typescript</strong>. Esta aplicação consiste em um gerenciamento de dividas de pessoas.</p>


## Configuração de ambiente

<p>Para configurar o ambiente ideal em sua maquina, por favor siga os passos abaixo: </p>

<div>
<h2> Docker </h2>
<ol>
  <li>Criar um container Postgres seguindo a documentação do <a href="https://hub.docker.com/_/postgres">Docker</a>.</li>
  <li>Com o container do docker ja rodando, tem-se a necessidade de uma GUI para o banco postgres, eu estou usando o Postico (MAC) mas caso tenha um ambiente linux ou windows recomento a utilização do <a href="https://electronjs.org/apps/postbird">Postbird.</a></li>
  <li>Caso sua porta do postgres ja esteja em uso, voce pode redirecionar a mesma para a porta 5433 para a 5432 (5433:5432)</li>
<ol>
</div>

<div>
<h2> Variáveis ambiente </h2>
<ol>
  <li>Disponibilizei um arquivo <strong>env.example</strong> para as variáveis ambiente.</li>
  <li>Para a configuração do ORM está juntamente disponibilizado o arquivo <strong>ormconfig.example.json</strong>.</li>
<ol>
</div>
  
<div>
<h2> Banco de dados </h2>
<ol>
  <li>Após criado o arquivo <strong>ormcongif.json</strong> voce pode criar na sua GUI de Postgres uma database com o nome igual ao dado no campo database do ormconfig.</li>
<ol>
</div>

<div>
<h2> Dependencias </h2>
<ol>
  <li>Após todos estes passos, é necessario rodar o script <strong>yarn</strong> em seu terminal para adicionar as dependencias do projeto.</li>
  <li>Caso o arquivo <strong>ts-config.json</strong> passe por problemas, você pode rodar o comando <strong>ysrn tsc --init</strong> e colocar o json disponibilizado no memo arquivo deste repositório.</li>
  <li>Após toda a configuração de ambiente e instalação de dependencias você pode rodar o seu servidor com o script <strong>yarn dev:server</strong></li>
<ol>
</div>
  
<div>
<h2> Migrations </h2>
<ol>
  <li>Apos as dependencias terem sido instaladas, voce pode rodar as migrations com o comando <strong>yarn typeorm migration:run</strong>.</li>
<ol>
</div>

<div>
<h2> Testes </h2>
<ol>
  <li>Para garantir a integridade de código e escalabilidade foram utilizados testes de integração com a framework de testes JEST.</li>
  <li>Você pode utilizar o script <strong>yarn test</strong> em seu terminal para rodar todas as suits de testes.</li>
<ol>
</div>

<div>
<h2> Patterns, Principios e Metodologias </h2>
<ol>
  <li>Para garantir a integridade do codigo e escalabilidade foi utilizado o DDD (Domain Driven Design) como metodologia de desenvolvimento e o SOLID como o principio de programação.</li>
  <li>Neste repositório esta sendo utilizado o Repository Pattern.  Controller (recebe a request) -> Services (regras de negócio e percistencia de dados) -> Repositories (Persiste o objeto em si).</li>
<ol>
</div>
  
<div>
  <h2>Para rodar o servidor basta ir no seu terminal e rodar o comando yarn dev:server</h2>
</div>

<div>
<h2> Documentação de rotas </h2>
<div>
  <h3>Usuários</h3>
  <li><strong>/users/create:</strong> Esta rota consiste no cadastro dos usuarios que vão operar o sistema de gerenciamento de dívidas.</li>
  <li><strong>/users/update:</strong> Esta rota consiste na alteraçao dos usuarios que vão operar o sistema de gerenciamento de dívidas. Para fazer a alteração em seu perfil, é necessario estar logado e com o token nos headers de autorização</li>
  <li><strong>/users/show:</strong> Esta rota consiste na listagem dos dados do usuário logado. Para fazer a listagem, é necessario estar logado e com o token nos headers de autorização</li>
  <li><strong>/users/delete:</strong> Esta rota consiste na listagem dos dados do usuário logado Para deletar a sua conta, é necessario estar logado e informar a senha atual do seu perfil e estar com o token nos headers de autorização.</li>
  <li><strong>/users/authenticate/:</strong> Esta rota consiste na sessão de usuários.</li>
</div>

<div>
  <h3>Devedores</h3>
  <li><strong>/debtors/create:</strong> Esta rota consiste no cadastro de um devedor. Para criar um devedor é necessário informar o nome, email e CPF do mesmo. Também é essencial estar logado e com o token nos headers para fazer este registro</li>
  <li><strong>/debtors/list:</strong> Esta rota consiste na listagem de todos os devedores cadastrados na aplicação. Para listar os devedores é necessário estar logado e com o token nos headers de autorização</li>
  <li><strong>/debtors/show/:debtor_id:</strong> Esta rota consiste na listagem de todas as informações de um devedor em específico. Para fazer a listagem é necessário informar o id do devedor nos request params. Também é essencial estar logado e com o token nos headers para fazer esta busca.</li>
  <li><strong>/debtors/delete/:debtor_id:</strong> Esta rota consiste na remoção de um devedor no sistema. Para fazer a remoção é necessario informar o id do devedor nos request.params. Também é essencial estar logado e com o token nos headers para fazer esta remoção</li>
</div>

<div>
  <h3>Dívidas</h3>
  <li><strong>/debts/create:</strong> Esta rota consiste na criação de uma divida para um devedor. Para a divida ser criada, é necessário informar o id do devedor, o motivo, a data, e o valor. Também é essencial estar logado e com o token nos headers para fazer este cadastro<li/>
  <li><strong>/debts/show/:debt_id:</strong> Esta rota mostra todas as informações de uma dívida e de um devedor em específico. Para serem listadas as informações é necessário informar o id da divida. Também é essencial estar logado e com o token nos headers para fazer esta listagem</li>
  <li><strong>/debts/list:</strong> Esta rota consiste na listagem de todas as dívidas no sistema. Para fazer a lsitagem é necessário estar logado e ter o token nos request headers</li>
  <li><strong>/debts/update/:debt_id:</strong>Esta rota consiste na alteração dos dados de uma dívida. Para alterar os dados é necessário informar o id da divida. Também é essencial estar logado e com o token nos headers para fazer esta alteração</li>
  <li><strong>/debts/debtor/:debtor_id:</strong>Esta rota consiste na listagem de todas as dívidas de um devedor em específico. Para fazer esta listagem é necessário informar o id do devedor. Tambem é essencial estar logado e ter o token nos request headers</li>
</div>
</div>
