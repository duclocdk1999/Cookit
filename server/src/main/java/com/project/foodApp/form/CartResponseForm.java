package com.project.foodApp.form;

import java.util.List;

import com.project.foodApp.model.Cart;

public class CartResponseForm {
	private List<Cart> carts;
	private String error;
	//-------------------------------------------------------
	public CartResponseForm() {
		
	}
	public CartResponseForm(List<Cart> carts, String error) {
		this.carts = carts;
		this.error = error;
	}
	
	public List<Cart> getCarts() {
		return carts;
	}
	public void setCarts(List<Cart> carts) {
		this.carts = carts;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	
	
}
