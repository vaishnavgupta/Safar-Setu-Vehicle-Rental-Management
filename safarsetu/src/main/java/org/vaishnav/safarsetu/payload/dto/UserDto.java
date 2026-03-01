package org.vaishnav.safarsetu.payload.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.UserRole;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private Long id;

    @NotNull(message = "Username / Email is required")
    private String email;

    @NotNull(message = "Full Name is required")
    private String fullName;

    private UserRole role;

    private String phone;

    private String googleId;

    private String githubId;

    private String profileImageUrl;

    @NotNull(message = "Password is required")
    @Size(min = 8, max = 16, message = "Password must have between 8 - 16 characters")
    private String password;

    private LocalDateTime lastLogin;
}
