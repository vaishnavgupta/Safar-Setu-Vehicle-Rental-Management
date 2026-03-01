package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.config.AppConstants;
import org.vaishnav.safarsetu.domain.UserRole;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private void initializeAdminUser(){
        String adminEmail = AppConstants.ADMIN_EMAIL;
        String adminPassword = AppConstants.ADMIN_PASSWORD;

        if( !userRepository.existsByEmail(adminEmail) ) {
            User user = User.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .fullName("Admin 1 SafarSetu")
                    .profileImageUrl("https://t3.ftcdn.net/jpg/00/07/32/48/240_F_7324855_mx4CEBWTr81XLOrlQccCROtP2uNR7xbk.jpg")
                    .role(UserRole.ROLE_ADMIN)
                    .build();

            userRepository.save(user);
        }
    }

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
    }
}
