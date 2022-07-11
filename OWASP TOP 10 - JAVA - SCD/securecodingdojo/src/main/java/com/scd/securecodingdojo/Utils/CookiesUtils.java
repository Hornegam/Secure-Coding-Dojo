package com.scd.securecodingdojo.Utils;

import java.io.IOException;
import java.util.Base64;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper; 
import com.fasterxml.jackson.databind.ObjectWriter;
import com.scd.securecodingdojo.entity.PessoaEntity;

public class CookiesUtils {

    public String encodeCookie(PessoaEntity pessoa){
        String jsonEncoded = "";
        try{
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonEncoded = Base64.getEncoder().withoutPadding().encodeToString(ow.writeValueAsString(pessoa).getBytes());
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return jsonEncoded;
    }

    public PessoaEntity decodeCookie(String encodedCookie){
        PessoaEntity pessoa = new PessoaEntity();

        try{
            ObjectMapper objectMapper = new ObjectMapper();

            String decodedString = new String(Base64.getDecoder().decode(encodedCookie));

            pessoa = objectMapper.readValue(decodedString, PessoaEntity.class);
            
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pessoa;
    }
    
}
