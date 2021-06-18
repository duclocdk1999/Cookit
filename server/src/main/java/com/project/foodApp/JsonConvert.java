package com.project.foodApp;

import java.util.Arrays;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.foodApp.model.Ingredient;
import com.project.foodApp.model.Ration;
import com.project.foodApp.model.Step;

public class JsonConvert {
	
	public JsonConvert() {
		
	}
	//----------------------------------------------------------------
	public List<Step> toStepArray(String jsonString) {
		/*
		 * jsonString for steps:
		 * 		[
		 * 			{
		 * 				"instruction": "cut it down !"
		 * 			},
		 * 			{	
		 * 				"instruction": "eat it !"
		 * 			}
		 * 		]
		*/
		try {
			ObjectMapper mapper = new ObjectMapper();
			Step[] steps = mapper.readValue(jsonString, Step[].class);
			return (List<Step>) Arrays.asList(steps);
		}
		catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
	}
	//----------------------------------------------------------------
	public List<Ingredient> toIngredientArray(String jsonString) {
		/*
		 * jsonString for ingredients:
		 * 		[
		 * 			{
		 * 				"name": "dui ga tay",
		 * 				"amount": "nua lang"
		 * 			},
		 * 			{
		 * 				"name": "suon heo",
		 * 				"amount": "5 lang"
		 * 			}
		 * 		]
		 */
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			Ingredient[] steps = mapper.readValue(jsonString, Ingredient[].class);
			return (List<Ingredient>) Arrays.asList(steps);
		}
		catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
	}
	//----------------------------------------------------------------------------
	public List<Ration> toRationArray(String jsonString) {
		/*
		 * jsonString for RecipeIdPortion:
		 * 		[
		 * 			{
		 * 				"recipeId": "1",
		 * 				"portion": "2"
		 * 			},
		 * 			{
		 * 				"recipeId":"2",
		 * 				"portion": "10"
		 * 			}
		 * 		]
		 */
		try {
			ObjectMapper mapper = new ObjectMapper();
			Ration[] rations = mapper.readValue(jsonString, Ration[].class);
			return (List<Ration>) Arrays.asList(rations);
		}
		catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
	}
}
