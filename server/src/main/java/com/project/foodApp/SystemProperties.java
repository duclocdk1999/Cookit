package com.project.foodApp;

import java.awt.image.BufferedImage;

import java.io.File;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.Part;

public class SystemProperties {
	private static SystemProperties instance = null;
	private final static String userAvatarFolder = System.getProperty("user.dir") + "/src/main/resources/userAvatar/";
	private final static String recipeImageFolder = System.getProperty("user.dir") + "/src/main/resources/recipeImage/";
	private final static String ingredientImageFolder = System.getProperty("user.dir") + "/src/main/resources/ingredientImage";
	//-------------------------------------------------------------------
	private SystemProperties() {
		
	}
	//-------------------------------------------------------------------
	public static SystemProperties getInstance() {
		if (instance == null) {
			instance = new SystemProperties();
			return instance;
		}
		return instance;
	}
	//-------------------------------------------------------------------
	public String getGeneratedString(Integer boundStringLength) {
		// apply for initializing token
		
    	String lowerLetter = "abcdefghijklmnopqrstuvw";
    	String upperLetter = "ABCDEFGHIJKLMNOPQRSTUVW";
    	String number = "0123456789";
    	String charset = lowerLetter + upperLetter + number;
    	Integer charsetLength = charset.length();
    	
    	Random random = new Random();
    	StringBuilder generatedString = new StringBuilder(boundStringLength);
    	for (int i = 0; i < boundStringLength; i++) {
    		generatedString.append(charset.charAt(random.nextInt(charsetLength)));
    	}
    	return generatedString.toString();
	}
	//-------------------------------------------------------------------
	public final String getUserAvatarUrl(Integer userId) {
		return userAvatarFolder + userId.toString();
	}

	public final String getRecipeImageUrl(Integer recipeId) {
		return recipeImageFolder + recipeId.toString();
	}
	
	public final String getIngredientImageUrl(Integer ingredientId) {
		return ingredientImageFolder + ingredientId.toString();
	}
	//-------------------------------------------------------------------
	public boolean isImageFile(String imageUrl) {
        try {
			BufferedImage image = ImageIO.read(new File(imageUrl));
			System.out.println(image.getType());
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("failed");
			return false;
		}
	}
	//---------------------------------------------------------------------
	public boolean isImageFile(Part imagePart) {
		try {
			BufferedImage image = ImageIO.read(imagePart.getInputStream());
			System.out.println(image.getType());
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	//---------------------------------------------------------------------
	
}
