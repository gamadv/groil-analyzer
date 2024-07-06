
<p align=center>
    <img src="assets/drop-half-fill.png">
    <h1 align=center>
        GrOil Analyzer
    </h1>
<p>

This repository contains the front/backend infrastructure for receiving, storing, and processing sensor data from various equipment in a plant. The project is built using NestJS and Prisma, with a PostgreSQL database.

![Front Demo](assets/front-demo.png)



## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Docker Compose
- Node.js (v16+)
- npm or yarn
- VSCode extension: Rest Client

### Environment Variables

Create a `.env` file in the root directory of the project and populate it with the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/nest-clean?schema=public
PORT=3030
```

### Installation

1. **Clone the repository:**

```bash
git clone git@github.com:gamadv/groil-analyzer.git
```

```bash
cd backend / cd frontend
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Start the development server:**

```bash
npm run dev
# or
yarn dev
```

### Running with Docker

👁️ **_PS: At this moment, only Postgres are present in the Docker containerized._**

1. **Build and run the Docker containers:**

```bash
docker-compose up --build
```

This command will start the NestJS application and PostgreSQL database in Docker containers.

### Run migrations:

```bash
npx prisma migrate dev --name init
```

### Run Seeds:
```bash
npm run seed
```

to visualize Database:

```bash
npx prisma studio
```


### Scripts

- **`npm run dev`**: Run the application in development mode with hot-reloading.
- **`npm run start`**: Run the application in production mode.
- **`npm run build`**: Build the application.
- **`npm run lint`**: Lint the codebase.
- **`npm run debug`**: Start the application in debug mode.
- **`npm run prod`**: Run the built application.
- **`npm run seed`**: Seed the database.

## 🛠️ Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: An ORM (Object-Relational Mapping) tool to interact with the PostgreSQL database seamlessly.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Swagger**: For API documentation and testing.
- **Docker**: To containerize the application and database for consistent development environments.
- **ESLint**: For code linting to maintain code quality.
- **Prettier**: For code formatting to ensure a consistent style.
- **Zod**: For schema validation.
- **Vitejs**: For building the frontend.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.
- **ShadcUi/Tailwinds CSS**: For building the frontend.
- **Recharts**: For chart visualization.

### Justifications

- **NestJS**: Provides a scalable architecture out of the box with a lot of useful features for building modern APIs.
- **Prisma**: Simplifies database operations and migrations, and integrates well with TypeScript.
- **Docker**: Ensures consistent development and production environments, simplifying deployment.
- **Swagger**: Facilitates API documentation and testing, making it easier for developers to understand and use the API.
- **PostgreSQL**: A reliable and robust database choice for handling complex queries and large datasets.
- **Zod**: Integrates seamlessly with TypeScript, providing robust runtime validation while ensuring type correctness at compile-time
-**Vite.js**: Empowers rapid frontend development with near-instantaneous hot module replacement (HMR) and optimized build times.
- **TypeScript**: Enhances JavaScript with static types for early error detection and improved code reliability, compiling to clean JavaScript.
- **Tailwind CSS**: Facilitates rapid UI development through utility-first classes, promoting consistency and scalability without writing custom CSS.
- **Recharts**: Provides customizable chart components for clear and interactive data visualization, built on React and D3.js frameworks.

## 📖 API Documentation
The API documentation is available via Swagger UI. <br>
You can access it by navigating to http://localhost:3030/api-docs after starting the server.

![API Documentation](assets/swagger.png)

## ⚠️ Technical Debt & 🧠 Future Improvements

- **Refactor validation logic**: Make the validation logic more generic to handle any type of record.
- **Improve error handling**: Enhance error handling across the application for better user experience.
- **Scalability**: Implement a distributed architecture using tools like Kafka for real-time data processing and AWS for global scalability.
- **Unit & Integration Tests**: Increase test coverage and ensure that all critical paths are well-tested.
- **Authentication**: Implement user authentication and authorization for better security and user experience. In this case Magic Link will be the option.
- **CI/CD**: Implement continuous integration and deployment to ensure that the application is always up-to-date and ready for production use.
- **Docker**: Full integration with Node, currently only Postgres is supported in Docker.
- **Monorepo**: Possible to transform as an Monorepo with TurboRepo
- **i18n**: Add i18n support for the application.
- **WebSockets**: Add WebSockets support for the application.

## 🚀 Scalability Enhancements

To support global scalability, consider the following architecture changes:

- **Load balance**: Use load balancers like AWS ELB or GCP to distribute traffic across multiple servers, and to distribute requests between multiple API instances with Kubernetes to manage.
- **Distributed Data Processing**: Use Kafka or a similar tool for handling real-time data processing.
- **Cloud Infrastructure**: Deploy the application on AWS or GCP to leverage their global data centers.
- **Microservices**: Break down the application into microservices for better scalability and maintainability.
- **API Gateway**: Use an API gateway like Kong or AWS API Gateway to manage and route traffic efficiently.

## __
_With these instructions, you should be able to get the project up and running quickly. The sections on technical debt and future improvements provide a clear roadmap for the next steps in the project._
