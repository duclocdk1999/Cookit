package com.project.foodApp.controller;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.foodApp.form.CartResponseForm;
import com.project.foodApp.form.NormalResponseForm;
import com.project.foodApp.form.RationResponseForm;
import com.project.foodApp.model.Cart;
import com.project.foodApp.model.Ingredient;
import com.project.foodApp.model.Ration;
import com.project.foodApp.model.Recipe;
import com.project.foodApp.model.Step;
import com.project.foodApp.model.User;
import com.project.foodApp.repository.CartRepository;
import com.project.foodApp.repository.RecipeRepository;
import com.project.foodApp.repository.UserRepository;

@Controller
@RequestMapping(path = "/foodApp/cart")
public class CartController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RecipeRepository recipeRepository;
	
	@Autowired
	CartRepository cartRepository;
	
//	//--------------------------------------------------------------------
//	private Boolean isLogin(HttpServletRequest request) {
//		String token = request.getHeader("Authorization");
//		if (token == null)
//			return false;
//		User user = userRepository.findByToken(token);
//		if (user == null) {
//			return false;
//		}
//		return true;
//	}
//	//--------------------------------------------------------------------
//	private String getAddressByCartId(Integer cartId, User user) {
//		List<Cart> carts = user.getCarts();
//		for (Cart cart : carts) {
//			if (cart.getCartId() == cartId) {
//				return cart.getAddress();
//			}
//		}
//		return null;
//	}
//	//--------------------------------------------------------------------
//	private Boolean getStateByCartId(Integer cartId, User user) {
//		List<Cart> carts = user.getCarts();
//		for (Cart cart : carts) {
//			if (cart.getCartId() == cartId) {
//				return cart.getState();
//			}
//		}
//		return null;
//	}
//	//--------------------------------------------------------------------
//	private String getPaymentMethodByCartId(Integer cartId, User user) {
//		List<Cart> carts = user.getCarts();
//		for (Cart cart : carts) {
//			if (cart.getCartId() == cartId) {
//				return cart.getPaymentMethod();
//			}
//		}
//		return null;
//	}
//	//--------------------------------------------------------------------
//	private Boolean isValidCartIdOfUser(Integer cartId, User user) {
//		List<Cart> carts = user.getCarts();
//		for (Cart cart : carts) {
//			if (cart.getCartId() == cartId) {
//				return true;
//			}
//		}
//		return false;
//	}
//	//--------------------------------------------------------------------
//	private String getDateByCartId(Integer cartId, User user) {
//		List<Cart> carts = user.getCarts();
//		for (Cart cart : carts) {
//			if (cart.getCartId() == cartId) {
//				return cart.getDate();
//			}
//		}
//		return null;
//	}
	//--------------------------------------------------------------------
	private User getUserByTokenFromRequest(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		try {
			User user = userRepository.findByToken(token);
			return user;
		}
		catch (Exception exception) {
			return null;
		}
	}
	//--------------------------------------------------------------------
	@RequestMapping(path = "/finishCart", method = RequestMethod.POST)
	@ResponseBody
	public NormalResponseForm finishCart(HttpServletRequest request) {
		NormalResponseForm responseForm = new NormalResponseForm();

		// check login
		User user = getUserByTokenFromRequest(request);
		if (user == null) {
			responseForm.setError("login failed, pls check token");
			return responseForm;
		}

		Integer cartId = cartRepository.findCurrentUnpaidCartId(user);
		if (cartId == null) {
			responseForm.setError("empty cart !");
			return responseForm;
		}
		
		try {
			List<Cart> carts = cartRepository.findAllByCartId(cartId);
			for (Cart cart: carts) {
				cart.setState(true);
				cartRepository.save(cart);
			}
			return responseForm;
		}
		catch (Exception exception) {
			System.out.println(exception.getMessage());
			exception.printStackTrace();
			responseForm.setError("server error !");
		}
		return null;
	}
	//--------------------------------------------------------------------
	@RequestMapping(path = "/getCartInformation", method = RequestMethod.GET)
	@ResponseBody
	public CartResponseForm getCartInformation(HttpServletRequest request) {
		CartResponseForm responseForm = new CartResponseForm();
		
		// check login
		User user = getUserByTokenFromRequest(request);
		if (user == null) {
			responseForm.setError("login failed, pls check token");
			return responseForm;
		}
		
		Integer cartId = cartRepository.findCurrentUnpaidCartId(user);
		if (cartId == null) {
			responseForm.setError("empty cart !");
			return responseForm;
		}
		
		try {
			List<Cart> carts = cartRepository.findAllByCartId(cartId);
			for (Cart cart : carts) {
				// set user null
				cart.setUserId();
				cart.setUser(null);
				
				// set recipe null
				cart.setRecipeId();
				cart.setRecipeName();
				cart.setIngredients();
				cart.setRecipe(null);
			}
			responseForm.setCarts(carts);
			return responseForm;
		}
		catch (Exception exception) {
			System.out.println(exception.getMessage());
			exception.printStackTrace();
			responseForm.setError("an error occured in server !");
			return responseForm;
		}
	}
	//--------------------------------------------------------------------
	@RequestMapping(path = "/getListRecipeInCart", method = RequestMethod.GET)
	@ResponseBody
	public RationResponseForm getListOfRecipeInCart(HttpServletRequest request) {
		RationResponseForm responseForm = new RationResponseForm();
		
		// check login
		User user = getUserByTokenFromRequest(request);
		if (user == null) {
			responseForm.setError("login failed, pls check token");
			return responseForm;
		}

		// if cart is empty, return no thing
		Integer cartId = cartRepository.findCurrentUnpaidCartId(user);
		if (cartId == null) {
			responseForm.setError("empty cart !");
			return responseForm;
		}

		// get list of recipe in cart
		try {
			List<Cart> carts = user.getCarts();
			List<Ration> rations = new ArrayList<>();
			for (Cart cart : carts) {
				if (cart.getCartId() == cartId) {
					Recipe recipe = cart.getRecipe();
					
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
					recipe.setLikeRecords(null);

					// set carts null
					recipe.setCarts(null);
					
					rations.add(new Ration(recipe, cart.getPortion()));
				}
			}
			responseForm.setRations(rations);
			return responseForm;
		}
		catch (Exception exception) {
			System.out.println(exception.getMessage());
			exception.printStackTrace();
			responseForm.setError("unexpected internal error !");
			return responseForm;
		}
	}
	//-----------------------------------------------------------------------
	@RequestMapping(path = "/updateCartInformation", method = RequestMethod.POST)
	@ResponseBody
	public NormalResponseForm updateCartInformation(HttpServletRequest request) {
		NormalResponseForm responseForm = new NormalResponseForm();
		
		// check login
		User user = getUserByTokenFromRequest(request);
		if (user == null) {
			responseForm.setError("login failed, pls check the validity of token");
			return responseForm;
		}
		
		try {
			String address = request.getParameter("address");
			String stateFromRequest = request.getParameter("state");
			if (stateFromRequest == null)
				stateFromRequest = "false";
			Boolean state = Boolean.valueOf(stateFromRequest);
			String paymentMethod = request.getParameter("paymentMethod");
			String date = request.getParameter("date");
			String phone = request.getParameter("phone");
			
			Integer cartId = cartRepository.findCurrentUnpaidCartId(user);
			if (cartId == null) {
				responseForm.setError("cart does not exist (no items in cart");
				return responseForm;
			}
			List<Cart> carts = cartRepository.findAllByCartId(cartId);
			for (Cart cart : carts) {
				cart.setAddress(address);
				cart.setState(state);
				cart.setPaymentMethod(paymentMethod);
				cart.setDate(date);
				cart.setPhone(phone);

				cartRepository.save(cart);
			}
			return responseForm;
		}
		catch (Exception exception) {
			System.out.println(exception.getMessage());
			exception.printStackTrace();
			responseForm.setError("unexpected error in server");
			return responseForm;
		}
	}
	//-----------------------------------------------------------------------
	@RequestMapping(path = "/addItem/{recipeId}/{portion}", method = RequestMethod.POST)
	@ResponseBody
	public NormalResponseForm addToAvailableCurrentCart(HttpServletRequest request,
														@PathVariable("recipeId") Integer recipeId,
														@PathVariable("portion") Integer portion) {
		NormalResponseForm responseForm = new NormalResponseForm();
		
		// check login
		User user = getUserByTokenFromRequest(request);
		if (user == null) {
			responseForm.setError("login failed, pls check the validity of token");
			return responseForm;
		}
		
		// find current cartId
		try {
			Integer cartId = cartRepository.findCurrentUnpaidCartId(user);
			if (cartId == null) {
				cartId = cartRepository.findMaxCartId();
				if (cartId == null)
					cartId = 1;
				else 
					cartId += 1;
			}			
			Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
			
			// check if recipe id does exist
			if (!optionalRecipe.isPresent()) {
				responseForm.setError("recipe id does not exist");
				return responseForm;
			}
			
			Recipe recipe = optionalRecipe.get();
			
			// check if cart exist
			Cart cart = cartRepository.findByCartUserRecipe(cartId, user, recipe);
			if (cart == null) {
				// if cart does not exist, create new
				cart = new Cart(cartId, user, recipe, portion, null, null, null, false, null);
				cartRepository.save(cart);
			}
			else {
				// remove the recipe in cart if portion from request = 0
				if (portion == 0) {
					cartRepository.delete(cart);
				}
				else {
					cart.setPortion(portion);
					cartRepository.save(cart);
				}
			}
			
			return responseForm;
		}
		catch (Exception exception) {
			System.out.println(exception.getMessage());
			exception.printStackTrace();
			responseForm.setError("an unexpected error occured in server");
		}
		
		return null;
	}
	//-----------------------------------------------------------------------
