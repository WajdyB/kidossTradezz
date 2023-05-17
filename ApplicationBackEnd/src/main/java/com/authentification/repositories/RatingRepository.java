package com.authentification.repositories;

import com.authentification.entities.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("SELECT r FROM Rating r WHERE r.ratedUser.id_user = :userId")
    List<Rating> findByRatedUserId(@Param("userId") Long userId);

    @Query("SELECT AVG(r.ratingValue) FROM Rating r WHERE r.ratedUser.id_user = :userId")
    Double calculateAverageRatingByRatedUser_Id(@Param("userId") Long userId);
}


