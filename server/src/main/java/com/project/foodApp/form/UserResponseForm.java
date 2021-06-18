package com.project.foodApp.form;

import com.project.foodApp.model.User;

public class UserResponseForm {
	private User user;
	private String error;
	
	public UserResponseForm() {
		
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public User getUser() {
		return this.user;
	}
	
	public void setError(String error) {
		this.error = error;
	}
	
	public String getError() {
		return this.error;
	}
}
