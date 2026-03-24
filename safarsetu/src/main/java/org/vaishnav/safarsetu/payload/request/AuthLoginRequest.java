package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthLoginRequest {
    @NotBlank(message = "Username / Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
