package com.scd.securecodingdojo.controller;

import java.io.IOException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scd.securecodingdojo.Utils.URLUtils;
import com.scd.securecodingdojo.entity.PessoaEntity;

@RestController
public class RedirectController {
    
    
    /**
     * @param request
     * @param id
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/authorize", method = RequestMethod.GET)
    public void Authorize(HttpServletRequest request, HttpServletResponse response, @RequestParam String token, @RequestParam String redirect_uri) throws IOException{
        
        try{
            /*Eu deveria implementar uma whitelist permitindo apenas para as urls abaixo
            - https://letmegooglethat.com/
            - https://www.youtube.com/watch?v=dQw4w9WgXcQ
            - https://www.google.com/search?q=gatinhos+fofinho
            */

            boolean isValid = URLUtils.isValid(redirect_uri);

            if(isValid)
                response.sendRedirect(redirect_uri);

            response.sendError(400, "Problema para renderizar a url");
            
        } catch(Exception e){

        }
    }
}
