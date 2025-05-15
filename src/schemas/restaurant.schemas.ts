/**
 * @openapi
 * components:
 *  schemas:
 *    Restaurant:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *        - cnpj
 *        - address
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        name:
 *          type: string
 *          minLength: 2
 *          maxLength: 100
 *          example: "Restaurante Monte Verde"
 *        email:
 *          type: string
 *          format: email
 *          example: "contato@monteverde.com"
 *        password:
 *          type: string
 *          minLength: 6
 *          pattern: '^(?=.*[A-Z])(?=.*[!@#$%^&*]).+$'
 *          description: Password must contain at least one uppercase letter and one special character (!@#$%^&*).
 *          example: "Senh@Forte123!"
 *        score:
 *          type: number
 *          format: float 
 *          minimum: 0
 *          maximum: 5
 *          default: 0
 *          example: 4
 *        cnpj:
 *          type: string
 *          pattern: '^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}$'
 *          example: "12.345.678/0001-90"  
 *        address:
 *          type: string
 *          minLength: 5
 *          maxLength: 255
 *          example: "Avenida BPS, 1303, Pinheirinho, Itajubá, MG"
 *        userRole:
 *          type: string
 *          enum: [RESTAURANT]
 *          example: "RESTAURANT"
 *
 * /restaurants:
 *    get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *        200:
 *         description: List of all restaurants
 *         content:
 *          application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Restaurant'
 *    post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *           $ref: '#/components/schemas/Restaurant'
 *     responses:
 *      201:
 *       description: Restaurant created successfully
 *  
 * /restaurants/{id}:
 *   get:
 *      summary: Get a restaurant by ID
 *      tags: [Restaurants]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Restaurant found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Restaurant'
 *          404:
 *              description: Restaurant not found
 *   put:
 *      summary: Update a restaurant by ID
 *      tags: [Restaurants]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Restaurant'
 *      responses:
 *         200:
 *          description: Restaurant updated successfully
 *         400:
 *          description: Invalid restaurant ID or missing mandatory data
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *         type: integer
 *     responses:
 *      204:
 *       description: Restaurant deleted successfully
 *      400:
 *       description: Invalid restaurant ID
 * 
 */
