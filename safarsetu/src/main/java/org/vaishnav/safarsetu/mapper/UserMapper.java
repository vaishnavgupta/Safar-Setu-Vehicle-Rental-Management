package org.vaishnav.safarsetu.mapper;

import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.dto.UserDto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserDto userToUserDto(User user) {
        if( user == null ) return null;

        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .password(user.getPassword())
                .role(user.getRole())
                .googleId(user.getGoogleId())
                .githubId(user.getGithubId())
                .lastLogin(user.getLastLogin())
                .profileImageUrl(user.getProfileImageUrl())
                .build();
    }

    public List<UserDto> usersToUserDtosList(List<User> users){
        return users.stream()
                .map(user -> userToUserDto(user))
                .toList();
    }

    public Set<UserDto> usersToUserDtosSet(List<User> users){
        return users.stream()
                .map(user -> userToUserDto(user))
                .collect(Collectors.toSet());
    }

    public User userDtoToUser(UserDto userDto) {
        if(userDto == null) return null;

        return User.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .fullName(userDto.getFullName())
                .role(userDto.getRole())
                .phone(userDto.getPhone())
                .googleId(userDto.getGoogleId())
                .githubId(userDto.getGithubId())
                .profileImageUrl(userDto.getProfileImageUrl())
                .password(userDto.getPassword())
                .lastLogin(userDto.getLastLogin())
                .build();
    }

}
