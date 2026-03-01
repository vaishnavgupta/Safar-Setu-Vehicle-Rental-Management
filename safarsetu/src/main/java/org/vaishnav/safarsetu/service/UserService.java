package org.vaishnav.safarsetu.service;

import org.springframework.web.multipart.MultipartFile;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.request.UserUpdateRequest;

import java.io.IOException;
import java.util.List;

public interface UserService {

    User getCurrentUser() throws UserException;

    List<UserDto> getAllUsers();

    User findByUserId(Long userId) throws UserException;

    User updateUser(UserUpdateRequest request) throws UserException;

    User updateUserProfileImage(MultipartFile file) throws UserException, IOException;

}
