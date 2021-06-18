package com.project.foodApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.project.foodApp.model.Cart;
import com.project.foodApp.model.Recipe;
import com.project.foodApp.model.User;

public interface CartRepository extends CrudRepository<Cart, Integer> {
	List<Cart> findAllByUser(User user);
	List<Cart> findAllByCartId(Integer cartId);
	
	@Query("select max(cart.cartId) from Cart cart")
	Integer findMaxCartId();
	
	@Query("select max(cart.cartId) from Cart cart where cart.user = ?1 and cart.state is not true")
	Integer findCurrentUnpaidCartId(User user);
	
	@Query("from Cart cart where cart.cartId = ?1 and cart.user = ?2 and cart.recipe = ?3")
	Cart findByCartUserRecipe(Integer cartId, User user, Recipe recipe);
}
