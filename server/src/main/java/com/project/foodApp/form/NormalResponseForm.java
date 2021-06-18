package com.project.foodApp.form;

public class NormalResponseForm {
	private String error;
	
	public NormalResponseForm() {
		
	}
	
	public NormalResponseForm(String error) {
		this.error = error;
	}
		
	public String getError() {
		return error;
	}
	
	public void setError(String error) {
		this.error = error;
	}
}
