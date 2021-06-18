package com.project.foodApp.controller;

import java.util.ArrayList;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.foodApp.form.RecipeResponseForm;
import com.project.foodApp.model.Ingredient;
import com.project.foodApp.model.Recipe;
import com.project.foodApp.model.Step;
import com.project.foodApp.model.User;
import com.project.foodApp.repository.RecipeRepository;
import com.project.foodApp.repository.UserRepository;

@Controller
@RequestMapping(path = "/foodApp/search")
public class SearchController {
	
	@Autowired
	private RecipeRepository recipeRepository;
	
	@Autowired
	private UserRepository userRepository;
	//---------------------------------------------------------------------------------
	private User getUserByTokenFromRequest(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		try {
			User user = userRepository.findByToken(token);
			return user;
		}
		catch (Exception exception) {
			return null;
		}
	}
	//---------------------------------------------------------------------------------
	private int max(int x, int y) {
		if (x > y)
			return x;
		return y;
	}
	//---------------------------------------------------------------------------------
	private int similarity(String firstString, String secondString) {
		
		String string1 = firstString.toLowerCase();
		String string2 = secondString.toLowerCase();
		
		final int length1 = string1.length();
		final int length2 = string2.length();
		int [][] table = new int[length1 + 1][length2 + 1];
		
		for (int i = 0; i <= length1; i++)
			table[i][0] = 0;
		for (int j = 0; j <= length2; j++)
			table[0][j] = 0;
		
		for (int i = 1; i <= length1; i++)
			for (int j = 1; j <= length2; j++)
				if (string1.charAt(i - 1) == string2.charAt(j - 1)) {
					table[i][j] = table[i-1][j-1] + 1;
				}
				else 
					table[i][j] = max(table[i][j-1], table[i-1][j]);
		return table[length1][length2];
	}
	//---------------------------------------------------------------------------------
	private void quicksort(List<String> list, String name) {
		int length = list.size();
		for (int i = 0; i < length - 1; i++) 
			for (int j = i + 1; j < length; j++) 
				if (similarity(list.get(i), name) < similarity(list.get(j), name)) {
					String temp = list.get(i);
					list.set(i, list.get(j));
					list.set(j, temp);
				}
	}
	//---------------------------------------------------------------------------------
	private void initializeRecipe(Recipe recipe, Boolean requireStepsAndIngredients) {
		if (!requireStepsAndIngredients) {
			
			// set author null
			recipe.setAuthorId();
			recipe.setAuthor(null);
			
			// set image url null
			recipe.setImageUrl(null);
			
			// set step null because it is not necessary to load all in general page
			recipe.setSteps(null);
			
			// set ingredient null because it is not necessary to load all in general page
			recipe.setIngredients(null);
			
			// set like record null
			recipe.setFanIds();
			recipe.setNumberOfLikes();
			recipe.setLikeRecords(null);
			
			// set carts null
			recipe.setCarts(null);
		}
		else {
			// set author null to prevent recursion
			recipe.setAuthorId();
			recipe.setAuthor(null);

			// set image null
			recipe.setImageUrl(null);
			
			// set step's recipe null to avoid recursion
			List<Step> steps = recipe.getSteps();
			for (Step step : steps) {
				step.setRecipe(null);
			}
			
			// set ingredient's recipe null to avoid recursion
			List<Ingredient> ingredients = recipe.getIngredients();
			for (Ingredient ingredient : ingredients) {
				ingredient.setRecipe(null);
			}
			
			// set like record null to avoid recursion
			recipe.setFanIds();
			recipe.setNumberOfLikes();
			recipe.setLikeRecords(null);

			// set carts null
			recipe.setCarts(null);
		}
	}
	//-------------------------------------------------------------------------------
	private void initializeRecipes(List<Recipe> recipes, Boolean requireStepsAndIngredients) {
		for (Recipe recipe : recipes) {
			initializeRecipe(recipe, requireStepsAndIngredients);
		}
	}
	//---------------------------------------------------------------------------------
	@RequestMapping(path = "/recipe/{recipeName}", method = RequestMethod.GET)
	@ResponseBody
	public RecipeResponseForm listOfRecipeByName(HttpServletRequest request,
												 @PathVariable("recipeName") String recipeName) {
		RecipeResponseForm responseForm = new RecipeResponseForm();
		
		User user = getUserByTokenFromRequest(request);
		if (user == null) {
			responseForm.setError("login failed, pls check the token's validity");
			return responseForm;
		}
		try {
			List<String> namesFromDb = recipeRepository.findAllNames();
			quicksort(namesFromDb, recipeName);
			
			List<Recipe> recipes = new ArrayList<>();
			for (String name : namesFromDb) {
				List<Recipe> recipesFromDb = recipeRepository.findAllByName(name);
				for (Recipe recipe : recipesFromDb) {
					recipes.add(recipe);
				}
			}
			
//			List<Recipe> recipes = recipeRepository.findAllByName(recipeName);
			initializeRecipes(recipes, false);
			responseForm.setRecipes(recipes);
			return responseForm;
		}
		catch (Exception exception) {
			System.out.println(exception.getMessage());
			exception.printStackTrace();
			responseForm.setError("unexpected error in server");
			return responseForm;
		}
	}
}















