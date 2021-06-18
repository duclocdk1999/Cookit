package com.project.foodApp.form;

public class TokenResponseForm {
	private String token;
	private String error;
	
	public TokenResponseForm() {
		
	}
	
	public TokenResponseForm(String token, String error) {
		this.token = error;
		this.error = error;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public String getToken() {
		return this.token;
	}
	
	public void setError(String error) {
		this.error = error;
	}
	
	public String getError() {
		return this.error;
	}
}

