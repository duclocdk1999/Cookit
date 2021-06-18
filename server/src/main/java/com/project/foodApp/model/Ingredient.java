package com.project.foodApp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Ingredient")
public class Ingredient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "unit")
	private String unit;
	
	@ManyToOne
	@JoinColumn(name = "recipe", nullable = false)
	private Recipe recipe;
	//--------------------------------------------------
	public Ingredient() {
		
	}
	
	public Ingredient(String name, Double amount, String unit, Recipe recipe) {
		this.name = name;
		this.amount = amount;
		this.unit = unit;
		this.recipe = recipe;
	}
	
	public Recipe getRecipe() {
		return this.recipe;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	public String getUnit() {
		return this.unit;
	}
	
	public void setUnit(String unit) {
		this.unit = unit;
	}
}
