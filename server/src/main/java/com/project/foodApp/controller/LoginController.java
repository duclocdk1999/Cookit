package com.project.foodApp.controller;

import javax.servlet.http.HttpServletRequest;

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
@RequestMapping(path = "/foodApp/login")
public class LoginController {
	
	@Autowired
	private UserRepository userRepository;
	//---------------------------------------------------------------------------------------------
	@RequestMapping(path = "", method = RequestMethod.POST)
	@ResponseBody
	public TokenResponseForm login(HttpServletRequest request, @RequestBody User userFromRequest) {
		String token; 
		User user;
		TokenResponseForm responseForm = new TokenResponseForm();
		
		// if token is available
		token = request.getHeader("Authorization");
		if (token != null && token.length() > 0) {
			user = userRepository.findByToken(token);
			if (user != null) {
				responseForm.setToken(token);
				return responseForm;
			}
		}
		
		// if token is not available, we have to login by email and password
		String emailFromRequest = userFromRequest.getEmail();
		String passwordFromRequest = userFromRequest.getPassword();
		
		// valid login info
		user = userRepository.findByEmail(emailFromRequest);
		if (user != null && user.getPassword().equals(passwordFromRequest)) {
			token = user.getToken();
			responseForm.setToken(token);
			return responseForm;
		}
		
		// invalid login info
		responseForm.setError("Wrong email or password");
		responseForm.setToken(null);
		return responseForm;
	}
}





