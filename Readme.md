# LightCast apis

### Get all Skills

```url
   https://emsiservices.com/skills/versions/latest/skills?typeIds=ST1%2CST2&fields=id%2Cname%2Ctype&limit=5
```

> Response:-

- Method - `GET`

```json
{
  "attributions": [
    {
      "name": "Wikipedia",
      "text": "Wikipedia extracts are distributed under the CC BY-SA license (https://creativecommons.org/licenses/by-sa/3.0/)"
    }
  ],
  "data": [
    {
      "id": "KS126XS6CQCFGC3NG79X",
      "name": ".NET Assemblies",
      "type": {
        "id": "ST1",
        "name": "Specialized Skill"
      }
    },
    {
      "id": "KS1245X66R9YDDQWP4V3",
      "name": ".NET Code Analysis (FxCop Analyzers)",
      "type": {
        "id": "ST1",
        "name": "Specialized Skill"
      }
    },
    {
      "id": "ES50D03AC9CFC1A0BC93",
      "name": ".NET Development",
      "type": {
        "id": "ST1",
        "name": "Specialized Skill"
      }
    },
    {
      "id": "KS1200B62W5ZF38RJ7TD",
      "name": ".NET Framework",
      "type": {
        "id": "ST1",
        "name": "Specialized Skill"
      }
    },
    {
      "id": "KS126XW78QJCF4TRV2X7",
      "name": ".NET Framework 1",
      "type": {
        "id": "ST1",
        "name": "Specialized Skill"
      }
    }
  ]
}
```

### Related Skill :-

```url
    https://emsiservices.com/skills/versions/latest/related?q=javascript&limit=5
```

- Method - `POST`
- Body -

  ```json
  {
    "ids": [
      "KSDJCA4E89LB98JAZ7LZ" // Skill Id for react
    ]
  }
  ```

- Response:-
  ```json

          {
      "attributions": [
          {
              "name": "Wikipedia",
              "text": "Wikipedia extracts are distributed under the CC BY-SA license (https://creativecommons.org/licenses/by-sa/3.0/)"
          }
      ],
      "data": [
          {
              "id": "ES65621B26F53842D8BE",
              "infoUrl": "https://lightcast.io/open-skills/skills/ES65621B26F53842D8BE",
              "name": "Back End (Software Engineering)",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KSUK6OFU4EA534NO9T4D",
              "infoUrl": "https://lightcast.io/open-skills/skills/KSUK6OFU4EA534NO9T4D",
              "name": "ECMAScript 2015",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KS6840J6LR0TLQ86LZJC",
              "infoUrl": "https://lightcast.io/open-skills/skills/KS6840J6LR0TLQ86LZJC",
              "name": "Front End (Software Engineering)",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KS1244J76BBG2CTNYHYR",
              "infoUrl": "https://lightcast.io/open-skills/skills/KS1244J76BBG2CTNYHYR",
              "name": "Front End Design",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KS125HL70PSCMY4FSF0M",
              "infoUrl": "https://lightcast.io/open-skills/skills/KS125HL70PSCMY4FSF0M",
              "name": "JavaScript Frameworks",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KS127296VDYS7ZFWVC46",
              "infoUrl": "https://lightcast.io/open-skills/skills/KS127296VDYS7ZFWVC46",
              "name": "Node.js (Javascript Library)",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KSQOOX1S2DYD0E1VVZ5X",
              "infoUrl": "https://lightcast.io/open-skills/skills/KSQOOX1S2DYD0E1VVZ5X",
              "name": "React Redux",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KS441LF7187KS0CV4B6Y",
              "infoUrl": "https://lightcast.io/open-skills/skills/KS441LF7187KS0CV4B6Y",
              "name": "TypeScript",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KSGDZ4VMK1WCGQCE1KUT",
              "infoUrl": "https://lightcast.io/open-skills/skills/KSGDZ4VMK1WCGQCE1KUT",
              "name": "Vue.js (Javascript Library)",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          },
          {
              "id": "KSIDDB2VJJYDU67905S9",
              "infoUrl": "https://lightcast.io/open-skills/skills/KSIDDB2VJJYDU67905S9",
              "name": "Webpack",
              "type": {
                  "id": "ST1",
                  "name": "Specialized Skill"
              }
          }
      ]
  }
  ```




### Retrive/extract skill from Summary:-

```url
https://emsiservices.com/skills/versions/latest/extract?language=en
```

- request :-

