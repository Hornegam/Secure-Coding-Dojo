import { app } from "./app";

app.listen(3333, () => {
    console.log(
      "Server is running in 3333 - It's vulnerable to Insecure Cookies e SQL Injection"
    );
});
