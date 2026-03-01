package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.exception.PasswordResetTokenException;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.response.AuthResponse;

public interface AuthService {
    AuthResponse login(String username, String password) throws UserException;

    AuthResponse register(UserDto userDto) throws UserException;

    void createResetPasswordToken(String email) throws UserException;

    void createNewPassword(String token, String newPassword) throws PasswordResetTokenException;
}
