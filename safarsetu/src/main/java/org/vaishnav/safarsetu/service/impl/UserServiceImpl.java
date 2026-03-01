package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.mapper.UserMapper;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.request.UserUpdateRequest;
import org.vaishnav.safarsetu.repository.UserRepository;
import org.vaishnav.safarsetu.service.CloudinaryService;
import org.vaishnav.safarsetu.service.UserService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CloudinaryService  cloudinaryService;

    @Override
    public User getCurrentUser() throws UserException {
        //Getting user from SecurityContext set during the time of Login
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow( () -> new UserException("Invalid User. User does not exists"));

        return user;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> userMapper.userToUserDto(user))
                .toList();
    }

    @Override
    public User findByUserId(Long userId) throws UserException {
        return userRepository.findById(userId)
                .orElseThrow( () -> new UserException("Invalid User. User does not exists with id: " + userId));
    }

    @Override
    public User updateUser(UserUpdateRequest request) throws UserException {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow( () -> new UserException("Invalid User. User does not exists"));

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());

        return userRepository.save(user);
    }

    @Override
    public User updateUserProfileImage(MultipartFile file) throws UserException, IOException {
        User user = getCurrentUser();

        //Cloudinary Service
        Map result = cloudinaryService.uploadImage(file);
        String imageUrl = (String) result.get("secure_url");

        //Saving in user object
        user.setProfileImageUrl(imageUrl);
        return userRepository.save(user);
    }
}
