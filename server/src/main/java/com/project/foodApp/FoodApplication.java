package com.project.foodApp;

import java.io.IOException;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodApplication {
	
    public static void main(String[] args) throws IOException {
        SpringApplication.run(FoodApplication.class, args);        
    	
//        String jsonString = ""
//        				  + 	"["
//        				  + 		"{"
//        				  + 			"\"error\":\"chino ko ko to\""
//        				  + 		"},"
//        				  +			"{"
//        				  +				"\"error\":\"congratulation ! you have just done it !\""
//        				  +			"}"
//        				  + 	"]"
//        				  + "";
//        ObjectMapper mapper = new ObjectMapper();
//        // 1. convert JSON array to Array objects
//    	NormalResponseForm[] pp1 = mapper.readValue(jsonString, NormalResponseForm[].class);
//    	for (NormalResponseForm form : pp1) {
//    		System.out.println(form.getError());
//    	}
    }
}