//	@RequestMapping(path = "/addItems/{cartId}", method = RequestMethod.POST)
//	@ResponseBody
//	public NormalResponseForm addToAvailableCart(HttpServletRequest request,
//												 @PathVariable("cartId") Integer cartId) {
//		NormalResponseForm responseForm = new NormalResponseForm();
//		User user = getUserByTokenFromRequest(request);
//		if (user == null) {
//			responseForm.setError("login failed, pls check the validity of token");
//			return responseForm;
//		}
//		
//		// check if card id is valid or not
//		if (!isValidCartIdOfUser(cartId, user)) {
//			responseForm.setError("cart id does not exist");
//			return responseForm;
//		}
//		
//		// get address, state and payment method from cart
//		String address = getAddressByCartId(cartId, user);
//		Boolean state = getStateByCartId(cartId, user);
//		String paymentMethod = getPaymentMethodByCartId(cartId, user);
//		String date = getDateByCartId(cartId, user);
//		String phone = getPhoneByCartId(cartId, user);
//		
//		// add new recipes or increase portion
//		try {		
//			// get json ration from request and convert to array
//			String jsonString = request.getParameter("ration");
//			JsonConvert jsonConvert = new JsonConvert();
//	
//			List<Ration> rations = jsonConvert.toRationArray(jsonString);
//			for (Ration ration : rations) {
//				Integer recipeId = ration.getRecipeId();
//				Integer portion = ration.getPortion();
//				
//				Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
//				if (optionalRecipe.isPresent()) {
//					Recipe recipe = optionalRecipe.get();
//					
//					Cart cart = cartRepository.findByCartUserRecipe(cartId, user, recipe);
//					if (cart == null) {
//						// if that recipe has not added to cart, let insert
//						cart = new Cart(cartId, user, recipe, portion, phone, date, address, state, paymentMethod);
//					}
//					else {
//						// if that recipe has been added to cart before, let increase the portion
//						cart.setPortion(cart.getPortion() + portion);
//					}
//					cartRepository.save(cart);
//				}
//				else {
//					responseForm.setError("invalid recipe id");
//					return responseForm;
//				}
//			}
//			return responseForm;
//		}
//		catch (Exception exception) {
//			System.out.println(exception.getMessage());
//			exception.printStackTrace();
//			responseForm.setError("unexpected internal server error");
//			return responseForm;
//		}
//	}
	
