package com.scd.securecodingdojo.controller;

import java.io.FileInputStream;
import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.apache.catalina.connector.Response;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InformationsController {
    Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> DownloadFiles(HttpServletRequest request, HttpServletResponse response, @RequestParam String file) throws IOException{
        
        try{

            //Em vez de passar o caminho completo, eu deveria colocar um path relativo e depois concatenar o valor do nome do arquivo
            //Por exemplo "c:/caminho/arquivos/" + file
            final InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            

            //log.info("Arquivo - " + file + " - Foi baixado por um usuario");
            return ResponseEntity.ok().body(resource);
        } catch(Exception e){
            log.error("Arquivo - " + file + " - Problema ao baixar arquivo");
            return ResponseEntity.badRequest().body(new InputStreamResource(null));
        }
    }
}
