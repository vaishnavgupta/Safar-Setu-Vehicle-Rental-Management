package org.vaishnav.safarsetu.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.request.AuthLoginRequest;
import org.vaishnav.safarsetu.payload.response.AuthResponse;
import org.vaishnav.safarsetu.repository.UserRepository;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    // Shared across all tests in this class
    private static String userJwt;
    private static String adminJwt;

    private UserDto registerPayload() {
        UserDto dto = new UserDto();
        dto.setEmail("testuser@safarsetu.com");
        dto.setPassword("testpass@123");
        dto.setFullName("Test User");
        dto.setPhone("9876543210");
        return dto;
    }

    private HttpHeaders authHeaders(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @BeforeEach
    void setUp() {
        if (userJwt != null) return;

        ResponseEntity<AuthResponse> registerResponse = restTemplate.postForEntity(
                "/auth/register",
                registerPayload(),
                AuthResponse.class
        );
        assertEquals(HttpStatus.OK, registerResponse.getStatusCode());

        AuthLoginRequest login = new AuthLoginRequest();
        login.setEmail("testuser@safarsetu.com");
        login.setPassword("testpass@123");

        ResponseEntity<AuthResponse> loginResponse = restTemplate.postForEntity(
                "/auth/login", login, AuthResponse.class
        );
        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        assertNotNull(loginResponse.getBody());

        userJwt = loginResponse.getBody().getJwt();

        AuthLoginRequest adminLogin = new AuthLoginRequest();
        adminLogin.setEmail("admin@test.com");
        adminLogin.setPassword("adminpass@1234");

        ResponseEntity<AuthResponse> adminResponse = restTemplate.postForEntity(
                "/auth/login", adminLogin, AuthResponse.class
        );
        adminJwt = adminResponse.getBody().getJwt();
    }

}
