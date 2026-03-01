package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.request.UserUpdateRequest;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.service.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getCurrentUser() throws UserException {
        User user = userService.getCurrentUser();

        return ResponseEntity.ok(user);
    }


    @GetMapping("/list")
    public ResponseEntity< List<UserDto> > getAllUsers() {
        List<UserDto> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PatchMapping("/details")
    public ResponseEntity<?> updateUserDetails(@Valid @RequestBody UserUpdateRequest request) {
        try {
            User user = userService.updateUser(request);
            return ResponseEntity.ok(user);
        }
        catch (UserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(), false));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), false));
        }
    }

    @PatchMapping("/image")
    public ResponseEntity<?> updateUserImage(@RequestParam("file") MultipartFile file) {
        try {
            User user = userService.updateUserProfileImage(file);
            return ResponseEntity.ok(user);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(), false));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), false));
        }
    }


}
