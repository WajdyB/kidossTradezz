package com.authentification.entities;

<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonIgnore;
>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Annonce")
public class Annonce {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id_annonce;

        @Column(name = "name")
        private String name;

<<<<<<< HEAD
=======
        @Column(name = "picture")
        private String picture;

>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412
        @Column(name="price")
        private String price ;

        @Column(name = "state")
        private String state;

<<<<<<< HEAD
        @Column(name="picture")
        private String picture ;

        @Column(name="ageChild")
        private String ageChild ;
=======
        @Column(name = "ageChild")
        private String ageChild;
>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412

        @Column(name = "ageToy")
        private String ageToy;

        @Column(name = "category")
        private String category;

        @Column(name = "description")
        private String description;

        private boolean estArchive;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_user")
        private User user;
        @OneToMany(mappedBy = "annonce")
        private List<Favorite> favorites;


<<<<<<< HEAD

}
=======
}
>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412
