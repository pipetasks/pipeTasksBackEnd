// Test
import request from "supertest";

// App
import app from "../../app";

// User example
import UserObjectExample from "../../helper/UserObjectExample";

describe("Integration test for deleteAccountController", () => {

  const { name, surname, email, password } = UserObjectExample;
  const User = { name, surname, email, password };

  it("shold be possible delete account", async () => {

    await request(app).post("/cadastry")
      .set("Content-Type", "application/json")
      .send(User);

    const token = await request(app).post("/auth")
      .set("Content-Type", "application/json")
      .send({ 
        email,
        password
      });
    
    const { status, body } = await request(app)
      .delete("/deleteAccount")
      .set("Authorization", "Bearer "+token.body.token);

    expect(status).toBe(200);
    expect(body.user.acknowledged).toBeTruthy();
    expect(body.task.acknowledged).toBeTruthy();
  });
});