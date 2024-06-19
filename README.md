# Ecommerce Application

This repository contains the code for a full-stack e-commerce application built with the MERN stack, TailwindCSS, and Stripe checkout.

## Features

* **Product Catalog:** Browse and search products.
* **Shopping Cart:** Add, remove, and manage items in your cart.
* **Checkout:** Secure checkout process using Stripe.
* **User Authentication:** Register, login, and manage your account.
* **Order Management:** View and track your order history, including details of each order.
* **Error Handling:** Robust error handling middleware to ensure application stability.
* **End-to-End Testing:** Automated E2E tests to validate the application's workflow.
* **Code Splitting:** Efficient loading of application code for a smoother user experience.

## Getting Started

1. **Clone the repository:**
```bash
  git clone https://github.com/your-username/ecommerce-app.git
```
2. **Navigate to the project directory:**
```bash
  cd ecommerce-app
```
3. **Install dependencies:**
```bash
  pnpm install
```
4. **Start the application:**
```bash
  docker-compose up -d
```
5. **Access the application:**
```bash
  http://localhost:3000
```

## Database Authentication and Authorization

* **Set up database user:**
  * Create a new database user in MongoDB with appropriate roles and permissions. In the `docker-compose.yml` file, set the `MONGO_USER` and `MONGO_PASSWORD` environment variables to the username and password of the database user.  
* **Configure database connection:**
  * Update the `backend/src/config/database.ts` file to include the database username, password, and authentication source in the `mongoose.connect` function.  
* **Update environment variables:**
  * Ensure that the environment variables `MONGO_URI`, `MONGO_USER`, and `MONGO_PASSWORD` are set correctly in the `docker-compose.yml` file.  

## Stripe Integration

