import { app } from "./app";
//Ola teste
app.listen(3333, () => {
    console.log(
      "Server is running in 3333 - It's vulnerable to user enumeration e SQL Injection"
    );
});
