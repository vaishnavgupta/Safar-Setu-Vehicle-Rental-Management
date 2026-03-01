package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthForgetPasswordRequest {

    @NotNull(message = "Email is required")
    private String email;

}