1. **Obtain Stripe Credentials:**
   * Sign up for a Stripe account: [https://stripe.com/](https://stripe.com/)
   * Obtain your Stripe Publishable Key and Secret Key from your Stripe account dashboard.

2. **Configure Stripe in the Frontend:**
   * In `frontend/src/components/Checkout.tsx`, replace `pk_test_YOUR_STRIPE_PUBLISHABLE_KEY` with your actual Stripe Publishable Key.

3. **Configure Stripe in the Backend:**
   * In `backend/src/controllers/stripe.ts`, replace `sk_test_YOUR_STRIPE_SECRET_KEY` with your actual Stripe Secret Key.
   * Ensure that your frontend URL is correctly configured in the `success_url` and `cancel_url` settings within the Stripe checkout session creation code in `backend/src/controllers/stripe.ts`.

4. **Set Stripe Environment Variable:**
   * In `docker-compose.yml`, set the `STRIPE_SECRET_KEY` environment variable for the backend service to your actual Stripe Secret Key.

## Deployment

1. **Deploy to DigitalOcean:**
```bash
  doctl app deploy --manifest deployment/digitalocean/app.yaml
```
2. **Deploy the database to DigitalOcean:**
```bash
  doctl database create --config deployment/digitalocean/database.yaml
```

## Running End-to-End Tests

To run the E2E tests, follow these steps:

1. **Start the application:**
   ```bash
   docker-compose up -d
   ```
2. **Run the Cypress tests:**
   ```bash
   docker-compose run test-frontend
   ```

## CI/CD Pipeline Setup

This project utilizes a CI/CD pipeline implemented with GitHub Actions to automate the build, test, and deployment process. The workflow includes the following steps:

1. **Build and test the frontend:**
   - Install dependencies
   - Build the frontend application
   - Build a Docker image for the frontend
   - Push the Docker image to Docker Hub
2. **Build and test the backend:**
   - Install dependencies
   - Build the backend application
   - Build a Docker image for the backend
   - Push the Docker image to Docker Hub
3. **Run tests:**
   - Start the backend service for testing
   - Run frontend unit tests
   - Run backend unit tests
   - Run E2E tests
   - Stop the backend service
4. **Deploy to DigitalOcean:**
   - Log in to DigitalOcean
   - Deploy the application using the `deployment/digitalocean/app.yaml` manifest file

**To configure the CI/CD pipeline:**

* **Create a GitHub repository:**
   * Create a new repository on GitHub and push the code to it.
* **Enable GitHub Actions:**
   * Go to the Actions tab in your repository and create a new workflow.
* **Configure workflow:**
   * In the workflow file, define the steps for building, testing, and deploying the application.
   * The steps should include:
     * Installing dependencies.
     * Building the frontend and backend applications.
     * Running tests.
     * Pushing the Docker images to a registry (e.g., Docker Hub).
     * Deploying the application to DigitalOcean.

**Example workflow file (`frontend/.github/workflows/ci-cd.yml`):**
```yaml
name: CI/CD

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: pnpm install
      - name: Build frontend
        run: pnpm run ci:build
      - name: Build Docker image
        run: docker build ./frontend -t your-username/ecommerce-frontend:latest
      - name: Push Docker image to Docker Hub
        run: docker push your-username/ecommerce-frontend:latest
  backend-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: pnpm install
      - name: Build backend
        run: pnpm run ci:build
      - name: Build Docker image
        run: docker build ./backend -t your-username/ecommerce-backend:latest
      - name: Push Docker image to Docker Hub
        run: docker push your-username/ecommerce-backend:latest
  test:
    needs: [build, backend-build]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Start Backend for testing
        run: docker-compose up -d backend
      - name: Run frontend unit tests
        run: docker-compose run test-frontend
      - name: Run backend unit tests
        run: docker-compose run test-backend
      - name: Stop Backend
        run: docker-compose down
  deploy:
    needs: [build, backend-build, test]
    runs-on: ubuntu-latest
    steps:
      - name: Login to DigitalOcean
        uses: digitalocean/action-doctl@v1
        with:
          token: ${{ secrets.DO_TOKEN }}
      - name: Deploy to DigitalOcean
        run: doctl app deploy --manifest deployment/digitalocean/app.yaml
```

## Documentation

**Frontend:**

* **Components:**
  * `App.tsx`: Main application component.
  * `Header.tsx`: Navigation bar component.
  * `Footer.tsx`: Footer component.
  * `ProductCard.tsx`: Component for displaying individual products.
  * `ShoppingCart.tsx`: Shopping cart component.
  * `Checkout.tsx`: Checkout component.
  * `Login.tsx`: Login component.
  * `Signup.tsx`: Signup component.
  * `OrderHistory.tsx`: Component for displaying order history.
  * `OrderDetails.tsx`: Component for displaying details of a specific order.
* **Pages:**
  * `Home.tsx`: Homepage.
  * `Products.tsx`: Product listing page.
  * `Cart.tsx`: Shopping cart page.
  * `Checkout.tsx`: Checkout page.
  * `Login.tsx`: Login page.
  * `Signup.tsx`: Signup page.
  * `OrderHistory.tsx`: Order history page.
  * `OrderDetails.tsx`: Order details page.
* **Styles:**
  * `globals.css`: Global styles.
* **Utils:**
  * `api.ts`: API functions for interacting with the backend.
  * `storage.ts`: Functions for managing local storage.

**Backend:**

* **Models:**
  * `User.ts`: User model.
  * `Product.ts`: Product model.
  * `Order.ts`: Order model.
* **Routes:**
  * `users.ts`: User-related routes.
  * `products.ts`: Product-related routes.
  * `cart.ts`: Shopping cart routes.
  * `orders.ts`: Order-related routes (including routes for retrieving order history and details of individual orders).
  * `stripe.ts`: Stripe routes.
* **Controllers:**
  - `users.ts`: Controllers for handling user-related requests.
  - `products.ts`: Controllers for handling product-related requests.
  - `cart.ts`: Controllers for handling shopping cart requests.
  - `orders.ts`: Controllers for handling order-related requests (including controllers for retrieving order history and details of individual orders).
  - `stripe.ts`: Controllers for handling Stripe requests.
* **Middleware:**
  - `auth.ts`: Authentication middleware.
  - `errorHandler.ts`: Error handling middleware.
* **Config:**
  - `database.ts`: Database connection configuration.
  - `environment.ts`: Environment variables.
* **Utils:**
  - `kafka.ts`: Kafka integration.
  - `redis.ts`: Redis integration.

**Error Handling Middleware:**

* `errorHandler.ts`: This middleware is used to handle uncaught errors that occur during the processing of requests in the backend. It logs the error details to the console, sends an appropriate response (500 Internal Server Error) to the client, and ensures that the application remains stable.

```typescript
// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.