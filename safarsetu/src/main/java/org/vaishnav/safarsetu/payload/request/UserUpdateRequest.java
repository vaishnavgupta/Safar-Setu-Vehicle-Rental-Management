package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUpdateRequest {
    @NotNull(message = "User Id is required")
    private Long userId;
    @NotNull(message = "Password is required")
    private String email;
    @Size(min = 3, max = 100, message = "Full name must be between 3-100 characters")
    private String fullName;
    @Size(min = 10, max = 10, message = "Phone Number must be of 10 length")
    private String phone;
}
