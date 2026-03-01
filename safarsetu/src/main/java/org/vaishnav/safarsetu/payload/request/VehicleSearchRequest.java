package org.vaishnav.safarsetu.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleSearchRequest {

    private String searchTerm;
    private Long vehicleCategoryId;
    private boolean availableOnly;
    private Integer page = 0;
    private Integer pageSize = 10;
    private String sortBy = "createdAt";
    private String sortOrder = "DESC";

}
