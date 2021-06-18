package com.project.foodApp.form;

import java.util.List;

import com.project.foodApp.model.Recipe;

public class RecipeResponseForm {
	private List<Recipe> recipes;
	private String error;
	private Boolean like;
	private Integer amount;
	
	public RecipeResponseForm() {
		
	}
	
	public RecipeResponseForm(List<Recipe> recipes, String error, Boolean like, Integer amount) {
		this.recipes = recipes;
		this.error = error;
		this.like = like;
		this.amount = amount;
	}
	
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	
	public Integer getAmount() {
		return this.amount;
	}
	
	public void setLike(Boolean like) {
		this.like = like;
	}
	
	public Boolean getLike() {
		return this.like;
	}
	
	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}
	
	public List<Recipe> getRecipes() {
		return this.recipes;
	}
	
	public void setError(String error) {
		this.error = error;
	}
	
	public String getError() {
		return this.error;
	}
}
