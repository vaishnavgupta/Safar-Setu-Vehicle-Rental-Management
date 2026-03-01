package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResetPasswordRequest {
    @NotNull(message = "Reset Password Token is required")
    private String resetPasswordToken;

    @NotNull(message = "New Password is required")
    @Size(min = 8, max = 16, message = "New Password must have between 8 - 16 characters")
    private String newPassword;
}
