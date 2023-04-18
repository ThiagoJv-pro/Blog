# Projeto CRUD Blog #

Esse projeto foi desenvolvido utilizando Node.js e Express. Esta aplicação web tem a função de exibir, editar, registrar e excluir documentos utilizando o sistema CRUD (Create, Read, Update, Delete). Uma particularidade desta aplicação é a integração com a API da OpenAI, utilizando o modelo text-davinci-003, atuando como corretor gramatical.

<img width="945" alt="image" src="https://user-images.githubusercontent.com/54116959/219514752-1bd7efc1-3e85-418d-b18d-4f7c204f0ef1.png">


## A seguir, temos uma breve demonstração de como o modelo text-davinci-003 atua na aplicação: ## 

https://user-images.githubusercontent.com/54116959/232806513-87e1d3ed-6a36-4b60-b7ae-7bace4a07e8c.mp4


### Código de implementação da API: ###

```
const { Configuration, OpenAIApi } = require("openai");

// Função que utiliza a API OpenAI para corrigir texto em português
// Utiliza o modelo de linguagem "text-davinci-003"
// Recebe um parâmetro "text" que é o texto a ser corrigido
async function CorrectReturn(text) {

  // Criação de um objeto "configuration" que armazena a chave da API OpenAI
  // Obtém a chave da variável de ambiente process.env.OPENAI_API_KEY
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Criação de um objeto "openai" que é uma instância da classe OpenAIApi
  // Responsável por realizar as requisições à API OpenAI
  // Recebe como parâmetro o objeto "configuration" criado anteriormente
  const openai = new OpenAIApi(configuration);

  // Realiza uma requisição à API OpenAI para corrigir o texto
  // Utiliza a função "createCompletion" que recebe um objeto de configuração como parâmetro
  // Nesse objeto de configuração, é especificado o modelo de linguagem (text-davinci-003)
  // O prompt é o texto a ser corrigido, concatenado com a string "Correct this to standard Portuguese:"
  // É especificado também o número máximo de tokens que o modelo pode utilizar na geração da resposta (max_tokens)
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Correct this to standard Portuguese:" + text,
    max_tokens: 1000,
  });

  // Armazena o texto corrigido retornado pela API OpenAI na variável "completionReturn"
  const completionReturn = completion.data.choices[0].text;
  
  // Retorna o texto corrigido
  return completionReturn;
}

// Exporta a função "CorrectReturn" para ser utilizada em outros módulos
module.exports = { CorrectReturn };

```
