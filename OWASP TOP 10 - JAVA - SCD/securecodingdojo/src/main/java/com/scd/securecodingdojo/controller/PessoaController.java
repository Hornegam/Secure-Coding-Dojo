package com.scd.securecodingdojo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import java.util.Optional;
import javax.validation.Valid;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;




import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.scd.securecodingdojo.DTO.PessoaDTO;
import com.scd.securecodingdojo.Utils.CookiesUtils;
import com.scd.securecodingdojo.entity.PessoaEntity;
import com.scd.securecodingdojo.repository.interfaces.PessoaRepository;


@RestController
public class PessoaController {
    @Autowired
    private PessoaRepository _PessoaRepository;



    @RequestMapping(value="/login", method = RequestMethod.POST)
    public ResponseEntity<String> Login(@RequestBody PessoaDTO login, HttpServletResponse response){

        PessoaEntity pessoa = _PessoaRepository.findByEmailAndPassword(login.getEmail(), login.getSenha());

        if(pessoa != null ){
              if (pessoa.getPassword().equals(login.getSenha())){
            //Transformando meu objeto de pessoa em um json para transformar em base64, pois meu estagiário disse que fica seguro.
            String jsonEncoded = new CookiesUtils().encodeCookie(pessoa);

            //Sera que eu deveria realmente mandar todos os dados que retorna da consulta para o cookie?
            Cookie cookie = new Cookie("personCookie",jsonEncoded);
            

            
            //Antes de adicionar o cookie eu deveria adicionar algumas variaveis para tornar seguro
            response.addCookie(cookie);

            return new ResponseEntity<String>("Seja bem vindo "+pessoa.getName()+"!!", HttpStatus.OK);
            }
            //return new ResponseEntity<String>("Senha errada",HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<String>("Usuário ou senha incorreto",HttpStatus.FORBIDDEN);
    }

    @RequestMapping(value = "/pessoa/{id}", method = RequestMethod.GET)
    public ResponseEntity<PessoaEntity> GetById(HttpServletRequest request, @PathVariable(value = "id") long id){

        Optional<PessoaEntity> pessoa = _PessoaRepository.findById(id);

        
        if(!pessoa.isEmpty()){
            //Sera que eu deveria retornar todos os dados de uma pessoa na consulta?
            return new ResponseEntity<PessoaEntity>(pessoa.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }





    @RequestMapping(value = "/pessoa", method = RequestMethod.POST)
    public PessoaEntity Post(@Valid @RequestBody PessoaEntity pessoa){
        return _PessoaRepository.save(pessoa);
    }

   


}
