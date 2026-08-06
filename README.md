<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:065f46,100:10b981&height=180&section=header&text=Jose%20Uliana&fontSize=46&fontColor=ffffff&animation=fadeIn&fontAlignY=38" width="100%" alt="" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1200&color=10B981&center=true&vCenter=true&width=650&height=45&lines=HTML+%7C+JavaScript+%7C+Python;Desenvolvendo+PWA+em+produ%C3%A7%C3%A3o;Buscando+est%C3%A1gio+em+dev" alt="HTML | JavaScript | Python | Desenvolvendo PWA em produção | Buscando estágio em dev" />

**Estudante de Eng. de Software · PUC Minas**

<br />

<a href="https://www.linkedin.com/in/joseuliana/">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="mailto:ulianajosee@gmail.com">
  <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
</a>
<img src="https://img.shields.io/badge/Brasil-009C3B?style=for-the-badge&logo=googleearth&logoColor=white" alt="Brasil" />
<img src="https://img.shields.io/badge/Aberto%20a%20est%C3%A1gio-10B981?style=for-the-badge&logo=handshake&logoColor=white" alt="Aberto a estágio" />

</div>

<br />

---

## 👋 Sobre mim

Sou estudante de **Engenharia de Software na PUC Minas** e desenvolvo aplicações
web de ponta a ponta.

O que me interessa não é fazer funcionar na minha máquina. É fazer funcionar
**quando dá errado**: sem internet, no celular de alguém no meio de um evento, com
a bateria acabando. Meu projeto principal roda nessas condições todo fim de
semana, e foi ele que me ensinou mais do que qualquer tutorial.

- 🏥 Construo e mantenho sozinho um **PWA offline-first em produção**, usado por
  uma equipe de atendimento pré-hospitalar
- 🧪 **481 testes automatizados** entre front-end e back-end, rodando em CI
- 📚 Cursando **Engenharia de Software na PUC Minas**
- 🔎 **Buscando estágio** em desenvolvimento
- 🇧🇷 Português nativo · inglês técnico

<br />

---

## 🚑 O que eu construí

### AlphaSync — gestão de atendimentos de ambulância

Sistema completo para uma empresa de atendimento pré-hospitalar cobrir eventos:
registro de atendimento, prontuário clínico, equipe, viaturas, checklist de
equipamento e relatórios. **Está no ar e é usado em operação real.**

O desafio que define o projeto: **em evento não existe internet confiável.** O app
precisa funcionar offline por completo e sincronizar sozinho quando o sinal volta,
sem perder nem duplicar registro de paciente.

```
React + Vite  ·  Node.js + Express  ·  PostgreSQL  ·  PWA com Service Worker
```

**O que eu resolvi nele, e que vale contar:**

| Problema | Como resolvi |
|---|---|
| Sem internet no meio do atendimento | Fila offline em IndexedDB, com reenvio automático e ordem pai→filho preservada |
| Mesmo registro salvo duas vezes | Chave de idempotência por operação — reenviar não duplica |
| Duas pessoas editando a mesma ficha | Controle otimista de concorrência, com detecção de conflito |
| Aparelho compartilhado entre a equipe | Sessão isolada por login, sem vazar identidade entre turnos |
| Papéis diferentes veem coisas diferentes | Controle de acesso por 8 papéis operacionais, testado no servidor |
| Prontuário não pode sumir | Remoção lógica e trilha de auditoria de quem mudou o quê |

<br />

### Outros projetos

| Projeto | O que é | Stack |
|---|---|---|
| **SportsLab** | PWA de gestão para academias e personal trainers | React 19 · Vite · Supabase |
| **Canalhas** | PWA mobile-first de gestão de barbearia | React · Firebase |
| **LogSync** | Análise e correção de jornadas de motoristas | Python |

> Os repositórios são privados por envolverem dados de clientes reais.
> Tenho prazer em apresentar o código e as decisões numa conversa.

<br />

---

## 🛠️ Tecnologias

<div align="center">

**Linguagens e front-end**

<img src="https://skillicons.dev/icons?i=js,html,css,react,vite,python" alt="" />

**Back-end e dados**

<img src="https://skillicons.dev/icons?i=nodejs,express,postgres,supabase,firebase" alt="" />

**Ferramentas**

<img src="https://skillicons.dev/icons?i=git,github,vscode,postman,vercel" alt="" />

</div>

<br />

---

## 🧭 Como eu trabalho

Três hábitos que eu levo a sério, porque cada um me custou caro para aprender:

**1. Teste que só passa não prova nada.**
Todo conserto que eu escrevo, eu rodo o teste **com o conserto desfeito** — se ele
continuar passando, o teste está medindo outra coisa. Já achei proteção que
parecia proteger e não protegia.

**2. Número dito de cabeça apodrece.**
Antes de afirmar "está lento" ou "ninguém usa", eu meço. Uma vez perdi tempo
otimizando código quando o gargalo real era infraestrutura — a medição mostrou que
2/3 do tempo de resposta não era meu código. Hoje o projeto tem verificadores
automáticos que reprovam a documentação quando um número deixa de bater.

**3. Comentário registra o incidente, não a linha.**
Comentário que diz "incrementa o contador" é ruído. O que serve é o que explica
**por que** aquela linha existe e qual bug ela evita — quem ler daqui a seis meses
precisa disso, não da tradução do código.

<br />

---

## 📫 Contato

<div align="center">

Estou **procurando estágio ou primeira oportunidade** como desenvolvedor.

<a href="https://www.linkedin.com/in/joseuliana/">
  <img src="https://img.shields.io/badge/linkedin.com%2Fin%2Fjoseuliana-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="mailto:ulianajosee@gmail.com">
  <img src="https://img.shields.io/badge/ulianajosee@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
</a>

<br /><br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:10b981,100:065f46&height=110&section=footer" width="100%" alt="" />

</div>
