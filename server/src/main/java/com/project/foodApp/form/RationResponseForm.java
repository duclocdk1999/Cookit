package com.project.foodApp.form;

import java.util.List;

import com.project.foodApp.model.Ration;

public class RationResponseForm {
	private String error;
	private List<Ration> rations;
	
	public RationResponseForm() {
		
	}
	
	public RationResponseForm(List<Ration> rations, String error) {
		this.rations = rations;
		this.error = error;
	}
	
	public void setError(String error) {
		this.error = error;
	}
	
	public String getError() {
		return this.error;
	}
	
	public void setRations(List<Ration> rations) {
		this.rations = rations;
	}
	
	public List<Ration> getRations() {
		return this.rations;
	}
}
