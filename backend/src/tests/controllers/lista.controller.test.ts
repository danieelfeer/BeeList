import request from "supertest";
import { app } from "../../app";
import { AppDataSource } from "../../config/data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  await AppDataSource.getRepository("Lista").clear(); // Limpa os dados antes de cada teste
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("ListaController", () => {
  it("Deve criar uma nova lista", async () => {
    const novaLista = { nome: "Lista Teste" };

    const response = await request(app).post("/api/listas").send(novaLista);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe(novaLista.nome);
  });

  it("Deve listar todas as listas", async () => {
    await request(app).post("/api/listas").send({ nome: "Lista 1" });
    await request(app).post("/api/listas").send({ nome: "Lista 2" });

    const response = await request(app).get("/api/listas");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nome: "Lista 1" }),
        expect.objectContaining({ nome: "Lista 2" }),
      ])
    );
  });

  it("Deve retornar erro ao criar lista sem nome", async () => {
    const response = await request(app).post("/api/listas").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "O nome da lista é obrigatório!");
  });
});
