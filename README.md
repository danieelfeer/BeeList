<p align="center">
    <img src="./frontend/beelist/src/img/BeeList-Logo.svg" width="120px">
</p>

<h1 align=center>BeeList 🐝</h1>

![GitHub repo size](https://img.shields.io/github/repo-size/danieelfeer/BeeList?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/danieelfeer/BeeList?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/danieelfeer/BeeList?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/danieelfeer/BeeList?style=for-the-badge)

> BeeList, seu app de gerenciamento de tarefas eficiente e organizado, assim como as abelhas.

## 🚀 Como Rodar o Projeto (desenvolvimento)

* Clone o repositório:

```bash
git clone https://github.com/danieelfeer/BeeList.git
```

* Acesse a branch de desenvolvimento:

```bash
git checkout develop
```

### 🖥️ Rodando o Backend
Certifique-se de que tem o Node.js instalado em seu computador

1. Acesse a pasta do backend:

```bash
cd backend/
```

2. Baixe as dependências:

```bash
npm i
```

3. Inicie o servidor:

```bash
npm run dev
```

### ✅ Rodando os Testes
Certifique-se de que está na pasta backend/

1. Inicie os testes:

```bash
npm run test -- --coverage
```


### 🌐 Rodando o frontend
Certifique-se de que está na pasta frontend/beelist

1. acesse a pasta para o frontend:

```bash
cd frontend/beelist/
```

2. Baixe as dependências:

```bash
npm i
```

3. Inicie o servidor:

```bash
npm run dev
```

## 🎨 Design no Figma

Você pode visualizar o design completo do projeto no Figma através do link abaixo:

[🔗 Acessar protótipo no Figma](https://www.figma.com/design/2NrBwZ2i235TmNRBg01o25/BeeList?node-id=0-1&m=dev&t=W1GJZzxlsK0UfUqI-1)


## Estrutura de Commits e Branches

### Principais Branches:
- **main**: Contém o código estável, pronto para produção. Não deve receber commits diretos, apenas merges vindos de `develop`.
- **develop**: Branch principal de desenvolvimento. Todas as novas funcionalidades, correções de bugs e ajustes são integrados aqui antes de serem enviados para `main`.

### Fluxo de Trabalho:
1. **Mudar para branch develop**

```
git checkout develop   
```

### Tipos de Commits
| Tipo       | Descrição                                            | Exemplo                                   |
|------------|------------------------------------------------------|-------------------------------------------|
| **feat**   | Adição de nova funcionalidade                        | `feat: adiciona autenticação`             |
| **fix**    | Correção de bugs                                     | `fix: corrige erro de conexão ao banco`   |
| **docs**   | Atualização ou criação de documentação               | `docs: atualiza README`                   |
| **style**  | Alterações visuais/código (espaços, indentação, etc.)| `style: ajusta indentação em App.js`      |
| **refactor** | Refatoração de código sem alterar funcionalidade    | `refactor: reorganiza estrutura de rotas` |
| **test**   | Adição ou alteração de testes                        | `test: adiciona teste para API de tarefas`|
| **chore**  | Tarefas diversas (ex.: atualizar dependências)       | `chore: atualiza dependências no package.json` |

### Exemplos de Commits

1. Commit simples:
   ```bash
   feat: adiciona funcionalidade de cadastro de tarefas

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/danieelfeer" target="_blank" title="defina o título do link">
        <img src="https://avatars.githubusercontent.com/u/142606237?v=4" width="100px;" alt="Foto do Daniel Fernandes no GitHub"/><br>
        <sub>
          <b>Daniel Fernandes</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/guilherme-caze" target="_blank" title="defina o título do link">
        <img src="https://avatars.githubusercontent.com/u/141370137?v=4" width="100px;" alt="Foto do Guilherme Cazé no GitHub"/><br>
        <sub>
          <b>Guilherme Cazé</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/MateusCerqueiraG" target="_blank" title="defina o título do link">
        <img src="https://avatars.githubusercontent.com/u/129126812?v=4" width="100px;" alt="Foto do Mateus Cerqueira no GitHub"/><br>
        <sub>
          <b>Mateus Cerqueira</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bruno-hsl" target="_blank" title="defina o título do link">
        <img src="https://avatars.githubusercontent.com/u/130290196?v=4" width="100px;" alt="Foto do Bruno Henrique no GitHub"/><br>
        <sub>
          <b>Bruno Henrique</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
