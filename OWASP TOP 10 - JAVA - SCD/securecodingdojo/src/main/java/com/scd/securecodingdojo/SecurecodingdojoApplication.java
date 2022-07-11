package com.scd.securecodingdojo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackageClasses = SecurecodingdojoApplication.class)
public class SecurecodingdojoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurecodingdojoApplication.class, args);
	}

}
