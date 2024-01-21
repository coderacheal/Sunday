<a name="readme-top"></a>

<div align="center">
  <h1><b>Sunday</b></h1>
</div>

![image](https://github.com/coderacheal/Sunday/assets/97846040/87f3771c-9cf0-4752-b024-cb73a525d53e)


![image](https://github.com/coderacheal/Sunday/assets/97846040/3af0c14c-c968-4248-8109-db67418bdcf3)



<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📗 Table of Contents](#-table-of-contents)
- [Sunday ](#sunday-)
  - [🛠 Built With ](#-built-with-)
    - [Tech Stack ](#tech-stack-)
  - [Key Features ](#key-features-)
  - [💻 Getting Started ](#-getting-started-)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Install](#install)
    - [Usage](#usage)
    - [Link to Model](#Link-to-Mode)
    - [Spin Up Docker containerl](#Spin-Up-Docker-container)
  - [👥 Authors ](#-authors-)
  - [🔭 Future Features ](#-future-features-)
  - [🤝 Contributing ](#-contributing-)
  - [⭐️ Show your support ](#️-show-your-support-)
  - [🙏 Acknowledgments ](#-acknowledgments-)
  - [📝 License ](#-license-)

<!-- PROJECT DESCRIPTION -->

# Sunday <a name="about-project"></a>

**Sunday** is a chat app embed with a NLP transformer model from huggingface. The app predicts sentiment ans probability of the sentiment before and allow users to decide if they still want to send the text giving the information.

Sunday predicts five (5) sentiments
- Positive 
- Negative
- Neutral
- Litigious
- Uncertainty

Want to know what your texts convey? Try Sunday

Note that is a pure NLP projects designed and built for eduction and academic purposes

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://react.dev">React</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org">Nodemon</a></li>
  </ul>
  <ul>
    <li><a href="https://nodejs.org">Express</a></li>
  </ul>
</details>

<details>
  <summary>Model</summary>
  <ul>
    <li><a href="https://huggingface.co/docs/transformers/index">Huggingface Mobilebert from Google</a></li>
  </ul>
</details>

<details>
  <summary>Socket</summary>
    <ul>
      <li><a href="https://socket.io">Socket.io</a></li>
    </ul>
  </details>
  
<details>
  <summary>API</summary>
    <ul>
      <li><a href="https://fastapi.tiangolo.com">FastAPI</a></li>
    </ul>
  </details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- Features -->

## Key Features <a name="key-features"></a>

- **Creates a connection between two users**
- **Can detect the sentiment of a message**
- **Give user meaningul insights before sending the message**


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>


To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

 - Node V18

Example command:


### Setup

Clone this repository to your desired folder:

Example commands:

```sh
  cd my-project
  git clone https://github.com/coderacheal/sunday.git

```

### Install

Install this project with:

Example command:

```sh
  cd sunday

  npm install

```

### Usage

**To run the Frontend:**

Example command:

```sh
  cd client
  npm start 

  OR 

  cd client
  npm run start 

```

**To run the Backend:**

Example command:

```sh
  cd server
  nodemon src/index.js
```

**To run the API:**

Example command:

```sh
  cd api
  uvicorn main:app --reload
```

### Link to Model

Please find a link to the model hosted in Huggingface [here](https/huggingface/coderacheal/model/sunday)

### Spin Up Docker container
- Start the docker engine using the Docker desktop application
- Once started open the terminal for the project

RUN
`docker-compose build`

Once the image is done built

RUN
`docker-compose up`

## 👥 Authors <a name="authors"></a>

🕵🏽‍♀️ **Racheal Appiah-kubi**

- GitHub: [GitHub Profile](https://github.com/coderacheal)
- Twitter: [Twitter Handle](https://twitter.com/racheal_kubi)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/racheal-appiah-kubi/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>


- **Add chat history.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project kindly show some love, give it a 🌟 **STAR** 🌟

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank all the free available resource made available online 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
