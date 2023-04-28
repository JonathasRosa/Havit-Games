# Havit-Games

## API de Games

Esta API é utilizada para consumo de uma lista de games cadastrados.

## Endpoints

### GET /games

Esse endpoit é responsável por retornar a listagem de todos os games cadastrados no banco de dados.

#### Parametros

Nenhum

#### Respostas

#### OK! 200

Caso essa reposta aconteça você vai receber a listagem de todos os games.

´´´

Exemplo de resposta:

  [
        {
            id: 0,
            title: "Call of Duty - MW",
            year: 2019,
            price: 60
        },
        {
            id: 1,
            title: "Prince of Persia",
            year: 2002,
            price: 25
        },
        {
            id: 2,
            title: "God of War - 3",
            year: 2010,
            price: 30
        }
    ]
   
   
´´´
#### Falha na autenticação! 401

Caso essa resposta aconteça, issi significa que aconteceu alguma falha durante ao processo de autenticação da requisção. Motivo: Token inválido, Token expirado.

Exemplo de resposta:

´´´

{
  "err": "Token inválido!"
}

´´´

### POST /auth

Esse endpoit é responsável por fazer o processo de login.

#### Parametros

Email: E-mail do usuário cadastrado no sistema.

Password: Senha do usuário cadastrado no sistema com o determinado email.

Exemplo de resposta:

´´´

{
email: "jsilvarosa85@gmail.com",
password: "jscript"
}

´´´

#### Respostas

#### OK! 200

Caso essa reposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:

´´´
        {
            "token":
            "lknwefiubwefkjnqewlkqnoginqelkgqlkeangqngqenlkqdnvjwqbjwknvknvlkqenvblkeqmgopjqporjgopqemgçasmngoiaejrgiqnvklwvlwkewegngndwlvknkrebn"
        }    
´´´

#### Falha na autenticação! 401

Caso essa resposta aconteça, issi significa que aconteceu alguma falha durante ao processo de autenticação da requisção. Motivo: Senha ou email incorretos.

Exemplo de resposta:

´´´

{
  "err": "Credenciais inválidas!"
}

´´´
