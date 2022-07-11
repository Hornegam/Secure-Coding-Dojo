package com.scd.securecodingdojo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.NaturalId;


@Entity
public class PessoaEntity {
    public PessoaEntity(){ }

    public PessoaEntity(long id, String name, String email, int age, String creditCard, int cvv, int token, boolean temAcesso){
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.creditCard = creditCard;
        this.cvv = cvv;
        this.token = token;
        this.temAcesso = temAcesso;
    }

    public PessoaEntity(long id, String name, String email, int age, String creditCard, int cvv, int token){
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.creditCard = creditCard;
        this.cvv = cvv;
        this.token = token;
    }

    @Id
    private long id;

    @Column(nullable = false)
    private String name;

    @NaturalId
    @Column(nullable = false, unique = true)
    //@NotNull
    @NotBlank
    private String email;

    @NotNull
    @Column(nullable = false)
    private int age;

    @Column(nullable = false, length = 19)
    private String creditCard;

    @Column(nullable = false, length = 3)
    private int cvv;

    @Column(nullable = false, length = 6)
    private int token;

    @Column(nullable = false)
    @NotBlank
    private String password = "1234";

    private boolean temAcesso = false;

    public boolean isTemAcesso() {
        return temAcesso;
    }

    public void setTemAcesso(boolean temAcesso) {
        this.temAcesso = temAcesso;
    }

    public long getId(){
        return id;
    }
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(String creditCard) {
        this.creditCard = creditCard;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}
