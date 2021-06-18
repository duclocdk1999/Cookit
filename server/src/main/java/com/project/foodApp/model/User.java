package com.project.foodApp.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.project.foodApp.SystemProperties;

@Entity
@Table(name = "User")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column
	private String name;
	
	@Column
	private String sex;
	
	@Column
	private String imageUrl;
	
	@Transient
	private List<Integer> favoriteRecipeIds;
	
	@Transient
	private List<Integer> recipeIds;

	@Column(nullable = false, unique = true)
	private String token;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "author", cascade = CascadeType.ALL)
	private List<Recipe> recipes;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<LikeRecord> likeRecords;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<Cart> carts;
	
	//----------------------------------------------------------------------------------------------------------
	public User() {
		
	}
	
	public User(String email, 
				String password, 
				String name, 
				String sex, 
				String imageUrl, 
				List<Recipe> recipes,
				List<LikeRecord> likeRecords,
				List<Cart> carts) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.sex = sex;
		this.imageUrl = imageUrl;
		
		this.recipes = recipes;
		this.likeRecords = likeRecords;
		this.carts = carts;
		
		this.token = email + SystemProperties.getInstance().getGeneratedString(20);
	}
	
	public List<Cart> getCarts() {
		return this.carts;
	}
	
	public void setCarts(List<Cart> carts) {
		this.carts = carts;
	}
	
	public List<Integer> getRecipeIds() {
		return recipeIds;
	}

	public void setRecipeIds(List<Integer> recipeIds) {
		this.recipeIds = recipeIds;
	}
	
	public void setRecipeIds() {
		List<Integer> recipeIds = new ArrayList<>();
		int length = this.recipes.size();
		for (int i = 0; i < length; i++) {
			recipeIds.add(recipes.get(i).getId());
		}
		this.recipeIds = recipeIds;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	public List<Integer> getFavoriteRecipeIds() {
		return favoriteRecipeIds;
	}

	public void setFavoriteRecipeIds(List<Integer> favoriteRecipeIds) {
		this.favoriteRecipeIds = favoriteRecipeIds;
	}
	
	public void setFavoriteRecipeIds() {
		List<Integer> favoriteRecipeIds = new ArrayList<>();
		int length = likeRecords.size();
		for (int i = 0; i < length; i++) {
			favoriteRecipeIds.add(likeRecords.get(i).getRecipe().getId());
		}
		this.favoriteRecipeIds = favoriteRecipeIds;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	public void setToken() {
		this.token = this.email + SystemProperties.getInstance().getGeneratedString(20);
	}

	public List<Recipe> getRecipes() {
		return recipes;
	}

	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}

	public List<LikeRecord> getLikeRecords() {
		return likeRecords;
	}

	public void setLikeRecords(List<LikeRecord> likeRecords) {
		this.likeRecords = likeRecords;
	}
}
