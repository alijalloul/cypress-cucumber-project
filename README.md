# Next.js Cypress Cucumber Project

This project is a Next.js application integrated with SQLite and Prisma for database management, and Cypress with Cucumber for end-to-end testing. It leverages Next.js for server-side rendering and static site generation, Prisma as a type-safe ORM for managing the SQLite database, and Cypress with Cucumber for behavior-driven development (BDD) in testing.

To get started with this project, first, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/alijalloul/cypress-cucumber-project.git
cd cypress-cucumber-project
npm install
```

Next, set up the Prisma client and the SQLite database by running:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Once the setup is complete, you can start the development server using:

```bash
npm run dev
```

This will launch the app on `http://localhost:3000`. Open your browser to view and interact with the app. To run the end-to-end tests using Cypress and Cucumber, use the following command:

```bash
npx cypress open
```

### Project Structure

- `prisma/`: Contains the Prisma schema and migration files.
- `pages/`: Holds the Next.js routes and pages for the application.
- `components/`: Reusable React components.
- `e2e/`: Contains the Cypress end-to-end tests written with Cucumber.
- `styles/`: Global styles and CSS files.
- `public/`: Static assets like images and icons.

### License

This project is licensed under the MIT License.

![Demo Video](./demo.mp4)
