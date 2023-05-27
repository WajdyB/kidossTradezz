package com.authentification.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

import static com.authentification.entities.UserStatus.ACTIVE;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(	name = "users",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "username"),
				@UniqueConstraint(columnNames = "email")
		})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
	private Long id_user;

	@Column(name="username")
	private String username;

	@Column(name="password")
	private String password;

	@Column (name="firstname")
	private String firstname;

	@Column (name="lastname")
	private String lastname ;

	@Column(name = "profilePicture")
	private String profilePicture;

	@Column (name="email")
	private String email;
	@Column (name="homeAddress")
	private String homeAddress ;

	@Column (name="phone")
	private int phone ;

	@Column (name="description")
	private String description;
	@Column
	@Enumerated(EnumType.STRING)
	private UserStatus status = ACTIVE;

	@Column
	@Enumerated(EnumType.STRING)
	private Role role = Role.USER;

	@JsonIgnore
	@OneToMany(mappedBy = "ratedUser")
	private List<Rating> receivedRatings;

	@JsonIgnore
	@OneToMany(mappedBy = "ratingUser")
	private List<Rating> givenRatings;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Favorite> favorites;


	public User(String username,String email, String firstname,
				String lastname, String homeAddress, int phone,
				String description, String encode) {

		this.username = username;
		this.password = encode;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.homeAddress = homeAddress;
		this.phone = phone;
		this.description = description;
	}

	public User(String ratingUserId) {}
}