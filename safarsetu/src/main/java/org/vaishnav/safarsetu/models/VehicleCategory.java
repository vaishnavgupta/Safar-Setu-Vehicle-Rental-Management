package org.vaishnav.safarsetu.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "Category code is required")
    private String code;

    @NotNull(message = "Category name is required")
    private String name;

    @Size(max = 600, message = "Description have atmost 600 characters")
    private String description;

    private Integer displayOrder = 0;

    @Column(nullable = false)
    private Boolean active = true;

    @ManyToOne
    private VehicleCategory parentCategory;

    @OneToMany
    private List<VehicleCategory> subCategories = new ArrayList<>();

//    @OneToMany(mappedBy = "vehiclecategory",  cascade = CascadeType.PERSIST)
//    private List<Vehicle> vehicles = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
