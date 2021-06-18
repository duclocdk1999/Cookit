package com.project.foodApp.model;


// this class is not entity, just an object to support reading list of json
public class Ration {
	private Recipe recipe;
	Integer portion;
	
	public Ration() {
		
	}
	
	public Ration(Recipe recipe, Integer portion) {
		this.recipe = recipe;
		this.portion = portion;
	}
	
	public Recipe getRecipe() {
		return this.recipe;
	}
	
	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}
	
	public Integer getPortion() {
		return this.portion;
	}
	
	public void setPortion(Integer portion) {
		this.portion = portion;
	}
}
