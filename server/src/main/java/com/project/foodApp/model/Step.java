package com.project.foodApp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Step {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "recipe", nullable = false)
	private Recipe recipe;
	
	@Column(nullable = false)
	private Integer stepNum;
	
	@Column
	private String instruction;
	//----------------------------------------------
	public Step() {
		
	}
	
	public Step(Recipe recipe, Integer stepNum) {
		this.recipe = recipe;
		this.stepNum = stepNum;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getId() {
		return this.id;
	}
	
	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public Integer getStepNum() {
		return stepNum;
	}

	public void setStepNum(Integer stepNum) {
		this.stepNum = stepNum;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}
	
	
}
