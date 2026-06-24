jest.mock("../services/transactionService", () => ({
  getAllTransactions: jest.fn(),
  createTransaction: jest.fn(),
  deleteTransaction: jest.fn(),
  calculateBalance: jest.fn(),
}));

const transactionService = require("../services/transactionService");
const transactionController = require("../controllers/transactionController");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getAllTransactions", () => {
  it("returns all transactions", async () => {
    const transactions = [
      { amount: 100, type: "income" },
      { amount: 50, type: "expense" },
    ];

    transactionService.getAllTransactions.mockResolvedValue(transactions);

    const req = {};

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await transactionController.getAllTransactions(req, res);

    expect(res.json).toHaveBeenCalledWith(transactions);
  });
});

describe("createTransaction", () => {
  it("creates a transaction and returns 201", async () => {
    const newTransaction = { amount: 100, type: "income" };

    transactionService.createTransaction.mockResolvedValue(newTransaction);

    const req = { body: newTransaction };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await transactionController.createTransaction(req, res);

    expect(transactionService.createTransaction).toHaveBeenCalledWith(
      newTransaction,
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newTransaction);
  });
});

describe("createTransaction error", () => {
  it("returns 400 when service throws", async () => {
    transactionService.createTransaction.mockRejectedValue(
      new Error("Invalid transaction"),
    );

    const req = { body: {} };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await transactionController.createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid transaction",
    });
  });
});

describe("deleteTransaction", () => {
  it("deletes a transaction", async () => {
    transactionService.deleteTransaction.mockResolvedValue();

    const req = { params: { id: "123" } };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await transactionController.deleteTransaction(req, res);

    expect(transactionService.deleteTransaction).toHaveBeenCalledWith("123");

    expect(res.json).toHaveBeenCalledWith({
      message: "Transaction deleted",
    });
  });
});
