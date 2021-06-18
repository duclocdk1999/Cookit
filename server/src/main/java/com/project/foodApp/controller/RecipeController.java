package com.project.foodApp.controller;

import java.io.PrintWriter;

import java.io.StringWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.foodApp.JsonConvert;
import com.project.foodApp.SystemProperties;
import com.project.foodApp.form.NormalResponseForm;
import com.project.foodApp.form.RecipeResponseForm;
import com.project.foodApp.model.Cart;
import com.project.foodApp.model.Ingredient;
import com.project.foodApp.model.LikeRecord;
import com.project.foodApp.model.Recipe;
import com.project.foodApp.model.Step;
import com.project.foodApp.model.User;
import com.project.foodApp.repository.CartRepository;
import com.project.foodApp.repository.IngredientRepository;
import com.project.foodApp.repository.RecipeRepository;
import com.project.foodApp.repository.StepRepository;
import com.project.foodApp.repository.UserRepository;

@Controller
@RequestMapping(path = "/foodApp/recipe")
public class RecipeController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RecipeRepository recipeRepository;
	
	@Autowired
	private IngredientRepository ingredientRepository;
	
	@Autowired
	private StepRepository stepRepository;
	
	@Autowired
	private CartRepository cartRepository;

	//-------------------------------------------------------------------------------
	private void initializeRecipe(Recipe recipe, Boolean requireStepsAndIngredients) {
		if (!requireStepsAndIngredients) {
			
			// set author null
			recipe.setAuthorId();
			recipe.setAuthor(null);
			
			// set image url null
			recipe.setImageUrl(null);
			
			// set step null because it is not necessary to load all in general page
			recipe.setSteps(null);
			
			// set ingredient null because it is not necessary to load all in general page
			recipe.setIngredients(null);
			
			// set like record null
			recipe.setFanIds();
			recipe.setNumberOfLikes();
			recipe.setLikeRecords(null);
			
			// set carts null
			recipe.setCarts(null);
		}
		else {
			// set author null to prevent recursion
			recipe.setAuthorId();
			recipe.setAuthor(null);

			// set image null
			recipe.setImageUrl(null);
			
			// set step's recipe null to avoid recursion
			List<Step> steps = recipe.getSteps();
			for (Step step : steps) {
				step.setRecipe(null);
			}
			
			// set ingredient's recipe null to avoid recursion
			List<Ingredient> ingredients = recipe.getIngredients();
			for (Ingredient ingredient : ingredients) {
				ingredient.setRecipe(null);
			}
			
			// set like record null to avoid recursion
			recipe.setFanIds();
			recipe.setNumberOfLikes();
			recipe.setLikeRecords(null);

			// set carts null
			recipe.setCarts(null);
		}
	}
	//-------------------------------------------------------------------------------
	private void initializeRecipes(List<Recipe> recipes, Boolean requireStepsAndIngredients) {
		for (Recipe recipe : recipes) {
			initializeRecipe(recipe, requireStepsAndIngredients);
		}
	}
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/popularRecipes", method = RequestMethod.GET)
	@ResponseBody 
	public RecipeResponseForm popularRecipes(HttpServletRequest request) {
		
		RecipeResponseForm responseForm = new RecipeResponseForm();
		try {
			List<Recipe> recipes = recipeRepository.findAllSortByPopular();

			// initialize our recipe before response (security and avoid recursion)
			initializeRecipes(recipes, false);
			
			responseForm.setRecipes(recipes);
			return responseForm;
		}
		catch (Exception exception) {
			exception.printStackTrace();
			responseForm.setError(exception.getMessage());
			return responseForm;
		}
	}
	
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/yourRecipes", method = RequestMethod.GET)
	@ResponseBody
	public RecipeResponseForm listUserRecipes(HttpServletRequest request) {
		RecipeResponseForm responseForm = new RecipeResponseForm();
		
		// check user login validity
		String token = request.getHeader("Authorization");
		if (token == null) {
			responseForm.setError("null token error. Please provide user's token !");
			return responseForm;
		}
		User author = userRepository.findByToken(token);
		if (author == null) {
			responseForm.setError("error, token does not match any account !");
			return responseForm;
		}
		
		// list recipes which is owned by the user
		try {
			List<Recipe> recipes = author.getRecipes();
			// initialize our recipes before response (security and avoid recursion)
			initializeRecipes(recipes, false);
			responseForm.setRecipes(recipes);
			return responseForm;
		}
		catch (Exception exception) {
			responseForm.setError(exception.getMessage());
			return responseForm;
		}
	}
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/yourFavoriteRecipes", method = RequestMethod.GET)
	@ResponseBody
	public RecipeResponseForm listYourFavoriteRecipes(HttpServletRequest request) {
		RecipeResponseForm responseForm = new RecipeResponseForm();
		try {
			String token = request.getHeader("Authorization");
			if (token == null) {
				responseForm.setError("null token !");
				return responseForm;
			}
			User user = userRepository.findByToken(token);
			if (user == null) {
				responseForm.setError("token does not match any user");
				return responseForm;
			}
			List<Recipe> favoriteRecipes = new ArrayList<>();
			List<LikeRecord> records = user.getLikeRecords();
			for (LikeRecord record : records) {
				Recipe recipe = record.getRecipe();
				
				// initialize our recipe before response (security and avoid recursion)
				initializeRecipe(recipe, false);
								
				favoriteRecipes.add(recipe);
			}
			responseForm.setRecipes(favoriteRecipes);
			return responseForm;
		}
		catch (Exception exception) {
			responseForm.setError(exception.getMessage());
			exception.printStackTrace();
			return responseForm;
		}
	}
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/allRecipesByCategory/{category}", method = RequestMethod.GET)
	@ResponseBody 
	public RecipeResponseForm listAllRecipesByCategory(HttpServletRequest request, 
													   @PathVariable("category") String category) {
		RecipeResponseForm responseForm = new RecipeResponseForm();
		try {
			List<Recipe> recipes = (List<Recipe>) recipeRepository.findByCategory(category);
			initializeRecipes(recipes, false);
			responseForm.setRecipes(recipes);
			return responseForm;
		}
		catch (Exception exception) {
			responseForm.setRecipes(null);
			responseForm.setError(exception.getMessage());
			return responseForm;
		}
	}
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/getRecipeImage/{recipeId}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Resource> getRecipeImage(HttpServletRequest request,
												   @PathVariable("recipeId") Integer recipeId) {
		try {
			Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
			if (!optionalRecipe.isPresent()) {
				return null;
			}
			Recipe recipe = optionalRecipe.get();
			String imageUrl = recipe.getImageUrl();
			Path file = Paths.get(imageUrl);
			Resource image = new UrlResource(file.toUri());
			System.out.println("get image successfully");
			
			return ResponseEntity.ok(image);
		}
		catch (Exception exception) {
			return null;
		}
	}
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/getInformation/{recipeId}", method = RequestMethod.GET)
	@ResponseBody
	public RecipeResponseForm getRecipe(HttpServletRequest request, 
										@PathVariable("recipeId") Integer recipeId) {
		RecipeResponseForm responseForm = new RecipeResponseForm();
		
		try {
			// check login
			String token = request.getHeader("Authorization");
			if (token == null) {
				responseForm.setError("token null !");
				return responseForm;
			}
			User user = userRepository.findByToken(token);
			if (user == null) {
				responseForm.setError("token does not match any user");
				return responseForm;
			}
			
			// get recipe by id
			Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
			if (optionalRecipe.isPresent()) {
				
				Recipe recipe = optionalRecipe.get();

				Integer cartId = cartRepository.findCurrentUnpaidCartId(user);
				if (cartId != null) {
					Cart cart = cartRepository.findByCartUserRecipe(cartId, user, recipe);
					if (cart == null)
						responseForm.setAmount(0);
					else 
						responseForm.setAmount(cart.getPortion());
				}
				else {
					responseForm.setAmount(0);
				}

				initializeRecipe(recipe, true);
				
				// save recipe to response form
				List<Recipe> recipes = new ArrayList<>();
				recipes.add(recipe);
				responseForm.setRecipes(recipes);
				
				// check if user has liked this recipe or not
				responseForm.setLike(false);
				for (Integer id : recipe.getFanIds()) {
					if (id == user.getId()) {
						responseForm.setLike(true);
						break;
					}
				}
			}
			else {
				responseForm.setError("error, the recipe id does not exist");				
			}
			
			return responseForm;
		}
		catch (Exception exception) {
			responseForm.setError(exception.getMessage());
			System.out.println(exception.getMessage());
			exception.printStackTrace();
			
			return responseForm;
		}
	}
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/allRecipes", method = RequestMethod.GET)
	@ResponseBody 
	public RecipeResponseForm listAllRecipes(HttpServletRequest request) {
		RecipeResponseForm responseForm = new RecipeResponseForm();
		
		try {
			List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
			initializeRecipes(recipes, false);

			responseForm.setRecipes(recipes);
			return responseForm;
		}
		catch (Exception exception) {
			responseForm.setRecipes(null);
			
			responseForm.setError(exception.getMessage());
			exception.printStackTrace();
			if (responseForm.getError() == null) {
				PrintWriter printWriter = new PrintWriter(new StringWriter());
				exception.printStackTrace(printWriter);
				responseForm.setError(printWriter.toString());
			}
			return responseForm;
		}
	}
	//-------------------------------------------------------------------------------
	@RequestMapping(path = "/addRecipe", method = RequestMethod.POST)
	@ResponseBody
	public NormalResponseForm addRecipe(HttpServletRequest request) {
		
		NormalResponseForm responseForm = new NormalResponseForm();
		String token = request.getHeader("Authorization");
		if (token == null) {
			responseForm.setError("null token error. Please provide user's token !");
			return responseForm;
		}
		User author = userRepository.findByToken(token);
		if (author == null) {
			responseForm.setError("error, token does not match any account !");
			return responseForm;
		}
		
		try {
			String name = request.getParameter("name");
			String totalTime = request.getParameter("totalTime");
			String description = request.getParameter("description");
			String category = request.getParameter("category");
			Integer portion = Integer.valueOf(request.getParameter("portion"));
			
			String stepsFromRequest = request.getParameter("steps");
			String ingredientsFromRequest = request.getParameter("ingredients");
			
			System.out.println(name);
			System.out.println(category);
			System.out.println(portion);
			
			// generate steps and ingredients from string
			JsonConvert jsonConvert = new JsonConvert();
			List<Step> steps = jsonConvert.toStepArray(stepsFromRequest);
			List<Ingredient> ingredients = jsonConvert.toIngredientArray(ingredientsFromRequest);
			if (steps == null) {
				responseForm.setError("syntax error! Please check steps json");
				return responseForm;
			}
			if (ingredients == null) {
				responseForm.setError("syntax error! Please check ingredients json");
				return responseForm;
			}
			
			// save new recipe to database (generated id)
			Recipe recipe = new Recipe(name, 
									   totalTime, 
									   null, 
									   description, 
									   category, 
									   portion, 
									   author, 
									   null, 
									   null, 
									   null,
									   null);
			recipeRepository.save(recipe);
			
			// save steps to database
			for (int i = 0; i < steps.size(); i++) {
				steps.get(i).setStepNum(i + 1);
				steps.get(i).setRecipe(recipe);
				stepRepository.save(steps.get(i));
			}
			
			// save ingredients to database
			for (Ingredient ingredient : ingredients) {
				ingredient.setRecipe(recipe);
				ingredientRepository.save(ingredient);
			}		
			
			// get image from request
			Part recipeImage = request.getPart("image");
			
			// if image file from request exists
			if (recipeImage != null) {
				// if that file is an image, let update recipe's image url
				if (SystemProperties.getInstance().isImageFile(recipeImage)) {
					
					String recipeImageUrl = SystemProperties.getInstance().getRecipeImageUrl(recipe.getId());
					
					// write image to disk
					recipeImage.write(recipeImageUrl);
					
					// update recipe image url in database 
					recipe.setImageUrl(recipeImageUrl);
					
					// save recipe again
					recipeRepository.save(recipe);
				}
			}
			return responseForm;
		}
		catch (Exception exception) {

			responseForm.setError(exception.getMessage());
			exception.printStackTrace();
			if (responseForm.getError() == null) {
				PrintWriter printWriter = new PrintWriter(new StringWriter());
				exception.printStackTrace(printWriter);
				responseForm.setError(printWriter.toString());
			}
			return responseForm;
		}
	}
}
