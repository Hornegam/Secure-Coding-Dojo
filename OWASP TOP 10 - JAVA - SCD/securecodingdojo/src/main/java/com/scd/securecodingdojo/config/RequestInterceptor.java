package com.scd.securecodingdojo.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.scd.securecodingdojo.Utils.CookiesUtils;
import com.scd.securecodingdojo.entity.PessoaEntity;

@Component
public class RequestInterceptor implements HandlerInterceptor{
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        
        //Em vez de acreditar cegamente no que vem da internet
        //u deveria pegar o id do usuario pelo cookie e validar
        //as informações para verificar se nada foi alterado

        try {
            if(request.getRequestURI().equals("/login"))
                return true; 
             
            String cookies = request.getCookies()[0].getValue();
            //Eu deveria utilizar esse pessoaCookie para poder validar se o usuário está logado e se a variavel temAcesso esta setada como true para o usuario.
            PessoaEntity pessoaCookie = new CookiesUtils().decodeCookie(cookies);
            
            //if(pessoaCookie.isTemAcesso() == true)
            //    return true; 

            if(request.getRequestURI().contains("/pessoa"))
                return true;

            return true;
        } catch (Exception e) {
            return false;
        }  
    }
}
