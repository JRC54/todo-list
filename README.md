# TODO List Application

This is a simple TODO list application built with React and Node.js, using PostgreSQL for the database.

## Requirements

- Node.js
- PostgreSQL

## Setup Instructions

### Backend

1. Clone the repository
    ```sh
    git clone https://github.com/JRC54/todo-list.git
    ```

2. Install dependencies
    ```sh
    npm install
    ```

3. Download PostgreSQL 16
    ```sh
    https://www.postgresql.org/download/
    ```

4. Configure your database in `src/init/initDatabase.ts`
    ```javascript
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'duties_db',
      password: 'root',
      port: 5432,
    });
    ```

5. Run the backend server
    ```sh
    npx ts-node .\src\index.ts
    ```

### Frontend

1. Download and navigate to the frontend directory

2. Install dependencies
    ```sh
    npm install
    ```

3. Run the frontend application
    ```sh
    npm start
    ```

### Screenshots

![Main Screen](![main](https://github.com/JRC54/todo-list/assets/111510481/0f1fc34e-3e70-4174-8542-acb197fcb98d))

## Testing

### Backend Tests

1. Install Jest and other testing dependencies
    ```sh
    npm install --save-dev jest ts-jest @types/jest supertest
    ```

2. Create a Jest configuration file `jest.config.js`
    ```javascript
    module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'node',
    };
    ```

3. Write tests in the `src/tests` directory

    Example: `src/tests/duties.test.ts`
    ```typescript
    import request from 'supertest';
    import { app } from '../index';

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
    });
    ```

4. Run the tests
    ```sh
    npm test
    ```

### Frontend Tests

1. Install Jest and other testing dependencies
    ```sh
    npm install --save-dev jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom
    ```

2. Create a Jest configuration file `jest.config.js`
    ```javascript
    module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
    };
    ```

3. Write tests in the `src/tests` directory

    Example: `src/tests/DutyForm.test.tsx`
    ```typescript
    import React from 'react';
    import { render, fireEvent } from '@testing-library/react';
    import DutyForm from '../components/DutyForm';

    test('renders DutyForm and submits data', () => {
      const handleAddDuty = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <DutyForm onAddDuty={handleAddDuty} disabled={false} />
      );

      const input = getByPlaceholderText('Add a new duty');
      const button = getByText('Add Duty');

      fireEvent.change(input, { target: { value: 'Test Duty' } });
      fireEvent.click(button);

      expect(handleAddDuty).toHaveBeenCalledWith('Test Duty');
    });
    ```

4. Run the tests
    ```sh
    npm test
    ```

## Additional Information

- Ensure that the backend is running on port 3001 and the frontend on port 3000 for proper communication.
- If you encounter any issues, check the console for errors and ensure that all services (PostgreSQL, backend, and frontend) are running correctly.
