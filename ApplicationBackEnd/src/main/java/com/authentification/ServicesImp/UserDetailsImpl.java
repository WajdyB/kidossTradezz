package com.authentification.ServicesImp;

import java.io.Serial;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import com.authentification.entities.Role;
import com.authentification.entities.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.authentification.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {
	@Serial
	private static final long serialVersionUID = 1L;
	private  Long id;
	private  String username;
	private  String email;
	@JsonIgnore
	private  String password;
	private  UserStatus status ;
	private  Role role ;
	private static Collection<? extends GrantedAuthority> authorities;
	public UserDetailsImpl(Long id, String username, String email, String password, UserStatus status, Role role,
						   Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.status = status;
		this.role = role ;
		UserDetailsImpl.authorities = authorities;
	}
	public static UserDetailsImpl build(User user) {
		return new UserDetailsImpl(
				user.getId_user(),
				user.getUsername(),
				user.getEmail(),
				user.getPassword(),
				user.getStatus(),
				user.getRole(),
				authorities);
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}
	public Long getId() {
		return id;
	}
	public String getEmail() {
		return email;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return username;
	}
	public UserStatus getStatus(){return status;}
	public Role getRole(){return role;}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}