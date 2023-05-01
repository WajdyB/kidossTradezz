package com.authentification.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private Long user_id ;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private String firstname;
    @NotBlank
    private String lastname ;
    @NotBlank
    private String email;
    @NotBlank
    private String homeAddress ;
    @NotBlank
    private int phone ;
    @NotBlank
    private String avgResponseTime;
    @NotBlank
    private String description;

}
