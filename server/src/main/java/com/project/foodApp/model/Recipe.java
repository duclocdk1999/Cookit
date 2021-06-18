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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "Recipe")
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "totalTime")
	private String totalTime;
	
	@Column(name = "imageUrl")
	private String imageUrl;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "category")
	private String category;
	
	@Column(name = "portion")
	private Integer portion;
	
	@ManyToOne
	@JoinColumn(name = "author", nullable = false)
	private User author;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<Step> steps;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<Ingredient> ingredients;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<LikeRecord> likeRecords;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<Cart> carts;
	
	@Transient
	private List<Integer> fanIds;			// id of user who like this recipe
	
	@Transient
	private Integer numberOfLikes;
	
	@Transient
	private Integer authorId;
	
	
	//---------------------------------------------------------------------------------------------------
	public Recipe() {
		
	}
	public Recipe(String name, 
				String totalTime, 
				String imageUrl, 
				String description, 
				String category, 
				Integer portion, 
				User author, 
				List<Ingredient> ingredients, 
				List<Step> steps,
				List<LikeRecord> likeRecords,
				List<Cart> carts) {
		
		this.name = name;
		this.totalTime = totalTime;
		this.imageUrl = imageUrl;
		this.category = category;
		this.portion = portion;
		this.description = description;
		this.author = author;
		
		this.ingredients = ingredients;
		this.steps = steps;
		this.likeRecords = likeRecords;
		this.carts = carts;
	}
	
	public void setNumberOfLikes() {
		if (this.likeRecords == null)
			this.numberOfLikes = 0;
		this.numberOfLikes = this.likeRecords.size();
	}
	
	public Integer getNumberOfLikes() {
		if (this.numberOfLikes == null)
			return 0;
		return this.numberOfLikes;
	}
	
	public List<Cart> getCarts() {
		return this.carts;
	}
	
	public void setCarts(List<Cart> carts) {
		this.carts = carts;
	}
	
	public Integer getAuthorId() {
		return this.authorId;
	}
	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}
	public void setAuthorId() {
		this.authorId = this.author.getId();
	}

	public List<Ingredient> getIngredients() {
		return this.ingredients;
	}
	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public List<LikeRecord> getLikeRecords() {
		return likeRecords;
	}
	public void setLikeRecords(List<LikeRecord> likeRecords) {
		this.likeRecords = likeRecords;
	}
	
	public List<Integer> getFanIds() {
		return this.fanIds;
	}
	public void setFanIds(List<Integer> fanIds) {
		this.fanIds = fanIds;
	}
	public void setFanIds() {
		if (this.likeRecords != null) {		
			List<Integer> fanIds = new ArrayList<>();
			int length = this.likeRecords.size();
			for (int i = 0; i < length; i++) {
				fanIds.add(likeRecords.get(i).getUser().getId());
			}
			this.fanIds = fanIds;
		}
	}
	
	public List<Step> getSteps() {
		return steps;
	}

	public void setSteps(List<Step> steps) {
		this.steps = steps;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public User getAuthor() {
		return author;
	}
	public void setAuthor(User author) {
		this.author = author;
	}
	public String getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(String totalTime) {
		this.totalTime = totalTime;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Integer getPortion() {
		return portion;
	}
	public void setPortion(Integer portion) {
		this.portion = portion;
	}
}




