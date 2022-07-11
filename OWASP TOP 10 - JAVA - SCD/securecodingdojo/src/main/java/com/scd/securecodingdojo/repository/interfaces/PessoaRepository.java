package com.scd.securecodingdojo.repository.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scd.securecodingdojo.entity.PessoaEntity;

@Repository
public interface PessoaRepository extends JpaRepository<PessoaEntity, Long> { 

    public PessoaEntity findByEmailAndPassword(String email, String password);
}
