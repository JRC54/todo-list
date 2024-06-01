# TODO List Application

This is a To-Do list application built with React and Node.js, using PostgreSQL for the database.

## Requirements

- Node.js
- PostgreSQL
- Typescript
- React
- An IDE like Visual Studio Code or IntelliJ

## Setup Instructions



### Backend & Frontend

1. Clone the repository, both Backend and Frontend will be available there with their respective names.
    ```sh
    git clone https://github.com/JRC54/todo-list.git
    ```
    
### Backend

1. Install dependencies
    ```sh
    npm install
    ```

2. Download PostgreSQL 16
    ```sh
    https://www.postgresql.org/download/
    ```

3. Configure your database in `src/init/initDatabase.ts`
    ```javascript
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'duties_db',
      password: 'root',
      port: 5432,
    });
    ```

4. Run the backend server
    ```sh
    npx ts-node .\src\index.ts
    ```

### Frontend

1. Install dependencies
    ```sh
    npm install
    ```

2. Run the frontend application
    ```sh
    npm start
    ```

### Screenshots / Demo

#### Main Screen
![main](https://github.com/JRC54/todo-list/assets/111510481/306390dd-86ca-4a04-a9fa-d5454f80a3d2)
#### Form
![form](https://github.com/JRC54/todo-list/assets/111510481/bdf3ddb1-8477-4755-a3fe-aee8d959a08e)
#### Adding a Duty
![duty](https://github.com/JRC54/todo-list/assets/111510481/871d205c-d474-4d24-bbc2-176b2b68dd15)
#### Viewing a Duty
![view](https://github.com/JRC54/todo-list/assets/111510481/3143cdf8-2824-4618-aba1-24e9e5b7a958)
#### Editing a Duty 1
![edit1](https://github.com/JRC54/todo-list/assets/111510481/011692d5-a288-486e-a474-8e09270a21dd)
#### Editing a Duty 2
![edit2](https://github.com/JRC54/todo-list/assets/111510481/fcb9416f-519e-42c9-811c-3f32974d646a)
#### Deleting a Duty 1
![delete](https://github.com/JRC54/todo-list/assets/111510481/0e30af51-f9ea-48e2-91d3-f7080b4f3760)
#### Deleting a Duty 2
![delete2](https://github.com/JRC54/todo-list/assets/111510481/eb15132d-eabf-4424-8e39-6c80898e70fe)
#### Connection with the database error incase it's turned off
![errorConnection](https://github.com/JRC54/todo-list/assets/111510481/31171a64-daf6-41c3-ad35-cccf5d30f240)
#### DEMO


https://github.com/JRC54/todo-list/assets/111510481/031bcfd0-9862-42d4-a5fc-3f6170a8ec7b


## Testing

### Backend Tests

#### The tests/dependencies have been prepared already, this is only in case you want to create another tests.

1. Install Jest and other testing dependencies
    ```sh
    npm install --save-dev jest ts-jest @types/jest supertest
    ```

2. Create a Jest configuration file `jest.config.js`
    ```javascript
    module.exports = {
      preset: "ts-jest",
      testEnvironment: "node",
      transform: {
        "^.+\\.ts$": "ts-jest",
      },
      transformIgnorePatterns: ["<rootDir>/node_modules/"],
      moduleFileExtensions: ["ts", "js"],
      globals: {
        "ts-jest": {
          tsconfig: "tsconfig.json",
        },
      },
    };
    ```

3. Write tests in the `src/tests` directory

    Example: `src/tests/duties.test.ts`
    ```typescript
    const request = require('supertest');
    const { app } = require('../index');
    const { Client } = require('pg');
    
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'duties_db',
      password: 'root',
      port: 5432,
    });
    
    beforeAll(async () => {
      await client.connect();
    });
    
    afterAll(async () => {
      await client.end();
    });
    
    describe('Duties API', () => {
      it('should fetch all duties', async () => {
        const response = await request(app).get('/duties');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });
    
      it('should add a new duty', async () => {
        const response = await request(app)
          .post('/duties')
          .send({ name: 'New Duty' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'New Duty');
      });
    
      it('should update a duty', async () => {
        const addResponse = await request(app)
          .post('/duties')
          .send({ name: 'Duty to Update' });
        const { id } = addResponse.body;
    
        const response = await request(app)
          .put(`/duties/${id}`)
          .send({ name: 'Updated Duty' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Duty');
      });
    
      it('should delete a duty', async () => {
        const addResponse = await request(app)
          .post('/duties')
          .send({ name: 'Duty to Delete' });
        const { id } = addResponse.body;
    
        const response = await request(app)
          .delete(`/duties/${id}`);
        expect(response.status).toBe(204);
      });
    });

    ```

4. Run the tests
    ```sh
    npm test
    ```

### Frontend Tests

#### The tests/dependencies have been prepared already, this is only in case you want to create another tests.

1. Install Jest and other testing dependencies
    ```sh
    npm install --save-dev jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom
    ```

2. Create a Jest configuration file `jest.config.js`
    ```javascript
    module.exports = {
      preset: "ts-jest",
      testEnvironment: "jsdom",
      moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
      transform: {
        "^.+\\.tsx?$": "ts-jest",
      },
      setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    };
    ```

3. Write tests in the `src/tests` directory

    Example: `src/tests/DutyForm.test.tsx`
    ```typescript
    import React from "react";
    import { render, fireEvent } from "@testing-library/react";
    import DutyForm from "../components/DutyForm";
    
    test("renders DutyForm and submits data", () => {
      const handleAddDuty = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <DutyForm onAddDuty={handleAddDuty} disabled={false} />
      );
    
      const input = getByPlaceholderText("Add a new duty");
      const button = getByText("Add Duty");
    
      fireEvent.change(input, { target: { value: "Test Duty" } });
      fireEvent.click(button);
    
      expect(handleAddDuty).toHaveBeenCalledWith("Test Duty");
    });
    
    test("disables the form when disabled prop is true", () => {
      const handleAddDuty = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <DutyForm onAddDuty={handleAddDuty} disabled={true} />
      );
    
      const input = getByPlaceholderText("Add a new duty");
      const button = getByText("Add Duty");
    
      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });
    ```

4. Run the tests
    ```sh
    npm test
    ```

## Additional Information

- Ensure that the backend is running on port 3001 and the frontend on port 3000 for proper communication.
- If you encounter any issues, check the console for errors and ensure that all services (PostgreSQL, backend, and frontend) are running correctly.
