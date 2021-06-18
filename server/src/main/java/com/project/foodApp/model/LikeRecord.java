package com.project.foodApp.model;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"user", "recipe"})
		}
)
public class LikeRecord {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "user", nullable = false)
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "recipe", nullable = false)
	private Recipe recipe;
	
	@Column(nullable = false)
	private Integer status;

	//----------------------------------------------------
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
	
	public Recipe getRecipe() {
		return this.recipe;
	}
	
	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}
	
	public Integer getStatus() {
		return this.status;
	}
	
	public void setStatus(Integer status) {
		this.status = status;
	}

	public LikeRecord() {
		
	}
	
	public LikeRecord(User user, Recipe recipe, Integer status) {
		this.user = user;
		this.recipe = recipe;
		this.status = status;
	}
}





