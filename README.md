# banco-api-performance

## Introdução

Este repositório contém testes de performance para uma API bancária usando **JavaScript** e **k6**. O objetivo é validar tempo de resposta, estabilidade e comportamento em carga para endpoints de login e transferência.

## Tecnologias utilizadas

- k6
- JavaScript (scripts de teste k6)
- JSON para fixtures e configuração local

## Estrutura do projeto

- `config/`
  - `config.local.json` - definição local de `baseUrl` para a API.
- `fixtures/`
  - `postLogin.json` - payload de login usado nos testes.
- `helpers/`
  - `autenticacao.js` - função de autenticação para obter token JWT.
- `tests/`
  - `login.test.js` - teste de carga para o endpoint `/login`.
  - `transferencias.test.js` - teste de transferência usando token autenticado.
- `utils/`
  - `variaveis.js` - lida com a variável de ambiente `BASE_URL` e fallback para a configuração local.
- `html-report.html` - relatório gerado pelo k6 em formato HTML.

## Objetivo de cada grupo de arquivos

- `config/`: guarda configuração local de valores como a URL base da API.
- `fixtures/`: armazena corpos de requisição reutilizáveis para os testes.
- `helpers/`: oferece funções auxiliares, como gerar token de autenticação.
- `tests/`: contém scripts k6 que simulam o comportamento de usuários e validam métricas.
- `utils/`: abstrai variáveis de ambiente e configuração, especialmente `BASE_URL`.
- `html-report.html`: relatório de performance exportado para análise visual.

## Modo de instalação

1. Clone o repositório:

```bash
git clone https://github.com/nescossio/banco-api-performance.git
cd banco-api-performance
```

2. Instale o k6 seguindo a documentação oficial:

- https://k6.io/docs/getting-started/installation/

3. Verifique se `k6` está disponível:

```bash
k6 version
```

4. Configure a URL base da API:

O projeto usa a variável de ambiente `BASE_URL` em `utils/variaveis.js`. Se não for fornecida, ele usa `config/config.local.json`.

## Execução dos testes k6

Execute o k6 passando `BASE_URL`:

```bash
BASE_URL=http://localhost:3000 k6 run tests/login.test.js
```

ou para o segundo cenário:

```bash
BASE_URL=http://localhost:3000 k6 run tests/transferencias.test.js
```

> Se estiver no Windows PowerShell, use:
>
> ```powershell
> $env:BASE_URL = 'http://localhost:3000'
> k6 run tests/login.test.js
> ```

## Exportação de relatório k6

Para gerar um relatório HTML com o resultado do k6, execute:

```bash
BASE_URL=http://localhost:3000 k6 run --out html=html-report.html tests/login.test.js
```

ou

```bash
BASE_URL=http://localhost:3000 k6 run --out html=html-report.html tests/transferencias.test.js
```

O arquivo `html-report.html` será atualizado com os resultados do teste e pode ser aberto em qualquer navegador.

## Observações

- `BASE_URL` é a variável de ambiente principal para apontar o script para a API correta.
- O `config/config.local.json` funciona como fallback para execuções locais.
