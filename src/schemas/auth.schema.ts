/**
 * @openapi
 * tags:
 *    - name: Authentication
 *      description: Endpoints related to login and token issuance
 * /auth/login:
 *    post:
 *      tags:
 *       - Authentication
 *      security: []
 *      summary: Logs in a user and returns a token
 *      description: Authenticates a user and returns a JWT token for further requests
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/LoginInput'
 *      responses:
 *          200:
 *              description: Successful login, returns a JWT token
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginResponse'
 *          400:
 *              description: Invalid data (email or password missing) 
 *          401:
 *              description: User not found or password incorrect
 * 
 * components:
 *      schemas:
 *         LoginInput:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *             email:
 *                  type: string
 *                  format: email
 *                  description: User's email address
 *                  example: "email@forexample.com"
 *             password:
 *                  type: string
 *                  description: User's password
 *                  example: "Password@123"
 *         LoginResponse:
 *              type: object
 *              properties:
 *                 message:
 *                      type: string
 *                      description: Success message
 *                      example: "Login successful!"
 *                 token:
 *                      type: string
 *                      description: JWT token for authenticated requests
 *                      example: "eyJhbGciOiJzI1NiIsInRCI6IkpX9Q..."
 */