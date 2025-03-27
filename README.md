# Estrutura de Commits e Branches

## 🔀 Estrutura de Branches

### Principais Branches:
- **main**: Contém o código estável, pronto para produção. Não deve receber commits diretos, apenas merges vindos de `develop`.
- **develop**: Branch principal de desenvolvimento. Todas as novas funcionalidades, correções de bugs e ajustes são integrados aqui antes de serem enviados para `main`.

### Fluxo de Trabalho:
1. **Criar uma nova funcionalidade:**
   ```bash
   git checkout develop
   git checkout -b feature/nome-da-feature



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