//	@RequestMapping(path = "/addNewCart", method = RequestMethod.POST)
//	@ResponseBody
//	public NormalResponseForm addCart(HttpServletRequest request) {
//		NormalResponseForm responseForm = new NormalResponseForm();
//		
//		// check login
//		User user = getUserByTokenFromRequest(request);
//		if (user == null) {
//			responseForm.setError("login failed. Pls check the validity of token");
//			return responseForm;
//		}
//		
//		// add new cart cart
//		try {
//			String address = request.getParameter("address");
//			String stateFromRequest = request.getParameter("state");
//			if (stateFromRequest == null)
//				stateFromRequest = "false";
//			Boolean state = Boolean.valueOf(stateFromRequest);
//			String paymentMethod = request.getParameter("paymentMethod");
//			String date = request.getParameter("date");
//			String phone = request.getParameter("phone");
//			
//			// cartId should be generated as the available maximum cartId + 1
//			Integer cartId = cartRepository.findMaxCartId();
//			if (cartId == null)
//				cartId = 1;
//			else 
//				cartId += 1;
//			
//			String jsonString = request.getParameter("ration");
//			JsonConvert jsonConvert = new JsonConvert();
//			List<Ration> rations = jsonConvert.toRationArray(jsonString);
//			for (Ration ration : rations) {
//				Integer recipeId = ration.getRecipeId();
//				Integer portion = ration.getPortion();
//				
//				Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
//				if (optionalRecipe.isPresent()) {
//					Recipe recipe = optionalRecipe.get();
//					Cart cart = cartRepository.findByCartUserRecipe(cartId, user, recipe);
//					if (cart == null) {
//						cart = new Cart(cartId, user, recipe, portion, phone, date, address, state, paymentMethod);
//					}
//					else {
//						cart.setPortion(cart.getPortion() + portion);
//					}
//					cartRepository.save(cart);
//					
//				}
//				else {
//					responseForm.setError("invalid recipe id");
//					return responseForm;
//				}
//			}
//			return responseForm;
//		}
//		catch (Exception exception) {
//			System.out.println(exception.getMessage());
//			exception.printStackTrace();
//			responseForm.setError("unexpected error from server !");
//			return responseForm;
//		}
//	}

}






