package com.project.foodApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.project.foodApp.model.Recipe;
import com.project.foodApp.model.User;

public interface RecipeRepository extends CrudRepository<Recipe, Integer> {
	
	List<Recipe> findByAuthor(User author);
	
	//@Query("from Recipe recipe where recipe.category = ?1")
	List<Recipe> findByCategory(String category);
	
	@Query("from Recipe recipe order by recipe.likeRecords.size desc")
	List<Recipe> findAllSortByPopular();
	
	@Query("select distinct recipe.name from Recipe recipe")
	List<String> findAllNames();
	
	List<Recipe> findAllByName(String name);
}
