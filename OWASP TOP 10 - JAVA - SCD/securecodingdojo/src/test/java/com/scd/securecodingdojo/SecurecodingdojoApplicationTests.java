package com.scd.securecodingdojo;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.Cookie;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scd.securecodingdojo.DTO.PessoaDTO;
import com.scd.securecodingdojo.Utils.CookiesUtils;
import com.scd.securecodingdojo.entity.PessoaEntity;
import com.scd.securecodingdojo.repository.interfaces.PessoaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcResultMatchersDsl;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.CookieResultMatchers;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class SecurecodingdojoApplicationTests {

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private MockMvc mockMvc;

	private PessoaDTO pessoa;

	@BeforeEach
	public void setup() {
		this.populate_Database();

		this.pessoa = new PessoaDTO();
		pessoa.setEmail("j.mato@teste.com");
		pessoa.setSenha("1234");
	}

	@Test
	public void BrokenAuthentication_givenPessoa_whenLogin_thenIsOk() throws Exception {

		try {
			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa)));
					

			response.andExpect(MockMvcResultMatchers.status().isOk());
		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void BrokenAuthentication_givenPessoa_whenLoginWrongPassword_thenIsForbidden() throws Exception {

		try {

			PessoaEntity pessoa = new PessoaEntity();
			pessoa.setEmail("teste@teste.com");
			pessoa.setPassword("12345");

			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(pessoa)));

			response.andExpect(MockMvcResultMatchers.status().isForbidden());
			response.andExpect(MockMvcResultMatchers.content().string("Usuário ou senha incorreto"));
		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void CookieSecurity_givenPessoa_whenLogin_thenCookieIsSecure() throws Exception {

		try {
			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa)));

			response.andExpect(MockMvcResultMatchers.cookie().secure("personCookie", true));
		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void CookieSecurity_givenPessoa_whenLogin_thenCookieHasHttpOnly() throws Exception {

		try {
			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa)));

			response.andExpect(MockMvcResultMatchers.cookie().httpOnly("personCookie", true));
		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void CookieSecurity_givenPessoa_whenLogin_thenCookieHasDomain() throws Exception {

		try {
			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa)));

			response.andExpect(MockMvcResultMatchers.cookie().domain("personCookie", "localhost"));
		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void CookieSecurity_givenPessoa_whenLogin_thenCookieHasMaxAge() throws Exception {

		try {
			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa)));

			response.andExpect(MockMvcResultMatchers.cookie().maxAge("personCookie", 5000));
		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void CookieSecurity_givenPessoa_whenLogin_thenReturnOnlySafeInfosCookie() throws Exception {

		try {
			MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa))).andReturn();

			Cookie cookie = response.getResponse().getCookie("personCookie");
			System.out.println(cookie);
			PessoaEntity personDecoded = new CookiesUtils().decodeCookie(cookie.getValue());

			assertNull(personDecoded.getCreditCard());
			assertNull(personDecoded.getPassword());

		} catch (IOException e) {
			throw e;
		}
	}


	@Test
	public void UserEnumeration_givenPessoa_whenRetrieveInfo_thenReturnOnlyOwnInfo() throws Exception {

		try {
			MvcResult responseMvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa))).andReturn();

			Cookie cookie = responseMvcResult.getResponse().getCookie("personCookie");

			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/pessoa/2").cookie(cookie));

			response.andExpect(MockMvcResultMatchers.content().string("Você não tem permissão para essa ação."));
			response.andExpect(MockMvcResultMatchers.status().isForbidden());

		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void BrokenAccessControl_givenPessoa_whenRedirectForbiddenURL_thenBlock() throws Exception {

		try {
			MvcResult responseMvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa))).andReturn();


			Cookie cookie = responseMvcResult.getResponse().getCookie("personCookie");
			PessoaEntity personDecoded = new CookiesUtils().decodeCookie(cookie.getValue());

			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/authorize?token="+personDecoded.getToken()+"&redirect_uri=https://netflix.com").cookie(cookie));

			response.andExpect(MockMvcResultMatchers.content().string("Você não tem permissão para essa ação."));
			response.andExpect(MockMvcResultMatchers.status().isForbidden());

		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void BrokenAccessControl_givenPath_whenTryToDownloadForbiddenFile_thenBlock() throws Exception {

		try {
			MvcResult responseMvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa))).andReturn();


			Cookie cookie = responseMvcResult.getResponse().getCookie("personCookie");

			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/download?file=c:/teste.txt").cookie(cookie));

			response.andExpect(MockMvcResultMatchers.content().string("Você não tem permissão para essa ação."));
			response.andExpect(MockMvcResultMatchers.status().isForbidden());

		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void Injection_givenPath_whenTryToInjectCookie_thenBlock() throws Exception {

		try {
			MvcResult responseMvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(this.pessoa))).andReturn();


			Cookie cookie = responseMvcResult.getResponse().getCookie("personCookie");
			PessoaEntity pessoaDecoded = new CookiesUtils().decodeCookie(cookie.getValue());
			pessoaDecoded.setTemAcesso(true);
			String cookieEncoded = new CookiesUtils().encodeCookie(pessoaDecoded);
			Cookie cookieInjected = new Cookie("personCookie", cookieEncoded);

			ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/download?file=c:/teste.txt").cookie(cookieInjected));

			response.andExpect(MockMvcResultMatchers.content().string("Cookie Inválido."));
			response.andExpect(MockMvcResultMatchers.status().isForbidden());

		} catch (IOException e) {
			throw e;
		}
	}

	@Test
	public void SecurityLogging_givenFunctionality_whenWarnErrorInfo_thenLog() throws Exception {

		/*Esse teste e apenas para lembrar de colocar logs dentro das classes de controle em casos de erros, warn ou info.
			
			Exemplo de Log no InformationController.
			Logger log = LoggerFactory.getLogger(this.getClass());
			log.info("Arquivo - " + file + " - Foi baixado por um usuario");

		*/
		assertTrue(true);
	}

	private void populate_Database() {
		this.erase_database();

		PessoaEntity pessoa1 = new PessoaEntity(1, "Jose Joaquim", "teste@teste.com", 18, "2929 1231 3123 3213", 123,
				123456, true);
		PessoaEntity pessoa2 = new PessoaEntity(2, "Silvio Abravanel", "s.abravanel@teste.com", 81,
				"4123 3213 2929 1231", 125, 123654);
		PessoaEntity pessoa3 = new PessoaEntity(3, "Everaldo Ezequias", "e.ezequias@teste.com", 74,
				"1547 9654 3123 3213", 854, 651325);
		PessoaEntity pessoa4 = new PessoaEntity(4, "Dom Juam", "d.juam@teste.com", 16, "8421 6325 3123 3213", 654,
				543210);
		PessoaEntity pessoa5 = new PessoaEntity(5, "Antonio Fagundes", "a.fagundes@teste.com", 35,
				"9546 2621 3123 3213", 123, 658432);
		PessoaEntity pessoa6 = new PessoaEntity(6, "João do Mato", "j.mato@teste.com", 20,
				"3213 1233 6545 3213", 123, 657422);

		pessoaRepository.save(pessoa1);
		pessoaRepository.save(pessoa2);
		pessoaRepository.save(pessoa3);
		pessoaRepository.save(pessoa4);
		pessoaRepository.save(pessoa5);
		pessoaRepository.save(pessoa6);
	}

	private void erase_database() {
		pessoaRepository.deleteAll();
	}

	public static String asJsonString(final Object obj) {
		try {
			final ObjectMapper mapper = new ObjectMapper();
			final String jsonContent = mapper.writeValueAsString(obj);
			return jsonContent;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
