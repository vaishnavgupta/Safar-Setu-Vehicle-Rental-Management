package org.vaishnav.safarsetu.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.config.AppConstants;
import org.vaishnav.safarsetu.config.JwtUtils;
import org.vaishnav.safarsetu.domain.UserRole;
import org.vaishnav.safarsetu.exception.PasswordResetTokenException;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.mapper.UserMapper;
import org.vaishnav.safarsetu.models.PasswordResetToken;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.response.AuthResponse;
import org.vaishnav.safarsetu.repository.PasswordResetTokenRepository;
import org.vaishnav.safarsetu.repository.UserRepository;
import org.vaishnav.safarsetu.service.AuthService;
import org.vaishnav.safarsetu.service.EmailService;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final UserMapper userMapper;
    private final UserDetailsImpl userDetailsImpl;
    private final PasswordResetTokenRepository passResetRepo;
    private final EmailService emailService;

    @Override
    public AuthResponse login(String username, String password) throws UserException {
        Authentication authentication = authenticateUser(username, password);       //checks for correctness of Email & Password

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Collection< ? extends GrantedAuthority > authorities = authentication.getAuthorities();
        String role = authorities.iterator().next().getAuthority();
        String jwtToken = jwtUtils.generateJwtToken(authentication);

        User user = userRepository.findByEmail(username)
                .orElseThrow( () -> new UsernameNotFoundException("User not found with username: " + username) );
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        return AuthResponse.builder()
                .message("Login Successfully")
                .title("Welcome back " + user.getFullName())
                .userDto(userMapper.userToUserDto(user))
                .jwt(jwtToken)
                .build();

    }

    @Override
    public AuthResponse register(UserDto userDto) throws UserException {
        boolean isExists = userRepository.existsByEmail(userDto.getEmail());

        if(isExists){
            throw new UserException("User already exists with email: " + userDto.getEmail());
        }

        User createdUser = new User();
        createdUser.setEmail(userDto.getEmail());
        createdUser.setFullName(userDto.getFullName());
        createdUser.setRole(UserRole.ROLE_USER);            //Hardcoded for now
        createdUser.setPhone(userDto.getPhone());
        createdUser.setGoogleId(userDto.getGoogleId());
        createdUser.setGithubId(userDto.getGithubId());
        createdUser.setProfileImageUrl(userDto.getProfileImageUrl());
        createdUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        createdUser.setLastLogin(LocalDateTime.now());

        User savedUser = userRepository.save(createdUser);

        // Setting Authentication in Security Context
        Authentication auth = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(),
                savedUser.getPassword()
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwtToken = jwtUtils.generateJwtToken(auth);

        return AuthResponse.builder()
                .jwt(jwtToken)
                .message("User Registered Successfully")
                .title("Welcome " + savedUser.getFullName() + " to SafarSetu")
                .userDto( userMapper.userToUserDto(savedUser) )
                .build();
    }

    @Override
    @Transactional
    public void createResetPasswordToken(String email) throws UserException {
        User user = userRepository.findByEmail(email)
                .orElseThrow( () -> new UserException("User not found with username: " + email) );

        String resetToken = UUID.randomUUID().toString();
        PasswordResetToken passResetToken = new PasswordResetToken();
        passResetToken.setResetToken(resetToken);
        passResetToken.setUser(user);
        passResetToken.setExpiryDateTime(LocalDateTime.now().plusMinutes(6));

        passResetRepo.save(passResetToken);

        // Mail Sending Functionality
        String resetLink = AppConstants.FRONTEND_URL_USER + resetToken;
        String subject = "Password Reset Request - SafarSetu";
        String body = AppConstants.PASSWORD_RESET_MAIL_BODY + "\n\n" + resetLink;


        emailService.sendEmail(email, subject, body );
    }

    @Override
    @Transactional
    public void createNewPassword(String token, String newPassword) throws PasswordResetTokenException {
        PasswordResetToken passwordResetToken = passResetRepo.findByResetToken(token)
                .orElseThrow(() -> new PasswordResetTokenException("Password Reset Token does not exists"));

        if (passwordResetToken.isExpired()){
            passResetRepo.delete(passwordResetToken);
            throw new PasswordResetTokenException("Password Reset Token is expired.");
        }

        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passResetRepo.delete(passwordResetToken);
    }

    private Authentication authenticateUser(String username, String password) throws UserException {
        UserDetails userDetails = userDetailsImpl.loadUserByUsername(username);

        if(userDetails == null) {
            throw new UserException("User not found with username: " + username);
        }
        if ( !passwordEncoder.matches(password, userDetails.getPassword()) ) {
            throw new UserException("Invalid password for user: " + username);
        }

        return new UsernamePasswordAuthenticationToken(
                username,
                null,
                userDetails.getAuthorities()
        );
    }
}
