package com.project.foodApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.foodApp.form.TokenResponseForm;
import com.project.foodApp.model.User;
import com.project.foodApp.repository.UserRepository;

@Controller
@RequestMapping(path = "/foodApp/signup")
public class SignupController {
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(path = "", method = RequestMethod.POST)
	@ResponseBody
	public TokenResponseForm signup(@RequestBody User newUser) {
		
		/*	json for new User
		 *	{
		 *		"email"		: "...",		(type: String) - compulsory 
		 *		"password"	: "...",		(type: String) - compulsory
		 *		"name"		: "...",		(type: String)	
		 *		"sex"		: "..."			(type: String)
		 *	} 
		 */
		
		TokenResponseForm responseForm = new TokenResponseForm();
		try {
			// if the user account has been created before
			if (userRepository.findByEmail(newUser.getEmail()) != null) {
				responseForm.setError("The account's email is already existed. Please enter a different email");
				responseForm.setToken(null);
				return responseForm;
			}
			// if the user account has not been created yet
			newUser.setToken();
			userRepository.save(newUser);
			newUser.setRecipes(null);   // this won't change the data in database. Necessary to prevent recursive issue (normal behavior of spring)
			
			responseForm.setToken(newUser.getToken());
			return responseForm;
		}
		catch (Exception exception) {
			responseForm.setError(exception.getMessage());
			return responseForm;
		}
	}
}