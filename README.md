# Módulo de Usuários - DT Money

## 1. Requisitos Funcionais

### Inserir, Alterar, Buscar e Excluir

* **Inserir**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/infra/in-memory/in-memory-user.repository.ts].
* **Alterar**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/infra/in-memory/in-memory-user.repository.ts].
* **Buscar por Usuário ou Email**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/infra/in-memory/in-memory-user.repository.ts].
* **Excluir**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/infra/in-memory/in-memory-user.repository.ts].

### Criptografia de Senha
[cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/services/create-user.service.ts].

---

## 2. Qualidade do Código

### Services Separados (Princípio da Responsabilidade Única)

* **CreateUserService**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/services/create-user.service.ts].

### Testes Unitários
* **CreateUserService Spec**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/services/create-user.spec.ts].

### Documentação (SWAGGER)
* **CreateUserController**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/controllers/create-user.controller.ts].

### Validação de Dados (Class Validator)
 [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/dto/create-user.dto.ts].

### Repository Pattern
* **Interface Abstrata**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/infra/repositories/user.repository.abstract.ts].

### Inversão de Dependência
* **Módulo de Usuários**: [cite: jeffsdef/dt-money-next-16/dt-money-next-16-85b3bd4d56ed440fb6dfd15a00813a397bd6ce75/api/src/modules/users/users.module.ts].

---

**Nota:**: A integração direta com um banco de dados persistente não foi realizada. O módulo utiliza atualmente um repositório em memória para armazenamento temporário dos dados durante a execução.