package com.authentification.entities;

import javax.persistence.*;

@Entity
@Table(name="Annonce")
public class Annonce {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id_annonce;

        @Column(name="name")
        private String name ;

        @Column(name="category")
        private String category ;

        @Column(name="state")
        private String state ;

        @Column(name="ageChild")
        private String ageChild ;

        @Column(name="ageToy")
        private String ageToy ;

        @Column(name="description")
        private String description ;

        private boolean estArchive ;



        public Long getId_annonce() {return id_annonce;}

        public String getName() {return name;}

        public String getCategory() {return category;}

        public String getState() {return state;}

        public String getAgeChild() {return ageChild;}

        public String getAgeToy() {return ageToy;}

        public String getDescription() {return description;}

        public boolean isEstArchive() {return estArchive;}

        public void setName(String name) {this.name = name;}

        public void setCategory(String category) {this.category = category;}

        public void setState(String state) {this.state = state;}

        public void setAgeChild(String ageChild) {this.ageChild = ageChild;}

        public void setAgeToy(String ageToy) {this.ageToy = ageToy;}

        public void setDescription(String description) {this.description = description;}

        public void setEstArchive(boolean estArchive) {this.estArchive = estArchive;}

        public Annonce(Long id_annonce, String name, String category, String state,
                       String ageChild, String ageToy, String description, boolean estArchive) {
                this.id_annonce = id_annonce;
                this.name = name;
                this.category = category;
                this.state = state;
                this.ageChild = ageChild;
                this.ageToy = ageToy;
                this.description = description;
                this.estArchive = estArchive;
        }

        public Annonce() {}

        @Override
        public String toString() {
                return "Annonce{" +
                        "id_annonce=" + id_annonce +
                        ", name='" + name + '\'' +
                        ", category='" + category + '\'' +
                        ", state='" + state + '\'' +
                        ", ageChild='" + ageChild + '\'' +
                        ", ageToy='" + ageToy + '\'' +
                        ", description='" + description + '\'' +
                        ", estArchive=" + estArchive +
                        '}';
        }
}
