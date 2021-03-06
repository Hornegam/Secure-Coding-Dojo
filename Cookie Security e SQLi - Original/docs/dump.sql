PRAGMA foreign_keys=OFF;

BEGIN TRANSACTION;

CREATE TABLE user_table(
                    id          INTEGER  NOT NULL PRIMARY KEY 
                    ,name        VARCHAR(13) NOT NULL
                    ,age         INTEGER  NOT NULL
                    ,CreditCard  VARCHAR(19) NOT NULL
                    ,CVV         INTEGER  NOT NULL
                    ,token       INTEGER  NOT NULL
                , email DEFAULT ('zezinho@industria.com'), password DEFAULT ('1234'));


INSERT INTO user_table VALUES(1,'Roberto',99,'2929 1231 3123 3213',132,87645123,'roberto@industria.com','1234');
INSERT INTO user_table VALUES(2,'Chuck Norris',99,'3213 1231 3123 3213',123,876431233,'chuck@industria.com','1234');
INSERT INTO user_table VALUES(3,'Silvio Santos',99,'2321 1231 3123 3213',122,87644123,'silvio@industria.com','1234');
INSERT INTO user_table VALUES(4,'Gustavo',99,'2912 1231 3123 3213',122,87644123,'gustavo@industria.com','1234');
INSERT INTO user_table VALUES(5,'Josu├®',99,'2929 1231 3123 3213',122,87644352,'josue@industria.com','1234');
INSERT INTO user_table VALUES(6,'Almirando',99,'2929 1231 3123 3213',132,87645631,'almirando@industria.com','1234');
INSERT INTO user_table VALUES(7,'Alexandee',99,'2929 1231 1312 4323',132,87612354,'alexandee@industria.com','1234');
INSERT INTO user_table VALUES(8,'Yoshua',99,'2929 1231 4321 3213',132,87646423,'yoshua@industria.com','1234');

CREATE TABLE admin_user_table(
  id INTEGER NOT NULL,
  password VARCHAR NOT NULL,
  tip VARCHAR NOT NULL
);
INSERT INTO admin_user_table VALUES(1,'DASDAS','ASDDASSAD');
INSERT INTO admin_user_table VALUES(2,'zezinho123','Meu melhor amigo e meu cachorro');
INSERT INTO admin_user_table VALUES(2,'eusoudejesus','Minha religiao');
INSERT INTO admin_user_table VALUES(3,'eusoudeoxum','Minha religiao');
INSERT INTO admin_user_table VALUES(4,'eusoudeoxala','Minha religiao');
INSERT INTO admin_user_table VALUES(5,'eusoudebuda','Minha religiao');
INSERT INTO admin_user_table VALUES(5,'12345678','Meu numero');
INSERT INTO admin_user_table VALUES(6,'12345678','Meu numero');
INSERT INTO admin_user_table VALUES(7,'123456789','Meu numero');
INSERT INTO admin_user_table VALUES(8,'SilvioSantosTop','Meu numero');
COMMIT;
