import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Contact Management API",
			version: "1.0.0",
			description: "A simple Contact Management API",
		},
		servers: [
			{
				url: "http://localhost:5000",
				description: "Development server",
			},
		],
	},
	apis: ["./src/interfaces/http/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}