- Method:- `POST`
>
> > Body:
> >
> > ```json
> > {
> >   "text": "Full Stack Web Developer with hands-on experience in designing and building scalable, secure, and user-friendly web applications using modern front-end and back-end technologies. Proficient in JavaScript, Node.js, Express, React/Angular, and SQL/NoSQL databases, with a solid understanding of API development, cloud deployment, and performance optimization. Adept at collaborating in Agile teams, translating business requirements into technical solutions, and delivering high-quality, maintainable code.",
> >   "confidenceThreshold": 0.9
> > }
> > ```

- response :-

```json
{
  "attributions": [
    {
      "name": "Wikipedia",
      "text": "Wikipedia extracts are distributed under the CC BY-SA license (https://creativecommons.org/licenses/by-sa/3.0/)"
    }
  ],
  "data": [
    {
      "confidence": 1.0,
      "skill": {
        "description": "NoSQL is a type of database management system that doesn't use the traditional tabular relational database structure. Instead, it uses non-relational data models and distributed systems architecture to allow for more flexible, scalable and high-performance data storage and retrieval. This specialized skill involves knowledge of various NoSQL databases, their data models, querying methods, and how to apply them to specific data-related use cases.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS1272Y6RFNZKNGWDWMB",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS1272Y6RFNZKNGWDWMB",
        "name": "NoSQL",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "\nA NoSQL database provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases. Such databases have existed since the late 1960s, but the name \"NoSQL\" was only coined in the early 21st century, triggered by the needs of Web 2.0 companies. NoSQL databases are increasingly used in big data and real-time web applications. NoSQL systems are also sometimes called \"Not only SQL\" to emphasize that they may support SQL-like query languages or sit alongside SQL databases in polyglot-persistent architectures."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/NoSQL"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "Agile Methodology refers to a project management approach that emphasizes flexibility, collaboration, and iterative progress through small, incremental changes. This skill involves understanding principles and practices that facilitate adaptive planning, evolutionary development, and early delivery of valuable software. Agile Methodology is used to enhance team communication, respond to changing requirements, and improve product quality by promoting continuous feedback and iterative cycles.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS120B874P2P6BK1MQ0T",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS120B874P2P6BK1MQ0T",
        "name": "Agile Methodology",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "In software development, agile practices involve discovering requirements and developing solutions through the collaborative effort of self-organizing and cross-functional teams and their customer(s)/end user(s). It advocates adaptive planning, evolutionary development, early delivery, and continual improvement, and it encourages flexible responses to change."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Agile_software_development"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "React.js is a JavaScript library that is used for building user interfaces. It allows developers to build intuitive and high-performing web applications by creating reusable components that are easy to maintain and update. React.js is widely used in modern web development and requires a strong understanding of JavaScript and web development concepts.",
        "descriptionSource": "LIGHTCAST",
        "id": "KSDJCA4E89LB98JAZ7LZ",
        "infoUrl": "https://lightcast.io/open-skills/skills/KSDJCA4E89LB98JAZ7LZ",
        "name": "React.js (Javascript Library)",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "React is an open-source, front end, JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies.\nReact can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/React.js"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "Full Stack Development refers to the ability to develop both the front-end and back-end of a web application. This specialized skill set requires knowledge of multiple programming languages, databases, frameworks, and tools. A full stack developer can work on every layer of a web application, from the user interface to the server-side logic, data modeling, and deployment. They are versatile developers who can handle complex tasks, optimize the performance of web applications, and work in cross-functional teams.",
        "descriptionSource": "LIGHTCAST",
        "id": "ES3937EEC3D5D7345412",
        "infoUrl": "https://lightcast.io/open-skills/skills/ES3937EEC3D5D7345412",
        "name": "Full Stack Development",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "In computing, a solution stack or software stack is a set of software subsystems or components needed to create a complete platform such that no additional software is needed to support applications. Applications are said to \"run on\" or \"run on top of\" the resulting platform."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Solution_stack"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "API is a set of protocols, routines, and tools used for building software applications that interact with other software applications. It provides a way for different software systems to communicate and exchange data with each other. APIs allow developers to access a wide range of functionality and data from external providers without needing to understand the underlying systems or code. Specialized skills related to API include programming languages, RESTful and SOAP web services, API design and development, and API integration.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS1208P6ZMZ4N872Y7X5",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS1208P6ZMZ4N872Y7X5",
        "name": "Application Programming Interface (API)",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "In computing, an application programming interface (API) is an interface that defines interactions between multiple software applications or mixed hardware-software intermediaries. It defines the kinds of calls or requests that can be made, how to make them, the data formats that should be used, the conventions to follow, etc. It can also provide extension mechanisms so that users can extend existing functionality in various ways and to varying degrees. An API can be entirely custom, specific to a component, or designed based on an industry-standard to ensure interoperability. Through information hiding, APIs enable modular programming, allowing users to use the interface independently of the implementation."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Application_programming_interface"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "Angular is an open-source web application framework maintained by Google. It is used to develop dynamic, single-page web applications and mobile applications. It allows developers to build client-side applications in a structured and reusable way, using TypeScript and HTML templates. Angular has a large and active developer community, which provides support, documentation, and plugins to enhance its functionality.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS120H6772VQ0MQ5RLVD",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS120H6772VQ0MQ5RLVD",
        "name": "Angular (Web Framework)",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Angular_(web_framework)"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "Business Requirements refer to the essential needs and expectations of stakeholders that must be met for a project or initiative to be considered successful. This skill involves gathering, analyzing, and documenting these requirements to ensure alignment between business objectives and project deliverables. Knowledge of Business Requirements is used to facilitate communication among stakeholders, guide project development, and ensure that the final outcomes meet the specified criteria and objectives.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS1219863VWXPRZL5LG2",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS1219863VWXPRZL5LG2",
        "name": "Business Requirements",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "Business requirements, also known as stakeholder requirements specifications (StRS), describe the characteristics of a proposed system from the viewpoint of the system's end user like a CONOPS. Products, systems, software, and processes are ways of how to deliver, satisfy, or meet business requirements. Consequently, business requirements are often discussed in the context of developing or procuring software or other systems."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Business_requirements"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "SQL (Structured Query Language) is a programming language used to manage relational databases. It is used to insert, update, delete, and retrieve data from a database. SQL is essential for managing large amounts of data and ensuring data integrity. It is used in various industries, including finance, healthcare, and e-commerce, among others. A strong knowledge of SQL is important for database administrators, data analysts, and developers.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS440W865GC4VRBW6LJP",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS440W865GC4VRBW6LJP",
        "name": "SQL (Programming Language)",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS). It is particularly useful in handling structured data, i.e. data incorporating relations among entities and variables."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/SQL_(programming_language)"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "Scalability refers to the capacity of a system, network, or process to handle a growing amount of work or its potential to accommodate growth. This skill encompasses the design and implementation of solutions that can efficiently expand in response to increased demand without compromising performance. Knowledge of Scalability is used to assess and enhance the ability of applications and infrastructure to support larger workloads, ensuring reliability and efficiency as requirements evolve.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS124RX787SQ1WVD8XF6",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS124RX787SQ1WVD8XF6",
        "name": "Scalability",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "Scalability is the property of a system to handle a growing amount of work by adding resources to the system."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Scalability"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "Node.js is an open-source, cross-platform JavaScript runtime environment for executing JavaScript code outside of a web browser. It allows developers to use JavaScript for server-side scripting and provides a platform for building scalable and high-performance applications. Node.js is commonly used for web applications, chat applications, real-time applications, and network applications. It is a highly in-demand skill for developers who want to work in modern web development.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS127296VDYS7ZFWVC46",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS127296VDYS7ZFWVC46",
        "name": "Node.js (Javascript Library)",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a \"JavaScript everywhere\" paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Node.js"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 1.0,
      "skill": {
        "description": "JavaScript is a programming language used to create interactive and dynamic web pages. It allows developers to add functionality to websites, such as validating forms, creating animations, and manipulating page content. Proficiency in JavaScript is essential for web development and creating modern user interfaces.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS1200771D9CR9LB4MWW",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW",
        "name": "JavaScript (Programming Language)",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Javascript_(programming_language)"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    },
    {
      "confidence": 0.9997006058692932,
      "skill": {
        "description": "Front End (Software Engineering) refers to the development of the user interface and user experience of web applications, focusing on the visual elements that users interact with directly. This skill encompasses knowledge of HTML, CSS, and JavaScript, which are used to create responsive and accessible designs that enhance usability. Understanding Front End (Software Engineering) enables the implementation of interactive features and ensures compatibility across various devices and browsers, ultimately improving user engagement and satisfaction.",
        "descriptionSource": "LIGHTCAST",
        "id": "KS6840J6LR0TLQ86LZJC",
        "infoUrl": "https://lightcast.io/open-skills/skills/KS6840J6LR0TLQ86LZJC",
        "name": "Front End (Software Engineering)",
        "tags": [
          {
            "key": "wikipediaExtract",
            "value": "Front-end web development is the practice of converting data to a graphical interface, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that data."
          },
          {
            "key": "wikipediaUrl",
            "value": "https://en.wikipedia.org/wiki/Front-end_web_development"
          }
        ],
        "type": {
          "id": "ST1",
          "name": "Specialized Skill"
        }
      }
    }
  ]
}
```# lightcastapi
