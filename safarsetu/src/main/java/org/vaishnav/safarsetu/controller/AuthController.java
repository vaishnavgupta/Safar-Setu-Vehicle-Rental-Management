package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vaishnav.safarsetu.exception.PasswordResetTokenException;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.request.AuthForgetPasswordRequest;
import org.vaishnav.safarsetu.payload.request.AuthLoginRequest;
import org.vaishnav.safarsetu.payload.request.AuthResetPasswordRequest;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.payload.response.AuthResponse;
import org.vaishnav.safarsetu.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody UserDto userDto) throws UserException {
        AuthResponse authResponse = authService.register(userDto);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody AuthLoginRequest authLoginRequest) throws UserException {
        AuthResponse authResponse = authService.login(authLoginRequest.getEmail(), authLoginRequest.getPassword());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/forget-password")
    public ResponseEntity<ApiResponse> forgetPasswordClick(@Valid @RequestBody AuthForgetPasswordRequest request) throws UserException {
        authService.createResetPasswordToken(request.getEmail());

        ApiResponse apiResponse = new ApiResponse("A Reset Link has been sent to your email", true);
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> forgetPasswordClick(@Valid @RequestBody AuthResetPasswordRequest request) throws PasswordResetTokenException {
        authService.createNewPassword( request.getResetPasswordToken(), request.getNewPassword() );

        ApiResponse apiResponse = new ApiResponse("Your Password has been reset successfully", true);
        return ResponseEntity.ok(apiResponse);
    }

}
