package com.project.foodApp.repository;

import org.springframework.data.repository.CrudRepository;

import com.project.foodApp.model.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	User findByEmail(String email);
	User findByToken(String token);
}
