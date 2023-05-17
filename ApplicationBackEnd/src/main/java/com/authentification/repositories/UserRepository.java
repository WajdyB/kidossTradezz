package com.authentification.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.authentification.entities.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Query("SELECT u FROM User u WHERE u.username = :username")
	Optional<User> findByUsername(@Param("username") String username);
	@Query("SELECT u FROM User u WHERE u.email = :email")
	Optional<User> findByEmail(@Param("email") String email);
	@Query("SELECT u FROM User u WHERE u.id_user = :id_user")
	Optional<User> findById_user(@Param("id_user") Long id_user);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
}
