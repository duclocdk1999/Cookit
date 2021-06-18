package com.project.foodApp.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

@Entity
@Table(
	uniqueConstraints = {
			@UniqueConstraint(columnNames = {"cartId", "user", "recipe"})
	}
)
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;				// this id is generated by system
	
	@Column(nullable = false)
	private Integer cartId;			// this id is controlled by developer, manage history transaction

	@Column
	private String address;
	
	@Column
	private Boolean state;
	
	@Column
	private String paymentMethod;
	
	@Column
	private Integer portion;
	
	@Column
	private String date;
	
	@Column
	private String phone;
	
	@Transient
	private Integer userId;
	
	@Transient
	private Integer recipeId;
	
	@Transient
	private String recipeName;
	
	@Transient
	private List<Ingredient> ingredients;
	
	@ManyToOne
	@JoinColumn(name = "user", nullable = false)
	private User user;
	
	@ManyToOne	
	@JoinColumn(name = "recipe", nullable = false)
	private Recipe recipe;
		
	//--------------------------------------------------------------
	public Cart() {
		
	}
	
	public Cart(Integer cartId, User user, Recipe recipe, Integer portion, String phone, String date, 
				String address, Boolean state, String paymentMethod) {
		this.cartId = cartId;
		this.user = user;
		this.recipe = recipe;
		this.portion = portion;
		this.phone = phone;
		this.date = date;
		this.address = address;
		this.state = state;
		this.paymentMethod = paymentMethod;
	}
	
	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getDate() {
		return this.date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}

	public String getRecipeName() {
		return this.recipeName;
	}
	
	public void setRecipeName() {
		if (this.recipe != null) {
			this.recipeName = this.getRecipe().getName();
		}
	}
	
	public List<Ingredient> getIngredients() {
		return this.ingredients;
	}
	
	public void setIngredients() {
		this.ingredients = this.getRecipe().getIngredients();
		if (this.ingredients != null) {
			for (Ingredient ingredient : this.ingredients) {
				ingredient.setRecipe(null);
			}
		}
	}
	
	public Integer getRecipeId() {
		return this.recipeId;
	}
	
	public void setRecipeId() {
		if (this.recipe != null) {
			this.recipeId = this.getRecipe().getId();
		}
	}
	
	public Integer getUserId() {
		return this.userId;
	}
	
	public void setUserId() {
		this.userId = this.getUser().getId();
	}
	
	
	public Integer getPortion() {
		return this.portion;
	}
	
	public void setPortion(Integer portion) {
		this.portion = portion;
	}
	
	public Boolean getState() {
		return this.state;
	}
	
	public void setState(Boolean state) {
		this.state = state;
	}
	
	public String getPaymentMethod() {
		return this.paymentMethod;
	}
	
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	
	public String getAddress() {
		return this.address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getCartId() {
		return cartId;
	}

	public void setCartId(Integer cartId) {
		this.cartId = cartId;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public User getUser() {
		return this.user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
}







