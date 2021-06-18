package com.project.foodApp.form;

import java.io.File;

public class ImageResponseForm {
	private File image;
	private String error;
	
	public ImageResponseForm() {
		this.image = null;
		this.error = null;
	}
	
	public ImageResponseForm(File image, String error) {
		this.image = image;
		this.error = error;
	}
	
	public File getImage() {
		return image;
	}
	public void setImage(File image) {
		this.image = image;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}	
}
