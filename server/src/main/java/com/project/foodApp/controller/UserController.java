package com.project.foodApp.controller;

import java.io.IOException;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.foodApp.SystemProperties;
import com.project.foodApp.form.NormalResponseForm;
import com.project.foodApp.form.UserResponseForm;
import com.project.foodApp.model.LikeRecord;
import com.project.foodApp.model.Recipe;
import com.project.foodApp.model.User;
import com.project.foodApp.repository.LikeRecordRepository;
import com.project.foodApp.repository.RecipeRepository;
import com.project.foodApp.repository.UserRepository;

@Controller
@RequestMapping(path = "/foodApp/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired 
	private RecipeRepository recipeRepository;
	
	@Autowired
	private LikeRecordRepository likeRecordRepository;
	//-------------------------------------------------------------------------------------------------------
	@RequestMapping(path = "/getInformation/{userId}")
	@ResponseBody
	public UserResponseForm getUserInformation(HttpServletRequest request,
											   @PathVariable("userId") Integer userId) {
		UserResponseForm responseForm = new UserResponseForm();
		try {			
			Optional<User> optionalUser = userRepository.findById(userId);
			if (!optionalUser.isPresent()) {
				responseForm.setError("user id does not exist");
				return responseForm;
			}
			User user = optionalUser.get();
			
			// set password and token null for security purpose
			user.setPassword(null);
			user.setToken(null);
			
			// set image url null because this is just an url, not image
			user.setImageUrl(null);
			
			// set owned recipeIds and null own recipes to avoid recursion
			user.setRecipeIds();
			user.setRecipes(null);
			
			// set favorite recipeIds and null likeRecord
			user.setFavoriteRecipeIds();
			user.setLikeRecords(null);
			
			// set cart null
			user.setCarts(null);
			
			// update responseForm
			responseForm.setUser(user);
			return responseForm;
		}
		catch (Exception exception) {
			exception.printStackTrace();
			responseForm.setError(exception.getMessage());
			return responseForm;
		}
	}
	//-------------------------------------------------------------------------------------------------------
	@RequestMapping(path = "/getYourInformation/")
	@ResponseBody
	public UserResponseForm getOwnUserInformation(HttpServletRequest request) {
		
		UserResponseForm responseForm = new UserResponseForm();
		try {
			String token = request.getHeader("Authorization");
			User user = userRepository.findByToken(token);
			
			// set password and token null for security purpose
			user.setPassword(null);
			user.setToken(null);
			
			// set image url null because this is just an url, not image
			user.setImageUrl(null);
			
			// set owned recipeIds and null own recipes to avoid recursion
			user.setRecipeIds();
			user.setRecipes(null);
			
			// set favorite recipeIds and null likeRecord
			user.setFavoriteRecipeIds();
			user.setLikeRecords(null);
			
			// set cart null
			user.setCarts(null);
			
			// update responseForm
			responseForm.setUser(user);
			return responseForm;
		}
		catch (Exception exception) {
			exception.printStackTrace();
			responseForm.setError(exception.getMessage());
			return responseForm;
		}
	}
	//-------------------------------------------------------------------------------------------------------
	@RequestMapping(path = "/{emotion}/{recipeId}", method = RequestMethod.POST)
	@ResponseBody
	public void userLikeRecipe(HttpServletRequest request,
							   @PathVariable("emotion") String emotion,
							   @PathVariable("recipeId") Integer recipeId) {
		try {
			// check login
			String token = request.getHeader("Authorization");
			if (token == null)
				return;
			User user = userRepository.findByToken(token);
			if (user == null)
				return;
			
			// check if recipe exists
			Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
			if (!optionalRecipe.isPresent()) {
				return;
			}
			Recipe recipe = optionalRecipe.get();			

			Integer status = 0;
			if (emotion.equals("like")) {
				status = 1;
			}
			if (emotion.equals("unlike"))
				status = 0;

			// check if recipe and user exists in table likeRecord
			LikeRecord record = likeRecordRepository.findByUserRecipe(user, recipe);
			if (record == null) {
				if (status == 1) {
					record = new LikeRecord(user, recipe, status);
					likeRecordRepository.save(record);
				}
			}
			else 
			if (status == 0) {
				likeRecordRepository.delete(record);
			}
		}
		catch (Exception exception) {
			exception.printStackTrace();
		}
	}
	//-------------------------------------------------------------------------------------------------------
	@RequestMapping(path = "/avatar/{token}", method = RequestMethod.GET)
	@ResponseBody
    public ResponseEntity<Resource> getAvatar(@PathVariable("token") String token) {
		
		try {
			User user = userRepository.findByToken(token);
			if (user == null) {
				System.out.println("Error, token does not match any account");
				return null;
			}
			String avatarUrl = user.getImageUrl();
			Path file = Paths.get(avatarUrl);
			Resource image = new UrlResource(file.toUri());
	        System.out.println("get image successful");
		    return ResponseEntity.ok(image);

		}
		catch (Exception error) {
			return null;
		}
    }
	//-------------------------------------------------------------------------------------------------------
	@RequestMapping(path = "/editInfo", method = RequestMethod.POST)
	@ResponseBody
	
	// require header (key = "Authorization", value = "token of user"
	// request body must be form-data, contains key (
	
	public boolean changeUserInfomation(HttpServletRequest request, @RequestBody User updatedUserFromRequest) {
		
		// check login first
		String token = request.getHeader("Authorization");
		if (token == null || token.length() < 10) {
			// invalid token
			return false;
		}
		User user = userRepository.findByToken(token);
		if (user == null) {
			// invalid token
			return false;
		}
		try {
			String newEmail = updatedUserFromRequest.getEmail();
			String newPassword = updatedUserFromRequest.getPassword();
			String newName = updatedUserFromRequest.getName();
			String newSex = updatedUserFromRequest.getSex();

			if (newEmail != null) {
				user.setEmail(newEmail);
			}
			if (newPassword != null && newPassword.length() > 0) {
				user.setPassword(newPassword);
			}
			if (newName != null) {
				user.setName(newName);
			}
			if (newSex != null) {
				user.setPassword(newSex);
			}
			userRepository.save(user);
			return true;
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
	}
	//----------------------------------------------------------------------------------------------
	@RequestMapping(path = "editAvatar", method = RequestMethod.POST)
	@ResponseBody
	public NormalResponseForm changeUserAvatar(HttpServletRequest request, HttpServletResponse response) {

		NormalResponseForm responseForm = new NormalResponseForm();
		String token = request.getHeader("Authorization");
		if (token == null) {
			responseForm.setError("unable to find token, you must provide 'Authorization' parameter in header");
			return responseForm;
		}
		
		User userFromDatabase = userRepository.findByToken(token);
		if (userFromDatabase == null) {
			responseForm.setError("token does not match any recognized tokens");
			return responseForm;
		}
		
		try {
			Part newAvatar = request.getPart("avatar");
			
			// invalid uploaded file (not an image)
			if (!SystemProperties.getInstance().isImageFile(newAvatar)) {
				responseForm.setError("unacceptable file. This uploaded avatar is not an image");
				System.out.println("unaccepttable file. This uploaded avatar is not an image");
				return responseForm;
			}
			
			// get user's avatar directory
			String userAvatarUrl = SystemProperties.getInstance().getUserAvatarUrl(userFromDatabase.getId());
			// save image to disk
			newAvatar.write(userAvatarUrl);
			
			// same image information to database
			userFromDatabase.setImageUrl(userAvatarUrl);
			userRepository.save(userFromDatabase);
			
			// set image successfully
			responseForm.setError(null);
			System.out.println("upload avatar successfully");
			return responseForm;
			
		} catch (IOException | ServletException e) {
			responseForm.setError(e.getMessage());
			return responseForm;
		}
	}
}

