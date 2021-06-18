package com.project.foodApp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.foodApp.model.Ingredient;
import com.project.foodApp.model.Recipe;

public interface IngredientRepository extends CrudRepository<Ingredient, Integer>{
	List<Recipe> findByRecipe(Recipe recipe);
}