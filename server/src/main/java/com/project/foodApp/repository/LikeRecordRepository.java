package com.project.foodApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.project.foodApp.model.LikeRecord;
import com.project.foodApp.model.Recipe;
import com.project.foodApp.model.User;

public interface LikeRecordRepository extends CrudRepository<LikeRecord, Integer>{
	List<LikeRecord> findByUser(User user);
	
	// @Query("from ... where ...")
	List<LikeRecord> findByRecipe(Recipe recipe);
	
	@Query("from LikeRecord likeRecord where likeRecord.user = ?1 and likeRecord.recipe = ?2")
	LikeRecord findByUserRecipe(User user, Recipe recipe);
}
